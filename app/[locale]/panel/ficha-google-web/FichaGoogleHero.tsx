import Image from "next/image";

type Props = {
  onOpenPlans: () => void;
};

export default function FichaGoogleHero({ onOpenPlans }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f3f77] via-[#0d335c] to-[#061426] p-8 text-white shadow-xl md:p-12">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="relative grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
            Ficha de Google para clínicas
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Optimiza la ficha de Google de tu clínica y consigue{" "}
            <span className="text-yellow-400">más pacientes locales</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Mejoramos la presencia de tu clínica en Google Maps y en las
            búsquedas locales para que los pacientes encuentren tu negocio,
            confíen en él y reserven con mayor facilidad.
          </p>

          <button
            type="button"
            onClick={onOpenPlans}
            className="mt-8 rounded-2xl bg-yellow-400 px-7 py-4 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-yellow-300"
          >
            Mejorar mi ficha →
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
          <Image
            src="/imagenes/ficha-google-clinica.png"
            alt="Ficha de Google optimizada para una clínica"
            width={1200}
            height={750}
            className="h-auto w-full rounded-2xl object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}