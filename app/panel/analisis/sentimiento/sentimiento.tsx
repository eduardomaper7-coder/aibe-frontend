"use client";

import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Star } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Sector,
} from "recharts";
import { motion, useInView, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

// Demo data — cámbialo por tu fuente real
const dataSentimiento = [
  { name: "Positivas", value: 62 },
  { name: "Neutras", value: 21 },
  { name: "Negativas", value: 17 },
];

const totalResenas = 1248;
const puntuacionMedia = 4.3; // sobre 5

// Evolución mensual (últimos 6 meses)
const dataEvolucion = [
  { mes: "Jun", rating: 4.1 },
  { mes: "Jul", rating: 4.0 },
  { mes: "Ago", rating: 4.2 },
  { mes: "Sep", rating: 4.4 },
  { mes: "Oct", rating: 4.3 },
  { mes: "Nov", rating: 4.5 },
];

const COLORS = ["#22c55e", "#a3a3a3", "#ef4444"]; // verde, gris, rojo

export default function SentimentDemo() {
  const porcentaje = (v: number) => `${v}%`;

  // --- hooks para animaciones/etiquetas del nuevo diagrama ---
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const centerValue = useMotionValue(0);
  const [centerDisplay, setCenterDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      animate(centerValue, totalResenas, { duration: 1.0, ease: "easeOut" });
    }
  }, [inView, centerValue]);

  useMotionValueEvent(centerValue, "change", (v) => {
    setCenterDisplay(Math.round(v));
  });

  const renderLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, percent, index } = props;
    const RADIAN = Math.PI / 180;
    const r = outerRadius + 18;
    const vx = Math.cos(-midAngle * RADIAN);
    const vy = Math.sin(-midAngle * RADIAN);
    const x = cx + r * vx;
    const y = cy + r * vy;

    const name = dataSentimiento[index].name;
    const val = Math.round(percent * 100);

    let anchor: "start" | "end" = index === 0 ? "start" : vx >= 0 ? "start" : "end";
    let dx = index === 0 ? 6 : anchor === "end" ? -5 : 6;

    return (
      <g>
        <line
          x1={cx}
          y1={cy}
          x2={cx + (outerRadius + 8) * vx}
          y2={cy + (outerRadius + 8) * vy}
          stroke="#e5e7eb"
          strokeWidth={1.5}
        />
        <circle cx={x} cy={y} r={3} fill={COLORS[index]} />
        <text
          x={x + dx}
          y={y}
          textAnchor={anchor}
          dominantBaseline="middle"
          fontSize={12}
          fontWeight={600}
          className="fill-gray-900 dark:fill-slate-100"
        >
          {name} {val}%
        </text>
      </g>
    );
  };

  const defs = (
    <defs>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
      </filter>
      {COLORS.map((c, i) => (
        <linearGradient id={`grad-${i}`} key={i} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity={0.9} />
          <stop offset="100%" stopColor={c} stopOpacity={0.7} />
        </linearGradient>
      ))}
    </defs>
  );

  // Agrandar solo el sector activo
  const activeShape = (props: any) => {
    const { outerRadius = 110 } = props;
    return <Sector {...props} outerRadius={outerRadius + 10} />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Encabezado (título fuera del recuadro) */}
        <div className="mb-6 flex items-center justify-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-slate-100">
              Análisis de sentimientos
            </h1>
          </div>
          
        </div>

        {/* Recuadro que engloba TODO el bloque del análisis */}
        <div ref={sectionRef} className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 backdrop-blur">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Diagrama circular — reemplazado por el nuevo */}
            <motion.div
              className="md:col-span-3 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative h-[360px] w-full">
                {/* anillo decorativo sutil */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0.6 }}
                  animate={inView ? { rotate: 0, opacity: 0.7 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  aria-hidden
                >
                  <svg width="100%" height="100%" viewBox="0 0 360 360">
                    <defs>
                      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#a3a3a3" />
                      </linearGradient>
                    </defs>
                    <circle cx="180" cy="180" r="158" fill="none" stroke="url(#ring)" strokeWidth="2" strokeDasharray="4 6" />
                  </svg>
                </motion.div>

                <ResponsiveContainer>
                  <PieChart>
                    {defs}
                    <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                    <Pie
                      {...(activeIndex != null ? { activeIndex } : {})}
                      data={dataSentimiento}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={3}
                      startAngle={90}
                      endAngle={-270}
                      labelLine
                      label={renderLabel}
                      isAnimationActive={inView}
                      animationBegin={100}
                      animationDuration={900}
                      animationEasing="ease-out"
                      onMouseEnter={(_, i: number) => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      activeShape={activeShape}
                    >
                      {dataSentimiento.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#grad-${index})`}
                          style={{ filter: "url(#dropShadow)" }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Contador central animado */}
                <motion.div
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">Reseñas</div>
                  <div className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">{centerDisplay}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Métricas al lado del diagrama — igual que antes */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-500 dark:text-slate-300">Número de reseñas analizadas</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{totalResenas.toLocaleString()}</p>
              </div>

              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-start">
                  <p className="text-sm text-gray-500 dark:text-slate-300">Puntuación media</p>
                  <Star className="h-4 w-4" />
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{puntuacionMedia.toFixed(1)}</p>
                  <span className="text-sm text-gray-500 dark:text-slate-300">/ 5</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-gray-500 dark:text-slate-300">Basado en los últimos 6 meses</span>
                </div>
              </div>

              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <div className="mb-2 flex items-center justify-start">
                  <p className="text-sm text-gray-500 dark:text-slate-300">Evolución</p>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dataEvolucion} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis domain={[3.5, 5]} tickLine={false} axisLine={false} allowDecimals={true} fontSize={12} />
                      <Tooltip formatter={(value: number) => `${(value as number).toFixed(1)}★`} labelFormatter={(l) => `Mes: ${l}`} />
                      <Line type="monotone" dataKey="rating" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex items-center justify-start text-xs text-gray-600 dark:text-slate-300">
                  <span>
                    Mejor: <strong>{Math.max(...dataEvolucion.map(d => d.rating)).toFixed(1)}★</strong>
                  </span>
                  <span>
                    Peor: <strong>{Math.min(...dataEvolucion.map(d => d.rating)).toFixed(1)}★</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Leyenda compacta — igual que antes */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {dataSentimiento.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 rounded-xl border bg-white dark:bg-slate-900 p-3 shadow-sm border-gray-200 dark:border-white/10">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <div className="flex w-full items-center justify-start text-sm">
                  <span className="text-gray-600 dark:text-slate-300">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{porcentaje(item.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota */}
        
      </div>
    </div>
  );
}

