'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { LogIn, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

/** ----- Gate de acceso (tu lógica de suscripción) ----- */
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

/** ====== Página ====== */
export default function AIBEPrimaryDashboard() {
  const allowed = useAllowPanel()
  if (allowed === null) return <div className="min-h-screen grid place-items-center"><p className="text-slate-600">Cargando…</p></div>
  if (allowed === false) return null
  return <PanelUI />
}

/** ----- Panel principal ----- */
function PanelUI() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Backend URL (Railway) — asegúrate de tenerla en Vercel
  const API = process.env.NEXT_PUBLIC_API_URL! // ej. https://web-production-52c49.up.railway.app

  // Debe coincidir con FRONTEND_ORIGIN del backend para postMessage
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

  // Comprobar si ya está conectado (consulta directa al backend)
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

  /** ===================== NUEVO LAYOUT ===================== **/
  type PeriodKey = '7d' | '30d' | '3m' | '1y' | 'all'
  const [period, setPeriod] = useState<PeriodKey>('7d')
  const [customFrom, setCustomFrom] = useState<string>('')
  const [customTo, setCustomTo] = useState<string>('')

  const { startLabel, endLabel } = useMemo(() => {
    // Si hay personalizado completo, usarlo; si no, calcular por período.
    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    if (customFrom && customTo) {
      return { startLabel: customFrom, endLabel: customTo }
    }

    const end = new Date()
    let start = new Date()
    switch (period) {
      case '7d': start.setDate(end.getDate() - 7); break
      case '30d': start.setDate(end.getDate() - 30); break
      case '3m': start.setMonth(end.getMonth() - 3); break
      case '1y': start.setFullYear(end.getFullYear() - 1); break
      case 'all':
        return { startLabel: 'histórico', endLabel: fmt(end) }
    }
    return { startLabel: fmt(start), endLabel: fmt(end) }
  }, [period, customFrom, customTo])

  return (
    <div className="pb-12">
      {/* Card de conexión si no está conectado (NO TOCAR flujo OAuth) */}
      {!isConnected && (
        <Card className="mb-4 border-dashed">
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
              <Button
                id="btn-google-card"
                className="gap-2"
                disabled={isConnecting}
                onClick={openGooglePopup}
              >
                <LogIn className="h-4 w-4" />
                {isConnecting ? 'Conectando…' : 'Conectar Google OAuth'}
              </Button>
              <Button variant="outline">Saber más</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative">
        {/* Si NO conectado, difuminar todo el contenido y mostrar mensaje */}
        {!isConnected && (
          <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center rounded-xl bg-white/70 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-base font-medium">Todavía no podemos extraer información de tu negocio</p>
              <p className="mt-1 text-sm opacity-70">Conecta Google OAuth (tiempo estimado 2 minutos)</p>
            </div>
          </div>
        )}

        <div className={!isConnected ? 'blur-sm select-none opacity-60' : ''}>
          {/* ===== Menú superior ===== */}
          <nav className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border bg-background p-2 text-sm">
            {['Temas detectados','Sentimiento','Plan de acción','Media y volumen','Respuestas IA'].map((item) => (
              <button
                key={item}
                className="rounded-xl px-3 py-1.5 hover:bg-muted"
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* ===== Bienvenida + Selectores de periodo ===== */}
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-lg font-semibold">Te damos la bienvenida Hotel RIU Gran Canaria.</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {/* Selector de Periodo */}
              <div className="flex items-center gap-2">
                <label className="text-sm opacity-70">Selector de Periodo</label>
                <select
                  className="h-9 rounded-md border bg-background px-2 text-sm"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                >
                  <option value="7d">últimos 7 días</option>
                  <option value="30d">30 días</option>
                  <option value="3m">3 meses</option>
                  <option value="1y">1 año</option>
                  <option value="all">histórico</option>
                </select>
              </div>

              {/* Selector Personalizado */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm opacity-70">Personalizado</span>
                <Input
                  type="date"
                  className="h-9 w-[160px]"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                />
                <span className="text-sm">a</span>
                <Input
                  type="date"
                  className="h-9 w-[160px]"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ===== Encabezados de sección ===== */}
          <div className="mb-1">
            <h2 className="text-base font-semibold">Análisis inteligente de reseñas google</h2>
            <p className="mt-1 text-xs opacity-70">Analizando reseñas del {startLabel} al {endLabel}.</p>
          </div>

          {/* ===== Contenido placeholder (sin métricas ni gráficos) ===== */}
          <div className="mt-4 rounded-xl border p-6">
            <p className="text-sm opacity-70">
              Aquí verás el contenido del análisis (temas, sentimiento, plan de acción, medios/volumen y respuestas IA)
              sin mostrar gráficos ni tarjetas de estadísticas. Este espacio se rellenará con los resultados
              de tus reseñas cuando la cuenta esté conectada y existan datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
