"use client";

export default function GoogleAdsIntro() {
  const message = encodeURIComponent(
    "Hola Eduardo, me gustaría comenzar a impulsar mi clínica a través de Google Ads"
  );

  const WHATSAPP_URL = `https://wa.me/34622213834?text=${message}`;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f3f77] via-[#0d335c] to-[#061426] p-8 text-white shadow-xl md:p-12">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
            Google Ads para clínicas en Madrid
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Consigue más citas para tu clínica con campañas que{" "}
            <span className="text-yellow-400">sí convierten</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Atrae pacientes reales desde Google, optimiza tu inversión y mide
            llamadas, formularios y reservas desde un único panel.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold">Comienza hoy</h2>

          <p className="mt-2 text-sm text-white/70">
            Solicita una estrategia para captar más pacientes en Madrid.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block w-full rounded-2xl bg-yellow-400 px-7 py-4 text-center text-sm font-bold text-slate-900 shadow-lg transition hover:bg-yellow-300"
          >
            Quiero más citas →
          </a>

          <p className="mt-4 text-center text-xs text-white/55">
            Respuesta en 24h · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}