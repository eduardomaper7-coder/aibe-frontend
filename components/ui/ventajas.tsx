export default function BeneficiosIASection() {
  const items = [
    {
      title: `Respuestas automáticas con tono 100% humano`,
      description: `Tu IA responde cada reseña de Google de forma natural, empática y profesional. Ahorra horas de trabajo y mejora la reputación online sin perder autenticidad.`,
      image: "/imagenes/pexels-fauxels-3183153.jpg",
    },
    {
      title: `Análisis inteligente de todas tus reseñas`,
      description: `Obtén un informe completo con estadísticas, gráficos y tendencias clave. Descubre qué opinan realmente tus clientes desde la primera reseña hasta hoy.`,
      image: "/imagenes/pexels-cottonbro-6153354.jpg",
    },
    {
      title: `Sugerencias y mejoras basadas en IA`,
      description: `La IA detecta patrones, puntos débiles y oportunidades de mejora. Recibe recomendaciones prácticas para optimizar la atención al cliente y hacer crecer tu negocio.`,
      image: "/imagenes/pexels-serpstat-177219-572056.jpg",
    },
  ];

  return (
    <section
      className="bg-black text-white font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Encabezado tipo hero */}
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="mt-0 text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-gray-300">
              {`Para todos: desde pequeños negocios hasta grandes marcas, sin importar el sector.`}
            </h2>
          </div>

          <div className="md:col-span-5">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed">
              {`+1000 respuestas enviadas.`} <br />
              {`+250 negocios en España suscritos.`} <br />
              {`+125.000 reseñas analizadas.`} <br />
              <span className="block mt-4 text-gray-300">
                {`Liderando la gestión inteligente de reseñas en España.`}
              </span>
            </p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="group"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {/* Imagen */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[16/9] w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Texto */}
              <div className="mt-6">
                <p className="text-lg font-normal leading-snug text-white/90">
                  {item.title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
