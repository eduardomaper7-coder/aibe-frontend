import Image from "next/image";

export default function GoogleAdsResultados() {
  const message = encodeURIComponent(
    "Hola Eduardo, me gustaría comenzar a impulsar mi clínica a través de Google Ads"
  );

  const WHATSAPP_URL = `https://wa.me/34622213834?text=${message}`;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f3f77] via-[#0d335c] to-[#061426] p-8 text-white shadow-xl md:p-12">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="relative grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <div className="mb-4 text-6xl leading-none text-yellow-400">“</div>

          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            De las búsquedas en Google a{" "}
            <span className="text-yellow-400">pacientes reales</span>
          </h2>

          <div className="mt-6 max-w-3xl space-y-4 text-lg text-white/75">
            <p>
              En un mercado sanitario tan competitivo como Madrid, no basta con
              aparecer en Google.
            </p>

            <p>
              Creamos estrategias orientadas a convertir clics en pacientes reales.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-2xl bg-yellow-400 px-7 py-4 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-yellow-300 hover:shadow-xl"
          >
            Captar más pacientes
          </a>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <Image
            src="/imagenes/google-ads-resultados.png"
            alt="Resultados de campañas"
            width={1200}
            height={650}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}