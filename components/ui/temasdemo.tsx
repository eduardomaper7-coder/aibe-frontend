'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// ————————————————————————————————————————————————
// Shell de portátil (mockup) con cámara más sutil
function LaptopShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative mx-auto rounded-[18px] bg-zinc-900 p-3 ring-1 ring-white/10 shadow-2xl">
        {/* Cámara sutil */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2">
          <div className="mx-auto flex items-center gap-2 rounded-full bg-zinc-800/60 px-2 py-[2px] shadow-inner">
            <div className="h-2 w-2 rounded-full bg-zinc-500 ring-1 ring-white/20" />
          </div>
        </div>
        {/* Pantalla */}
        <div className="overflow-hidden rounded-[12px] border border-zinc-800 bg-white shadow-inner">
          {children}
        </div>
        {/* Bisagra/base */}
        <div className="mx-auto mt-3 h-1.5 w-40 rounded-full bg-zinc-800" />
        <div className="mx-auto mt-1 h-1 w-[92%] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————
// Datos demo y utilidades
const dataDemo = [
  { tema: 'Atención al cliente', menciones: 184, sentimiento: 0.62, tendencia: 'up' },
  { tema: 'Rapidez del servicio', menciones: 156, sentimiento: 0.54, tendencia: 'up' },
  { tema: 'Calidad del producto', menciones: 201, sentimiento: 0.48, tendencia: 'flat' },
  { tema: 'Relación calidad-precio', menciones: 122, sentimiento: 0.31, tendencia: 'flat' },
  { tema: 'Ambiente', menciones: 97, sentimiento: 0.44, tendencia: 'up' },
  { tema: 'Ubicación', menciones: 83, sentimiento: 0.12, tendencia: 'down' },
  { tema: 'Limpieza', menciones: 109, sentimiento: 0.27, tendencia: 'down' },
];

type Tend = 'up' | 'down' | 'flat';
interface Row { tema: string; menciones: number; sentimiento: number; tendencia: Tend }

function pct(x: number) { return Math.max(0, Math.min(100, Math.round((x + 1) * 50))); }
function fmtSent(x: number) { return `${x > 0 ? '+' : ''}${x.toFixed(2)}`; }

function Trend({ value }: { value: Tend }) {
  const classes = value === 'up' ? 'text-emerald-600'
    : value === 'down' ? 'text-red-600'
    : 'text-slate-500';
  const label = value === 'up' ? 'Al alza' : value === 'down' ? 'A la baja' : 'Estable';
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${classes}`}>
      {value === 'up' && (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M12 5l6 6h-4v8h-4v-8H6l6-6z" />
        </svg>
      )}
      {value === 'down' && (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M12 19l-6-6h4V5h4v8h4l-6 6z" />
        </svg>
      )}
      {value === 'flat' && (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M4 12h16v2H4z" />
        </svg>
      )}
      <span className="sr-only">Tendencia: </span>{label}
    </span>
  );
}

// ————————————————————————————————————————————————
export default function SeccionAnalisisPorTemas() {
  useEffect(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const target = h2s.find((n) => n.textContent?.trim() === 'Análisis IA avanzada');
    if (target) {
      const section = target.closest('section');
      if (section) (section as HTMLElement).style.display = 'none';
    }
  }, []);

  return (
    <div className="bg-black text-slate-100">
      <section className="relative isolate px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <h1 className="text-left font-sans text-white text-[32px] sm:text-[36px] md:text-[40px] font-semibold tracking-tight">
              Analizamos su negocio por temas
            </h1>
          </header>

          <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_0_50px_-12px_rgba(30,58,138,0.6)] bg-gradient-to-br from-[#0B1430] via-[#0A1537] to-[#081025]">
            <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-16 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute bottom-12 right-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 right-10 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl" />

            <LaptopShell>
              <AnalisisResenasMejorado />
            </LaptopShell>
          </div>
        </div>
      </section>
    </div>
  );
}

// ————————————————————————————————————————————————
export function AnalisisResenasMejorado({ data = dataDemo }: { data?: Row[] }) {
  const [q, setQ] = useState('');
  const [orden, setOrden] = useState<'menciones'|'sentimiento'|'tema'>('menciones');
  const [tend, setTend] = useState<'all'|Tend>('all');

  const rows = useMemo(()=> data as Row[], [data]);

  const filteredSorted = useMemo(()=>{
    const f = rows.filter(r =>
      (!q || r.tema.toLowerCase().includes(q.toLowerCase())) &&
      (tend === 'all' || r.tendencia === tend)
    );
    const s = [...f].sort((a,b)=>{
      if(orden === 'menciones') return b.menciones - a.menciones;
      if(orden === 'sentimiento') return b.sentimiento - a.sentimiento;
      return a.tema.localeCompare(b.tema, 'es');
    });
    return s;
  }, [rows, q, orden, tend]);

  return (
    <div className="bg-white text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Filtrar por tema…"
          className="w-64 max-w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center gap-2 text-sm">
          <label className="text-slate-600">Ordenar por</label>
          <select
            value={orden}
            onChange={(e)=>setOrden(e.target.value as 'menciones'|'sentimiento'|'tema')}
            className="rounded-md border border-slate-300 bg-white px-2 py-1"
          >
            <option value="menciones">Menciones</option>
            <option value="sentimiento">Sentimiento</option>
            <option value="tema">Tema</option>
          </select>
          <label className="ml-4 text-slate-600">Tendencia</label>
          <select
            value={tend}
            onChange={(e)=>setTend(e.target.value as 'all'|Tend)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1"
          >
            <option value="all">Todas</option>
            <option value="up">Al alza</option>
            <option value="flat">Estable</option>
            <option value="down">A la baja</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-separate [border-spacing:0_10px]" aria-label="Tabla de temas estática">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-500">Tema</th>
                <th className="px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-500">N.º de menciones</th>
                <th className="px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-500">Sentimiento promedio</th>
                <th className="px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-500">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {filteredSorted.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">No hay resultados para los filtros actuales.</td>
                </tr>
              )}
              {filteredSorted.map((d, i) => (
                <tr key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
                  <td className="px-4 py-3 font-semibold">{d.tema}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="min-w-[42px] rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-center text-slate-800">
                        {d.menciones}
                      </span>
                      <span className="text-slate-500">menciones</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                        <span
                          className="block h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
                          style={{ width: `${pct(d.sentimiento)}%` }}
                        />
                      </div>
                      <div className="tabular-nums font-bold">{fmtSent(d.sentimiento)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Trend value={d.tendencia} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
