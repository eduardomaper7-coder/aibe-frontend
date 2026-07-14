"use client";

import { useEffect, useMemo, useState } from "react";

type Tend = "up" | "down" | "flat";

interface Row {
  tema: string;
  menciones: number;
  sentimiento: number; // -1..1
  tendencia: Tend;
}

type TopicsSummaryResponse = {
  topics: Row[];
  total_mentions: number;
  avg_sentiment: number; // -1..1
  global_trend: Tend;
};

type TemasProps = {
  jobId: string;
  fromDate: string | null;
  toDate: string | null;
};


// ---- Utils ----
function pct(x: number) {
  // sentiment -1..1 -> 0..100
  return Math.max(0, Math.min(100, Math.round((x + 1) * 50)));
}
function fmtSent(x: number) {
  return `${x > 0 ? "+" : ""}${x.toFixed(2)}`;
}

// ---- UI aux ----
function Trend({ value }: { value: Tend }) {
  const classes =
    value === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : value === "down"
      ? "text-red-600 dark:text-red-400"
      : "text-slate-500 dark:text-slate-400";
  const label =
    value === "up" ? "Al alza" : value === "down" ? "A la baja" : "Estable";
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${classes}`}>
      {value === "up" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 5l6 6h-4v8h-4v-8H6l6-6z" />
        </svg>
      )}
      {value === "down" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 19l-6-6h4V5h4v8h4l-6 6z" />
        </svg>
      )}
      {value === "flat" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M4 12h16v2H4z" />
        </svg>
      )}
      <span className="sr-only">Tendencia: </span>
      {label}
    </span>
  );
}

export default function TemasSection({ jobId, fromDate, toDate }: TemasProps) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalMentions, setTotalMentions] = useState(0);
  const [avgSentiment, setAvgSentiment] = useState(0);
  const [globalTrend, setGlobalTrend] = useState<Tend>("flat");

  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"menciones" | "sentimiento" | "tema">(
    "menciones"
  );
  const [tend, setTend] = useState<"all" | Tend>("all");

  // ------------------ Fetch backend ------------------
  useEffect(() => {
  if (!API_BASE || !jobId) return;

  const params = new URLSearchParams();
  params.append("job_id", jobId);

  if (fromDate) params.append("from", fromDate);
  if (toDate) params.append("to", toDate);

  setLoading(true);

  fetch(`${API_BASE}/reviews/topics-summary?${params.toString()}`)
    .then(res => {
      if (!res.ok) throw new Error("Error temas");
      return res.json();
    })
    .then((json: TopicsSummaryResponse) => {
      setRows(json.topics ?? []);
      setTotalMentions(json.total_mentions ?? 0);
      setAvgSentiment(json.avg_sentiment ?? 0);
      setGlobalTrend(json.global_trend ?? "flat");
    })
    .catch(() => {
      setRows([]);
      setTotalMentions(0);
      setAvgSentiment(0);
      setGlobalTrend("flat");
    })
    .finally(() => setLoading(false));
}, [API_BASE, jobId, fromDate, toDate]);




  const baseRows = useMemo<Row[]>(() => rows ?? [], [rows]);

  const filteredSorted = useMemo(() => {
    const f = baseRows.filter(
      (r) =>
        (!q || r.tema.toLowerCase().includes(q.toLowerCase())) &&
        (tend === "all" || r.tendencia === tend)
    );
    const s = [...f].sort((a, b) => {
      if (orden === "menciones") return b.menciones - a.menciones;
      if (orden === "sentimiento") return b.sentimiento - a.sentimiento;
      return a.tema.localeCompare(b.tema, "es");
    });
    return s;
  }, [baseRows, q, orden, tend]);

  const trendTxt =
    globalTrend === "up"
      ? "al alza"
      : globalTrend === "down"
      ? "a la baja"
      : "estable";

  return (
    <div>
      <div className="min-h-[320px] bg-white text-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <header className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Temas y categorías detectadas
              </h1>
              {loading && (
                <p className="text-xs text-slate-500 mt-1">
                  Analizando reseñas y temas…
                </p>
              )}
            </div>
          </header>

          {/* Toolbar */}
          <div className="bg-white/90 border border-slate-200 shadow-xl rounded-2xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1">Buscar tema</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Escribe para filtrar…"
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1">
                  Ordenar por
                </span>
                <select
                  value={orden}
                  onChange={(e) =>
                    setOrden(
                      e.target.value as "menciones" | "sentimiento" | "tema"
                    )
                  }
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="menciones">Menciones (desc.)</option>
                  <option value="sentimiento">Sentimiento (desc.)</option>
                  <option value="tema">Tema (A–Z)</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1">
                  Filtrar tendencia
                </span>
                <select
                  value={tend}
                  onChange={(e) => setTend(e.target.value as "all" | Tend)}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="all">Todas</option>
                  <option value="up">Al alza</option>
                  <option value="flat">Estable</option>
                  <option value="down">A la baja</option>
                </select>
              </label>
            </div>
          </div>

          {/* Tabla + Métricas */}
          <div className="bg-white/90 border border-slate-200 shadow-xl rounded-2xl p-5">
            <div className="hidden md:block overflow-x-auto max-h-[60vh]">
              <table className="w-full border-separate [border-spacing:0_10px]">
                <thead className="sticky top-0 z-10">
                  <tr className="backdrop-blur bg-white/70">
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">
                      Tema
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">
                      N.º de menciones
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">
                      Sentimiento promedio
                    </th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">
                      Tendencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSorted.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        No hay resultados para los filtros actuales.
                      </td>
                    </tr>
                  ) : (
                    filteredSorted.map((d, i) => (
                      <tr
                        key={i}
                        className="bg-white border border-slate-200 rounded-xl hover:shadow-md"
                      >
                        <td className="px-4 py-3 font-semibold">{d.tema}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="min-w-[42px] text-center px-2 py-1 rounded-full bg-indigo-50 border border-indigo-200">
                              {d.menciones}
                            </span>
                            <span className="text-slate-500">menciones</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                              <span
                                className="block h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
                                style={{ width: `${pct(d.sentimiento)}%` }}
                              />
                            </div>
                            <div className="font-bold tabular-nums">
                              {fmtSent(d.sentimiento)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Trend value={d.tendencia} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Vista móvil – cards */}
<div className="md:hidden space-y-4">
  {filteredSorted.length === 0 ? (
    <div className="py-10 text-center text-slate-500">
      No hay resultados para los filtros actuales.
    </div>
  ) : (
    filteredSorted.map((d, i) => (
      <div
        key={i}
        className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white"
      >
        {/* Tema */}
        <div className="font-semibold text-base mb-1">
          {d.tema}
        </div>

        {/* Menciones */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 text-sm rounded-full bg-indigo-50 border border-indigo-200">
            {d.menciones}
          </span>
          <span className="text-sm text-slate-500">
            menciones
          </span>
        </div>

        {/* Sentimiento */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-500">Sentimiento</span>
            <span className="font-semibold tabular-nums">
              {fmtSent(d.sentimiento)}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
            <span
              className="block h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
              style={{ width: `${pct(d.sentimiento)}%` }}
            />
          </div>
        </div>

        {/* Tendencia */}
        <div className="mt-2">
          <Trend value={d.tendencia} />
        </div>
      </div>
    ))
  )}
</div>


            {/* Métricas rápidas */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Métricas rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    Total menciones
                  </div>
                  <div className="text-2xl font-bold tabular-nums mt-1">
                    {totalMentions.toLocaleString("es-ES")}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    Sentimiento global
                  </div>
                  <div className="text-2xl font-bold tabular-nums mt-1">
                    {fmtSent(avgSentiment)}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    Tendencia global
                  </div>
                  <div className="text-2xl font-bold tabular-nums mt-1">
                    {trendTxt[0].toUpperCase() + trendTxt.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
