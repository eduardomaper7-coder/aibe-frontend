import Image from "next/image";

export default function FichaGoogleTrafico() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm md:p-12">
      <div className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
            Más visibilidad local
          </span>

          <h2 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Aumentamos el tráfico hacia tu web desde Google
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Trabajamos tu presencia local para que más personas descubran tu
            clínica, visiten tu página web y encuentren rápidamente cómo pedir
            cita, llamar o llegar hasta tus instalaciones.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Más visitas", "Más llamadas", "Más reservas"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <div className="text-2xl font-bold text-yellow-500">+</div>
                <p className="mt-1 text-sm font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
          <Image
            src="/imagenes/trafico-web-clinica.png"
            alt="Aumento de tráfico web para clínicas"
            width={1200}
            height={750}
            className="h-auto w-full rounded-2xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}