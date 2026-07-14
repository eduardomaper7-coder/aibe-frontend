"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Minus, Search, SortAsc } from "lucide-react";

// ——— Tipos ——————————————————————————————————
export type Tend = "up" | "down" | "flat";

export type Row = {
  tema: string;
  menciones: number;      // total menciones
  sentimiento: number;    // 0–100 (positivo)
  tendencia: Tend;        // dirección de la tendencia
};

// ——— Datos demo (usa Tend, no string) —————————
const dataDemo: Row[] = [
  { tema: "Atención al cliente", menciones: 321, sentimiento: 72, tendencia: "up" },
  { tema: "Precio",               menciones: 278, sentimiento: 45, tendencia: "down" },
  { tema: "Calidad del producto", menciones: 198, sentimiento: 81, tendencia: "up" },
  { tema: "Envío",                menciones: 167, sentimiento: 58, tendencia: "flat" },
  { tema: "Devoluciones",         menciones: 142, sentimiento: 36, tendencia: "down" },
  { tema: "Sostenibilidad",       menciones: 88,  sentimiento: 69, tendencia: "flat" },
];

// ——— Utils UI ————————————————————————————————
const TrendIcon = ({ t }: { t: Tend }) => {
  if (t === "up")   return <ArrowUpRight className="h-4 w-4 text-emerald-500" aria-label="al alza" />;
  if (t === "down") return <ArrowDownRight className="h-4 w-4 text-rose-500" aria-label="a la baja" />;
  return <Minus className="h-4 w-4 text-slate-400" aria-label="estable" />;
};

const badgeBySent = (v: number) =>
  v >= 70 ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30" :
  v >= 50 ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30" :
            "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30";

// ——— Componente ——————————————————————————————
export function AnalisisResenasMejorado({ data = dataDemo }: { data?: Row[] }) {
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"menciones" | "sentimiento" | "tema">("menciones");
  const [tend, setTend] = useState<"all" | Tend>("all");

  const rows = useMemo(() => {
    let filtered = data;

    if (q.trim()) {
      const s = q.toLowerCase();
      filtered = filtered.filter(r => r.tema.toLowerCase().includes(s));
    }

    if (tend !== "all") {
      filtered = filtered.filter(r => r.tendencia === tend);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (orden === "tema") return a.tema.localeCompare(b.tema);
      if (orden === "menciones") return b.menciones - a.menciones;
      return b.sentimiento - a.sentimiento;
    });

    return sorted;
  }, [data, q, tend, orden]);

  return (
    <section className="w-full">
      <Card className="border-white/10 bg-gradient-to-b from-[#0a0f0d] to-[#0b1914] text-slate-100">
        <CardContent className="p-4 md:p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold">Temas en reseñas</h3>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar tema…"
                  className="pl-8 bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-400"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${orden === "menciones" ? "ring-1 ring-white/20" : ""}`}
                  onClick={() => setOrden("menciones")}
                >
                  <SortAsc className="mr-2 h-4 w-4" />
                  Menciones
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${orden === "sentimiento" ? "ring-1 ring-white/20" : ""}`}
                  onClick={() => setOrden("sentimiento")}
                >
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sentimiento
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${orden === "tema" ? "ring-1 ring-white/20" : ""}`}
                  onClick={() => setOrden("tema")}
                >
                  <SortAsc className="mr-2 h-4 w-4" />
                  Tema
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${tend === "all" ? "ring-1 ring-white/20" : ""}`}
                  onClick={() => setTend("all")}
                >
                  Todas
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${tend === "up" ? "ring-1 ring-emerald-400/30" : ""}`}
                  onClick={() => setTend("up")}
                >
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-400" />
                  Al alza
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${tend === "flat" ? "ring-1 ring-slate-400/30" : ""}`}
                  onClick={() => setTend("flat")}
                >
                  <Minus className="mr-1 h-4 w-4 text-slate-300" />
                  Estable
                </Button>
                <Button
                  variant="outline"
                  className={`border-white/10 bg-white/5 ${tend === "down" ? "ring-1 ring-rose-400/30" : ""}`}
                  onClick={() => setTend("down")}
                >
                  <ArrowDownRight className="mr-1 h-4 w-4 text-rose-400" />
                  A la baja
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-slate-300">
                  <th className="px-4 py-3 font-medium">Tema</th>
                  <th className="px-4 py-3 font-medium">Menciones</th>
                  <th className="px-4 py-3 font-medium">Sentimiento</th>
                  <th className="px-4 py-3 font-medium">Tendencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r) => (
                  <tr key={r.tema} className="text-sm hover:bg-white/[0.03]">
                    <td className="px-4 py-3">{r.tema}</td>
                    <td className="px-4 py-3 tabular-nums">{r.menciones.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${badgeBySent(
                          r.sentimiento
                        )}`}
                        title={`${r.sentimiento}% positivo`}
                      >
                        {r.sentimiento}% positivo
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-1">
                        <TrendIcon t={r.tendencia} />
                        <span className="text-slate-300">
                          {r.tendencia === "up" ? "Al alza" : r.tendencia === "down" ? "A la baja" : "Estable"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default AnalisisResenasMejorado;

