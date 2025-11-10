// app/pago/exito/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Exito() {
  const sp = useSearchParams();
  const router = useRouter();
  const sessionId = sp.get("session_id");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Aquí podrías llamar a tu backend para confirmar/leer la sesión si quieres.
    setReady(true);
    // Opcional: redirigir al dashboard tras unos segundos
    // setTimeout(() => router.push("/panel"), 2000);
  }, [sessionId, router]);

  return (
    <main className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">¡Pago completado!</h1>
      <p className="text-gray-700">
        Gracias por suscribirte. En unos segundos activaremos tu cuenta.
      </p>
      {ready && (
        <button
          onClick={() => router.push("/panel")}
          className="rounded-xl border px-4 py-2 hover:bg-gray-50"
        >
          Ir al panel
        </button>
      )}
    </main>
  );
}
