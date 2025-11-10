"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ExitoClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const sessionId = sp.get("session_id");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Aquí podrías confirmar la sesión con tu backend, si lo necesitas
    setReady(true);
    // Ejemplo: redirigir automáticamente
    // setTimeout(() => router.push("/panel"), 2000);
  }, [sessionId, router]);

  return (
    <main className="max-w-lg mx-auto p-6 space-y-4 text-center">
      <h1 className="text-2xl font-semibold text-white">¡Pago completado!</h1>
      <p className="text-slate-300">
        Gracias por suscribirte. En unos segundos activaremos tu cuenta.
      </p>

      {ready && (
        <button
          onClick={() => router.push("/panel")}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
        >
          Ir al panel
        </button>
      )}

      {sessionId && (
        <p className="mt-2 text-xs text-slate-500">
          ID de sesión: <span className="font-mono">{sessionId}</span>
        </p>
      )}
    </main>
  );
}
