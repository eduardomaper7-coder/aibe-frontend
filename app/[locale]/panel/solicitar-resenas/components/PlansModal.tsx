"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
};

// PRECIOS
const STARTER_PRICE = 39;
const GROWTH_PRICE = 49;
const SOCIAL_PRICE = 95;

// STRIPE IDS
const STARTER_PRODUCT_ID = "prod_starter";
const STARTER_PRICE_ID = "price_starter";

const GROWTH_PRODUCT_ID = "prod_growth";
const GROWTH_PRICE_ID = "price_growth";

const SOCIAL_PRODUCT_ID = "prod_social";
const SOCIAL_PRICE_ID = "price_social";

const PLANS = [
  {
    key: "starter",
    name: "Plan Reseñas Google",
    monthlyPrice: STARTER_PRICE,
    productId: STARTER_PRODUCT_ID,
    priceId: STARTER_PRICE_ID,
    recommended: false,
    description: "Ideal para mejorar la reputación online de tu clínica",
    highlight: "",
    extraFeatures: [
      "Acceso completo al análisis de reseñas",
      "Respuestas a reseñas con IA (opcional)",
      "Conectado al WhatsApp de la clínica",
      "Servicio de atención al cliente",
      "Mejora su valoración media",
    ],
  },

  {
    key: "growth",
    name: "Captación Local",
    monthlyPrice: GROWTH_PRICE,
    productId: GROWTH_PRODUCT_ID,
    priceId: GROWTH_PRICE_ID,
    recommended: false,
    description: "Atrae más pacientes y posiciona tu clínica en Google",
    highlight: "Ideal para clínicas que quieren crecer",
    extraFeatures: [
      "Todo lo incluido en Plan Reseñas Google",
      "Optimización de Google Business",
      "Publicación semanal de artículos SEO",
      "Alta en directorios del sector",
      "Publicaciones en medios locales",
      "Fotos y vídeos profesionales",
      "Optimización para Google Maps",
      "Creación y mantenimiento web",
      "Visitas presenciales bimensuales",
    ],
  },

  {
    key: "social",
    name: "Captación 360",
    monthlyPrice: SOCIAL_PRICE,
    productId: SOCIAL_PRODUCT_ID,
    priceId: SOCIAL_PRICE_ID,
    recommended: true,
    description:
      "La solución más completa para captar pacientes y potenciar la imagen de tu clínica",
    highlight: "Captación local + redes sociales + branding",
    extraFeatures: [
      "Todo lo incluido en Captación Local",
      "Gestión completa de redes sociales",
      "Creación y planificación estratégica",
      "Publicación semanal de reels y posts",
      "Contenido creativo y original",
      "Optimización para aumentar interacción",
      "Refuerzo de marca y autoridad local",
    ],
  },
];

export default function PlansModal({ open, onClose, jobId }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-[1600px] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">

        {/* HEADER */}
        <div className="border-b border-slate-200 px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Planes para clínicas
              </p>

              <h3 className="mt-1 text-3xl font-bold text-slate-900">
                Elige cómo quieres hacer crecer tu clínica
              </h3>

              <p className="mt-2 text-slate-600">
                Mejora tu reputación, aumenta visibilidad y consigue más pacientes.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 p-3"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PLANES */}
        <div className="grid gap-6 p-10 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.key}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                p.recommended
                  ? "border-slate-900 shadow-xl ring-2 ring-slate-900/10 scale-105"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {p.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold text-white">
                    MÁS RECOMENDADO
                  </span>
                </div>
              )}

              <h4 className="text-xl font-semibold">{p.name}</h4>
              <p className="mt-2 text-sm text-slate-500">{p.description}</p>

              <div className="mt-5">
                <span className="text-4xl font-bold">{p.monthlyPrice}€</span>
                <span className="text-slate-500">/mes</span>
              </div>

              <p className="mt-2 text-sm font-medium text-emerald-600">
                {p.highlight}
              </p>

              <ul className="mt-6 space-y-3 flex-1 text-sm text-slate-600">
                {p.extraFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                className={`mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-white ${
                  p.recommended
                    ? "bg-slate-900 hover:bg-slate-800"
                    : "bg-slate-700 hover:bg-slate-800"
                }`}
                href={`/api/stripe/checkout-session?job_id=${jobId}&plan=${p.key}&price_id=${p.priceId}&product_id=${p.productId}`}
              >
                Contratar {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}