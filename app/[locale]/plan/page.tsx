// app/[locale]/plan/page.tsx
import Link from "next/link";
import JobIdPersistor from "./JobIdPersistor";

export default async function PlanPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};
  const jobId = typeof sp.job_id === "string" ? sp.job_id : "";

  const registerHref = `/${locale}/registro${
    jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""
  }`;

  const checkoutHref = `/${locale}/checkout${
    jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""
  }`;

  // ✅ mientras NextAuth esté roto (500), mandamos siempre a registro primero
  const primaryHref = registerHref;

  const panelHref = `/${locale}/panel${
    jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""
  }`;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ✅ guarda job_id en localStorage (client) para que /registro lo recupere */}
      <JobIdPersistor jobId={jobId} />

      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src="/videos/videoreseñas.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="fixed inset-0 -z-10 bg-black/50" />

      <div className="relative mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Plan Reputación Automática
          </h1>

          {/* ✅ NUEVO: descripción + beneficios + incluye */}
          <div className="mt-4 space-y-6">
            <p className="text-slate-700">
              Servicio diseñado para captar reseñas de forma constante y gestionar
              tu reputación en Google sin que tengas que dedicarle tiempo.
            </p>

            <section className="rounded-2xl border bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">
                🔎 ¿Qué vas a conseguir?
              </h2>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>⭐ Más reseñas de clientes satisfechos, de forma continua</li>
                <li>📈 Mejorar tu puntuación media en Google</li>
                <li>👥 Generar mayor confianza antes de que te llamen o visiten</li>
                <li>💬 Responder todas tus reseñas sin esfuerzo</li>
                <li>🚀 Atraer más clientes desde Google Maps</li>
              </ul>
            </section>

            <section className="rounded-2xl border bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">
                🛠 ¿Qué incluye el plan?
              </h2>

              <div className="mt-4 space-y-4 text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    📲 WhatsApp profesional con número incluido
                  </p>
                  <p className="mt-1">
                    Invitamos automáticamente a tus clientes a dejar una reseña
                    mediante un mensaje personalizado, profesional y adaptado a tu
                    negocio.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    📊 Panel de reseñas sencillo e intuitivo
                  </p>
                  <p className="mt-1">
                    Podrás clasificar reseñas por temas destacados, analizar
                    sentimientos, detectar oportunidades de mejora y tener una
                    visión clara de tu reputación.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    🤖 Respuestas automáticas en Google
                  </p>
                  <p className="mt-1">
                    Respondemos tus reseñas con inteligencia artificial,
                    manteniendo un tono natural y profesional.{" "}
                    <span className="text-slate-600">
                      (Esta función es opcional y puedes desactivarla cuando
                      quieras).
                    </span>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">⚙️ Configuración guiada</p>
                  <p className="mt-1">
                    Te ayudamos a dejar todo funcionando en pocos minutos.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">🔒 Servicio oficial y seguro</p>
                  <p className="mt-1">
                    Trabajamos con integraciones oficiales de WhatsApp y Google,
                    garantizando seguridad y cumplimiento de políticas.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ✅ bloque de compra */}
          <div className="mt-8 rounded-2xl border bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">💳 Precio del plan</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">12€ / mes</p>

            <p className="mt-2 text-sm text-slate-700">
              Sin permanencia. Puedes cancelar cuando quieras.
              <br />
              <span className="font-semibold text-slate-900"></span>{" "}
              
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
              >
                Continuar
              </Link>

              <Link
                href={panelHref}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50"
              >
                Volver
              </Link>
            </div>

            {/* opcional: botón directo a checkout (si ya está logueado) */}
            <div className="mt-3 text-xs text-slate-600">
              (Checkout:{" "}
              <Link className="underline" href={checkoutHref}>
                abrir
              </Link>
              )
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}