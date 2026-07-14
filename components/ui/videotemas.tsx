'use client';
import React, { useEffect, useRef, useState } from 'react';


type Phase = 'show' | 'fadeOut' | 'gap' | 'fadeIn';


const VIDEO_W_CLAMP = 'clamp(620px, 72vw, 1200px)';
const SEP_PX = 28;
const OFFSET_TOP = 117;


const CARDS = [
  { title: 'Tendencia', text: 'Permite identificar si la opinión mejora o empeora con el tiempo.', color: '#FF8C42' },
  { title: 'Temas', text: 'Muestra los aspectos más comentados por los usuarios.', color: '#2FBF71' },
  { title: 'N.º de menciones', text: 'Indica la relevancia de cada tema según su frecuencia.', color: '#E63946' },
  { title: 'Sentimiento promedio', text: 'Refleja la percepción general de los clientes.', color: '#C77DFF' },
];


// Duraciones de animación
const DUR_SHOW = 4000;
const DUR_FADE = 500;
const DUR_GAP = 200;
const CYCLE_MS = DUR_SHOW + DUR_FADE + DUR_GAP + DUR_FADE;


export default function VideoTemas() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('show');


  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);


  useEffect(() => {
    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const total = t - startRef.current;
      const elapsed = total % CYCLE_MS;
      const cycleNumber = Math.floor(total / CYCLE_MS);


      let nextPhase: Phase;
      if (elapsed < DUR_SHOW) nextPhase = 'show';
      else if (elapsed < DUR_SHOW + DUR_FADE) nextPhase = 'fadeOut';
      else if (elapsed < DUR_SHOW + DUR_FADE + DUR_GAP) nextPhase = 'gap';
      else nextPhase = 'fadeIn';


      const nextIndex = cycleNumber % CARDS.length;


      if (nextPhase !== phase) setPhase(nextPhase);
      if (nextIndex !== index) setIndex(nextIndex);


      rafRef.current = requestAnimationFrame(step);
    };


    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [index, phase]);


  const phaseClass =
    phase === 'show'
      ? 'opacity-100 translate-y-0'
      : phase === 'fadeOut'
      ? 'opacity-0 translate-y-2'
      : phase === 'gap'
      ? 'opacity-0 translate-y-2'
      : 'opacity-100 translate-y-0';


  return (
<section className="hidden md:block bg-black-fullbleed bg-black mt-20 py-10 font-[Inter] text-white">
      {/* SUBTÍTULO Y TÍTULO */}
      <div className="max-w-[min(1800px,98vw)] mx-auto px-4 md:px-6 lg:px-8 mb-10 text-left">
        {/* SUBTÍTULO NUEVO (más moderno, equilibrado) */}
<p className="
  text-left text-white/70
  text-[14px] md:text-[15px] lg:text-[17px]
  font-light tracking-wide
  mb-1
">
  Analiza tu negocio por categorías
</p>

{/* TÍTULO NUEVO (tu tipografía + más grande) */}
<h2
  className="
    text-left font-sans text-white
    text-[28px] sm:text-[32px] md:text-[36px] lg:text-[46px]
    font-semibold tracking-tight
    leading-tight
  "
>
  Conoce tu negocio mejor que nadie
</h2>

      </div>


      {/* BLOQUE PRINCIPAL */}
      <div
        className="
          mx-auto w-[min(1800px,98vw)]
          bg-[#0A1224] rounded-3xl shadow-xl overflow-hidden
          px-4 md:px-6 lg:px-8 py-6
          min-h-[440px] md:min-h-[560px]
          mb-6
        "
      >
        <div className="flex flex-col md:flex-row items-start" style={{ gap: `${SEP_PX}px` }}>
          {/* VIDEO */}
          <div
            className="
              rounded-xl overflow-hidden shadow-lg
              aspect-[16/9] shrink-0 bg-[#0A1224]
            "
            style={{ width: VIDEO_W_CLAMP }}
          >
            <video
              src="/videos/temasvideo.mp4"
              autoPlay loop muted playsInline preload="auto"
              className="w-full h-full object-cover bg-[#0A1224]"
              style={{ backgroundColor: '#0A1224' }}
            />
          </div>


          {/* RECUADRO ROTATIVO */}
          <div className="self-start" style={{ marginTop: `${OFFSET_TOP}px` }}>
            <div
              className={`rounded-2xl p-6 md:p-7 text-white transition-all duration-500 ${phaseClass}`}
              style={{
                backgroundColor: CARDS[index].color,
                width: 'clamp(232px, 18vw, 300px)',
                minHeight: '300px',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.28))',
                willChange: 'opacity, transform',
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                {CARDS[index].title}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-white/95">
                {CARDS[index].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
