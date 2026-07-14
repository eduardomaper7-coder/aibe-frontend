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
  // ⛔️ SI VENIMOS DE UN SCRAPE PÚBLICO, NO INTERFERIR
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("job_id")) return;
  }

  (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("analyses")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      router.replace(`/panel?job_id=${data[0].id}`);
    } else {
      router.replace("/panel?empty=1");
    }
  })();
}, [router]);





  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  const { data } = await supabase
  .from("analyses")
  .select("id")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false })
  .limit(1);

if (data && data.length > 0) {
  router.replace(`/panel?job_id=${data[0].id}`);
  return;
}

router.replace("/panel?empty=1");

}


    } catch (err: any) {
      setError(err?.message ?? "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen w-full grid place-items-center bg-neutral-50 text-neutral-900">
      <div className="w-full max-w-2xl px-6">
        <div className="rounded-3xl bg-white p-10 md:p-12 shadow-2xl ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">Inicia sesión</h1>
          <p className="mt-3 text-base text-neutral-600">
            Accede para entrar al panel.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label
              htmlFor="email"
              className="block text-base font-medium text-neutral-800"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
            />

            <label
              htmlFor="password"
              className="block text-base font-medium text-neutral-800"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Iniciar sesión"}
            </button>
          </form>


          {error && (
            <div className="mt-6 rounded-xl bg-rose-500/10 p-4 text-base text-rose-700 ring-1 ring-rose-500/30">
              {error}
            </div>
          )}

          <p className="mt-8 text-center text-base text-neutral-600">
            ¿No tienes cuenta?{" "}
            <a
              href="/registro"
              className="font-semibold text-neutral-900 hover:underline underline-offset-4"
            >
              Regístrate →
            </a>
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          Ayuda · Privacidad · Términos
        </div>
      </div>
    </div>
  );
}
