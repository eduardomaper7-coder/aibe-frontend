// app/pago/page.tsx (client)
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PagoPage() {
  const [loading, setLoading] = useState(false);
  const msg = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("msg") : null;

  async function startTrial() {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;
      const origin = window.location.origin;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, origin }),
      });
      const json = await res.json();
      if (json?.url) window.location.assign(json.url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md rounded-2xl border p-6 shadow">
        <h1 className="text-xl font-semibold">Acceso a AIBE</h1>
        <p className="mt-2 text-sm text-slate-600">
          {msg === "trial"
            ? "Comienza tu periodo de prueba o compra una suscripción para acceder."
            : "Empieza tu prueba de 3 días y luego 1 €/mes."}
        </p>
        <button
          onClick={startTrial}
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-white disabled:opacity-60"
        >
          {loading ? "Abriendo pasarela…" : "Iniciar prueba por 1 €/mes"}
        </button>
      </div>
    </div>
  );
}

