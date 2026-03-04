"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
type Props = {
  variant?: "page" | "modal";
  onSuccess?: () => void;
  showLoginLink?: boolean;
  jobId?: string | null;
};

function Wrapper({
  variant,
  children,
}: {
  variant: "page" | "modal";
  children: React.ReactNode;
}) {
  if (variant === "modal") return <div>{children}</div>;

  return (
    <div className="min-h-screen w-full grid place-items-center bg-neutral-50 text-neutral-900">
      <div className="w-full max-w-2xl px-6">{children}</div>
    </div>
  );
}

export default function SignupClient({
  variant = "page",
  onSuccess,
  showLoginLink = true,
  jobId = null,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const jobIdEffective =
  jobId ??
  (typeof window !== "undefined" ? localStorage.getItem("job_id") : null);

  useEffect(() => {
  if (jobId) localStorage.setItem("job_id", String(jobId));
}, [jobId]);
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const safeEmail = email.trim().toLowerCase();
    if (!safeEmail || !password) {
      setError("Introduce un correo y una contraseña.");
      return;
    }

    if (!jobIdEffective) {
  setError("Falta job_id (ej: /registro?job_id=123).");
  return;
}

const jobIdNumber = Number(jobIdEffective);
if (!Number.isFinite(jobIdNumber)) {
  setError("job_id inválido.");
  return;
}


    if (!API_BASE) {
      setError("NEXT_PUBLIC_API_URL no está configurado");
      return;
    }

    setLoading(true);
    try {
      // 1) Signup en tu backend (Railway)
      const r = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: safeEmail, password }),
      });

      if (!r.ok) throw new Error(await r.text());

      // 2) Link job_id -> user/email en backend
      const link = await fetch(`${API_BASE}/auth/link-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobIdNumber, email: safeEmail }),
      });

      if (!link.ok) throw new Error(await link.text());

      // 3) Auto login con NextAuth credentials
      const login = await signIn("credentials", {
  email: safeEmail,
  password,
  redirect: false,
});

if (login?.error) {
  setError("Cuenta creada, pero no se pudo iniciar sesión automáticamente. Intenta iniciar sesión de nuevo.");
  return;
}

onSuccess?.();

// ✅ ir a Stripe
router.replace(`/${locale}/panel?job_id=${encodeURIComponent(jobIdEffective)}`);
return;
      // 4) Entra al panel
      
    } catch (err: any) {
      setError(err?.message ?? "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper variant={variant}>
      <div className="rounded-3xl bg-white p-10 md:p-12 shadow-2xl ring-1 ring-black/5">
        <h1 className="text-3xl font-bold tracking-tight">
          Regístrate antes de continuar
        </h1>
        <p className="mt-3 text-base text-neutral-600">
          Crea una cuenta para poder volver a iniciar sesión cuando quieras.
        </p>

        <form onSubmit={handleEmail} className="mt-8 space-y-5">
          <label className="block text-base font-medium text-neutral-800">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none"
          />

          <label className="block text-base font-medium text-neutral-800">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-base font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creando cuenta…" : "Registrarse"}
          </button>
        </form>

        {showLoginLink && (
          <div className="mt-6 flex items-center justify-center">
            <span className="text-base text-neutral-600">¿Ya tienes cuenta?</span>
            <Link
              href={`/${locale}/login${jobIdEffective ? `?job_id=${encodeURIComponent(jobIdEffective)}` : ""}`}
              className="ml-2 text-base font-semibold text-neutral-900 hover:underline"
            >
              Iniciar sesión →
            </Link>
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl bg-emerald-500/10 p-4 text-base text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl bg-rose-500/10 p-4 text-base text-rose-700">
            {error}
          </div>
        )}
      </div>
    </Wrapper>
  );
}