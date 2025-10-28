import Link from 'next/link'
import type { ReactNode } from 'react'

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
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
                <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Layout con sidebar único + contenido */}
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar único */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="sticky top-[76px] rounded-2xl border bg-white p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              Navegación
            </div>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/panel"
                  className="block rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Visión general
                </Link>
              </li>
              <li>
                <Link
                  href="/panel/analisis"
                  className="block rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Análisis de reseñas
                </Link>
              </li>
              <li>
                <Link
                  href="/panel/competidores"
                  className="block rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Competencia
                </Link>
              </li>
              <li>
                <Link
                  href="/panel/configuracion"
                  className="block rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Configuración
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contenido */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          {children}
        </main>
      </div>
    </div>
  )
}



