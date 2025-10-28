'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type ApiResponse =
  | { url: string }                   // cuando el backend crea la sesión de Checkout
  | { error: string }                 // si algo falla

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const PRICE_MAP: Record<string, number> = {
  basic: 1.49,
  business: 2.29,
  plus: 6.49,
}

const NAME_MAP: Record<string, string> = {
  basic: 'AIBE Básico',
  business: 'AIBE Business',
  plus: 'AIBE Plus',
}

export default function PagoPage() {
  const qs = useSearchParams()
  const router = useRouter()
  const plan = (qs.get('plan') || 'basic').toLowerCase()

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // ⚙️ 1) Comprueba sesión; 2) pide sesión de Checkout; 3) redirige a Stripe
  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setErrorMsg(null)

      // 1) ¿hay usuario logueado?
      const { data: sessionData } = await supabase.auth.getSession()
      const email = sessionData.session?.user.email
      if (!email) {
        setLoading(false)
        router.replace(`/registro?plan=${encodeURIComponent(plan)}`)
        return
      }

      // 2) solicita al backend crear la sesión de Checkout con trial de 3 días
      try {
        const res = await fetch('/api/stripe/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, customerEmail: email }),
        })

        const data: ApiResponse = await res.json()

        if (!res.ok) {
          throw new Error(('error' in data && data.error) || 'No se pudo iniciar el pago')
        }

        // 3) Redirige a la pasarela de Stripe
        if ('url' in data && data.url) {
          window.location.assign(data.url)
          return
        }

        throw new Error('La API no devolvió la URL de Checkout.')
      } catch (err: any) {
        if (!mounted) return
        setErrorMsg(err?.message || 'Error creando la sesión de pago')
        setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [plan, router])

  const priceMonthly = useMemo(() => PRICE_MAP[plan] ?? PRICE_MAP.basic, [plan])
  const planName = useMemo(() => NAME_MAP[plan] ?? NAME_MAP.basic, [plan])

  if (loading) {
    return (
      <PageShell>
        <ResumenPedido planName={planName} priceMonthly={priceMonthly} />
        <SkeletonResumen />
        <p className="mt-6 text-slate-600">Redirigiendo a pago seguro de Stripe…</p>
      </PageShell>
    )
  }

  if (errorMsg) {
    return (
      <PageShell>
        <ResumenPedido planName={planName} priceMonthly={priceMonthly} />
        <p className="mt-6 text-red-600 whitespace-pre-wrap">{errorMsg}</p>
        <div className="mt-4 flex gap-3">
          <a
            className="rounded-xl px-4 py-2 bg-slate-900 text-white"
            href={`/pago?plan=${encodeURIComponent(plan)}`}
          >
            Reintentar
          </a>
          <a
            className="rounded-xl px-4 py-2 border border-slate-300"
            href={`/registro?plan=${encodeURIComponent(plan)}`}
          >
            Cambiar de cuenta
          </a>
        </div>
      </PageShell>
    )
  }

  // Nunca llegamos aquí porque redirigimos a Stripe; se deja por seguridad.
  return (
    <PageShell>
      <ResumenPedido planName={planName} priceMonthly={priceMonthly} />
      <p className="mt-6 text-slate-600">Abriendo Stripe…</p>
    </PageShell>
  )
}

/* ——————————————————————————————————————————————————————— */

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[hsl(250,60%,98%)]">
      <header className="mx-auto max-w-5xl px-4 py-6">
        <button
          className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:underline"
          onClick={() => history.back()}
        >
          <span className="text-xl">←</span> Volver
        </button>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Empieza gratis</h2>
          <p className="mt-1 text-slate-700">3 días gratis – sin compromiso.</p>
          <p className="text-slate-700">Cancela en cualquier momento.</p>
          {children}
        </section>
      </main>
    </div>
  )
}

function ResumenPedido({ planName, priceMonthly }: { planName: string; priceMonthly: number }) {
  const fmt = useMemo(() => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }), [])
  return (
    <aside className="mt-6 rounded-2xl border border-slate-200 p-5 bg-white">
      <h3 className="text-lg font-semibold text-slate-900">Resumen del pedido</h3>
      <dl className="mt-4 space-y-2 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <dt>Plan</dt>
          <dd className="font-medium">{planName}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Primeros 3 días</dt>
          <dd className="font-medium">{fmt.format(0)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Después</dt>
          <dd className="font-medium">{fmt.format(priceMonthly)}/mes</dd>
        </div>
        <div className="mt-3 h-px bg-slate-200" />
        <div className="flex items-center justify-between text-base">
          <dt className="font-semibold">A pagar ahora</dt>
          <dd className="font-extrabold">{fmt.format(0)}</dd>
        </div>
      </dl>
    </aside>
  )
}

function SkeletonResumen() {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 p-5 bg-white animate-pulse">
      <div className="h-4 w-1/3 bg-slate-200 rounded" />
      <div className="mt-3 h-3 w-full bg-slate-200 rounded" />
      <div className="mt-2 h-3 w-5/6 bg-slate-200 rounded" />
      <div className="mt-2 h-3 w-2/3 bg-slate-200 rounded" />
    </div>
  )
}
