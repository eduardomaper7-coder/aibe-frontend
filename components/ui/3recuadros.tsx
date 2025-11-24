import ShapeFusion from "@/components/ui/ShapeFusion";

export default function DosRecuadros() {
  return (
    <section
      id="dos-recuadros"
      className="w-full bg-black px-4 md:px-6 py-8 md:py-12"
      aria-label="Sección con 2 recuadros grandes en degradado"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[105vh]">
        {/* RECUADRO 1: Análisis inteligente */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0A1224] min-h-[460px] md:min-h-0 flex items-center justify-center">
          {/* Animación */}
          <div className="w-full h-full p-4 -translate-y-12 md:-translate-y-14 transition-transform">
            <ShapeFusion bgColor="#0A1224" />
          </div>

          {/* Degradado inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-44 bg-gradient-to-t from-[#0A1224] to-transparent" />

          {/* Texto inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 md:px-8 pb-12 md:pb-14">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Análisis inteligente de todas tus reseñas
            </h3>
            <p className="mt-1 md:mt-2 text-zinc-300/90 text-sm md:text-base leading-snug max-w-[40ch]">
              Detecta patrones, genera gráficos y descubre qué opinan realmente tus clientes.
            </p>
          </div>
        </div>

        {/* RECUADRO 2: Potencia tu reputación */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0A1224] min-h-[460px] md:min-h-0">
          <video
            src="/videos/videoreseñas.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            Tu navegador no soporta el elemento <code>video</code>.
          </video>

          {/* Degradado inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-44 bg-gradient-to-t from-[#0A1224] to-transparent" />

          {/* Texto inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 md:px-8 pb-12 md:pb-14">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              Potencia tu reputación online
            </h3>
            <p className="mt-1 md:mt-2 text-zinc-300/90 text-sm md:text-base leading-snug max-w-[40ch]">
              Responde rápido, con empatía y profesionalismo: tus clientes se sentirán escuchados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
