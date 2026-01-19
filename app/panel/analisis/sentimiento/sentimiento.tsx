"use client";


import { useRef, useState, useEffect, useMemo } from "react";
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
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion";


const COLORS = ["#22c55e", "#a3a3a3", "#ef4444"]; // verde, gris, rojo


type SentimentLabel = "positive" | "neutral" | "negative";
type BucketType = "day" | "week" | "month";


type SentimentSummaryResponse = {
  total_reviews: number;
  avg_rating: number;
  breakdown: { label: SentimentLabel; count: number }[];
  trend: { bucket: string; avg_rating: number; count: number }[];
  bucket_type: BucketType;
};


type SentimientoProps = {
  jobId: string;
  fromDate: string | null;
  toDate: string | null;
  bucket: BucketType;
};




export default function SentimientoSection({
  jobId,
  fromDate,
  toDate,
  bucket,
}: SentimientoProps) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");


  const [summary, setSummary] = useState<SentimentSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
const [isMobile, setIsMobile] = useState(false);


  // ---- animaciones/etiquetas del diagrama ----
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const centerValue = useMotionValue(0);
  const [centerDisplay, setCenterDisplay] = useState(0);

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 640px)");

  const handleChange = () => setIsMobile(mediaQuery.matches);

  handleChange(); // estado inicial
  mediaQuery.addEventListener("change", handleChange);

  return () => mediaQuery.removeEventListener("change", handleChange);
}, []);

  // ======================
  // 1) Fetch al backend
  // ======================
  useEffect(() => {
  if (!API_BASE || !jobId) return;

  const params = new URLSearchParams();
  params.append("job_id", jobId);


  if (fromDate) params.append("from", fromDate);
  if (toDate) params.append("to", toDate);
  if (bucket) params.append("bucket", bucket);


  setLoading(true);


  fetch(`${API_BASE}/reviews/sentiment-summary?${params.toString()}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener datos de sentimiento");
      return res.json();
    })
    .then((json: SentimentSummaryResponse) => {
      setSummary(json);
      animate(centerValue, json.total_reviews ?? 0, {
        duration: 1.0,
        ease: "easeOut",
      });
    })
    .catch((e) => {
      console.error("Error al obtener datos de sentimiento", e);
      setSummary(null);
      animate(centerValue, 0, { duration: 0.4, ease: "easeOut" });
    })
    .finally(() => setLoading(false));
}, [API_BASE, jobId, fromDate, toDate, bucket, centerValue]);




  useMotionValueEvent(centerValue, "change", (v) => {
    setCenterDisplay(Math.round(v));
  });


  // ======================
  // 2) Adaptar datos al UI
  // ======================


  // Pie: porcentajes por sentimiento
  const dataSentimiento = useMemo(() => {
    if (!summary || summary.total_reviews === 0) {
      return [{ name: "Sin datos", value: 100 }];
    }


    const total = summary.breakdown.reduce((acc, b) => acc + b.count, 0) || 1;


    const labelMap: Record<SentimentLabel, string> = {
      positive: "Positivas",
      neutral: "Neutras",
      negative: "Negativas",
    };


    return summary.breakdown.map((b) => ({
      name: labelMap[b.label],
      value: Math.round((b.count / total) * 100),
    }));
  }, [summary]);


  const totalResenas = summary?.total_reviews ?? 0;
  const puntuacionMedia = summary?.avg_rating ?? 0;


  // LineChart: evolución por día/semana/mes según bucket_type
  const dataEvolucion = useMemo(() => {
    if (!summary || !summary.trend.length) return [];


    const type = summary.bucket_type;


    const labelFromBucket = (bucket: string) => {
      if (type === "day") {
        // 2025-11-16 → "16 nov"
        const d = new Date(bucket);
        if (Number.isNaN(d.getTime())) return bucket;
        return d.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
        });
      }


      if (type === "week") {
        // 2025-W46 → "Sem 46"
        const parts = bucket.split("-W");
        if (parts.length === 2) {
          return `Sem ${parts[1]}`;
        }
        return bucket;
      }


      // month: 2025-11 → "nov"
      const [yearStr, monthStr] = bucket.split("-");
      const year = Number(yearStr);
      const month = Number(monthStr);
      if (!year || !month) return bucket;
      const d = new Date(year, month - 1, 1);
      return d.toLocaleDateString("es-ES", { month: "short" });
    };


    return summary.trend.map((t) => ({
      label: labelFromBucket(t.bucket),
      rating: t.avg_rating,
    }));
  }, [summary]);


  const bestWorst = useMemo(() => {
    if (!dataEvolucion.length) return null;


    let best = dataEvolucion[0];
    let worst = dataEvolucion[0];


    for (const p of dataEvolucion) {
      if (p.rating > best.rating) best = p;
      if (p.rating < worst.rating) worst = p;
    }


    return { best, worst };
  }, [dataEvolucion]);


  const porcentaje = (v: number) => `${v}%`;


  const renderLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, percent, index } = props;
    const RADIAN = Math.PI / 180;
    const r = outerRadius + 18;
    const vx = Math.cos(-midAngle * RADIAN);
    const vy = Math.sin(-midAngle * RADIAN);
    const x = cx + r * vx;
    const y = cy + r * vy;


    const name = dataSentimiento[index]?.name ?? "";
    const val = Math.round(percent * 100);


    let anchor: "start" | "end" =
      index === 0 ? "start" : vx >= 0 ? "start" : "end";
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
        <circle cx={x} cy={y} r={3} fill={COLORS[index] ?? "#94a3b8"} />
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


  const activeShape = (props: any) => {
    const { outerRadius = 110 } = props;
    return <Sector {...props} outerRadius={outerRadius + 10} />;
  };


  // ======================
  // 3) JSX
  // ======================


  return (
    <div className="min-h-[420px] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="px-0 py-0">
        <div className="mb-6 flex items-center justify-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-slate-100">
              Análisis de sentimientos
            </h1>
            {loading && (
              <p className="mt-1 text-xs text-slate-500">Actualizando datos…</p>
            )}
          </div>
        </div>


        <div
          ref={sectionRef}
          className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 backdrop-blur"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Diagrama circular */}
            <motion.div
              className="md:col-span-3 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative h-[360px] w-full">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0.6 }}
                  animate={inView ? { rotate: 0, opacity: 0.7 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  aria-hidden
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 360 360"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#a3a3a3" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="180"
                      cy="180"
                      r="158"
                      fill="none"
                      stroke="url(#ring)"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                    />
                  </svg>
                </motion.div>


                <ResponsiveContainer>
                  <PieChart>
                    {defs}
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name,
                      ]}
                    />
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
                      labelLine={!isMobile}
  label={!isMobile ? renderLabel : false}
                      
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


                <motion.div
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
                    Reseñas
                  </div>
                  <div className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
                    {centerDisplay}
                  </div>
                </motion.div>
              </div>
            </motion.div>


            {/* Métricas laterales */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-500 dark:text-slate-300">
                  Número de reseñas analizadas
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalResenas.toLocaleString()}
                </p>
              </div>


              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-start">
                  <p className="text-sm text-gray-500 dark:text-slate-300">
                    Puntuación media
                  </p>
                  <Star className="h-4 w-4" />
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {puntuacionMedia.toFixed(1)}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-slate-300">
                    / 5
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-gray-500 dark:text-slate-300">
                    Basado en el periodo seleccionado
                  </span>
                </div>
              </div>


              <div className="rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm border-gray-200 dark:border-white/10">
                <div className="mb-2 flex items-center justify-start">
                  <p className="text-sm text-gray-500 dark:text-slate-300">
                    Evolución
                  </p>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dataEvolucion}
                      margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <YAxis
                        domain={[3.5, 5]}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={true}
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          `${(value as number).toFixed(1)}★`
                        }
                        labelFormatter={(l) => `Periodo: ${l}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {bestWorst && (
                  <div className="mt-2 flex items-center justify-start text-xs text-gray-600 dark:text-slate-300 gap-4">
                    <span>
                      Mejor:{" "}
                      <strong>
                        {bestWorst.best.rating.toFixed(1)}★ ({bestWorst.best.label})
                      </strong>
                    </span>
                    <span>
                      Peor:{" "}
                      <strong>
                        {bestWorst.worst.rating.toFixed(1)}★ (
                        {bestWorst.worst.label})
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Leyenda compacta */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {dataSentimiento.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border bg-white dark:bg-slate-900 p-3 shadow-sm border-gray-200 dark:border-white/10"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] ?? "#94a3b8" }}
                />
                <div className="flex w-full items-center justify-start text-sm">
                  <span className="text-gray-600 dark:text-slate-300">
                    {item.name}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {porcentaje(item.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
