'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Componente que usa useSearchParams: debe ir dentro de <Suspense> */
function LoginInner() {
  const router = useRouter();
  const qs = useSearchParams();

  // Si no viene, por defecto enviamos al panel
  const redirectParam = qs.get('redirect') || '/panel';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit = email.length > 5 && password.length >= 6;
  const title = useMemo(() => 'Inicia sesión', []);

  async function checkSubscriptionActive() {
    // Tu endpoint debe devolver { active: boolean }
    const r = await fetch('/api/stripe/subscription-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!r.ok) return false;
    const j = await r.json();
    return !!j?.active;
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      // 1) Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // 2) Asegura que hay sesión en el cliente
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) throw new Error('No se pudo crear la sesión');

      // 3) Comprueba suscripción en tu backend
      const active = await checkSubscriptionActive();
      if (!active) {
        setErrorMsg(
          'Tu suscripción no está activa. Si crees que es un error, contacta con soporte o reactiva tu plan.'
        );
        return; // no redirigimos
      }

      // 4) Adelante
      router.replace(redirectParam);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo iniciar sesión';
      setErrorMsg(msg);
    } finally {
      setLoading(false); // nunca te quedas en “Entrando…”
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Importante: usamos un callback en servidor para asentar cookies
      const callbackUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(
        redirectParam
      )}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          // scopes: 'email profile openid', // opcional
        },
      });
      if (error) throw error;

      // El navegador será redirigido al callback, no seguimos aquí
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo iniciar con Google';
      setErrorMsg(msg);
      setLoading(false);
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

            {errorMsg && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>
            )}

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
  );
}

/** Página que envuelve con Suspense */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">cargando…</div>}>
      <LoginInner />
    </Suspense>
  );
}

// evita prerender estático si aún lo necesitas
export const dynamic = 'force-dynamic';

