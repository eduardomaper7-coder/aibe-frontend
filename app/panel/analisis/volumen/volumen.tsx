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
  bucket: string;       // "2025-11-16", "2025-W46" o "2025-11"
  avg_rating: number;
  count: number;
};

type SentimentSummaryResponse = {
  trend: TrendPoint[];
  bucket_type?: BucketType; // el backend la devuelve, pero la marcamos opcional
};

type VolumenProps = {
  fromDate: string | null; // "YYYY-MM-DD" o null
  toDate: string | null;   // "YYYY-MM-DD" o null
  bucket: BucketType;      // "day" | "week" | "month"
};

export default function GraficoPuntuacionVsVolumen({
  fromDate,
  toDate,
  bucket,
}: VolumenProps) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [apiData, setApiData] = useState<SentimentSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // --- carga de datos desde /reviews/sentiment-summary ---
  useEffect(() => {
    (async () => {
      if (!API_BASE) return;

      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email?.toLowerCase();
      if (!email) return;

      const params = new URLSearchParams({ email });
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      // usamos el bucket que nos pasa el panel (day/week/month)
      params.append("bucket", bucket);

      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/reviews/sentiment-summary?${params.toString()}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Error al obtener datos de volumen");
        const json: SentimentSummaryResponse = await res.json();
        setApiData(json);
      } catch (err) {
        console.error(err);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [API_BASE, fromDate, toDate, bucket]);

  // --- formateo de etiqueta del eje X según bucket ---
  const formatBucketLabel = (raw: string, bt: BucketType): string => {
    try {
      if (bt === "day") {
        // raw: "2025-11-16"
        const d = new Date(raw);
        return d.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
        });
      }
      if (bt === "week") {
        // raw: "2025-W46"
        const parts = raw.split("-W");
        const week = parts[1] ?? raw;
        return `sem ${week}`;
      }
      // month: "2025-11"
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

  // --- datos finales para Recharts ---
  const chartData = useMemo(() => {
    if (!apiData || !apiData.trend) return [];

    const bt: BucketType = apiData.bucket_type ?? bucket;

    return apiData.trend.map((p) => ({
      etiqueta: formatBucketLabel(p.bucket, bt),
      puntuacion: p.avg_rating,
      resenas: p.count,
    }));
  }, [apiData, bucket]);

  const hayDatos = chartData.length > 0;

  return (
    <div className="mx-auto max-w-[calc(100%-2rem)] mb-12">
      {/* Título y subtítulo alineados a la izquierda */}
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

      {/* Contenedor del gráfico */}
      <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8 min-h-[260px] flex items-center justify-center">
        {hayDatos ? (
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 24, bottom: 12, left: 0 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
              <XAxis
                dataKey="etiqueta"
                stroke="#475569"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#475569"
                domain={[0, 5]}
                tick={{ fontSize: 12 }}
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
                tick={{ fontSize: 12 }}
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
              <Legend wrapperStyle={{ color: "#0f172a", fontSize: 12 }} />
              <Bar
                yAxisId="right"
                dataKey="resenas"
                fill="#2563eb"
                barSize={36}
                radius={[6, 6, 0, 0]}
                name="Reseñas"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="puntuacion"
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
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
