'use client';

import React from "react";

// DEMO: Análisis de reseñas Google — Sección: Respuestas IA personalizadas
// - Usa TailwindCSS, fondo claro, estilo moderno, sin emojis
// - Métricas de gestión y tiempo: Tiempo de respuesta promedio, % respondidas, Frecuencia de revisión
// - Métricas de calidad: Personalización, Tono y lenguaje, Extensión adecuada, Estructura clara
// - Últimas respuestas automáticas: 3 respuestas en una fila

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
    {children}
  </span>
);

const StatCard = ({ title, value, subtitle, helper }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {helper}
    </div>
  </div>
);

const Progress = ({ value }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
    <div
      className="h-full rounded-full bg-slate-900 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

const QualityRow = ({ label, value, hint }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-700">{label}</span>
      <span className="font-medium text-slate-900">{value}%</span>
    </div>
    <Progress value={value} />
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const AutoReplyCard = ({ title, content, meta }) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    <p className="mt-2 line-clamp-5 text-sm leading-6 text-slate-700">{content}</p>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
      <span>{meta}</span>
      <button className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
        Ver detalle
      </button>
    </div>
  </div>
);

const Trend = ({ label, value }) => (
  <div className="flex items-center gap-2 text-xs">
    <Pill>{label}</Pill>
    <span className="font-medium text-slate-900">{value}</span>
  </div>
);

export default function DemoAnalisisResenasGoogle() {
  // Datos de ejemplo (estáticos)
  const kpis = {
    responseTime: { value: "1 h 48 min", subtitle: "Promedio últimos 30 días" },
    respondedPct: { value: "92%", subtitle: "De 214 reseñas en el período" },
    reviewFrequency: { value: "Cada 6 h", subtitle: "Frecuencia de revisión del equipo" },
  };

  const quality = {
    personalization: 76,
    tone: 88,
    lengthAdequacy: 64,
    clearStructure: 72,
  };

  const lastAutoReplies = [
    {
      title: "Respuesta automática — 30 oct, 12:14",
      content:
        "Hola, Marta. Gracias por compartir tu experiencia en nuestra clínica. Lamentamos la espera que comentas; ya hemos ajustado la agenda para evitarlo. Si te parece, escríbenos a citas@ejemplo.com para reprogramar en el horario que mejor te convenga.",
      meta: "Menciona nombre · 3 líneas · Tono empático",
    },
    {
      title: "Respuesta automática — 28 oct, 09:02",
      content:
        "Gracias por tu reseña, Manuel. Nos alegra que la atención haya sido rápida y clara. Si necesitas cualquier cosa, estamos disponibles por WhatsApp en el 600 000 000 para ayudarte en tu próxima visita.",
      meta: "Menciona nombre · 2 líneas · Cierra con invitación",
    },
    {
      title: "Respuesta automática — 26 oct, 18:47",
      content:
        "Hola, Laura. Agradecemos que valores el trato del equipo. Tomamos nota de tu sugerencia sobre ampliar el horario de sábados. Te contactaremos cuando lo habilitemos.",
      meta: "Personalizada · 3 líneas · Profesional",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        {/* Encabezado */}
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Respuestas IA personalizadas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Pill>Últimos 30 días</Pill>
            <Pill>Fuente: Google Business</Pill>
          </div>
        </header>

        {/* Métricas de gestión y tiempo */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Métricas de gestión y tiempo
            </h2>
            <div className="flex items-center gap-3 text-xs">
              <Trend label="Objetivo de respuesta" value="< 2 h" />
              <Trend label="SLA cumplido" value="94%" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              title="Tiempo de respuesta promedio"
              value={kpis.responseTime.value}
              subtitle={kpis.responseTime.subtitle}
              helper={<Pill>Meta: 2 h</Pill>}
            />
            <StatCard
              title="Porcentaje de reseñas respondidas"
              value={kpis.respondedPct.value}
              subtitle={kpis.respondedPct.subtitle}
              helper={<Pill>Objetivo: 95%</Pill>}
            />
            <StatCard
              title="Frecuencia de revisión"
              value={kpis.reviewFrequency.value}
              subtitle={kpis.reviewFrequency.subtitle}
              helper={<Pill>Horario: 8:00–20:00</Pill>}
            />
          </div>
        </section>

        {/* Métricas de calidad de respuesta */}
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Métricas de calidad de respuesta
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <QualityRow
                label="Personalización"
                value={quality.personalization}
                hint="Porcentaje de respuestas que mencionan el nombre del cliente o detalles específicos de su experiencia."
              />
              <QualityRow
                label="Tono y lenguaje"
                value={quality.tone}
                hint="Respuestas empáticas, profesionales y positivas."
              />
              <QualityRow
                label="Extensión adecuada"
                value={quality.lengthAdequacy}
                hint="Respuestas entre 2–5 líneas."
              />
              <QualityRow
                label="Estructura clara"
                value={quality.clearStructure}
                hint="Agradecimiento + reconocimiento del comentario + invitación/solución."
              />
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Detalle de criterios</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-slate-500">Personalización</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">76%</p>
                    <p className="mt-1 text-xs text-slate-500">Menciona nombre en 61% · Incluye detalle específico en 43%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-slate-500">Extensión</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">64%</p>
                    <p className="mt-1 text-xs text-slate-500">Mediana: 3 líneas · Límite: 5 líneas</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-slate-500">Tono y lenguaje</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">88%</p>
                    <p className="mt-1 text-xs text-slate-500">Empático 90% · Profesional 95% · Positivo 78%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-slate-500">Estructura</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">72%</p>
                    <p className="mt-1 text-xs text-slate-500">Agradece 94% · Reconoce 74% · Cierra 69%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h4 className="text-sm font-semibold text-slate-900">Recomendaciones</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Subir personalización al 85% incluyendo nombre y detalle del caso.</li>
                  <li>Ajustar plantillas para mantener 2–5 líneas por respuesta.</li>
                  <li>Incluir cierre con invitación/solución en el 90% de los casos.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Últimas respuestas automáticas */}
        <section className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Últimas respuestas automáticas
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <Pill>Plantilla: Genérica v2</Pill>
              <Pill>Clasificación: Positivas/Neutras/Negativas</Pill>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {lastAutoReplies.map((r, i) => (
              <AutoReplyCard key={i} title={r.title} content={r.content} meta={r.meta} />
            ))}
          </div>
        </section>

        {/* Pie con notas */}
        <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            Datos de demostración. Los porcentajes se calculan sobre las respuestas generadas por IA en el período seleccionado.
          </p>
          <div className="flex items-center gap-2">
            <Pill>Exportar CSV</Pill>
            <Pill>Ver reglas de calidad</Pill>
          </div>
        </footer>
      </div>
    </div>
  );
}
