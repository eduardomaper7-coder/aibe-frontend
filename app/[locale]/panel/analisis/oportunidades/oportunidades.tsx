"use client";

import React, { useEffect, useState } from "react";

type ReviewSnippet = {
  autor: string;
  texto: string;
};

type CategoriaPlan = {
  categoria: string;
  dato: string;
  oportunidad: string;
  reseñas: ReviewSnippet[];
};

type ActionPlanResponse = {
  categorias: CategoriaPlan[];
};

type PlanDeAccionProps = {
  jobId: string;          // 👈 NUEVO
  fromDate: string | null;
  toDate: string | null;
};


export default function PlanDeAccionSection({
  jobId,
  fromDate,
  toDate,
}: PlanDeAccionProps) {

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [data, setData] = useState<CategoriaPlan[] | null>(null);
  const [loading, setLoading] = useState(false);

  // -------- Fetch backend --------
  useEffect(() => {
  if (!API_BASE || !jobId) return;

  const params = new URLSearchParams();
  params.append("job_id", jobId);

  if (fromDate) params.append("from", fromDate);
  if (toDate) params.append("to", toDate);

  setLoading(true);

  fetch(`${API_BASE}/reviews/action-plan?${params.toString()}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener plan de acción");
      return res.json();
    })
    .then((json: ActionPlanResponse) => {
      setData(json.categorias ?? []);
    })
    .catch((e) => {
      console.error("Error plan de acción", e);
      setData([]);
    })
    .finally(() => setLoading(false));
}, [API_BASE, jobId, fromDate, toDate]);


  const categorias = data ?? [];

  return (
    <div className="min-h-[320px] bg-slate-100 text-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 md:pt-8">
        <header className="mb-6 md:mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Plan de acción
            </h1>
            {loading && (
              <p className="text-xs text-slate-500 mt-1">
                Analizando oportunidades a partir de tus reseñas…
              </p>
            )}
          </div>
          {!loading && categorias.length > 0 && (
            <p className="text-xs text-slate-500">
              Generado con IA a partir del periodo seleccionado
            </p>
          )}
        </header>

        {categorias.length === 0 && !loading ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm text-sm text-slate-600">
            Todavía no hay suficientes reseñas para generar un plan de acción en
            este periodo. Prueba ampliando el rango de fechas.
          </div>
        ) : (
          <div className="space-y-8 md:space-y-10">
            {categorias.map((block, idx) => (
              <Categoria key={idx} {...block} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =======================
   Componentes de UI
   ======================= */

function Categoria({
  categoria,
  dato,
  oportunidad,
  reseñas,
}: CategoriaPlan) {
  return (
    <section className="rounded-2xl bg-white p-5 md:p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 ring-1 ring-sky-200">
          <Dot className="h-2 w-2 fill-current" />
          {categoria}
        </span>
        <span className="text-xs text-slate-500">
          Basado en reseñas del periodo seleccionado
        </span>
      </div>

      {/* Fila principal: Datos -> Flecha/Puente -> Oportunidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {/* Datos */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6 shadow-inner">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Datos</h3>
          <p className="text-slate-900 text-base leading-relaxed">{dato}</p>
        </div>

        {/* Flecha / Puente */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 300 100" className="w-full h-24 md:h-28">
            {/* Línea curva (puente) */}
            <path
              d="M10,80 C100,20 200,20 290,80"
              className="stroke-slate-300"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flecha */}
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0,0 L0,6 L6,3 z"
                  className="fill-slate-400"
                />
              </marker>
            </defs>
            <line
              x1="30"
              y1="80"
              x2="270"
              y2="80"
              strokeWidth="2"
              className="stroke-slate-400"
              markerEnd="url(#arrow)"
            />
            {/* Etiquetas */}
            <text
              x="150"
              y="18"
              textAnchor="middle"
              className="fill-slate-500 text-[12px]"
            >
              De datos a oportunidad
            </text>
          </svg>
        </div>

        {/* Oportunidad */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6 shadow-inner">
          <h3 className="text-sm font-semibold text-emerald-700 mb-2">
            Oportunidad
          </h3>
          <p className="text-slate-900 text-base leading-relaxed">
            {oportunidad}
          </p>
        </div>
      </div>

      {/* Reseñas relacionadas */}
      {reseñas && reseñas.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            Reseñas relacionadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reseñas.map((r, i) => (
              <ReviewCard key={i} autor={r.autor} texto={r.texto} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewCard({ autor, texto }: { autor: string; texto: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar />
          <div>
            <p className="text-sm font-medium text-slate-900">{autor}</p>
            <p className="text-xs text-slate-500">Reseña seleccionada</p>
          </div>
        </div>
        <Stars />
      </div>
      <p className="mt-3 text-sm text-slate-700 leading-relaxed">{texto}</p>
    </article>
  );
}

function Stars() {
  // De momento fijo 2/5 como en tu demo original
  return (
    <div className="flex items-center gap-0.5" aria-label="2 estrellas">
      {[...Array(2)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.954L10 0l2.95 5.956 6.562.954-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
      {[...Array(3)].map((_, i) => (
        <svg
          key={`o${i}`}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-slate-200"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.954L10 0l2.95 5.956 6.562.954-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar() {
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-1 ring-slate-300" />
  );
}

function Dot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
