// app/Footer.tsx
'use client';

import Link from 'next/link';
import AIBELogo from '@/components/ui/AIBELogo';

export default function Footer() {
  return (
    // 🔥 full-bleed negro (sin márgenes blancos)
    <div className="bleed-black bg-black text-gray-300 border-t border-gray-800 -mb-px pb-[env(safe-area-inset-bottom)]">
      <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <AIBELogo className="h-8 w-auto" />
        </Link>

        {/* Enlaces legales */}
        <nav className="flex flex-wrap justify-center gap-5 md:gap-6 text-sm">
          <Link href="/aviso-legal" className="hover:text-white">Aviso legal</Link>
          <Link href="/politica-privacidad" className="hover:text-white">Política de privacidad</Link>
          <Link href="/terminos-servicio" className="hover:text-white">Términos del servicio</Link>
          <Link href="/contacto" className="hover:text-white">Contacto</Link>
        </nav>

        {/* Idioma y país */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z" />
          </svg>
          <span>España | Español</span>
        </div>
      </footer>

      <div className="text-center text-xs text-gray-500 pb-6 px-6">
        © 2025 AIBE Technologies. Todos los derechos reservados.
      </div>
    </div>
  );
}


