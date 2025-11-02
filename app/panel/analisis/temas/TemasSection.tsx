'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

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

export default function TemasSection() {
  const porcentaje = (v: number) => `${v}%`;

  return (
    <section className="mt-10">
      {/* Encabezado sección */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Temas detectados</h3>
          <p className="text-sm text-slate-500">Análisis de Sentimiento</p>
        </div>
        <Badge className="rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Demo</Badge>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Diagrama circular */}
            <motion.div
              className="md:col-span-3 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip formatter={(value: number, name: string) => [porcentaje(value as number), name]} />
                    <Pie
                      data={dataSentimiento}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      startAngle={90}
                      endAngle={-270}
                      label={({ value, name }) => `${name} ${porcentaje(value as number)}`}
                    >
                      {dataSentimiento.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Métricas al lado del diagrama */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Total de reseñas analizadas</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{totalResenas.toLocaleString()}</p>
              </div>

              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Puntuación media</p>
                  <Star className="h-4 w-4" />
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-semibold text-slate-900">{puntuacionMedia.toFixed(1)}</p>
                  <span className="text-sm text-slate-500">/ 5</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">Basado en los últimos 6 meses</span>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Evolución</p>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dataEvolucion} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis domain={[3.5, 5]} tickLine={false} axisLine={false} allowDecimals fontSize={12} />
                      <Tooltip formatter={(value: number) => `${(value as number).toFixed(1)}★`} labelFormatter={(l) => `Mes: ${l}`} />
                      <Line type="monotone" dataKey="rating" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
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

          {/* Leyenda compacta */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {dataSentimiento.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <div className="flex w-full items-center justify-between text-sm">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-medium text-slate-900">{porcentaje(item.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nota */}
      <p className="mt-4 text-xs text-slate-500">
        *Este es un ejemplo con datos ficticios. Integra tu clasificador de sentimiento para resultados reales.
      </p>
    </section>
  );
}
