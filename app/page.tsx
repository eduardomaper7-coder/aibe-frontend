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
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  async function handleStart() {
  const url = googleMapsUrl.trim();
  if (!url) return;


  try {
    setLoading(true);


    const res = await fetch("/api/scrape", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  body: JSON.stringify({
    google_maps_url: url,
    max_reviews: 99999,
    personal_data: true,
  }),
});




    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Error haciendo scrape");
    }


    const data = await res.json(); // { job_id, status, reviews_saved }


    // “panel del usuario” (por ahora) = lo que queda guardado en su navegador
    localStorage.setItem("googleMapsUrl", url);
    localStorage.setItem("jobId", String(data.job_id));


    // ✅ ir al panel (ruta directa)
    router.push(`/procesando?job_id=${data.job_id}`);
  } catch (e: any) {
    alert(e?.message ?? "Error");
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


  {/* Input + botón */}
<div className="relative z-[2]">
  <div className="hero-buttons">
    <div className="hero-btn-group hero-cta">
     
      <input
        type="text"
        placeholder="Pega el link de Google Maps del restaurante"
        value={googleMapsUrl}
        onChange={(e) => setGoogleMapsUrl(e.target.value)}
        className="
          hero-input
          rounded-full
          px-6
          py-4
          text-sm md:text-base
          bg-white
          text-black
          placeholder-gray-400
          focus:outline-none
        "
      />


      <button
        type="button"
        className="hero-btn primary"
        onClick={handleStart}
        disabled={loading}
      >
        {loading ? "Analizando reseñas..." : "Empezar Gratis"}
      </button>


    </div>
  </div>
</div>






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




