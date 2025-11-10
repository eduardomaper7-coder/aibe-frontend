"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🚀 Crea la sesión de Stripe Checkout y redirige
  async function goToCheckout(userEmail: string) {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, origin }),
    });

    const data = await res.json();
    if (!res.ok || !data?.url) {
      throw new Error(data?.error ?? "No se pudo iniciar el pago");
    }
    window.location.assign(data.url);
  }

  // ✉️ Registro + acceso + redirección a Stripe
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
        await goToCheckout(email);
        return;
      }
      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginErr) throw loginErr;

      await goToCheckout(email);
    } catch (err: any) {
      setError(err?.message ?? "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  // 🔵 Google OAuth
  async function handleGoogle() {
    setError(null);
    setMessage(null);
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
    } catch (err: any) {
      setError(err?.message ?? "No se pudo iniciar con Google.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full grid place-items-center bg-neutral-50 text-neutral-900">
      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
          <div className="mb-2 text-right">
            <span className="text-xs text-neutral-500">ES • España</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Comienza tu prueba gratis
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Disfruta de 3 días gratis y, después, 1€/mes.
          </p>

          <form onSubmit={handleEmail} className="mt-6 space-y-3">
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
              {loading ? "Creando cuenta…" : "Registrarse"}
            </button>
          </form>

          {/* Separador */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs text-neutral-500">o</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Google (SVG correcto, sin '...') */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M24 12.273c0-.818-.073-1.64-.227-2.436H12v4.613h6.748a5.77 5.77 0 0 1-2.5 3.786v3.14h4.04C22.8 19.42 24 16.127 24 12.273z" fill="#4285F4" />
              <path d="M12 24c3.24 0 5.96-1.067 7.946-2.913l-4.04-3.14c-1.12.752-2.56 1.197-3.906 1.197-2.997 0-5.54-2.02-6.45-4.737H1.39v2.973A12 12 0 0 0 12 24z" fill="#34A853" />
              <path d="M5.55 14.407a7.2 7.2 0 0 1 0-4.814V6.62H1.39a12 12 0 0 0 0 10.76l4.16-2.973z" fill="#FBBC05" />
              <path d="M12 4.74c1.76 0 3.34.6 4.58 1.78l3.42-3.42C17.96 1.09 15.24 0 12 0 7.39 0 3.39 2.66 1.39 6.62l4.16 2.973C6.46 6.76 9.003 4.74 12 4.74z" fill="#EA4335" />
            </svg>
            Registrarse con Google
          </button>

          {/* Enlace a iniciar sesión */}
          <div className="mt-4 flex items-center justify-center">
            <span className="text-sm text-neutral-600">¿Ya tienes cuenta?</span>
            <Link
              href="/login"
              className="ml-1 text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              Iniciar sesión →
            </Link>
          </div>

          {message && (
            <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-700 ring-1 ring-emerald-500/30">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg bg-rose-500/10 p-3 text-sm text-rose-700 ring-1 ring-rose-500/30">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-neutral-500">
          Ayuda · Privacidad · Términos
        </div>
      </div>
    </div>
  );
}
