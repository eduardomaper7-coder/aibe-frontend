'use client';

import React, { ReactNode } from "react";

// DEMO: Análisis de reseñas Google — Sección: Respuestas IA personalizadas (fondo azul más oscuro y 3 recuadros corregidos)

type PillProps = { children: ReactNode };
const Pill = ({ children }: PillProps) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
    {children}
  </span>
);

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  helper?: ReactNode;
};
const StatCard = ({ title, value, subtitle, helper }: StatCardProps) => (
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

type ReplyCardProps = { title: string; content: string };
const ReplyCard = ({ title, content }: ReplyCardProps) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    <p className="mt-2 line-clamp-5 text-sm leading-6 text-slate-700">{content}</p>
  </div>
);

export default function DemoAnalisisResenasGoogle() {
  // Datos de ejemplo (estáticos)
  const kpis = {
    responseTime: { value: "1 h 48 min" },
    respondedPct: { value: "92%" },
    lastReview: { value: "Hace 6 h" },
  };

  const lastSentReplies: ReplyCardProps[] = [
    {
      title: "Respuesta — 30 oct, 12:14",
      content:
        "¡Qué gusto leer tu comentario! Nos alegra enormemente saber que disfrutaste tanto de nuestros platos como de la atención del equipo. Trabajamos cada día para ofrecer una experiencia agradable y cuidada, por lo que tus palabras son una gran motivación. Gracias por elegirnos y por compartir tu experiencia con otros comensales.",
    },
    {
      title: "Respuesta — 28 oct, 09:02",
      content:
        "Lamentamos sinceramente que tu visita no haya cumplido con tus expectativas. Agradecemos que nos compartas estos detalles, ya que nos permiten identificar aspectos que debemos mejorar para brindar un servicio más ágil y una mejor experiencia culinaria. Valoramos mucho tu tiempo y tu comentario.",
    },
    {
      title: "Respuesta — 26 oct, 18:47",
      content:
        "Muchas gracias por hospedarte con nosotros y por dejar una reseña tan completa. Nos alegra saber que encontraste las instalaciones cómodas y en buenas condiciones. También apreciamos tu observación sobre el desayuno; este tipo de comentarios son muy útiles para seguir mejorando nuestra oferta y atención.",
    },
  ];

  return (
    <div className="bg-blue-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        {/* Encabezado */}
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Respuestas IA personalizadas
            </h1>
          </div>
        </header>

        {/* Métricas de gestión y tiempo */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Métricas de gestión y tiempo
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              title="Tiempo de respuesta promedio"
              value={kpis.responseTime.value}
            />
            <StatCard
              title="Porcentaje de reseñas respondidas"
              value={kpis.respondedPct.value}
            />
            <StatCard
              title="Última revisión"
              value={kpis.lastReview.value}
            />
          </div>
        </section>

        {/* Últimas respuestas enviadas */}
        <section className="mb-0">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Últimas respuestas enviadas
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {lastSentReplies.map((r, i) => (
              <ReplyCard key={i} title={r.title} content={r.content} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
