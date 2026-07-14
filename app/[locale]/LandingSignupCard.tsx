"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Candidate = {
  place_id: string;
  name: string;
  address: string;
  google_maps_url: string;
  rating?: number;
  user_ratings_total?: number;
};

export default function LandingSignupCard() {
  const router = useRouter();
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function completeSignupWithCandidate(candidate: Candidate) {
    const safeEmail = email.trim().toLowerCase();

    const signupRes = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: safeEmail, password }),
    });

    if (!signupRes.ok) throw new Error(await signupRes.text());

    const signupData = await signupRes.json();
    const createdJobId = signupData?.job_id;

    if (!createdJobId) {
      throw new Error("El registro no devolvió job_id.");
    }

    localStorage.setItem("job_id", String(createdJobId));

    const setupRes = await fetch(`${API_BASE}/jobs/${createdJobId}/setup-business`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        place_name: businessName.trim(),
        city: city.trim() || null,
        google_maps_url: candidate.google_maps_url,
        google_place_id: candidate.place_id,
      }),
    });

    if (!setupRes.ok) throw new Error(await setupRes.text());

    const login = await signIn("credentials", {
      email: safeEmail,
      password,
      redirect: false,
    });

    if (login?.error) {
      throw new Error("Cuenta creada, pero no se pudo iniciar sesión automáticamente.");
    }

    router.replace(
      `/${locale}/panel/solicitar-resenas?job_id=${encodeURIComponent(String(createdJobId))}`
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCandidates(null);

    const safeEmail = email.trim().toLowerCase();
    const safeBusiness = businessName.trim();
    const safeCity = city.trim();

    if (!safeBusiness || !safeCity || !safeEmail || !password) {
      setError("Completa nombre del negocio, ciudad, email y contraseña.");
      return;
    }

    if (!API_BASE) {
      setError("NEXT_PUBLIC_API_URL no está configurado");
      return;
    }

    setLoading(true);

    try {
      const q = `${safeBusiness}, ${safeCity}`;
      const placesRes = await fetch(`${API_BASE}/places/search?q=${encodeURIComponent(q)}`);
      if (!placesRes.ok) throw new Error(await placesRes.text());

      const data = await placesRes.json();
      const list = (data?.candidates ?? []) as Candidate[];

      if (!list.length) {
        throw new Error("No se encontró ningún negocio con esos datos.");
      }

      if (list.length === 1) {
        await completeSignupWithCandidate(list[0]);
        return;
      }

      setCandidates(list);
    } catch (err: any) {
      setError(err?.message ?? "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[920px] rounded-[28px] border border-white/10 bg-[#1E2A44]/95 p-5 md:p-6 shadow-2xl backdrop-blur">
      <h3 className="text-white text-[28px] md:text-[34px] font-semibold leading-tight">
        Comienza Gratis Hoy
      </h3>

      <p className="mt-2 text-white/75 text-sm md:text-base">
        Regístrate para continuar.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Nombre del negocio"
            disabled={loading}
            className="h-[58px] rounded-[18px] bg-white text-neutral-900 px-5 text-[17px] outline-none"
          />

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad"
            disabled={loading}
            className="h-[58px] rounded-[18px] bg-white text-neutral-900 px-5 text-[17px] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
            className="h-[58px] rounded-[18px] bg-white text-neutral-900 px-5 text-[17px] outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            disabled={loading}
            className="h-[58px] rounded-[18px] bg-white text-neutral-900 px-5 text-[17px] outline-none"
          />

          <button
            type="submit"
            disabled={
              loading ||
              !businessName.trim() ||
              !city.trim() ||
              !email.trim() ||
              !password
            }
            className="h-[58px] rounded-[18px] bg-white/90 text-neutral-900 px-6 font-semibold whitespace-nowrap disabled:opacity-60"
          >
            {loading ? "Buscando..." : "Empezar →"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-white/65 text-sm">
          Sin tarjeta. Configuración en menos de 1 minuto.
        </p>

        <p className="text-sm text-white/80">
          ¿Ya tienes cuenta?{" "}
          <Link
            href={`/${locale}/login`}
            className="font-semibold text-white hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>

      {candidates?.length ? (
        <div className="mt-4 space-y-2">
          {candidates.map((c, idx) => (
            <button
              key={c.place_id || idx}
              type="button"
              className="block w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-left text-white hover:bg-white/15"
              onClick={async () => {
                try {
                  setLoading(true);
                  await completeSignupWithCandidate(c);
                } catch (err: any) {
                  setError(err?.message ?? "No se pudo completar el registro.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-white/70">{c.address}</div>
              <div className="text-xs text-white/60 mt-1">
                {c.rating ? `⭐ ${c.rating}` : ""}{" "}
                {c.user_ratings_total ? `(${c.user_ratings_total} reseñas)` : ""}
              </div>
            </button>
          ))}
        </div>
      ) : null}

      {error && (
        <div className="mt-4 rounded-xl bg-red-500/10 border border-red-400/20 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
    </div>
  );
}