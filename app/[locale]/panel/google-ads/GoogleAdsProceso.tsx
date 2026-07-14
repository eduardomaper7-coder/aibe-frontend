export default function GoogleAdsProceso() {
  const steps = [
    {
      title: "Análisis del mercado sanitario en Madrid",
      desc: "Estudiamos tu especialidad, zona de influencia, competencia local y búsquedas de pacientes para detectar las mejores oportunidades.",
    },
    {
      title: "Estrategia personalizada para tu clínica",
      desc: "Creamos campañas adaptadas a tus servicios médicos, ubicación, horarios y objetivos: más citas, llamadas o solicitudes online.",
    },
    {
      title: "Optimización para captar pacientes",
      desc: "Ajustamos palabras clave, anuncios y presupuestos para atraer pacientes con intención real de reservar una consulta.",
    },
    {
      title: "Reportes claros y orientados a citas",
      desc: "Te mostramos datos fáciles de entender: llamadas, formularios, coste por lead y servicios que mejor están funcionando.",
    },
    {
      title: "Ajustes rápidos según demanda local",
      desc: "Reaccionamos ante cambios de competencia, estacionalidad o demanda en Madrid para mejorar el rendimiento de tus campañas.",
    },
    {
      title: "Crecimiento rentable de tu clínica",
      desc: "Escalamos las campañas que generan pacientes de calidad para ayudarte a aumentar reservas y consolidar tu presencia local.",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl shadow-xl">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/imagenes/google-ads-bg.png')",
        }}
      />

      {/* OVERLAY OSCURO (clave para legibilidad) */}
      <div className="absolute inset-0 bg-[#061426]/80" />

      {/* CONTENIDO */}
      <div className="relative space-y-12 p-8 text-white md:p-12">
        
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            El proceso de{" "}
            <span className="text-yellow-400">
              Google Ads
            </span>{" "}
            que convierte clics en pacientes
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Diseñamos campañas enfocadas en captar pacientes en Madrid y transformar cada clic en una cita real.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:bg-white/10 hover:shadow-xl"
            >
              <div className="mb-4 text-2xl font-bold text-yellow-400">
                {i + 1}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-sm text-white/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}