"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    <p className="mt-2 line-clamp-5 text-sm leading-6 text-slate-700">
      {content}
    </p>
  </div>
);

// Tipo que viene del backend
type ApiReply = {
  review_id: string;
  reply_text: string;
  created_at: string;
  status: string;
};

export default function DemoAnalisisResenasGoogle() {
  // KPIs de momento siguen estáticos
  const kpis = {
    responseTime: { value: "1 h 48 min" },
    respondedPct: { value: "92%" },
    lastReview: { value: "Hace 6 h" },
  };

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [replies, setReplies] = useState<ApiReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Obtener el email real del usuario logueado en Supabase
  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getUser", error);
          return;
        }
        if (!cancelled) {
          const email = data.user?.email ?? null;
          setUserEmail(email);
        }
      } catch (e) {
        console.error("Error cargando usuario", e);
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2️⃣ Llamar al backend /reviews/latest cuando tengamos email
  useEffect(() => {
    if (!userEmail) {
      return;
    }

    let cancelled = false;

    async function fetchReplies() {
      setLoading(true);
      setError(null);

      try {
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ??
          process.env.NEXT_PUBLIC_API_URL ??
          "http://localhost:8000";

        const url = `${base.replace(/\/$/, "")}/reviews/latest?email=${encodeURIComponent(
          userEmail
        )}`;

        console.log("DEBUG latest replies URL", url);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data: ApiReply[] = await res.json();

        if (!cancelled) {
          setReplies(data || []);
        }
      } catch (err: any) {
        console.error("Error cargando últimas respuestas", err);
        if (!cancelled) {
          setError("No se pudieron cargar las últimas respuestas.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReplies();

    return () => {
      cancelled = true;
    };
  }, [userEmail]);

  // 3️⃣ Construir tarjetas a partir de las respuestas
  const lastSentReplies: ReplyCardProps[] = replies.map((r) => ({
    title: `Respuesta — ${new Date(r.created_at).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    content: r.reply_text,
  }));

  return (
    <div className="bg-blue-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Encabezado */}
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Respuestas IA personalizadas
            </h1>
            {userEmail && (
              <p className="mt-1 text-sm text-slate-600">
                Mostrando datos de:{" "}
                <span className="font-medium">{userEmail}</span>
              </p>
            )}
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

          {loading && (
            <p className="text-sm text-slate-600">
              Cargando últimas respuestas…
            </p>
          )}

          {!loading && error && (
            <p className="text-sm text-rose-600">{error}</p>
          )}

          {!loading && !error && lastSentReplies.length === 0 && (
            <p className="text-sm text-slate-600">
              Todavía no hay respuestas generadas.
            </p>
          )}

          {!loading && !error && lastSentReplies.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {lastSentReplies.map((r, i) => (
                <ReplyCard key={i} title={r.title} content={r.content} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

