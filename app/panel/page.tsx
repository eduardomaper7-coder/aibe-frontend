'use client'


import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, LogIn } from 'lucide-react'


import TemasSection from './analisis/temas/TemasSection'
import SentimientoSection from './analisis/sentimiento/sentimiento'
import OportunidadesSection from './analisis/oportunidades/oportunidades'
import VolumenSection from './analisis/volumen/volumen'
import RespuestasSection from './analisis/respuestas/respuestas'


/** -------- Gate de acceso al panel según tu suscripción en Supabase -------- */
function useAllowPanel() {
  const router = useRouter()
  const [allowed, setAllowed] = useState<null | boolean>(null)


  useEffect(() => {
    let cancel = false
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { if (!cancel) setAllowed(false); router.replace('/login'); return }
      try {
        const res = await fetch('/api/subscription/check', {
          method: 'POST',
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: 'no-store',
        })
        const json = await res.json()
        if (cancel) return
        if (json?.allowed) setAllowed(true)
        else { setAllowed(false); router.replace('/pago?msg=trial') }
      } catch {
        if (!cancel) { setAllowed(false); router.replace('/pago?msg=trial') }
      }
    })()
    return () => { cancel = true }
  }, [router])


  return allowed
}


export default function AIBEPrimaryDashboard() {
  const allowed = useAllowPanel()
  if (allowed === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-white">
        <p className="text-slate-600">Cargando…</p>
      </div>
    )
  }
  if (allowed === false) return null
  return <PanelUI />
}


/** -------- Lógica de conexión Google OAuth -------- */
function PanelUI() {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '')
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const popupRef = useRef<Window | null>(null)


  // chequea el estado en el backend (sin cookies → CORS más simple)
  const checkStatus = async () => {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email?.toLowerCase()
    if (!email || !API_BASE) { setIsConnected(false); return }
    const url = `${API_BASE}/auth/google/status?email=${encodeURIComponent(email)}`
    try {
      const res = await fetch(url, { cache: 'no-store' }) // <- sin credentials
      const json = await res.json().catch(() => ({}))
      setIsConnected(Boolean(json?.connected))
    } catch {
      setIsConnected(false)
    }
  }


  // al montar y al recuperar foco desde el popup
  useEffect(() => {
    checkStatus()
    const onFocus = () => checkStatus()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  // popup
  const openGooglePopup = async () => {
    const { data } = await supabase.auth.getSession()
    const email = data.session?.user?.email?.toLowerCase()
    if (!email) { alert('No hay sesión de usuario.'); return }
    if (!API_BASE) { alert('Falta NEXT_PUBLIC_API_URL en .env.local'); return }


    const url = `${API_BASE}/auth/google/login?email=${encodeURIComponent(email)}`
    const w = window.open(
      url,
      'google_oauth',
      'width=480,height=640,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    )
    popupRef.current = w
    if (!w) { alert('Permite las ventanas emergentes para continuar.'); return }
    setIsConnecting(true)


    const backendOrigin = (() => { try { return new URL(API_BASE).origin } catch { return '' } })()


    const onMessage = (e: MessageEvent) => {
      if (!e?.data || e.data.type !== 'oauth-complete') return
      // acepta solo el origin del backend (Railway u otro)
      if (e.origin !== backendOrigin) return


      try { popupRef.current?.close() } catch {}
      window.removeEventListener('message', onMessage)
      setIsConnecting(false)
      if (e.data.ok) {
        setIsConnected(true)
        setTimeout(() => checkStatus(), 300) // reconfirma contra backend
      } else {
        setIsConnected(false)
        alert('Error al conectar Google.')
      }
    }


    window.addEventListener('message', onMessage)


    // si el usuario cierra el popup sin postMessage
    const poll = window.setInterval(() => {
      if (!w || w.closed) {
        window.clearInterval(poll)
        window.removeEventListener('message', onMessage)
        setIsConnecting(false)
        checkStatus()
      }
    }, 700)
  }


  // periodos (visual)
  type PeriodKey = '7d' | '30d' | '3m' | '1y' | 'all'
  const [period, setPeriod] = useState<PeriodKey>('7d')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const { startLabel, endLabel } = useMemo(() => {
    const fmt = (d: Date) => d.toISOString().slice(0, 10)
    if (customFrom && customTo) return { startLabel: customFrom, endLabel: customTo }
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


  const menu = ['Temas detectados', 'Sentimiento', 'Oportunidades', 'Volumen', 'Respuestas IA']


  return (
    <div className="min-h-screen w-full pb-12 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">


        {/* Banner para conectar */}
        {!isConnected && (
          <Card className="mb-4 border-dashed shadow-sm">
            <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1"><CheckCircle2 className="h-5 w-5 opacity-60" /></div>
                <div>
                  <div className="text-sm font-semibold">Conecta tu cuenta de Google para empezar</div>
                  <p className="text-sm opacity-70">
                    Importaremos tus reseñas y activaremos las respuestas automáticas de IA.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  id="btn-google-card"
                  className="gap-2 rounded-2xl shadow-sm"
                  disabled={isConnecting}
                  onClick={openGooglePopup}
                >
                  <LogIn className="h-4 w-4" />
                  {isConnecting ? 'Conectando…' : 'Conectar Google OAuth'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


        {/* Contenido con blur si no está conectado */}
        <div className="relative">
          {!isConnected && (
            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
              <div className="text-center text-slate-600">
                <p className="font-medium">Todavía no podemos extraer información de tu negocio</p>
                <p className="mt-1 text-sm opacity-70">Conecta Google OAuth (≈2 minutos)</p>
              </div>
            </div>
          )}


          <div className={!isConnected ? 'blur-sm select-none opacity-60' : ''}>
            <nav className="mb-6 w-full flex justify-center gap-6">
              {menu.map((item) => (
                <button
                  key={item}
                  className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition"
                >
                  {item}
                </button>
              ))}
            </nav>


            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium text-slate-500">Te damos la bienvenida,</p>
                <h1 className="text-3xl font-semibold text-slate-900">Hotel RIU Gran Canaria</h1>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-xs text-slate-600">{startLabel} → {endLabel}</span>
              </div>
            </div>


            <section id="temas"><TemasSection /></section>
            <section id="sentimiento" className="mt-10"><SentimientoSection /></section>
            <section id="oportunidades" className="mt-10"><OportunidadesSection /></section>
            <section id="volumen" className="mt-10"><VolumenSection /></section>
            <section id="respuestas" className="mt-10"><RespuestasSection /></section>
          </div>
        </div>
      </div>
    </div>
  )
}
