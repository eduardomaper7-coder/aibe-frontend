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
  "Whatsapp personalizado de la clínica",
  "Servicio de atención al cliente",
];

export default function PlansModal({ open, onClose, jobId }: Props) {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Elige un plan</h3>
            <p className="mt-1 text-slate-600">1 reseña ganada = 0,20€</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.key} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-slate-900">
                  {p.name} {p.recommended ? <span className="text-sm">⭐ recomendado</span> : null}
                </div>
                <div className="text-slate-900 font-semibold">{p.price} / mes</div>
              </div>

              <div className="mt-3 text-slate-700">
                <div>Crédito incluido: <span className="font-medium">{p.credit.toFixed(2)}€</span></div>
                <div>Reseñas incluidas: <span className="font-medium">{p.reviews} reseñas</span></div>
              </div>

              {p.key !== "free" ? (
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
                  {FEATURES.map((f) => <li key={f}>{f}</li>)}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  Incluye el crédito gratuito inicial para empezar.
                </p>
              )}

              <div className="mt-4">
                {p.key === "free" ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border px-4 py-3 font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Mantener Free
                  </button>
                ) : (
                  <a
  className="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white hover:bg-slate-800"
  href={`/api/stripe/checkout-session?job_id=${encodeURIComponent(String(jobId))}&plan=${encodeURIComponent(p.key)}`}
>
  Elegir {p.name}
</a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Al continuar, serás redirigido a Stripe para completar el pago.
        </p>
      </div>
    </div>
  );
}