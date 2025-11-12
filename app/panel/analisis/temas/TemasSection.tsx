'use client';

import { useEffect, useMemo, useState } from 'react';

// ---- Tipos ----
type Tend = "up" | "down" | "flat";
interface Row { tema: string; menciones: number; sentimiento: number; tendencia: Tend }

// ---- Datos de ejemplo ----
const dataDemo: Row[] = [
  { tema: "Atención al cliente", menciones: 184, sentimiento: 0.62, tendencia: "up" },
  { tema: "Rapidez del servicio", menciones: 156, sentimiento: 0.54, tendencia: "up" },
  { tema: "Calidad del producto", menciones: 201, sentimiento: 0.48, tendencia: "flat" },
  { tema: "Relación calidad-precio", menciones: 122, sentimiento: 0.31, tendencia: "flat" },
  { tema: "Ambiente", menciones: 97, sentimiento: 0.44, tendencia: "up" },
  { tema: "Ubicación", menciones: 83, sentimiento: 0.12, tendencia: "down" },
  { tema: "Limpieza", menciones: 109, sentimiento: 0.27, tendencia: "down" },
];

// ---- Utils ----
function pct(x: number) { return Math.max(0, Math.min(100, Math.round((x + 1) * 50))); }
function fmtSent(x: number) { return `${x > 0 ? "+" : ""}${x.toFixed(2)}`; }

// ---- UI ----
function Trend({ value }: { value: Tend }) {
  const classes =
    value === "up" ? "text-emerald-600 dark:text-emerald-400" :
    value === "down" ? "text-red-600 dark:text-red-400" :
    "text-slate-500 dark:text-slate-400";
  const label = value === "up" ? "Al alza" : value === "down" ? "A la baja" : "Estable";
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${classes}`}>
      {value === "up" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 5l6 6h-4v8h-4v-8H6l6-6z" /></svg>
      )}
      {value === "down" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 19l-6-6h4V5h4v8h4l-6 6z" /></svg>
      )}
      {value === "flat" && (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M4 12h16v2H4z" /></svg>
      )}
      <span className="sr-only">Tendencia: </span>{label}
    </span>
  );
}

// ---- Página ----
export default function AnalisisResenasMejorado({ data = dataDemo }: { data?: Row[] }) {
  const [dark] = useState(false);
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"menciones" | "sentimiento" | "tema">("menciones");
  const [tend, setTend] = useState<"all" | Tend>("all");

  const rows = useMemo<Row[]>(() => data ?? dataDemo, [data]);

  const filteredSorted = useMemo(() => {
    const f = rows.filter(r =>
      (!q || r.tema.toLowerCase().includes(q.toLowerCase())) &&
      (tend === "all" || r.tendencia === tend)
    );
    const s = [...f].sort((a, b) => {
      if (orden === "menciones") return b.menciones - a.menciones;
      if (orden === "sentimiento") return b.sentimiento - a.sentimiento;
      return a.tema.localeCompare(b.tema, "es");
    });
    return s;
  }, [rows, q, orden, tend]);

  const { total, avg, trendTxt } = useMemo(() => {
    const total = rows.reduce((s, d) => s + d.menciones, 0);
    const avg = rows.reduce((s, d) => s + d.sentimiento * d.menciones, 0) / Math.max(1, total);
    const score = rows.reduce((s, d) => s + (d.tendencia === 'up' ? 1 : d.tendencia === 'down' ? -1 : 0), 0);
    const trendTxt = score > 0 ? 'al alza' : score < 0 ? 'a la baja' : 'estable';
    return { total, avg, trendTxt };
  }, [rows]);

  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Temas y categorías detectadas</h1>
          </header>

          {/* Toolbar */}
          <div className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">Buscar tema</span>
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Escribe para filtrar…"
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">Ordenar por</span>
                <select
                  value={orden}
                  onChange={e => setOrden(e.target.value as "menciones" | "sentimiento" | "tema")}
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="menciones">Menciones (desc.)</option>
                  <option value="sentimiento">Sentimiento (desc.)</option>
                  <option value="tema">Tema (A–Z)</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">Filtrar tendencia</span>
                <select
                  value={tend}
                  onChange={e => setTend(e.target.value as "all" | Tend)}
                  className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
          <div className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-5">
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="w-full border-separate [border-spacing:0_10px]">
                <thead className="sticky top-0 z-10">
                  <tr className="backdrop-blur bg-white/70 dark:bg-slate-900/60">
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">Tema</th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">N.º de menciones</th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">Sentimiento promedio</th>
                    <th className="text-left text-xs uppercase tracking-wider text-slate-500 px-4 py-2">Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSorted.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                        No hay resultados para los filtros actuales.
                      </td>
                    </tr>
                  ) : filteredSorted.map((d, i) => (
                    <tr key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md">
                      <td className="px-4 py-3 font-semibold">{d.tema}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="min-w-[42px] text-center px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800">
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
                          <div className="font-bold tabular-nums">{fmtSent(d.sentimiento)}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Trend value={d.tendencia} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Solo métricas rápidas (izquierda) */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Métricas rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Total menciones</div>
                  <div className="text-2xl font-bold tabular-nums mt-1">{total.toLocaleString('es-ES')}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Sentimiento global</div>
                  <div className="text-2xl font-bold tabular-nums mt-1">{fmtSent(avg)}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Tendencia global</div>
                  <div className="text-2xl font-bold tabular-nums mt-1">{trendTxt[0].toUpperCase() + trendTxt.slice(1)}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
