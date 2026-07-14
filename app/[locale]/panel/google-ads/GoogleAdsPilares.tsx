export default function GoogleAdsPilares() {
  const pilares = [
    {
      title: "Estrategia clínica local",
      desc: "Definimos campañas enfocadas en pacientes de Madrid según especialidad y zona.",
    },
    {
      title: "Optimización constante",
      desc: "Mejoramos campañas cada semana para aumentar citas y reducir costes.",
    },
    {
      title: "Escalado inteligente",
      desc: "Invertimos más solo en lo que realmente genera pacientes.",
    },
    {
      title: "Resultados medibles",
      desc: "Llamadas, formularios y citas: todo queda registrado y optimizado.",
    },
    {
      title: "Transparencia total",
      desc: "Sabes en todo momento qué funciona y dónde va tu inversión.",
    },
  ];

  return (
    <section className="space-y-12">
      {/* TITULO */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Los pilares de Google Ads para clínicas en Madrid
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Una estructura pensada para atraer pacientes reales, no solo clics.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative">
        {/* línea horizontal */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 hidden md:block" />

        <div className="grid gap-8 md:grid-cols-5">
          {pilares.map((pilar, i) => (
            <div key={i} className="text-center relative">
              {/* punto */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold shadow-md">
                {i + 1}
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                {pilar.title}
              </h3>

              <p className="text-xs text-slate-600 max-w-[160px] mx-auto">
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}