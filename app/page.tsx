'use client';




import { useEffect, useState } from 'react';




import SeccionResenasIA from '@/components/ui/SeccionResenasIA';
// import TemasDemo from '@/components/ui/temasdemo'; // <- no se usa, lo dejamos fuera
import SentimientoDemo from '@/components/ui/sentimientodemo';
import VolumenDemo from '@/components/ui/volumendemo';
import OportunidadesDemo from '@/components/ui/oportunidadesdemo';
import Frases from '@/components/ui/frases';
import VideoInicio from '@/components/ui/videoinicio';
import Footer from './Footer';
import TresRecuadros from '@/components/ui/3recuadros';
import VideoTemas from '@/components/ui/videotemas';
import SeoBeneficio from '@/components/ui/seo-beneficio'
import Image from "next/image";




import { useRouter } from "next/navigation";


export default function Home() {
const [placeName, setPlaceName] = useState("");
const [placeZone, setPlaceZone] = useState("");
const [candidates, setCandidates] = useState<any[] | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const [progressIndex, setProgressIndex] = useState(0);
const PROGRESS_MESSAGES = [
  "Creando análisis de temas…",
  "Analizando sentimiento de clientes…",
  "Calculando volumen de reseñas…",
  "Detectando oportunidades de mejora…",
  "Generando respuestas inteligentes…",
];
useEffect(() => {
  if (!loading) {
    setProgressIndex(0);
    return;
  }


  const id = setInterval(() => {
    setProgressIndex((prev) =>
      prev < PROGRESS_MESSAGES.length - 1 ? prev + 1 : prev
    );
  }, 1500); // cambia cada 1.5s


  return () => clearInterval(id);
}, [loading]);


  async function runScrapeWithCandidate(c: any) {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const res = await fetch(`${apiBase}/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  google_maps_url: c.google_maps_url,
  place_name: placeName.trim(), // ✅ nombre del usuario
  max_reviews: 10000,
  personal_data: false,
}),

  });

  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();

  if (!data?.job_id) throw new Error("No llegó job_id");

  router.push(`/panel?job_id=${data.job_id}`);
}


async function handleStart() {
  const name = placeName.trim();
  const zone = placeZone.trim();
  const q = zone ? `${name}, ${zone}` : name;

  if (!name) return;

  try {
    setLoading(true);
    setCandidates(null);

    const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
    if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL no está configurado");

    const r = await fetch(`${apiBase}/places/search?q=${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error(await r.text());
    const data = await r.json();

    const list = data?.candidates ?? [];
    if (!list.length) {
      alert("No encontré ese negocio. Prueba a añadir ciudad o barrio.");
      return;
    }

    if (list.length === 1) {
      await runScrapeWithCandidate(list[0]);
      return;
    }

    setCandidates(list);
  } catch (e) {
    console.error(e);
    alert("No pude buscar el negocio. Inténtalo de nuevo.");
  } finally {
    setLoading(false);
  }
}









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
    font: (cs as any).font,
    lineHeight: (cs as any).lineHeight,
    letterSpacing: (cs as any).letterSpacing,
    whiteSpace: 'normal',
    display: 'block',
  } as Partial<CSSStyleDeclaration>);




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
        requestAnimationFrame(() =>
          titleEl.classList.add('fade-enter-active')
        );
      }, 600);
    });
  }




  titleEl.textContent = TITLES[0];




  const id = window.setInterval(() => {
    i = (i + 1) % TITLES.length;
    show(i);
  }, 6500);




  return () => window.clearInterval(id);
}, []);








  const sectionCx = 'bg-black px-4 md:px-6 py-6 md:py-8';




  return (
    <>
     <section className="hero relative" aria-label="Sección inicial con video de fondo">




  {/* IMAGEN fija detrás de todo */}
  {/* Fondo */}
  <div className="hero-video-wrapper">
    <Image
      src="/imagenes/hero-imagen.png"
      alt="Hero"
      fill
      priority
      className="hero-video"
    />
  </div>












  {/* Contenido encima del video */}
  <div className="shell relative z-[1]">
    <div className="topbar-spacer" aria-hidden="true" />
    <div className="center">
      <div className="title-slot" id="titleSlot">
        <div className="title-layer">
          <h1 id="dynamicTitle" className="title"></h1>
        </div>
      </div>
      <p className="subtitle">
        La tecnología que usan las grandes empresas,<br />
        ahora al alcance de tu negocio.
      </p>
    </div>
  </div>




{/* Input + botón (Nombre + Zona) */}
<div className="relative z-[50] mt-8">
  <div className="mx-auto w-full max-w-[820px] px-4">
    <div
      className="
        flex flex-col gap-3
        rounded-2xl
        bg-white/10 backdrop-blur-md
        border border-white/15
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        p-3
      "
    >
      {/* Inputs row */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {/* Nombre */}
        <div className="flex items-center gap-3 w-full md:flex-1 rounded-xl bg-black/25 border border-white/10 px-4 h-12">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-80 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M10.5 18a7.5 7.5 0 1 1 5.3-12.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 16l5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Nombre del negocio (ej: La Tagliatella)"
            disabled={loading}
            className="
              w-full bg-transparent text-white placeholder:text-white/60
              outline-none text-[15px]
            "
          />
        </div>

        {/* Zona */}
        <div className="flex items-center gap-3 md:w-[280px] rounded-xl bg-black/25 border border-white/10 px-4 h-12">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-80 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 22s7-4.4 7-12a7 7 0 1 0-14 0c0 7.6 7 12 7 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            value={placeZone}
            onChange={(e) => setPlaceZone(e.target.value)}
            placeholder="Zona (ej: Chamberí, Madrid)"
            disabled={loading}
            className="
              w-full bg-transparent text-white placeholder:text-white/60
              outline-none text-[15px]
            "
          />
        </div>
      </div>

      {/* CTA row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1">
          {!loading ? (
            <p className="text-xs text-white/60 md:pl-1">
              
            </p>
          ) : (
            <p className="text-xs text-white/60 md:pl-1">
              {PROGRESS_MESSAGES[progressIndex]}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleStart}
          disabled={loading || !placeName.trim()}
          className="
            h-12 px-6 rounded-xl font-medium
            bg-white text-black
            hover:bg-white/90
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
            flex items-center justify-center gap-2
            whitespace-nowrap
          "
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Analizando…
            </>
          ) : (
            <>
              Empezar Gratis <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </div>

    {/* Microcopy */}
    {!loading && (
      <p className="mt-3 text-xs text-white/60 text-center">
        No pedimos tarjeta. Tarda menos de 1 minuto.
      </p>
    )}
  </div>
</div>



{candidates?.length ? (
  <div className="mx-auto mt-4 w-full max-w-[760px] px-4">
    <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-3">
      <p className="text-sm text-white/80 mb-2">
        Encontré varias opciones. Elige la correcta:
      </p>

      <div className="flex flex-col gap-2">
        {candidates.map((c, idx) => (
          <button
            key={c.place_id || idx}
            type="button"
            className="text-left rounded-xl px-4 py-3 bg-black/30 hover:bg-black/40 border border-white/10 transition"
            onClick={async () => {
  try {
    setLoading(true);
    await runScrapeWithCandidate(c);
  } catch (e) {
    console.error(e);
    alert("No pude iniciar el análisis con esa opción.");
  } finally {
    setLoading(false);
  }
}}

            disabled={loading}
          >
            <div className="text-white font-medium">{c.name}</div>
            <div className="text-white/70 text-sm">{c.address}</div>
            <div className="text-white/60 text-xs mt-1">
              {c.rating ? `⭐ ${c.rating}` : ""}{" "}
              {c.user_ratings_total ? `(${c.user_ratings_total} reseñas)` : ""}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 text-xs text-white/70 hover:text-white"
        onClick={() => setCandidates(null)}
        disabled={loading}
      >
        Cancelar
      </button>
    </div>
  </div>
) : null}







</section>








   












{/* SEO Beneficio */}
{/*
<section className="relative z-[10] px-4 md:px-6 py-10">
  <SeoBeneficio />
</section>
*/}




     {/* Secciones */}
<section
  className="
    bg-black
    px-4 md:px-6 py-6 md:py-8
    relative z-[2]
    rounded-t-[60px]
  "
>
  <Frases />
</section>




      <VideoInicio />
      <TresRecuadros />




      {/* Sección azul integrada (full-width) */}
<section
  className="
    bg-blue-fullbleed
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
          Especialistas en aumentar las ventas y mejorar la reputación online de restaurantes.
        </h2>
      </div>




      <div className="md:col-span-5 flex flex-col items-end justify-start space-y-1">




  <p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
    Profesionales en SEO y captación de clientes para restaurantes.
  </p>




  <p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
    Resultados comprobados a las 2 semanas.
  </p>




  <p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
    Prueba gratis sin compromiso.
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




      <section className={sectionCx}>
        <OportunidadesDemo />
      </section>




      {/* Resto de secciones */}
      <section className="bg-black px-4 md:px-6 pt-0 pb-6 md:pb-8">
        <SeccionResenasIA />
      </section>




      <Footer />
    </>
  );
}
