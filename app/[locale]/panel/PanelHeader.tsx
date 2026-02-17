"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

type View = "menu" | "help" | "subscription";

function PanelLogo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3" aria-label="Panel">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"
        aria-hidden="true"
      >
        <span
          className="font-semibold leading-none text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: 14 }}
        >
          AI
        </span>
      </div>

      <span className="leading-tight">
        <div className="flex items-baseline gap-1">
          <span
            className="tracking-tight"
            style={{
              color: "#111111",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            AIBE
          </span>
          <span
            style={{
              color: "#111111",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            Technologies
          </span>
        </div>
        <div
          className="text-slate-500"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.1,
          }}
        >
          Artificial Intelligence for Business Efficiency
        </div>
      </span>
    </Link>
  );
}


export function AccountMenu() {
  const router = require("next/navigation").useRouter();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");

  const [email, setEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [plan, setPlan] = useState<string | null>(null);
const searchParams = useSearchParams();
const jobId = searchParams.get("job_id");

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

const [placeName, setPlaceName] = useState<string | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
const [isPro, setIsPro] = useState(false);
const [loadingPro, setLoadingPro] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingEmail(true);
        setError(null);
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!mounted) return;

        setEmail(user?.email ?? null);

        const metaPlan =
          (user?.user_metadata?.plan as string | undefined) ||
          (user?.app_metadata?.subscription as string | undefined) ||
          null;

        setPlan(metaPlan ?? null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "No se pudo obtener el usuario");
        setPlan(null);
      } finally {
        if (mounted) setLoadingEmail(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Comprobar suscripción en Stripe
useEffect(() => {
  let mounted = true;

  (async () => {
    try {
      setLoadingPro(true);

      const res = await fetch("/api/billing/status", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Error billing status");

      const data = await res.json();

      if (!mounted) return;

      setIsPro(Boolean(data?.isPro));
    } catch (e) {
      console.error("Error cargando suscripción:", e);
      if (mounted) setIsPro(false);
    } finally {
      if (mounted) setLoadingPro(false);
    }
  })();

  return () => {
    mounted = false;
  };
}, []);


  useEffect(() => {
  if (!jobId) return;
  if (!API_BASE) return;

  fetch(`${API_BASE}/jobs/${jobId}/meta`)
    .then((res) => res.json())
    .then((data) => {
      if (data?.place_name) setPlaceName(data.place_name);
    })
    .catch(() => {});
}, [jobId, API_BASE]);


  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        popRef.current &&
        !popRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
        setView("menu");
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setView("menu");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    } finally {
      setOpen(false);
      setView("menu");
      if (typeof window !== "undefined") {
        window.location.href = "https://aibetech.es";
      }
    }
  }

  function Header({ title }: { title: string }) {
    return (
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => {
            if (view === "menu") setOpen(false);
            else setView("menu");
          }}
          className="rounded-full p-1 hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  function MenuView() {
    return (
      <>
        <Header title="Mi Cuenta" />
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium text-gray-900">Negocio</div>
          <div className="mt-1">
  {placeName ? (
    <span className="break-all">{placeName}</span>
  ) : (
    <span className="text-gray-500">Cargando negocio…</span>
  )}
</div>

        </div>

        <div className="space-y-2">
          <button
            onClick={() => setView("subscription")}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Suscripción
          </button>
          <button
            onClick={() => setView("help")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ayuda
          </button>
          <button
            onClick={handleSignOut}
            className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </>
    );
  }

  function HelpView() {
    return (
      <>
        <Header title="Ayuda" />
        <div className="space-y-3 text-sm text-gray-800">
          <p>
            <span className="font-medium">Gmail:</span>{" "}
            <a
              href="mailto:aibe.technologies7@gmail.com"
              className="text-blue-600 hover:underline"
            >
              aibe.technologies7@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">Teléfono / WhatsApp:</span>{" "}
            <a
              href="https://wa.me/34699301819"
              target="_blank"
              className="text-blue-600 hover:underline"
              rel="noreferrer"
            >
              699 301 819
            </a>
          </p>
          <p className="text-gray-600">
            El servicio técnico se pondrá en contacto con usted en menos de{" "}
            <span className="font-semibold">24 horas</span>.
          </p>
        </div>

        <button
          onClick={() => setView("menu")}
          className="mt-4 w-full rounded-xl border px-4 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Volver
        </button>
      </>
    );
  }

  function SubscriptionView() {
  return (
    <>
      <Header title="Suscripción" />

      {/* Cargando estado */}
      {loadingPro && (
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          Comprobando suscripción…
        </div>
      )}

      {/* NO es Pro */}
      {!loadingPro && !isPro && (
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          Todavía no tienes ninguna suscripción activa.
        </div>
      )}

      {/* ES Pro */}
      {!loadingPro && isPro && (
        <>
          <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="text-gray-600">
              Suscripción actual:{" "}
              <span className="font-medium text-gray-900">
                Plan reputación automática
              </span>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800">
            <p className="font-semibold text-gray-900">
              Para cancelar la suscripción
            </p>

            <p className="mt-2 text-gray-700">
              Si desea cancelar la suscripción contacte con:
            </p>

            <div className="mt-2 space-y-1">
              <div>
                <span className="font-medium">WhatsApp o llamada:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="tel:+34699301819"
                >
                  699 301 819
                </a>
              </div>

              <div>
                <span className="font-medium">Email:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="mailto:info@aibetech.es"
                >
                  info@aibetech.es
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => setView("menu")}
        className="mt-2 w-full rounded-xl border px-4 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Volver
      </button>
    </>
  );
}


  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        aria-label="Perfil"
        className="grid h-9 w-9 place-items-center rounded-full border bg-white text-slate-600 hover:bg-slate-50"
        onClick={() => {
          setOpen((v) => !v);
          setView("menu");
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={popRef}
          role="menu"
          aria-label="Menú de cuenta"
          className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5"
        >
          {view === "menu" && <MenuView />}
          {view === "help" && <HelpView />}
          {view === "subscription" && <SubscriptionView />}
        </div>
      )}
    </div>
  );
}

export default function PanelHeader() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "es";
  const pathname = usePathname();
  const search = useSearchParams();
  const jobId = search.get("job_id");

  const analysisHref = `/${locale}/panel${jobId ? `?job_id=${jobId}` : ""}`;
  const requestHref = `/${locale}/panel/solicitar-resenas${jobId ? `?job_id=${jobId}` : ""}`;

  const isAnalysis = pathname === `/${locale}/panel`;
  const isRequest = pathname.startsWith(`/${locale}/panel/solicitar-resenas`);

  const linkCls = (active: boolean) =>
    `px-2 py-2 text-[15px] font-medium ${
      active ? "text-slate-900" : "text-slate-700"
    }`;
  const subItems = [
    { id: "temas", label: "Temas" },
    { id: "sentimiento", label: "Sentimiento" },
    { id: "oportunidades", label: "Oportunidades" },
    { id: "volumen", label: "Volumen" },
    { id: "respuestas", label: "Respuestas" },
  ];

  return (
  <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
    {/* FILA 1: logo + menú principal + cuenta */}
    <div className="relative mx-auto flex w-full items-center px-4 py-2">
      <PanelLogo href={analysisHref} />

      <nav
        className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
        aria-label="Secciones del panel"
      >
        <Link href={analysisHref} className={linkCls(isAnalysis)}>
          Análisis de reseñas
        </Link>
        <Link href={requestHref} className={linkCls(isRequest)}>
          Solicitar reseñas
        </Link>
      </nav>

      <div className="ml-auto">
        <AccountMenu />
      </div>
    </div>

    {/* FILA 2: submenú SOLO en análisis y SOLO desktop */}
    {isAnalysis && (
      <div className="hidden md:flex justify-center border-t bg-white/70">
        <nav className="flex items-center gap-10 px-4 py-2" aria-label="Secciones del análisis">
          {subItems.map((it) => (
            <Link
              key={it.id}
              href={`${analysisHref}#${it.id}`}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    )}
  </header>
);

}
