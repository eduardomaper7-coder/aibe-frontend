import Image from "next/image";

export default function FichaGoogleWeb() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f3f77] via-[#0d335c] to-[#061426] p-8 text-white shadow-xl md:p-12">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="relative grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
          <Image
            src="/imagenes/web-clinica-optimizada.png"
            alt="Página web optimizada para una clínica"
            width={1200}
            height={750}
            className="h-auto w-full rounded-2xl object-contain"
          />
        </div>

        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
            Página web optimizada
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Optimizamos tu página web para convertir visitas en{" "}
            <span className="text-yellow-400">citas</span>
          </h2>

          <p className="mt-5 text-lg text-white/75">
            Revisamos la estructura, textos, llamadas a la acción y experiencia
            de usuario para que tu web no solo informe, sino que ayude a captar
            pacientes.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-white/80">
            <li className="rounded-2xl bg-white/10 px-4 py-3">✔ Mensajes claros para pacientes</li>
            <li className="rounded-2xl bg-white/10 px-4 py-3">✔ Botones visibles para llamar o reservar</li>
            <li className="rounded-2xl bg-white/10 px-4 py-3">✔ Mejor conexión entre Google y tu web</li>
          </ul>
        </div>
      </div>
    </section>
  );
}