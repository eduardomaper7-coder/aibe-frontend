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
} from "recharts";
import { motion, useInView, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

const dataSentimiento = [
  { name: "Positivas", value: 62 },
  { name: "Neutras", value: 21 },
  { name: "Negativas", value: 17 },
];

const totalResenas = 525;
const puntuacionMedia = 4.3;

const dataEvolucion = [
  { mes: "Jun", rating: 4.1 },
  { mes: "Jul", rating: 4.0 },
  { mes: "Ago", rating: 4.2 },
  { mes: "Sep", rating: 4.4 },
  { mes: "Oct", rating: 4.3 },
  { mes: "Nov", rating: 4.5 },
];

const COLORS = ["#22c55e", "#a3a3a3", "#ef4444"];

export default function SeccionGraficasAvanzadas() {
  const porcentaje = (v: number) => `${v}%`;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // contador central animado
  const centerValue = useMotionValue(0);
  const [centerDisplay, setCenterDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      // easeOut como cubic-bezier para evitar error de tipos
      animate(centerValue, totalResenas, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    }
  }, [inView, centerValue]);

  useMotionValueEvent(centerValue, "change", (v) => {
    setCenterDisplay(Math.round(v));
  });

  // Etiquetas del pie con conector y punto
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

    // Alineación: Positivas (index 0) siempre start
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
          fill="#ffffff"
          fontSize={12}
          fontWeight={600}
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

  return (
    <section ref={sectionRef} id="graficas-avanzadas" className="relative w-full bg-black text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-left font-sans text-white text-[32px] sm:text-[36px] md:text-[40px] font-semibold tracking-tight">
            Conoce tu negocio mejor que nadie
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Ten acceso a múltiples gráficas avanzadas. Visualiza tendencias clave, desglosa sentimientos y entiende la evolución de tu reputación en tiempo real.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_0_50px_-12px_rgba(6,95,70,0.6)] bg-gradient-to-br from-[#06281F] via-[#083226] to-[#071C16]">
          <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />
          <div className="pointer-events-none absolute top-16 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-12 right-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 right-10 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl" />

          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                {/* Pie + contador central */}
                <motion.div
                  className="md:col-span-3 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative h-[420px] w-full md:h-[460px]">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ rotate: -90 }}
                      animate={inView ? { rotate: 0 } : {}}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden
                    >
                      <svg width="100%" height="100%" viewBox="0 0 360 360" className="opacity-70">
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
                        <Tooltip formatter={(value: number, name: string) => [porcentaje(value as number), name]} />
                        <Pie
                          data={dataSentimiento}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={100}
                          outerRadius={150}
                          paddingAngle={3}
                          startAngle={90}
                          endAngle={-270}
                          labelLine
                          label={renderLabel}
                          isAnimationActive={inView}
                          animationBegin={100}
                          animationDuration={900}
                          animationEasing="ease-out"
                          onMouseEnter={(_, i) => setActiveIndex(i)}
                          onMouseLeave={() => setActiveIndex(null)}
                        >
                          {dataSentimiento.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#grad-${index})`}
                              style={{ filter: "url(#dropShadow)" }}
                              // TS no tipa outerRadius en Cell, lo forzamos
                              outerRadius={(activeIndex === index ? 160 : 150) as any}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <motion.div
                      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <div className="text-xs uppercase tracking-wide text-slate-400">Reseñas</div>
                      <div className="text-4xl md:text-5xl font-semibold text-white">{centerDisplay}</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* KPIs derecha */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  <motion.div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.1 }}
                  >
                    <p className="text-sm text-slate-300">Número de reseñas analizadas</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{totalResenas.toLocaleString()}</p>
                  </motion.div>

                  <motion.div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-300">Puntuación media</p>
                      <Star className="h-4 w-4 text-slate-200" />
                    </div>
                    <div className="mt-1 flex items-end gap-2">
                      <p className="text-2xl font-semibold text-white">{puntuacionMedia.toFixed(1)}</p>
                      <span className="text-sm text-slate-300">/ 5</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Basado en los últimos 6 meses</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.3 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm text-slate-300">Evolución</p>
                      <TrendingUp className="h-4 w-4 text-slate-200" />
                    </div>
                    <div className="h-28">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataEvolucion} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0f2f27" />
                          <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} stroke="#9CA3AF" />
                          <YAxis domain={[3.5, 5]} tickLine={false} axisLine={false} allowDecimals fontSize={12} stroke="#9CA3AF" />
                          <Tooltip formatter={(value: number) => `${(value as number).toFixed(1)}★`} labelFormatter={(l) => `Mes: ${l}`} />
                          <Line
                            type="monotone"
                            dataKey="rating"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 4 }}
                            isAnimationActive={inView}
                            animationDuration={700}
                            stroke="#22c55e"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                      <span>
                        Mejor:{" "}
                        <strong className="text-white">
                          {Math.max(...dataEvolucion.map((d) => d.rating)).toFixed(1)}★
                        </strong>
                      </span>
                      <span>
                        Peor:{" "}
                        <strong className="text-white">
                          {Math.min(...dataEvolucion.map((d) => d.rating)).toFixed(1)}★
                        </strong>
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Leyenda compacta */}
              <motion.div
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                {dataSentimiento.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm backdrop-blur"
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <div className="flex w-full items-center justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-medium text-white">{porcentaje(item.value)}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


