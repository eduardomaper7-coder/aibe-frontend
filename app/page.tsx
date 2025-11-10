'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import SeccionResenasIA from '@/components/ui/SeccionResenasIA';
import TemasDemo from '@/components/ui/temasdemo';
import SentimientoDemo from '@/components/ui/sentimientodemo';
import VolumenDemo from '@/components/ui/volumendemo';
import OportunidadesDemo from '@/components/ui/oportunidadesdemo';
import Frases from '@/components/ui/frases';
import Ventajas from '@/components/ui/ventajas';

export default function Home() {
  useEffect(() => {
    const TITLES = [
      'Convierte cada reseña en una oportunidad de crecimiento',
      'Descubre lo que tus clientes realmente piensan.',
      'La IA que transforma tus reseñas en decisiones inteligentes.',
      'Porque cada cliente merece una respuesta única.',
    ];
    const titleEl = document.getElementById('dynamicTitle');
    const slotEl = document.getElementById('titleSlot');
    if (!titleEl || !slotEl) return;

    const probe = document.createElement('div');
    const cs = window.getComputedStyle(titleEl);
    Object.assign(probe.style, {
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: getComputedStyle(slotEl).width,
      font: cs.font,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      whiteSpace: 'normal',
      display: 'block',
    } as CSSStyleDeclaration);
    document.body.appendChild(probe);
    let max = 0;
    TITLES.forEach((t) => {
      probe.textContent = t;
      max = Math.max(max, probe.getBoundingClientRect().height);
    });
    document.body.removeChild(probe);
    slotEl.style.setProperty('--title-height', Math.ceil(max + 8) + 'px');

    let i = 0;
    function show(index: number) {
      const nextText = TITLES[index % TITLES.length];
      titleEl.classList.remove('fade-enter', 'fade-enter-active');
      titleEl.classList.add('fade-exit');
      requestAnimationFrame(() => {
        titleEl.classList.add('fade-exit-active');
        setTimeout(() => {
          titleEl.textContent = nextText;
          titleEl.classList.remove('fade-exit', 'fade-exit-active');
          titleEl.classList.add('fade-enter');
          requestAnimationFrame(() => titleEl.classList.add('fade-enter-active'));
        }, 600);
      });
    }
    titleEl.textContent = TITLES[0];
    const id = setInterval(() => {
      i = (i + 1) % TITLES.length;
      show(i);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const sectionCx = 'bg-black px-4 md:px-6 py-6 md:py-8';

  return (
    <>
      {/* HERO */}
      <section className="hero mb-8" aria-label="Sección inicial con video de fondo">
        <video
          src="/videos/Diseño sin título (3).mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />

        <div className="shell">
          <header className="topbar" aria-label="Navegación principal">
            <div className="brand">
              <div className="logo" aria-hidden="true">
                <span>AI</span>
              </div>
              <div className="brand-text">
                <strong>AIBE Technologies</strong>
                <small>Artificial Intelligence for Business Efficiency</small>
              </div>
            </div>

            <nav className="nav" aria-label="Menú">
              <Link href="/contact" className="text-cyan-100 hover:underline">
                Contacto
              </Link>
            </nav>

            <div className="actions">
              <Link href="/login" className="link">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="btn">
                Comenzar gratis
              </Link>
            </div>
          </header>

          <div className="center">
            <div className="title-slot" id="titleSlot" aria-live="polite" aria-atomic="true">
              <div className="title-layer">
                <h1 id="dynamicTitle" className="title"></h1>
              </div>
            </div>

            <p className="subtitle">
              La tecnología que usan las grandes empresas, ahora al alcance de tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones */}
      <section className={sectionCx}>
        <Frases />
      </section>

      <section className={sectionCx}>
        <Ventajas />
      </section>

      {/* ↓ Reseñas con separación mínima respecto a Ventajas */}
      <section className="bg-black px-4 md:px-6 pt-0 pb-6 md:pb-8">
        <SeccionResenasIA />
      </section>

      <section className={sectionCx}>
        <TemasDemo />
      </section>

      <section className={sectionCx}>
        <SentimientoDemo />
      </section>

      <section className={sectionCx}>
        <VolumenDemo />
      </section>

      <section className={sectionCx}>
        <OportunidadesDemo />
      </section>
    </>
  );
}





