// app/GlobalTopbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GlobalTopbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const setByScroll = () => {
      const y =
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setSolid(y > 0);
    };

    setByScroll();
    const raf = requestAnimationFrame(setByScroll);

    window.addEventListener('scroll', setByScroll, { passive: true });
    window.addEventListener('resize', setByScroll);
    window.addEventListener('pageshow', setByScroll);
    window.addEventListener('load', setByScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', setByScroll);
      window.removeEventListener('resize', setByScroll);
      window.removeEventListener('pageshow', setByScroll);
      window.removeEventListener('load', setByScroll);
    };
  }, []);

  return (
    <>
      <header
        id="global-topbar"
        className="topbar"
        aria-label="Navegación principal"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 'var(--topbar-h, 64px)',
          zIndex: 2147483647,
          isolation: 'isolate',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(12px, 2vw, 24px)',
          background: solid ? 'rgba(0,0,0,1)' : 'transparent',
          borderBottom: solid ? '1px solid rgba(255,255,255,.08)' : '1px solid transparent',
          boxShadow: solid ? '0 10px 20px rgba(0,0,0,.25)' : 'none',
          transition: 'background .28s ease, border-color .28s ease, box-shadow .28s ease',
        }}
      >
        {/* IZQUIERDA: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 28px)', marginLeft: 'clamp(8px, 2vw, 24px)' }}>
          <Link href="/" className="brand-logo brand-logo--text flex items-center gap-2" aria-label="Inicio">
            <div className="logo-icon flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"
                 style={{ width: 'clamp(26px,3vw,36px)', height: 'clamp(26px,3vw,36px)', marginTop: '2px' }}>
              <span className="text-white font-semibold leading-none"
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(11px,1.4vw,15px)' }}>
                AI
              </span>
            </div>
            <div className="flex flex-col leading-[1.05] justify-center">
              <div className="flex items-baseline gap-[6px]">
                <span className="text-white font-bold tracking-tight"
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(16px,2.4vw,26px)' }}>
                  AIBE
                </span>
                <span className="text-white font-light"
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(12px,1.2vw,17px)' }}>
                  Technologies
                </span>
              </div>
              <span className="text-gray-300 font-light mt-[1px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(9px,0.85vw,12px)', opacity: 0.9 }}>
                Artificial Intelligence for Business Efficiency
              </span>
            </div>
          </Link>

          {/* Se elimina el menú con "Contacto" */}
          <nav className="nav-inline" aria-label="Menú principal" />
        </div>

        {/* DERECHA */}
        <div className="actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Botón ahora apunta a /contacto */}
          <Link href="/contact" className="btn">Contáctanos</Link>

        </div>
      </header>

      <style jsx global>{`
        #global-topbar .nav-inline { display: flex; align-items: center; gap: clamp(14px, 2vw, 22px); white-space: nowrap; }
        #global-topbar .brand-logo--text { align-items: center; gap: 0.5rem; line-height: 1; }
        #global-topbar .brand-logo--text span { display: inline-block; }
        #global-topbar .logo-icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        @media (max-width: 900px) { #global-topbar .nav-inline { display: none; } }
      `}</style>
    </>
  );
}
