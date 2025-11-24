import React from "react";

function SeoRestaurantesSection() {
  return (
    <section className="w-full bg-black text-white m-0 p-0 py-6">
      <div className="w-full flex flex-col items-center text-center space-y-12">

        {/* Título centrado */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight max-w-5xl">
          Aumentamos tus clientes entre un 40% y 120% en 6-12 meses.
        </h1>

        {/* GRID de 3 recuadros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl pt-6">

          {/* RECUADRO 1 */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl group">
            <img 
              src="/imagenes/recuadro1.jpg"
              alt="Recuadro 1"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="relative z-10 p-8 flex flex-col space-y-6 text-left text-white">
              <h3 className="text-2xl font-semibold">Optimizamos tu ficha de Google Business Profile</h3>
              <p className="text-gray-200">Para que tu restaurante aparezca en las primeras posiciones de Google Maps.</p>
              <button className="mt-auto border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all w-fit">
                Saber más
              </button>
            </div>
          </div>

          {/* RECUADRO 2 */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl group">
            <img 
              src="/imagenes/recuadro2.jpg"
              alt="Recuadro 2"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="relative z-10 p-8 flex flex-col space-y-6 text-left text-white">
              <h3 className="text-2xl font-semibold">Mejoramos el SEO de tu web</h3>
              <p className="text-gray-200">Para aumentar tu visibilidad y convertir más visitas en reservas.</p>
              <button className="mt-auto border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all w-fit">
                Saber más
              </button>
            </div>
          </div>

          {/* RECUADRO 3 */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl group">
            <img 
              src="/imagenes/recuadro3.jpg"
              alt="Recuadro 3"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="relative z-10 p-8 flex flex-col space-y-6 text-left text-white">
              <h3 className="text-2xl font-semibold">Potenciamos tu reputación online</h3>
              <p className="text-gray-200">Con reseñas, fotos y presencia en directorios gastronómicos.</p>
              <button className="mt-auto border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all w-fit">
                Saber más
              </button>
            </div>
          </div>

        </div>

        {/* NUEVA SECCIÓN INFERIOR */}
        <div className="w-full bg-[#0F172A] p-12 rounded-3xl shadow-2xl max-w-6xl mt-10 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-light">Nosotros nos encargamos de todo</h3>

          <p className="text-2xl md:text-3xl font-light text-gray-300">
            Gratis hasta que aumentemos tus clientes un <span className="font-bold text-green-400">5%</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-all">
              Empezar gratis
            </button>
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all">
              Solicitar información
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function PreviewPage() {
  return <SeoRestaurantesSection />;
}
