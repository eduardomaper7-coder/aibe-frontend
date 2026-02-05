"use client";

import React, { ReactNode, useEffect, useState } from "react";

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
};
const StatCard = ({ title, value, subtitle }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
  </div>
);

// 👇 lo que esperamos del backend
type ApiAIReply = {
  review_id: number;
  review_text: string;
  reply_text: string;
  rating: number;
  created_at: string;
};

type Props = {
  jobId: number;
};

export default function RespuestasIASection({ jobId }: Props) {
  const API_BASE =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(
      /\/+$/,
      ""
    );

  const [items, setItems] = useState<ApiAIReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("DEBUG RespuestasIASection jobId:", jobId);

  useEffect(() => {
    if (!jobId) {
    setLoading(false); // 👈 CLAVE
    return;
  }
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_BASE}/reviews/ai-replies?job_id=${jobId}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: ApiAIReply[] = await res.json();

        if (!cancelled) {
          setItems(json ?? []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("No se pudieron cargar las respuestas IA.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE, jobId]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-slate-100 text-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Respuestas IA personalizadas
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Reseñas del último mes con respuesta sugerida por IA
          </p>
        </header>

        {/* Métricas simples */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Reseñas con respuesta IA"
            value={items.length.toString()}
            subtitle="Últimos 30 días"
          />
        </section>

        {/* Contenido */}
        {loading && (
          <p className="text-sm text-slate-600">Cargando respuestas IA…</p>
        )}

        {!loading && error && (
          <p className="text-sm text-rose-600">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-slate-600">
            No hay reseñas recientes con respuestas IA.
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="space-y-6">
            {items.map((r) => (
              <article
                key={r.review_id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <Pill>{r.rating} ★</Pill>
                  <span className="text-xs text-slate-500">
                    {new Date(r.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Reseña */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Reseña del cliente
                  </p>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {r.review_text}
                  </p>
                </div>

                {/* Respuesta IA */}
                <div className="relative rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-700 mb-1">
                    Respuesta sugerida por IA
                  </p>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {r.reply_text}
                  </p>

                  <button
                    onClick={() => copyToClipboard(r.reply_text)}
                    className="absolute top-3 right-3 text-xs rounded-md border border-emerald-300 bg-white px-2 py-1 text-emerald-700 hover:bg-emerald-100"
                  >
                    Copiar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
