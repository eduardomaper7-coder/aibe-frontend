'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LoginPage() {
  const router = useRouter()
  const qs = useSearchParams()
  const redirectTo = qs.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const canSubmit = email.length > 5 && password.length >= 6
  const title = useMemo(() => 'Inicia sesión', [])

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setErrorMsg(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.replace(redirectTo)
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'No se pudo iniciar sesión')
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setErrorMsg(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}${redirectTo}` },
      })
      if (error) throw error
      // Redirige a Google automáticamente
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'No se pudo iniciar con Google')
      setLoading(false)
    }
  }

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

      <main className="mx-auto max-w-xl px-4 pb-16">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className={cx(
                'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50',
                loading && 'opacity-70'
              )}
            >
              Continuar con Google
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-slate-400">o</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 focus:ring"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 focus:ring"
              />
            </div>

            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={cx(
                'w-full rounded-xl px-4 py-3 font-semibold text-white transition',
                !canSubmit || loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              )}
            >
              {loading ? 'Entrando…' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            ¿No tienes cuenta?{' '}
            <a className="font-semibold text-indigo-700 hover:underline" href="/registro?plan=basic">
              Regístrate
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}
