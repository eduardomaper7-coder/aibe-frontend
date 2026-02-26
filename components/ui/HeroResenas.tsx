import Image from "next/image";

export default function HeroResenas() {
  return (
    <section className="bg-black text-white w-full py-24">
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-16">
          {/* Imagen */}
          <div className="w-full">
            <div className="border-2 border-blue-600 rounded-2xl p-4 bg-white/5 shadow-2xl">
              <Image
                src="/imagenes/hero-resenas.png"
                alt="Panel de reseñas AIBE"
                width={1728}
                height={1080}
                priority
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="text-center lg:text-left">
            <p className="text-2xl md:text-3xl font-semibold">
              Prueba nuestro panel de solicitar reseñas hoy
            </p>

            <div className="mt-10 space-y-6">
              <div className="text-6xl md:text-7xl font-extrabold leading-none">
                +10.000
              </div>

              <div className="text-3xl md:text-4xl font-bold leading-tight">
                reseñas conseguidas
              </div>

              <div className="pt-2 text-6xl md:text-7xl font-extrabold leading-none">
                +120
              </div>

              <div className="text-3xl md:text-4xl font-bold leading-tight">
                clínicas en toda España
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}