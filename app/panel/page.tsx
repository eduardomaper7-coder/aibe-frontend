"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import TemasSection from './analisis/temas/TemasSection'
import SentimientoSection from './analisis/sentimiento/sentimiento'
import OportunidadesSection from './analisis/oportunidades/oportunidades'
import VolumenSection from './analisis/volumen/volumen'
import RespuestasSection from './analisis/respuestas/respuestas'

import Footer from '../Footer'

import { Calendar, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

import PanelHeader from "./PanelHeader";

export const dynamic = "force-dynamic";

import { Suspense } from "react";

/** -------- PANEL PRINCIPAL -------- */
function PanelUI() {
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '')

  useEffect(() => {
    if (!jobId) return;

    // 🔹 1. Nombre del negocio → BACKEND
    fetch(`${API_BASE}/jobs/${jobId}/meta`)
      .then(res => res.json())
      .then(data => {
        if (data?.place_name) {
          setPlaceName(data.place_name);
        }
      });

    // 🔹 2. Usuario → Supabase
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [jobId]);

  if (!jobId) {
    return (
      <div className="p-8 text-slate-600">
        Aún no tienes ningún análisis.
        <br />
        Empieza creando uno nuevo.
      </div>
    );
  }

  console.log("API_BASE:", API_BASE);
  console.log(">>> 🧪 API_BASE =", API_BASE);

  const router = useRouter();

  /** ---------------- Periodos ---------------- */
  type PeriodKey = '7d' | '30d' | '3m' | '6m' | '1y' | 'all'

  const [period, setPeriod] = useState<PeriodKey>('all')
  const [customFrom, setCustomFrom] = useState<string>('')
  const [customTo, setCustomTo] = useState<string>('')

  const [showPeriodMenu, setShowPeriodMenu] = useState(false)
  const [showCustomMenu, setShowCustomMenu] = useState(false)

  const todayLocal = () => new Date().toLocaleDateString('en-CA')

  const { startLabel, endLabel, fromDate, toDate } = useMemo(() => {
    if (customFrom && customTo) {
      return {
        startLabel: customFrom,
        endLabel: customTo,
        fromDate: customFrom,
        toDate: customTo,
      }
    }

    const endDate = new Date()
    const startDate = new Date(endDate)

    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break
      case '3m':
        startDate.setMonth(endDate.getMonth() - 3);
        break
      case '6m':
        startDate.setMonth(endDate.getMonth() - 6);
        break
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break
      case 'all':
        return {
          startLabel: 'histórico',
          endLabel: endDate.toLocaleDateString('en-CA'),
          fromDate: null,
          toDate: endDate.toLocaleDateString('en-CA'),
        }
    }

    const fmt = (d: Date) => d.toLocaleDateString('en-CA')

    return {
      startLabel: fmt(startDate),
      endLabel: fmt(endDate),
      fromDate: fmt(startDate),
      toDate: fmt(endDate),
    }
  }, [period, customFrom, customTo])

  const bucket: 'day' | 'week' | 'month' = useMemo(() => {
    if (customFrom && customTo) return 'day'
    if (period === '7d') return 'day'
    if (period === '30d' || period === '3m') return 'week'
    return 'month'
  }, [period, customFrom, customTo])

  const selectPeriod = (p: PeriodKey) => {
    setPeriod(p)
    setCustomFrom('')
    setCustomTo('')
    setShowPeriodMenu(false)
  }

  const applyCustom = () => setShowCustomMenu(false)

  const clearCustom = () => {
    setCustomFrom('')
    setCustomTo('')
    setShowCustomMenu(false)
  }

  /* ========== RETURN COMPLETO ========== */
  return (
    <div className="text-black bg-white min-h-screen">
      <div className="w-full pb-0">
        <div className="px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mb-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Te damos la bienvenida,
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">
                  {placeName || "Tu negocio"}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  analizando reseñas del{" "}
                  <span className="font-medium">{startLabel}</span> al{" "}
                  <span className="font-medium">{endLabel}</span>
                </p>
              </div>

              {/* CONTROLES DE PERIODO */}
              <div className="relative flex flex-wrap items-center gap-2 bg-white rounded-xl p-3 shadow-sm border border-slate-200">

                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">
                    {startLabel} → {endLabel}
                  </span>
                </div>

                {/* BOTÓN PERIODO */}
                <div className="relative">
                  <Button
                    variant="outline"
                    className="rounded-2xl text-slate-800 bg-white border-slate-300"
                    onClick={() => {
                      setShowPeriodMenu(v => !v)
                      setShowCustomMenu(false)
                    }}
                  >
                    {period === '7d' && 'Periodo: 7 días'}
                    {period === '30d' && 'Periodo: 1 mes'}
                    {period === '3m' && 'Periodo: 3 meses'}
                    {period === '6m' && 'Periodo: 6 meses'}
                    {period === '1y' && 'Periodo: 1 año'}
                    {period === 'all' && 'Periodo: histórico'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>

                  {showPeriodMenu && (
                    <Card className="absolute right-0 z-20 mt-2 w-56 shadow-lg bg-white border">
                      <CardContent className="p-1 text-slate-800">
                        <ul className="text-sm">
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('7d')}>Últimos 7 días</button></li>
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('30d')}>1 mes</button></li>
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('3m')}>3 meses</button></li>
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('6m')}>6 meses</button></li>
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('1y')}>1 año</button></li>
                          <li><button className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg" onClick={() => selectPeriod('all')}>Histórico</button></li>
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* BOTÓN PERSONALIZADO */}
                <div className="relative">
                  <Button
                    variant="outline"
                    className="rounded-2xl text-slate-800 bg-white border-slate-300"
                    onClick={() => {
                      setShowCustomMenu(v => !v)
                      setShowPeriodMenu(false)
                    }}
                  >
                    {customFrom && customTo
                      ? `Personalizado: ${customFrom} → ${customTo}`
                      : "Personalizado"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>

                  {showCustomMenu && (
                    <Card className="absolute right-0 z-20 mt-2 w-64 shadow-lg bg-white border">
                      <CardContent className="p-3 text-slate-800">
                        <div className="space-y-3">
                          <label className="block text-xs font-medium text-slate-600">Desde</label>
                          <input
                            type="date"
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            value={customFrom}
                            max={customTo || todayLocal()}
                            onChange={(e) => setCustomFrom(e.target.value)}
                          />

                          <label className="block text-xs font-medium text-slate-600">Hasta</label>
                          <input
                            type="date"
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            value={customTo}
                            min={customFrom || undefined}
                            max={todayLocal()}
                            onChange={(e) => setCustomTo(e.target.value)}
                          />

                          <div className="flex items-center justify-between">
                            <Button
                              variant="default"
                              className="rounded-xl"
                              onClick={applyCustom}
                              disabled={!(customFrom && customTo && customFrom <= customTo)}
                            >
                              Aplicar
                            </Button>

                            <Button
                              variant="ghost"
                              className="rounded-xl text-slate-600"
                              onClick={clearCustom}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Borrar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* SECCIONES */}
        <section id="temas" className="mt-8 px-4 sm:px-6 lg:px-8">
          <TemasSection jobId={jobId} fromDate={fromDate} toDate={toDate} />
        </section>

        <section id="sentimiento" className="mt-10 px-4 sm:px-6 lg:px-8">
          <SentimientoSection jobId={jobId} fromDate={fromDate} toDate={toDate} bucket={bucket} />
        </section>

        <section id="volumen" className="mt-8 px-4 sm:px-6 lg:px-8">
          <VolumenSection jobId={jobId} fromDate={fromDate} toDate={toDate} bucket={period === "7d" ? "day" : period === "30d" ? "week" : "month"} />
        </section>

        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-slate-100">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <section id="oportunidades">
              <OportunidadesSection jobId={jobId} fromDate={fromDate} toDate={toDate} />
            </section>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-blue-100">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-10">
            <section id="respuestas">
              <RespuestasSection jobId={Number(jobId)} />
            </section>
          </div>
        </div>

      </div>

      {/* Sticky CTA Guardar análisis */}
      {!user && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-lg p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                🔒 Guardar análisis gratis
              </p>
              <p className="text-xs text-slate-600">
                Crea una cuenta y accede a este análisis cuando quieras.
              </p>
            </div>
            <a
              href={`/registro?job_id=${jobId}`}
              className="shrink-0 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Crear cuenta gratis
            </a>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <PanelHeader />
      <Suspense fallback={<div>Cargando panel…</div>}>
        <PanelUI />
      </Suspense>
    </>
  );
}
