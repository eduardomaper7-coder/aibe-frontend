export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SuscripcionCancelada() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold">Suscripción cancelada con éxito</h1>

      <p className="mt-3 text-gray-700">
        Gracias por confiar en{" "}
        <span className="font-medium">AIBE Technologies</span>.
        Esperamos que vuelva pronto.
      </p>

      <p className="mt-6 italic text-gray-600">
        <span className="not-italic font-medium">
          Convierte cada reseña en una oportunidad de crecimiento.
        </span>
      </p>

      <a
        href="https://aibetech.es"
        target="_self"
        className="mt-8 inline-block rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        Volver al inicio
      </a>
    </div>
  );
}
