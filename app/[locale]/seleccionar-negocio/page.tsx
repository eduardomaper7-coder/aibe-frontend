"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LocationItem = {
  name: string; // "accounts/123/locations/456"
  title: string; // "Mi restaurante"
  address?: string;
};

function normalizeLocations(data: any): LocationItem[] {
  const locs =
    Array.isArray(data)
      ? data
      : Array.isArray(data?.locations)
      ? data.locations
      : Array.isArray(data?.items)
      ? data.items
      : [];

  return locs
    .filter((x: any) => x && typeof x === "object")
    .map((x: any) => ({
      name: String(x.name ?? ""),
      title: String(x.title ?? x.displayName ?? "Sin nombre"),
      address: x.address ? String(x.address) : undefined,
    }))
    .filter((x: LocationItem) => x.name);
}

export default function SeleccionarNegocioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const accessToken = useMemo(
    () => (session as any)?.accessToken as string | undefined,
    [session]
  );

  const didFetch = useRef(false); // ✅ evita llamadas duplicadas (Strict Mode)

  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [selected, setSelected] = useState<string>("");

  const [state, setState] = useState<
    "idle" | "loading" | "no-businesses" | "error" | "ready"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // 1) Si no hay sesión, forzar login
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: "/seleccionar-negocio" });
    }
  }, [status]);

  // 2) Cuando hay sesión, pedir locations al backend (SOLO 1 VEZ)
  useEffect(() => {
    if (!accessToken) return;

    if (!API_BASE) {
      setState("error");
      setErrorMsg("Falta NEXT_PUBLIC_API_URL en aibe-frontend/.env.local");
      return;
    }

    if (didFetch.current) return; // ✅ evita duplicados
    didFetch.current = true;

    let cancelled = false;

    (async () => {
      try {
        setState("loading");
        setErrorMsg("");

        console.log("Calling:", `${API_BASE}/gbp/locations`);

        const res = await fetch(`${API_BASE}/gbp/locations`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const msg =
            (typeof data?.detail === "string" && data.detail) ||
            (typeof data?.error?.message === "string" && data.error.message) ||
            `Error (${res.status}) al listar negocios`;
          throw new Error(msg);
        }

        const locs = normalizeLocations(data);
        if (cancelled) return;

        setLocations(locs);

        if (locs.length === 0) {
          setState("no-businesses");
          return;
        }

        if (locs.length === 1) setSelected(locs[0].name);
        setState("ready");
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setErrorMsg(e?.message ?? "Error cargando negocios");
        setLocations([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [accessToken, API_BASE]);

  function continuar() {
    if (!selected) return;
    router.push(`/panel?location=${encodeURIComponent(selected)}`);
  }

  if (status === "loading") {
    return <div className="p-6 text-white">Cargando sesión…</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Elige tu negocio</h1>

      {state === "loading" && <p>Cargando negocios…</p>}

      {state === "error" && (
        <div className="max-w-xl rounded-lg border border-white/20 p-4">
          <p className="font-semibold">No se pudieron cargar los negocios</p>
          <p className="mt-2 text-sm text-white/80 whitespace-pre-wrap">
            {errorMsg}
          </p>
          <p className="mt-3 text-sm text-white/70">
            Asegúrate de iniciar sesión con el email que gestiona tu negocio en
            Google Business Profile.
          </p>
        </div>
      )}

      {state === "no-businesses" && (
        <div className="max-w-xl rounded-lg border border-white/20 p-4">
          <p className="font-semibold">No encontramos negocios en esta cuenta</p>
          <p className="mt-2 text-sm text-white/80">
            Inicia sesión con el email que sea propietario o administrador de un
            negocio en Google Business Profile.
          </p>
        </div>
      )}

      {state === "ready" && (
        <>
          <select
            className="text-black p-2 rounded w-full max-w-xl"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {locations.map((l) => (
              <option key={l.name} value={l.name}>
                {l.title}
                {l.address ? ` - ${l.address}` : ""}
              </option>
            ))}
          </select>

          <button
            className="mt-4 px-4 py-2 bg-white text-black rounded disabled:opacity-60"
            onClick={continuar}
            disabled={!selected}
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
}
