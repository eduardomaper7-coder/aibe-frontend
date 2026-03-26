"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
};

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    monthlyPrice: 9,
    credit: 9,
    reviews: 45,
    recommended: true,
  },
  {
    key: "growth",
    name: "Growth",
    monthlyPrice: 29,
    credit: 29,
    reviews: 145,
    recommended: false,
  },
  {
    key: "pro",
    name: "Pro",
    monthlyPrice: 79,
    credit: 79,
    reviews: 395,
    recommended: false,
  },
];

const FEATURES = [
  "Acceso completo al análisis de reseñas",
  "Respuestas a reseñas con IA (opcional)",
  "WhatsApp personalizado de la clínica",
  "Servicio de atención al cliente",
];

export default function PlansModal({ open, onClose, jobId }: Props) {
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
                Activa tu plan hoy. Empiezas con 25 reseñas gratis incluidas.
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
                El plan se cobra hoy. Seguirás disfrutando primero de tus 25
                reseñas gratis y, al agotarlas, se activará automáticamente el
                saldo del plan sin volver a cobrarte.
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
          <div className="grid gap-6 md:grid-cols-3">
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
                {p.recommended && (
                  <div className="absolute -top-3 left-5">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Más popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Ideal para aumentar tus reseñas
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium uppercase tracking-wide text-emerald-600">
                      Hoy: {p.monthlyPrice.toFixed(2)}€
                    </div>
                    <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                      {p.monthlyPrice}€
                    </div>
                    <div className="text-sm text-slate-500">/ mes</div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Empiezas con</span>
                    <span className="font-semibold text-slate-900">
                      25 reseñas gratis
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Saldo inicial</span>
                    <span className="font-semibold text-slate-900">5.00€</span>
                  </div>

                  <div className="mt-2 border-t border-slate-200 pt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Plan ya pagado</span>
                    <span className="font-semibold text-slate-900">
                      {p.monthlyPrice.toFixed(2)}€
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">Incluye</span>
                    <span className="font-semibold text-slate-900">
                      {p.reviews} reseñas
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex-1">
                  <ul className="space-y-3 text-sm text-slate-600">
                    {FEATURES.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-0.5 text-slate-900">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
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
                    Contratar {p.name}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="font-medium text-slate-900">
              Pago seguro con Stripe.
            </span>{" "}
            Hoy se realizará el cobro del plan seleccionado. Seguirás teniendo
            25 reseñas gratis y 5€ de saldo promocional. Cuando agotes esas 25
            reseñas, se activará el saldo del plan sin realizar un segundo
            cobro.
          </div>
        </div>
      </div>
    </div>
  );
}