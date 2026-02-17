import Link from "next/link";

export default async function PlanPage({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { locale: string };
}) {
  const locale = params.locale ?? "es";
  const jobId = typeof searchParams?.job_id === "string" ? searchParams?.job_id : "";

  const checkoutHref = `/${locale}/checkout${jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""}`;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Plan Reputación Automática
        </h1>
        <p className="mt-2 text-slate-600">
          Automática la captación de reseñas y la gestión de tu reputación en Google.
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">Lo que vas a conseguir:</h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li>⭐ Más reseñas de clientes satisfechos, de forma constante</li>
            <li>📈 Mejorar tu puntuación media en Google</li>
            <li>👥 Generar más confianza antes de que te llamen o visiten</li>
            <li>💬 Responder todas tus reseñas sin esfuerzo</li>
            <li>🚀 Atraer más clientes desde Google Maps</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Qué incluye:</h2>

          <div className="mt-4 space-y-4 text-slate-700">
            <div>
              <p className="font-semibold">📲 WhatsApp profesional con número incluido</p>
              <p className="text-slate-600">
                Invitamos a tus clientes a dejar una reseña con un mensaje personalizado y profesional.
              </p>
            </div>

            <div>
              <p className="font-semibold">📊 Panel de reseñas sencillo</p>
              <p className="text-slate-600">
                Clasifica tus reseñas por temas destacados, sentimientos, observa oportunidades de mejora y mucho más.
              </p>
            </div>

            <div>
              <p className="font-semibold">🤖 Respuestas automáticas en Google</p>
              <p className="text-slate-600">
                Respondemos tus reseñas con inteligencia artificial, manteniendo un tono natural y profesional.
                (Puedes desactivar esta función siempre que quieras).
              </p>
            </div>

            <div>
              <p className="font-semibold">⚙️ Configuración guiada</p>
              <p className="text-slate-600">
                Te ayudamos a dejarlo todo funcionando en pocos minutos.
              </p>
            </div>

            <div>
              <p className="font-semibold">🔒 Servicio oficial y seguro</p>
              <p className="text-slate-600">
                Utilizamos integraciones oficiales de WhatsApp y Google.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">💳 Plan único</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">12€ / mes</p>
          <p className="mt-1 text-slate-600">Sin permanencia. Cancela cuando quieras.</p>

          <p className="mt-3 text-sm text-slate-600">
            No se realizará ningún cargo hasta que el sistema esté activo y listo para enviar mensajes.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            ⏱️ Tiempo estimado de activación: hasta 24 horas.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={checkoutHref}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
            >
              Continuar a pago
            </Link>

            <Link
              href={`/${locale}/panel${jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""}`}
              className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
