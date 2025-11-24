"use client";


import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, LogIn, ChevronDown, X } from 'lucide-react'
import PanelShell from "./PanelShell";
import PaymentPopup from "@/components/ui/PaymentPopup";



import PanelUserFlow from "./components/PanelUserFlow";
import TemasSection from './analisis/temas/TemasSection'
import SentimientoSection from './analisis/sentimiento/sentimiento'

import OportunidadesSection from './analisis/oportunidades/oportunidades'
import VolumenSection from './analisis/volumen/volumen'
import RespuestasSection from './analisis/respuestas/respuestas'
import Footer from '../Footer'
import IsolatedPortal from "./components/isolatedPortal";





/** -------- PANEL PRINCIPAL -------- */
function PanelUI() {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '')
  console.log("API_BASE:", API_BASE);
  console.log(">>> 🧪 API_BASE =", API_BASE);




  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const popupRef = useRef<Window | null>(null)


  /* 🌟 1. Email usuario */
  const [sessionUserEmail, setSessionUserEmail] = useState("")
  const [sessionUserId, setSessionUserId] = useState("")

  const [hasPayment, setHasPayment] = useState<boolean | null>(null);
const [showPaymentPopup, setShowPaymentPopup] = useState(false);


  useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setSessionUserEmail(data.user?.email ?? "")
    setSessionUserId(data.user?.id ?? "")
  })
}, [])




  /* 🌟 2. Aprobación usuario */
  const [approval, setApproval] = useState<null | boolean>(null)
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setApproval(false)
        return
      }
      const { data: profile } = await supabase
  .from("profiles")
  .select("approved, has_payment_method")
  .eq("id", session.user.id)
  .single()

setApproval(profile?.approved ?? false)
setHasPayment(profile?.has_payment_method ?? false)

