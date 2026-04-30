"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
};

const PLANS = [
  {
    key: "starter",
    name: "Plan Reseñas Google",
    monthlyPrice: 18,
    credit: "Ilimitado",
    reviews: "Reseñas ilimitadas",
    recommended: false,
    description: "Ideal para mejorar la reputación online de tu clínica",
    highlight: "",
    extraFeatures: [] as string[],
  },
  {
    key: "growth",
    name: "Captación Local",
    monthlyPrice: 95,
    credit: "Ilimitado",
    reviews: "Reseñas ilimitadas",
    recommended: true,
    description: "Atrae más pacientes y posiciona tu clínica en Google",
    highlight: "Estrategia completa de visibilidad local",
    extraFeatures: [
      "Todo lo incluido en Plan Reseñas Google",
      "Optimización de la ficha de Google y página web",
      "Publicación de 1 artículo a la semana en tu web con palabras que tus pacientes están buscando en Google",
      "Alta en directorios y plataformas clave del sector",
      "Publicación de artículos sobre la clínica en medios locales, prensa digital y otras webs del sector",
      "Incluye posibilidad de Google Ads, Facebook Ads, Instagram Ads y TikTok Ads",
      "Optimización continua para aparecer en Google Maps",
      "Creación, diseño y mantenimiento de una página web si lo desea",
      "Visitas presenciales cada 2 meses con informes del posicionamiento actual de la clínica",
    ],
  },
];

const FEATURES = [
  "Acceso completo al análisis de reseñas",
  "Respuestas a reseñas con IA (opcional)",
  "Conectado al WhatsApp de la clínica",
  "Servicio de atención al cliente",
  "Mejora su valoración media la mayoría de veces",
];

export default function PlansModal({ open, onClose, jobId }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-[90vw] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 xl:max-w-[1400px]">
        
        {/* HEADER */}
        <div className="border-b border-slate-200 px-6 py-5 md:px-8 lg:px-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Planes para clínicas
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Elige cómo quieres hacer crecer tu clínica
              </h3>

              <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
                Mejora tus reseñas de Google, aumenta tu valoración media y consigue más visibilidad local para atraer nuevos pacientes.{" "}
                <strong>Con garantía de reembolso siempre.</strong>
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

        {/* CONTENT */}
        <div className="px-6 py-6 md:px-10 md:py-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.key}
                className={[
                  "relative flex h-full min-h-[560px] flex-col rounded-2xl border bg-white p-5 transition",
                  p.key === "starter" ? "md:col-span-1" : "md:col-span-2",
                  p.recommended
                    ? "border-slate-900 shadow-lg ring-2 ring-slate-900/10"
                    : "border-slate-200 shadow-sm hover:shadow-md",
                ].join(" ")}
              >
                {/* BADGE */}
                {p.recommended && (
                  <div className="absolute -top-3 left-5">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Más recomendado
                    </span>
                  </div>
                )}

                {/* TITLE */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {p.description}
                    </p>

                    {p.highlight && (
                      <p className="mt-2 text-xs font-medium text-emerald-600">
                        {p.highlight}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold tracking-tight text-slate-900">
                      {p.monthlyPrice}€
                    </div>
                    <div className="text-sm text-slate-500">/ mes</div>
                  </div>
                </div>

                {/* SUMMARY */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Saldo</span>
                    <span className="font-semibold text-slate-900">
                      {p.credit}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Incluye</span>
                    <span className="font-semibold text-slate-900">
                      {p.reviews}
                    </span>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="mt-5 flex-1">
                  {p.key === "growth" ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-slate-900">
                          Base incluida
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-600">
                          {p.extraFeatures.slice(0, 1).map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-0.5 text-slate-900">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-slate-900">
                          Posicionamiento local
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-600">
                          {p.extraFeatures.slice(1, 6).map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-0.5 text-slate-900">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-slate-900">
                          Web y crecimiento
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-600">
                          {p.extraFeatures.slice(6, 8).map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-0.5 text-slate-900">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="mb-3 text-sm font-semibold text-slate-900">
                          Seguimiento
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-600">
                          {p.extraFeatures.slice(8).map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-0.5 text-slate-900">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-3 text-sm text-slate-600">
                      {FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-slate-900">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}

                      {p.extraFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-slate-900">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* CTA */}
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
                    {p.key === "growth"
                      ? "Empezar a captar pacientes"
                      : `Contratar ${p.name}`}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="font-medium text-slate-900">
              Pago seguro con Stripe.
            </span>{" "}
            Hoy se realizará el cobro del plan seleccionado. El saldo mensual se usará para activar las reseñas incluidas en tu plan.
          </div>
        </div>
      </div>
    </div>
  );
}