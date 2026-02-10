'use client';




import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useParams } from "next/navigation";




export default function GlobalTopbar() {
  const [solid, setSolid] = useState(false);


const params = useParams();
const locale = String((params as any)?.locale ?? "es");



  useEffect(() => {
    const setByScroll = () => {
      const y =
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setSolid(y > 8);
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
  className={`topbar ${solid ? 'topbar--solid' : ''}`}
  aria-label="Navegación principal"
>




        {/* IZQUIERDA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 2vw, 32px)',
            marginLeft: 'clamp(8px, 2vw, 24px)',
          }}
        >
          <Link
            href="/"
            className="brand-logo brand-logo--text flex items-center gap-2"
            aria-label="Inicio"
          >
            <div
              className="logo-icon flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"
              style={{
                width: 'clamp(26px,3vw,36px)',
                height: 'clamp(26px,3vw,36px)',
                marginTop: '2px',
              }}
            >
              <span
                className="text-white font-semibold leading-none"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(11px,1.4vw,15px)',
                }}
              >
                AI
              </span>
            </div>




            <div className="flex flex-col leading-[1.05] justify-center">
              <div className="flex items-baseline gap-[6px]">
                <span
                  className="text-white font-bold tracking-tight"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(16px,2.4vw,26px)',
                  }}
                >
                  AIBE
                </span>
                <span
                  className="text-white font-light"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(12px,1.2vw,17px)',
                  }}
                >
                  Technologies
                </span>
              </div>
              <span
                className="text-gray-300 font-light mt-[1px]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(9px,0.85vw,12px)',
                  opacity: 0.9,
                }}
              >
                Artificial Intelligence for Business Efficiency
              </span>
            </div>
          </Link>




          {/* ENLACES NUEVOS */}
          <nav className="nav-inline" aria-label="Menú principal">
  <Link href={`/${locale}/contact`} className="nav-link">Contacto</Link>
  <Link href={`/${locale}/privacy`} className="nav-link">Privacidad</Link>
  <Link href={`/${locale}/terms`} className="nav-link">Términos</Link>
</nav>


        </div>




        {/* DERECHA */}
        <div
          className="actions"
          style={{
            display: 'flex',
            gap: 24, /* más separación */
            alignItems: 'center',
          }}
        >




          






         




        </div>
      </header>




      <style jsx global>{`
        #global-topbar .nav-inline {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2vw, 24px);
          white-space: nowrap;
        }




        /* Enlaces 100% blancos */
        .nav-link {
          color: #ffffff !important;
          font-size: 0.95rem;
          font-family: Inter, sans-serif;
          font-weight: 400;
          opacity: 1 !important; /* sin transparencia */
          transition: color 0.2s ease;
        }
/* BOTÓN INICIAR SESIÓN */
.login-button {
  background: #ffffff;
  color: #000000 !important;
  font-family: Inter, sans-serif;
  font-weight: 500;


  padding: 12px 22px;
  border-radius: 999px; /* bordes bien redondos */
  font-size: 1.05rem;   /* más grande que los links */


  display: inline-flex;
  align-items: center;
  justify-content: center;


  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}


/* Hover */
.login-button:hover {
  background: #f2f2f2;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}


/* Active (clic) */
.login-button:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}




        .nav-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }




        @media (max-width: 700px) {
          #global-topbar .nav-inline {
            display: none;
          }
        }
          /* === MODO MÓVIL: Iniciar sesión como link === */
@media (max-width: 640px) {
  .login-button {
    background: transparent;
    color: #ffffff !important;


    padding: 0;
    border-radius: 0;
    font-size: 0.95rem;


    box-shadow: none;
    transform: none;


    text-decoration: underline;
    text-underline-offset: 4px;
  }


  .login-button:hover {
    background: transparent;
    box-shadow: none;
    transform: none;
    text-decoration: underline;
  }
}


      `}</style>
    </>
  );
}
