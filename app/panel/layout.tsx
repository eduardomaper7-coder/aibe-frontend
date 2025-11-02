import Link from 'next/link'
import type { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    // Full-bleed: sin fondo gris, ocupa todo el ancho
    <div className="min-h-[100dvh] bg-white">
      {/* Topbar full-bleed */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          {/* Izquierda: logo + marca + tagline */}
          <Link href="/panel" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
              A
            </span>
            <span className="leading-tight">
              <div className="font-semibold">AIBE Technologies</div>
              <div className="text-xs text-slate-500">
                Artificial Intelligence for Business Efficiency
              </div>
            </span>
          </Link>

          {/* Derecha: volver a la web + avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
            >
              Volver a la web
            </Link>
            <button
              aria-label="Perfil"
              className="h-9 w-9 rounded-full border bg-white grid place-items-center text-slate-600 hover:bg-slate-50"
            >
              {/* avatar genérico */}
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido full-bleed (solo padding lateral) */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
