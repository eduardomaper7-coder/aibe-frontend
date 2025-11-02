'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { LogIn, CheckCircle2, ChevronDown, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import TemasSection from './analisis/temas/TemasSection'

function useAllowPanel() {
  const router = useRouter()
  const [allowed, setAllowed] = useState<null | boolean>(null)

  useEffect(() => {
    let cancelled = false
    let unsub: { unsubscribe: () => void } | null = null

    async function getSessionRobusta() {
      let { data } = await supabase.auth.getSession()
      if (data.session) return data.session

      const start = Date.now()
      return await new Promise<import('@supabase/supabase-js').Session | null>(resolve => {
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) resolve(s) })
        unsub = sub.subscription
        const poll = setInterval(async () => {
          const userRes = await supabase.auth.getUser()
          if (userRes.data.user) {
            clearInterval(poll)
            supabase.auth.getSession().then(({ data }) => resolve(data.session))
          }
          if (Date.now() - start > 5000) { clearInterval(poll); resolve(null) }
        }, 250)
      })
    }

    async function run() {
      const session = await getSessionRobusta()
      if (cancelled) return
      const email = session?.user?.email?.toLowerCase()
      if (!email) { setAllowed(false); router.replace('/'); return }

      try {
        const res = await fetch('/api/stripe/subscription-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          cache: 'no-store',
        })
        const json = await res.json()
        if (res.ok && json?.active) setAllowed(true)
        else { setAllowed(false); router.replace('/') }
      } catch {
        setAllowed(false); router.replace('/')
      }
    }

    run()
    return () => { cancelled = true; unsub?.unsubscribe?.() }
  }, [router])

  return allowed
}

export default function AIBEPrimaryDashboard() {
  const allowed = useAllowPanel()
  if (allowed === null) return (
    <div className="min-h-screen grid place-items-center bg-white">
      <p className="text-slate-600">Cargando…</p>
    </div>
  )
  if (allowed === false) return null
  return <PanelUI />
}

