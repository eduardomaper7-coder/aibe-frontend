'use client';

import { useEffect } from 'react';

import SeccionResenasIA from '@/components/ui/SeccionResenasIA';
import TemasDemo from '@/components/ui/temasdemo';
import SentimientoDemo from '@/components/ui/sentimientodemo';
import VolumenDemo from '@/components/ui/volumendemo';
import OportunidadesDemo from '@/components/ui/oportunidadesdemo';
import Frases from '@/components/ui/frases';
import VideoInicio from '@/components/ui/videoinicio';
import Footer from './Footer';
import TresRecuadros from '@/components/ui/3recuadros';
import VideoTemas from '@/components/ui/videotemas';

export default function Home() {
  useEffect(() => {
    const TITLES: string[] = [
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

    function show(index: number): void {
      const nextText = TITLES[index % TITLES.length];
      if (!titleEl) return;
      titleEl.classList.remove('fade-enter', 'fade-enter-active');
      titleEl.classList.add('fade-exit');
      requestAnimationFrame(() => {
        titleEl.classList.add('fade-exit-active');
        window.setTimeout(() => {
          titleEl.textContent = nextText;
          titleEl.classList.remove('fade-exit', 'fade-exit-active');
          titleEl.classList.add('fade-enter');
          requestAnimationFrame(() => titleEl.classList.add('fade-enter-active'));
        }, 600);
      });
    }

    titleEl.textContent = TITLES[0];

    const id: ReturnType<typeof setInterval> = window.setInterval(() => {
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
          <div className="topbar-spacer" aria-hidden="true" />
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

        <style jsx>{`
          :root { --topbar-h: 64px; }
          .hero { position: relative; overflow: hidden; }
          .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .shell { position: relative; z-index: 1; }
          .topbar-spacer { height: var(--topbar-h); }
        `}</style>
      </section>

      {/* Secciones */}
      <section className={sectionCx}><Frases /></section>
      <VideoInicio />
      <TresRecuadros />

      {/* Sección azul integrada (full-width) */}
      <section
        className="
          relative left-1/2 right-1/2 -mx-[50vw] w-screen
          text-white font-sans
          bg-[#0A1224]
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="mt-0 text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-gray-100">
                {`Para todos: desde pequeños negocios hasta grandes marcas, sin importar el sector.`}
              </h2>
            </div>

            <div className="md:col-span-5">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                {`+1000 respuestas enviadas.`} <br />
                {`+250 negocios en España suscritos.`} <br />
                {`+125.000 reseñas analizadas.`} <br />
                <span className="block mt-4 text-gray-100">
                  {`Liderando la gestión inteligente de reseñas en España.`}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <VideoTemas />

      {/* Sección combinada: Sentimiento + Volumen */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black py-10">
        <div className="mx-auto w-[calc(100vw-2rem)] max-w-[2000px] px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start justify-center">
            {/* Sentimiento */}
            <div className="flex justify-end w-full">
              <div className="w-full max-w-[980px]">
                <SentimientoDemo />
              </div>
            </div>

            {/* Volumen */}
            <div className="flex justify-start w-full">
              <div className="w-full max-w-[980px]">
                <VolumenDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionCx}><OportunidadesDemo /></section>

      {/* Resto de secciones */}
      <section className="bg-black px-4 md:px-6 pt-0 pb-6 md:pb-8">
        <SeccionResenasIA />
      </section>

      <Footer />
    </>
  );
}
