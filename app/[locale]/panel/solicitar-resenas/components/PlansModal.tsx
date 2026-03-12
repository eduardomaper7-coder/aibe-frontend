"use client";

import { useParams } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
};

const PLANS = [
  { key: "free", name: "Free", price: "0€", credit: 5, reviews: 25, recommended: false },
  { key: "starter", name: "Starter", price: "9€", credit: 9, reviews: 45, recommended: true },
  { key: "growth", name: "Growth", price: "29€", credit: 29, reviews: 145, recommended: false },
  { key: "pro", name: "Pro", price: "79€", credit: 79, reviews: 395, recommended: false },
];

const FEATURES = [
  "Acceso completo al análisis de reseñas",
  "Respuestas a reseñas con IA (opcional)",
  "WhatsApp personalizado de la clínica",
  "Servicio de atención al cliente",
];

export default function PlansModal({ open, onClose, jobId }: Props) {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-[90vw] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 xl:max-w-[1400px]">
        <div className="border-b border-slate-200 px-6 py-5 md:px-8 lg:px-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Planes y precios
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Elige el plan que mejor se adapta a tu clínica
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
                Activa tu plan en menos de un minuto y empieza a convertir pacientes
                satisfechos en nuevas reseñas.{" "}
                <span className="font-medium text-slate-800">
                  1 reseña ganada = 0,20€
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-6 md:px-10 md:py-8 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.key}
                className={[
                  "relative flex h-full min-h-[560px] flex-col rounded-2xl border bg-white p-5 transition",
                  p.recommended
                    ? "border-slate-900 shadow-lg ring-2 ring-slate-900/10"
                    : "border-slate-200 shadow-sm hover:shadow-md",
                ].join(" ")}
              >
                {p.recommended ? (
                  <div className="absolute -top-3 left-5">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Más popular
                    </span>
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{p.name}</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {p.key === "free"
                        ? "Empieza sin compromiso"
                        : "Ideal para aumentar tus reseñas"}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold tracking-tight text-slate-900">
                      {p.price}
                    </div>
                    <div className="text-sm text-slate-500">/ mes</div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Crédito incluido</span>
                    <span className="whitespace-nowrap font-semibold text-slate-900">
                      {p.credit.toFixed(2)}€
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Reseñas incluidas</span>
                    <span className="whitespace-nowrap font-semibold text-slate-900">
                      {p.reviews} reseñas
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex-1">
                  {p.key !== "free" ? (
                    <ul className="space-y-3 text-sm text-slate-600">
                      {FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-slate-900">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6 text-slate-600">
                      Incluye el crédito gratuito inicial para empezar a probar la
                      plataforma y validar resultados desde el primer día.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  {p.key === "free" ? (
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      Mantener plan Free
                    </button>
                  ) : (
                    <a
                      className={[
                        "block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-white transition",
                        p.recommended
                          ? "bg-slate-900 hover:bg-slate-800"
                          : "bg-slate-800 hover:bg-slate-700",
                      ].join(" ")}
                      href={`/api/stripe/checkout-session?job_id=${encodeURIComponent(
                        String(jobId)
                      )}&plan=${encodeURIComponent(p.key)}`}
                    >
                      Elegir {p.name}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="font-medium text-slate-900">Pago seguro con Stripe.</span>{" "}
            Al continuar, serás redirigido a Stripe para completar el pago.
          </div>
        </div>
      </div>
    </div>
  );
}