function PanelUI() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const API = process.env.NEXT_PUBLIC_API_URL!
  const FRONT_ORIGIN = 'https://www.aibetech.es';
  const DEV_ORIGIN = 'http://localhost:3000'
  const isAllowedOrigin = (origin: string) => origin === FRONT_ORIGIN || origin === DEV_ORIGIN

  async function openGooglePopup() {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email?.toLowerCase()
    if (!email) { alert('No hay sesión de usuario.'); return }

    const w = window.open(
      `${API}/auth/google/login?email=${encodeURIComponent(email)}`,
      'google_oauth',
      'width=480,height=640,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    )

    const handler = (e: MessageEvent) => {
      if (!isAllowedOrigin(e.origin)) return
      if (e.data?.type === 'oauth-complete') {
        setIsConnecting(false)
        setIsConnected(!!e.data.ok)
        window.removeEventListener('message', handler)
        try { w?.close() } catch {}
      }
    }

    window.addEventListener('message', handler)
    setIsConnecting(true)
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getSession()
        const email = data.session?.user?.email?.toLowerCase()
        if (!email) return
        const r = await fetch(`${API}/integrations/google/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          cache: 'no-store',
        })
        const j = await r.json()
        if (j?.connected) setIsConnected(true)
      } catch (e) {
        console.error('status check failed', e)
      }
    })()
  }, [API])

  type PeriodKey = '7d' | '30d' | '3m' | '1y' | 'all'
  const [period, setPeriod] = useState<PeriodKey>('7d')
  const [customFrom, setCustomFrom] = useState<string>('')
  const [customTo, setCustomTo] = useState<string>('')
  const [showCustom, setShowCustom] = useState(false)

  const { startLabel, endLabel } = useMemo(() => {
    const fmt = (d: Date) => d.toISOString().slice(0, 10)
    if (customFrom && customTo) { return { startLabel: customFrom, endLabel: customTo } }
    const end = new Date(); let start = new Date()
    switch (period) {
      case '7d': start.setDate(end.getDate() - 7); break
      case '30d': start.setDate(end.getDate() - 30); break
      case '3m': start.setMonth(end.getMonth() - 3); break
      case '1y': start.setFullYear(end.getFullYear() - 1); break
      case 'all': return { startLabel: 'histórico', endLabel: fmt(end) }
    }
    return { startLabel: fmt(start), endLabel: fmt(end) }
  }, [period, customFrom, customTo])

  const menu = ['Temas detectados','Sentimiento','Plan de acción','Media y volumen','Respuestas IA']

  return (
    <div className="min-h-screen w-full pb-12 bg-white">
      {!isConnected && (
        <Card className="mb-4 border-dashed shadow-sm">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 className="h-5 w-5 opacity-60" />
              </div>
              <div>
                <div className="text-sm font-semibold">Conecta tu cuenta de Google para empezar</div>
                <p className="text-sm opacity-70">Importaremos tus reseñas históricas y activaremos las respuestas automáticas de IA.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button id="btn-google-card" className="gap-2 rounded-2xl shadow-sm" disabled={isConnecting} onClick={openGooglePopup}>
                <LogIn className="h-4 w-4" />
                {isConnecting ? 'Conectando…' : 'Conectar Google OAuth'}
              </Button>
              <Button variant="outline" className="rounded-2xl">Saber más</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        {!isConnected && (
          <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-transparent">
            <div className="text-center">
              <p className="text-base font-medium">Todavía no podemos extraer información de tu negocio</p>
              <p className="mt-1 text-sm opacity-70">Conecta Google OAuth (tiempo estimado 2 minutos)</p>
            </div>
          </div>
        )}

        <div className={( !isConnected ? 'blur-sm select-none opacity-60 ' : '' ) + 'px-4 sm:px-6 lg:px-8'}>
          {/* Menú superior */}
          <nav className="mb-6 w-full">
            <div className="flex items-center justify-center gap-6">
              {menu.map((item) => (
                <button
                  key={item}
                  className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition-colors"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>

          {/* Encabezado */}
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-slate-500">Te damos la bienvenida,</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Hotel RIU Gran Canaria</h1>
            </div>

            {/* Controles de periodo */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600">Periodo</span>
                <div className="inline-flex rounded-2xl border bg-white p-1 shadow-sm">
                  {[
                    { key: '7d', label: '7 días' },
                    { key: '30d', label: '30 días' },
                    { key: '3m', label: '3 meses' },
                    { key: '1y', label: '1 año' },
                    { key: 'all', label: 'Histórico' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setPeriod(opt.key as PeriodKey)}
                      className={`px-3 py-1.5 text-sm rounded-xl transition ${
                        period === (opt.key as PeriodKey)
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      type="button"
                      aria-pressed={period === (opt.key as PeriodKey)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-2xl border-slate-300 bg-white hover:bg-slate-50 gap-2"
                  onClick={() => setShowCustom(v => !v)}
                >
                  <Calendar className="h-4 w-4" />
                  Personalizado
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                {showCustom && (
                  <div className="absolute right-0 z-20 mt-2 w-[340px] rounded-2xl border bg-white p-4 shadow-xl">
                    <div className="mb-3 text-sm font-medium text-slate-700">Rango personalizado</div>
                    <div className="flex items-center gap-2">
                      <Input type="date" className="h-9" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                      <span className="text-sm text-slate-500">a</span>
                      <Input type="date" className="h-9" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => { setCustomFrom(''); setCustomTo(''); setShowCustom(false) }}>Cancelar</Button>
                      <Button size="sm" className="rounded-xl" onClick={() => setShowCustom(false)}>Aplicar</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Encabezados de sección */}
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Análisis inteligente de reseñas google</h2>
            <p className="mt-1 text-xs text-slate-500">Analizando reseñas del {startLabel} al {endLabel}.</p>
          </div>

          {/* (opcional) placeholder */}
          {/* <div className="min-h-[220px]" /> */}

          {/* === Temas detectados: renderizado debajo del dashboard === */}
          <TemasSection />
        </div>
      </div>
    </div>
  )
}





