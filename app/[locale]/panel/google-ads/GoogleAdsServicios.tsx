export default function GoogleAdsServicios() {
  const servicios = [
    "Campañas para captar primeras visitas",
    "Anuncios por especialidad médica",
    "Campañas locales por barrios o zonas de Madrid",
    "Extensiones de llamada y ubicación",
    "Landing pages orientadas a reserva de cita",
    "Seguimiento de formularios, llamadas y WhatsApp",
  ];

  return (
    <section className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-orange-400">
            Google Ads para clínicas
          </span>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Campañas pensadas para llenar tu agenda de pacientes
          </h2>

          <p className="mt-5 text-slate-300">
            No gestionamos campañas genéricas. Creamos una estructura publicitaria
            enfocada en servicios médicos concretos, zonas de Madrid y pacientes
            con intención real de pedir cita.
          </p>

          <button className="mt-8 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-orange-600">
            Solicitar estrategia
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {servicios.map((servicio, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-400">
                {i + 1}
              </div>

              <p className="text-sm font-medium text-white">{servicio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}