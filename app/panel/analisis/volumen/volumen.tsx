"use client";

import React from "react";
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

const data = [
  { mes: "ago 2025", puntuacion: 4.2, resenas: 1000 },
  { mes: "sept 2025", puntuacion: 2.8, resenas: 650 },
  { mes: "oct 2025", puntuacion: 4.4, resenas: 1100 },
  { mes: "nov 2025", puntuacion: 4.0, resenas: 80 },
];

export default function GraficoPuntuacionVsVolumen() {
  return (
    <div className="mx-auto max-w-[calc(100%-2rem)] mb-12">
      {/* Título y subtítulo alineados a la izquierda */}
      <div className="mb-4 text-left">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
          Puntuación media vs Volumen de reseñas
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Comparativa entre la valoración media y el número total de reseñas.
        </p>
      </div>

      {/* Contenedor del gráfico con sombra tipo tabla */}
      <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8">
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 24, bottom: 12, left: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <XAxis
              dataKey="mes"
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
            <Tooltip cursor={{ fill: "rgba(148,163,184,0.12)" }} />
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
      </div>
    </div>
  );
}