// Mostrar popup si está aprobado pero NO tiene tarjeta guardada
if (profile?.approved === true && profile?.has_payment_method === false) {
  setShowPaymentPopup(true)
}

    })()
  }, [])


  /* -------- Conexión Google OAuth -------- */
  const checkStatus = async () => {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email?.toLowerCase()
    if (!email || !API_BASE) {
      setIsConnected(false)
      return
    }


    try {
      const res = await fetch(`${API_BASE}/auth/google/status?email=${encodeURIComponent(email)}`, { cache: 'no-store' })
      const json = await res.json().catch(() => ({}))
      setIsConnected(Boolean(json?.connected))
    } catch {
      setIsConnected(false)
    }
  }


  useEffect(() => {
    checkStatus()
    const onFocus = () => checkStatus()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])


  const openGooglePopup = async () => {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email?.toLowerCase()


    if (!email) return alert('No hay sesión de usuario.')
    if (!API_BASE) return alert('NEXT_PUBLIC_API_URL falta.')


    const w = window.open(
      `${API_BASE}/auth/google/login?email=${encodeURIComponent(email)}`,
      'google_oauth',
      'width=480,height=640,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    )


    popupRef.current = w
    if (!w) return alert("Permite ventanas emergentes.")


    setIsConnecting(true)


    const backendOrigin = (() => {
      try {
        return new URL(API_BASE).origin
      } catch {
        return ""
      }
    })()


    const onMessage = (e: MessageEvent) => {
      if (!e.data || e.data.type !== "oauth-complete") return
      if (e.origin !== backendOrigin) return


      try { popupRef.current?.close() } catch {}


      window.removeEventListener("message", onMessage)
      setIsConnecting(false)


      if (e.data.ok) {
        setIsConnected(true)
        setTimeout(checkStatus, 300)
      } else {
        setIsConnected(false)
        alert("Error al conectar.")
      }
    }


    window.addEventListener("message", onMessage)


    const poll = window.setInterval(() => {
      if (!w || w.closed) {
        window.clearInterval(poll)
        window.removeEventListener("message", onMessage)
        setIsConnecting(false)
        checkStatus()
      }
    }, 700)
  }


  /** ---------------- Periodos ---------------- */
  type PeriodKey = '7d' | '30d' | '3m' | '6m' | '1y' | 'all'


  const [period, setPeriod] = useState<PeriodKey>('7d')
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
      case '7d': startDate.setDate(endDate.getDate() - 7); break
      case '30d': startDate.setDate(endDate.getDate() - 30); break
      case '3m': startDate.setMonth(endDate.getMonth() - 3); break
      case '6m': startDate.setMonth(endDate.getMonth() - 6); break
      case '1y': startDate.setFullYear(endDate.getFullYear() - 1); break
      case 'all': return {
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


  // 🔍 DEBUG ESTADOS QUE CONTROLAN EL DIFUMINADO
  console.log("🔥 approval =", approval);
  console.log("🔥 isConnected =", isConnected);



  /* ========== RETURN COMPLETO ========== */
  return (
    <div className="text-black bg-white min-h-screen">
      <div className="w-full pb-0">
        <div className="px-4 sm:px-6 lg:px-8">


          {/* SOLO mostramos PanelUserFlow cuando haga falta:  
   - Usuario NO aprobado  
   - Usuario aprobado PERO sin método de pago
*/}
{approval !== null && approval === false && (
  <IsolatedPortal>
    <PanelUserFlow
      user={{
        id: sessionUserId,
        email: sessionUserEmail,
        approved: approval,
      }}
    />
  </IsolatedPortal>
)}

<PaymentPopup
  open={showPaymentPopup}
  onClose={() => setShowPaymentPopup(false)}
/>






          {/* Banner Google */}
          {!isConnected && (
            <Card className="mb-4 border-dashed shadow-sm">
              <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Conecta Google</div>
                    <p className="text-sm opacity-70">
                      Importaremos tus reseñas y activaremos respuestas automáticas.
                    </p>
                  </div>
                </div>
                <Button
                  className="gap-2 rounded-2xl shadow-sm"
                  disabled={isConnecting}
                  onClick={openGooglePopup}
                >
                  <LogIn className="h-4 w-4" />
                  {isConnecting ? "Conectando…" : "Conectar Google OAuth"}
                </Button>
              </CardContent>
            </Card>
          )}


          {/* Contenido del panel */}
          <div className="relative">
            {!isConnected && approval === true && (
              <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
                <div className="text-center text-slate-600">
                  <p className="font-medium">Aún no podemos extraer información</p>
                  <p className="mt-1 text-sm opacity-70">Conecta Google OAuth (≈2 minutos)</p>
                </div>
              </div>
            )}


<div className={!isConnected ? "blur-sm select-none opacity-60" : ""}>




              {/* HEADER */}
              <div className="mb-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">


                  <div>
                    <p className="text-sm font-medium text-slate-500">Te damos la bienvenida,</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Restaurante Madrid</h1>
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
                      <span className="text-xs">{startLabel} → {endLabel}</span>
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
                                  <X className="mr-1 h-4 w-4" /> Borrar
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


              {/* SECCIONES */}
              <section id="temas" className="mt-8 px-4 sm:px-6 lg:px-8">
                <TemasSection fromDate={fromDate} toDate={toDate} />
              </section>


              <section id="sentimiento" className="mt-10 px-4 sm:px-6 lg:px-8">
                <SentimientoSection fromDate={fromDate} toDate={toDate} bucket={bucket} />
              </section>


              <section id="volumen" className="mt-8 px-4 sm:px-6 lg:px-8">
                <VolumenSection
                  fromDate={fromDate}
                  toDate={toDate}
                  bucket={period === "7d" ? "day" : period === "30d" ? "week" : "month"}
                />
              </section>


              <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-slate-100">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                  <section id="oportunidades">
                    <OportunidadesSection fromDate={fromDate} toDate={toDate} />
                  </section>
                </div>
              </div>


              <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-blue-100">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-10">
                  <section id="respuestas">
                    <RespuestasSection />
                  </section>
                </div>
              </div>


            </div>
          </div>


        </div>
      </div>


      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <PanelShell>
      <PanelUI />
    </PanelShell>
  );
}
