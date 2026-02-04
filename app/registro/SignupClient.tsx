"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  variant?: "page" | "modal";
  onSuccess?: () => void;
  showLoginLink?: boolean;
};

// ✅ FUERA del componente para que no se recree en cada render
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
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Introduce un correo y una contraseña.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
        },
      });

      if (error) throw error;

      if (data.session) {
        const userId = data.session.user.id;

        if (!jobId) throw new Error("No hay job_id para enlazar el análisis");

        const { error: updateError } = await supabase
          .from("analyses")
          .update({ user_id: userId, email })
          .eq("id", Number(jobId));

        if (updateError) throw updateError;

        onSuccess?.();
        router.push(`/panel?job_id=${jobId}`);
        return;
      }

      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginErr) throw loginErr;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) throw new Error("No se pudo obtener la sesión del usuario");
      if (!jobId) throw new Error("No hay job_id para enlazar el análisis");

      const { error: updateError } = await supabase
        .from("analyses")
        .update({ user_id: session.user.id, email })
        .eq("id", Number(jobId));

      if (updateError) throw updateError;

      onSuccess?.();
      router.push(`/panel?job_id=${jobId}`);
    } catch (err: any) {
      setError(err?.message ?? "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper variant={variant}>
      <div className="rounded-3xl bg-white p-10 md:p-12 shadow-2xl ring-1 ring-black/5">
        <div className="mb-4 text-right">
          <span className="text-sm text-neutral-500">ES • España</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Mira y Guarda tu análisis Gratis</h1>
        <p className="mt-3 text-base text-neutral-600">
          Crea tu cuenta para guardar este análisis y volver a él cuando quieras, con actualizaciones cada 24 horas
        </p>

        <form onSubmit={handleEmail} className="mt-8 space-y-5">
          <label htmlFor="email" className="block text-base font-medium text-neutral-800">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
          />

          <label htmlFor="password" className="block text-base font-medium text-neutral-800">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
          >
            {loading ? "Creando cuenta…" : "Registrarse"}
          </button>
        </form>

        {showLoginLink && (
          <div className="mt-6 flex items-center justify-center">
            <span className="text-base text-neutral-600">¿Ya tienes cuenta?</span>
            <Link
              href="/login"
              className="ml-2 text-base font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              Iniciar sesión →
            </Link>
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl bg-emerald-500/10 p-4 text-base text-emerald-700 ring-1 ring-emerald-500/30">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl bg-rose-500/10 p-4 text-base text-rose-700 ring-1 ring-rose-500/30">
            {error}
          </div>
        )}
      </div>

      {variant === "page" && (
        <div className="mt-8 text-center text-sm text-neutral-500">Ayuda · Privacidad · Términos</div>
      )}
    </Wrapper>
  );
}
