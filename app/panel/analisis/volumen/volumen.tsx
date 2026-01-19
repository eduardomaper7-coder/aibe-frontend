"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";

type BucketType = "day" | "week" | "month";

type TrendPoint = {
  bucket: string;
  avg_rating: number;
  count: number;
};

type SentimentSummaryResponse = {
  trend: TrendPoint[];
  bucket_type?: BucketType;
};

type VolumenProps = {
  jobId: string;
  fromDate: string | null;
  toDate: string | null;
  bucket: BucketType;
};

/* =========================
   CONFIGURACIÓN SOLO MÓVIL
========================= */
const MAX_POINTS_MOBILE = 12;

/* =========================
   COMPONENTE
========================= */
export default function GraficoPuntuacionVsVolumen({
  jobId,
  fromDate,
  toDate,
  bucket,
}: VolumenProps) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [apiData, setApiData] =
    useState<SentimentSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     DETECCIÓN REAL DE MÓVIL
  ========================= */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* =========================
     FETCH DATOS
  ========================= */
  useEffect(() => {
    if (!API_BASE || !jobId) return;

    const params = new URLSearchParams();
    params.append("job_id", jobId);

    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);
    params.append("bucket", bucket);

    setLoading(true);

    fetch(`${API_BASE}/reviews/sentiment-summary?${params.toString()}`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener datos de volumen");
        return res.json();
      })
      .then((json: SentimentSummaryResponse) => {
        setApiData(json);
      })
      .catch((err) => {
        console.error(err);
        setApiData(null);
      })
      .finally(() => setLoading(false));
  }, [API_BASE, jobId, fromDate, toDate, bucket]);

  /* =========================
     FORMATO EJE X
  ========================= */
  const formatBucketLabel = (raw: string, bt: BucketType): string => {
    try {
      if (bt === "day") {
        const d = new Date(raw);
        return d.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
        });
      }

      if (bt === "week") {
        const parts = raw.split("-W");
        const week = parts[1] ?? raw;
        return `sem ${week}`;
      }

      const [year, month] = raw.split("-");
      const d = new Date(Number(year), Number(month) - 1, 1);
      return d.toLocaleDateString("es-ES", {
        month: "short",
        year: "2-digit",
      });
    } catch {
      return raw;
    }
  };

  /* =========================
     DATOS FINALES (LÍMITE REAL EN MÓVIL)
  ========================= */
  const chartData = useMemo(() => {
    if (!apiData || !apiData.trend) return [];

    const bt: BucketType = apiData.bucket_type ?? bucket;

    const mapped = apiData.trend.map((p) => ({
      etiqueta: formatBucketLabel(p.bucket, bt),
      puntuacion: p.avg_rating,
      resenas: p.count,
    }));

    if (!isMobile) return mapped;

    if (mapped.length <= MAX_POINTS_MOBILE) return mapped;

    const step = Math.ceil(mapped.length / MAX_POINTS_MOBILE);
    return mapped.filter((_, index) => index % step === 0);
  }, [apiData, bucket, isMobile]);

  const hayDatos = chartData.length > 0;

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="mx-auto mb-12 px-2 md:px-0 max-w-full md:max-w-[calc(100%-2rem)]">
      {/* TÍTULO */}
      <div className="mb-4 text-left">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
          Puntuación media vs Volumen de reseñas
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Comparativa entre la valoración media y el número total de reseñas en
          el periodo seleccionado.
        </p>
        {loading && (
          <p className="text-xs text-slate-500 mt-1">Actualizando datos…</p>
        )}
      </div>

      {/* CONTENEDOR GRÁFICO */}
      <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-xl p-4 md:p-8 min-h-[260px] flex items-center justify-center">
        {hayDatos ? (
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart
              data={chartData}
              margin={
                isMobile
                  ? { top: 6, right: 6, bottom: 6, left: 0 }
                  : { top: 10, right: 24, bottom: 12, left: 0 }
              }
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />

              <XAxis
                dataKey="etiqueta"
                stroke="#475569"
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
              />

              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#475569"
                domain={[0, 5]}
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Puntuación media",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#334155",
                  offset: 10,
                }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#475569"
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Reseñas",
                  angle: 90,
                  position: "insideRight",
                  fill: "#334155",
                  offset: 10,
                }}
              />

              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.12)" }}
                formatter={(value: any, name: string) => {
                  if (name === "Puntuación media") {
                    return [`${(value as number).toFixed(1)}★`, name];
                  }
                  return [value, name];
                }}
              />

              <Legend wrapperStyle={{ color: "#0f172a", fontSize: 11 }} />

              <Bar
                yAxisId="right"
                dataKey="resenas"
                fill="#2563eb"
                barSize={isMobile ? 16 : 36}
                radius={[6, 6, 0, 0]}
                name="Reseñas"
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="puntuacion"
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={{ r: isMobile ? 2 : 3 }}
                activeDot={{ r: isMobile ? 4 : 5 }}
                name="Puntuación media"
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-slate-500">
            No hay datos de reseñas en el periodo seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
