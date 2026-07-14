"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type Props = {
  variant?: "page" | "modal";
  onSuccess?: () => void;
  showSignupLink?: boolean;
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

export default function LoginClient({
  variant = "page",
  onSuccess,
  showSignupLink = true,
  jobId = null,
}: Props) {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");
  const router = useRouter();

  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const jobIdEffective =
    jobId ?? (typeof window !== "undefined" ? localStorage.getItem("job_id") : null);

  useEffect(() => {
    if (!jobId) return;
    try {
      localStorage.setItem("job_id", String(jobId));
    } catch {}
  }, [jobId]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!API_BASE) return;

    const uid = (session as any)?.userId;
    if (!uid) return;

    fetch(`${API_BASE}/jobs/my-latest/${uid}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => {
        const jid = d?.job_id ? String(d.job_id) : null;

        if (jid) {
          try {
            localStorage.setItem("job_id", jid);
          } catch {}

          onSuccess?.();
          router.replace(
            `/${locale}/panel/solicitar-resenas?job_id=${encodeURIComponent(jid)}`
          );
          return;
        }

        onSuccess?.();
        router.replace(`/${locale}/panel/solicitar-resenas`);
      })
      .catch(() => {
        onSuccess?.();
        router.replace(`/${locale}/panel/solicitar-resenas`);
      });
  }, [status, session, API_BASE, locale, router, onSuccess]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const safeEmail = email.trim().toLowerCase();
    if (!safeEmail || !password) {
      setErr("Introduce email y contraseña.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email: safeEmail,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErr("Credenciales inválidas");
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <Wrapper variant={variant}>
      <div className="rounded-3xl bg-white p-10 md:p-12 shadow-2xl ring-1 ring-black/5">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="mt-3 text-base text-neutral-600">
          Accede a tu cuenta para continuar.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block text-base font-medium text-neutral-800">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none"
            placeholder="Email"
          />

          <label className="block text-base font-medium text-neutral-800">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none"
            placeholder="Contraseña"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-base font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        {showSignupLink && (
          <div className="mt-6 flex items-center justify-center">
            <span className="text-base text-neutral-600">¿No tienes cuenta?</span>
            <Link
              href={`/${locale}/registro${
                jobIdEffective ? `?job_id=${encodeURIComponent(jobIdEffective)}` : ""
              }`}
              className="ml-2 text-base font-semibold text-neutral-900 hover:underline"
            >
              Crear cuenta →
            </Link>
          </div>
        )}

        {err && (
          <div className="mt-6 rounded-xl bg-rose-500/10 p-4 text-base text-rose-700">
            {err}
          </div>
        )}
      </div>
    </Wrapper>
  );
}