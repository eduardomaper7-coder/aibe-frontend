"use client";

import { useEffect, useRef, useState } from "react";
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
import { motion, useInView } from "framer-motion";

type Punto = { mes: string; puntuacion: number; resenas: number };

const data: Punto[] = [
  { mes: "ago 2025",  puntuacion: 4.2, resenas: 1000 },
  { mes: "sept 2025", puntuacion: 2.8, resenas: 650 },
  { mes: "oct 2025",  puntuacion: 4.4, resenas: 1100 },
  { mes: "nov 2025",  puntuacion: 4.0, resenas: 80 },
];

export default function GraficoPuntuacionVsVolumen() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="grafico-puntuacion-volumen"
      className="w-full bg-black pt-0 pb-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          {/* Opción 1 aplicada */}
          <h2 className="mt-0 text-left font-sans text-white text-[24px] sm:text-[28px] md:text-[32px] font-semibold tracking-tight">
  Evolución del Volumen y la Puntuación Media
</h2>


          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Compara cómo cambia el número de reseñas y su valoración a lo largo del tiempo.
          </p>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_0_50px_-12px_rgba(6,95,70,0.6)] bg-gradient-to-br from-[#06281F] via-[#083226] to-[#071C16]"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Glows decorativos */}
          <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />
          <div className="pointer-events-none absolute top-16 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-12 right-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 right-10 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl" />

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                key={start ? "animate" : "idle"}
                data={data}
                margin={{ top: 10, right: 24, bottom: 12, left: 0 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#0f2f27" />
                <XAxis
                  dataKey="mes"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12, fill: "#D1D5DB" }}
                  axisLine={{ stroke: "#134e44" }}
                  tickLine={{ stroke: "#134e44" }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#9CA3AF"
                  domain={[0, 5]}
                  tick={{ fontSize: 12, fill: "#D1D5DB" }}
                  axisLine={{ stroke: "#134e44" }}
                  tickLine={{ stroke: "#134e44" }}
                  label={{
                    value: "Puntuación media",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#A7F3D0",
                    offset: 10,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12, fill: "#D1D5DB" }}
                  axisLine={{ stroke: "#134e44" }}
                  tickLine={{ stroke: "#134e44" }}
                  label={{
                    value: "Reseñas",
                    angle: 90,
                    position: "insideRight",
                    fill: "#A7F3D0",
                    offset: 10,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(6,95,70,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(16,185,129,0.08)" }}
                />
                <Legend wrapperStyle={{ color: "#E5E7EB", fontSize: 12 }} />

                <defs>
                  <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                <Bar
                  yAxisId="right"
                  dataKey="resenas"
                  fill="url(#barGreen)"
                  barSize={36}
                  radius={[6, 6, 0, 0]}
                  name="Reseñas"
                  isAnimationActive={start}
                  animationBegin={80}
                  animationDuration={700}
                  animationEasing="ease-out"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="puntuacion"
                  stroke="#2dd4bf"
                  strokeWidth={2.5}
                  dot={{ r: 3, stroke: "#14b8a6", strokeWidth: 1 }}
                  activeDot={{ r: 5 }}
                  name="Puntuación media"
                  isAnimationActive={start}
                  animationBegin={160}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


