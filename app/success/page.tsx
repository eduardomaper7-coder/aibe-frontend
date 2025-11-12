"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/10 dark:to-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-black/5 bg-white/90 backdrop-blur shadow-xl p-8 md:p-10 dark:bg-neutral-900/70 dark:border-white/10">
          {/* Icono de éxito */}
          <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mb-6 ring-1 ring-emerald-200/60 dark:ring-emerald-500/30 animate-[scaleIn_.4s_ease-out]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7 fill-none stroke-emerald-600 dark:stroke-emerald-400 stroke-[2.5]"
            >
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Título y descripción */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 text-center">
            Su prueba gratuita ha comenzado
          </h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
            Ya puedes acceder al panel cuando quieras.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-semibold transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Iniciar sesión
            </button>

            <button
              onClick={() => router.push("/")}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-5 py-3 font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
            >
              Volver al inicio
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-500">
            ¿Necesitas ayuda?{" "}
            <a href="/contact" className="underline underline-offset-4">
              Contáctanos
            </a>
            .
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} AIBE — Todos los derechos reservados
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
