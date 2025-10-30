'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import {
  BarChart3, LineChart, Bell, TrendingUp, Star, MessageSquare,
  FileText, LogIn, CheckCircle2, PlugZap,
} from 'lucide-react'
import {
  LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, AreaChart, Area,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
      // console.log('postMessage:', e.origin, e.data)  // útil para depurar
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

  // Datos demo
  const ratingSeries = useMemo(() => [
    { name: 'May', rating: 4.0 },
    { name: 'Jun', rating: 4.1 },
    { name: 'Jul', rating: 3.9 },
    { name: 'Ago', rating: 4.2 },
    { name: 'Sep', rating: 4.3 },
    { name: 'Oct', rating: 4.3 },
  ], [])

  const reviewsSeries = useMemo(() => [
    { name: 'Sem 1', count: 22 },
    { name: 'Sem 2', count: 28 },
    { name: 'Sem 3', count: 35 },
    { name: 'Sem 4', count: 43 },
    { name: 'Sem 5', count: 0 },
  ], [])

  const alerts = [
    { title: 'Pico de reseñas negativas', text: "Detectamos un aumento de reseñas con quejas sobre 'tiempos de espera' en la última semana." },
    { title: 'Competencia al alza', text: "Tu competidor directo 'Café Río' incrementó un 25% su volumen de reseñas este mes." },
    { title: 'Oportunidad', text: 'Las menciones de “desayuno” correlacionan con mayor puntuación (+0.4⭐).' },
  ]

  return (
    <div className="pb-12">
      {/* Card de conexión si no está conectado */}
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

      {/* Encabezado principal */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Bienvenido</h1>
          <p className="text-sm opacity-70">Estado de tus reseñas y rendimiento reciente</p>
        </div>
        <div className="flex items-center gap-2">
          <Input type="date" className="h-9 w-[160px]" />
          <Button variant="outline">Periodo</Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" /> Ver informe
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Rating promedio', value: '4.3', delta: '+0.2', icon: <Star className="h-5 w-5" /> },
          { title: 'Reseñas nuevas (30d)', value: '128', delta: '+12%', icon: <MessageSquare className="h-5 w-5" /> },
          { title: 'Sentimiento positivo', value: '76%', delta: '+4pp', icon: <TrendingUp className="h-5 w-5" /> },
          { title: 'Respuestas IA enviadas', value: '121', delta: '+100%', icon: <PlugZap className="h-5 w-5" /> },
        ].map(k => (
          <Card key={k.title} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-80">{k.title}</CardTitle>
                <div className="rounded-xl bg-muted p-2">{k.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end justify-between">
                <div className="text-2xl font-semibold">{k.value}</div>
                <Badge variant="outline">{k.delta}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <LineChart className="h-4 w-4" /> Evolución del rating (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={ratingSeries} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[3.0, 5.0]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rating" dot={false} strokeWidth={2} />
              </RLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <BarChart3 className="h-4 w-4" /> Reseñas por semana (últimas 5)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewsSeries} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
                <defs>
                  <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopOpacity={0.3} />
                    <stop offset="95%" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="count" strokeWidth={2} fill="url(#fillCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Dos columnas */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Bell className="h-4 w-4" /> Alertas inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {alerts.map(a => (
              <div key={a.title} className="rounded-xl border p-3">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-sm opacity-70">{a.text}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-4 w-4" /> Últimas respuestas automáticas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl border p-3">
                <div className="mb-1 text-[13px] font-medium opacity-70">Reseña #{i}</div>
                <div className="text-sm">
                  <span className="font-medium">IA:</span> ¡Gracias por tu visita! Nos alegra que disfrutaras de la experiencia. Tu comentario nos ayuda a mejorar.
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
