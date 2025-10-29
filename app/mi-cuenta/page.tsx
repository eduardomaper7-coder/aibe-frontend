'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function MiCuentaInner() {
  const router = useRouter();
  const qs = useSearchParams();
  const redirectTo = qs.get('redirect') || '/';

  const [checking, setChecking] = useState(true);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user.email ?? null;
      setSessionEmail(email);
      setChecking(false);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  if (checking) {
    return (
      <div className="min-h-[100dvh] grid place-items-center bg-[hsl(250,60%,98%)]">
        <p className="text-slate-600">Cargando…</p>
      </div>
    );
  }

  if (sessionEmail) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[hsl(250,60%,98%)] px-4">
        <div className="max-w-lg w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Tu cuenta</h1>
          <p className="mt-2 text-slate-600">
            Sesión iniciada como <span className="font-semibold">{sessionEmail}</span>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={redirectTo} className="px-5 py-3 rounded-xl bg-slate-900 text-white shadow hover:shadow-md">
              Ir al inicio
            </Link>
            <Link href="/pago?plan=basic" className="px-5 py-3 rounded-xl border border-slate-300">
              Ir a pagos
            </Link>
            <button onClick={handleLogout} className="px-5 py-3 rounded-xl border border-slate-300">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[hsl(250,60%,98%)] px-4">
      <div className="max-w-lg w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Mi cuenta</h1>
        <p className="mt-2 text-slate-600">Accede a tu cuenta o crea una nueva.</p>

        <div className="mt-8 grid gap-3">
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
            className="w-full px-5 py-3 rounded-xl bg-slate-900 text-white font-medium shadow hover:shadow-md"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro?plan=basic"
            className="w-full px-5 py-3 rounded-xl border border-slate-300 font-medium"
          >
            Registrarme
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500">¿Problemas? Escríbenos desde la sección de contacto.</p>
      </div>
    </div>
  );
}

export default function MiCuentaPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] grid place-items-center">cargando…</div>}>
      <MiCuentaInner />
    </Suspense>
  );
}

// evita prerender estático si lo necesitas
export const dynamic = 'force-dynamic';
