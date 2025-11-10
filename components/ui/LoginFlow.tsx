"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // 👈 usa SIEMPRE el cliente único

export default function LoginFlow() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si ya hay sesión, manda al panel
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.replace("/panel");
    })();
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace("/panel"); // ✅ al panel
    } catch (err: any) {
      setError(err?.message ?? "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
        },
      });
      if (error) throw error;
      // Al volver a /auth/callback, redirige a /panel si hay sesión
    } catch (err: any) {
      setError(err?.message ?? "No se pudo iniciar con Google.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full grid place-items-center bg-neutral-50 text-neutral-900">
      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
          <h1 className="text-2xl font-semibold tracking-tight">Inicia sesión</h1>
          <p className="mt-2 text-sm text-neutral-600">Accede para entrar al panel.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
            />

            <label htmlFor="password" className="block text-sm font-medium text-neutral-800">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Iniciar sesión"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs text-neutral-500">o</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-60"
          >
            Iniciar sesión con Google
          </button>

          {error && (
            <div className="mt-4 rounded-lg bg-rose-500/10 p-3 text-sm text-rose-700 ring-1 ring-rose-500/30">
              {error}
            </div>
          )}
          <p className="mt-6 text-center text-sm text-neutral-600">
            ¿No tienes cuenta? <a href="/registro" className="font-medium hover:underline">Regístrate →</a>
          </p>
        </div>
      </div>
    </div>
  );
}

