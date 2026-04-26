'use client';





















import LandingSignupCard from "./LandingSignupCard";







import HeroResenas from "@/components/ui/HeroResenas";
import { Caveat } from "next/font/google";
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});
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
import { useTranslations } from "next-intl";

import { useEffect } from "react";











export default function Home() {

const t = useTranslations();




  










  
useEffect(() => {
  const PHRASES = t.raw("home.hero.dynamicPhrases") as string[];




  const el = document.getElementById("dynamicPart");
  if (!el || !PHRASES?.length) return;




  let i = 0;
  el.textContent = PHRASES[0];




  const id = setInterval(() => {
    i = (i + 1) % PHRASES.length;
    el.style.opacity = "0";




    setTimeout(() => {
      el.textContent = PHRASES[i];
      el.style.opacity = "1";
    }, 300);
  }, 3000);




  return () => clearInterval(id);
}, [t]);















  const sectionCx = 'bg-black px-4 md:px-6 py-6 md:py-8';






  return (
    <>
     <section className="hero relative" aria-label="Sección inicial con video de fondo">
  {/* Fondo azul moderno */}
  <div className="hero-bg" aria-hidden="true" />

  {/* Contenido */}
  <div className="shell relative z-[1] hero-inner">
    {/* Columna izquierda */}
    <div className="hero-left">
      <h1 className="hero-title">
  <span className="hero-title-main">
    Consigue que tu Clínica
  </span>

  <span className="hero-title-main">
    Sea la nº 1 en Google Maps Madrid
  </span>

  <span className="hero-more-line">
  <span className="hero-more-static">Más </span>
  <span
    id="dynamicPart"
    className="hero-more-dynamic"
    style={{ transition: "opacity 0.3s ease" }}
  >
    Reseñas de Google
  </span>
</span>
</h1>

      

      <p className="hero-subtitle">
        Fácil de integrar. Atención personalizada.
      </p>

      {/* Signup */}
      <div className="hero-form-card mt-2 md:mt-4">
  <LandingSignupCard />
</div>
    </div>

    {/* Columna derecha */}
    <div className="hero-right" aria-hidden="true">
      <Image
        src="/imagenes/hero.png"
        alt="Ilustración reseñas clínicas"
        width={900}
        height={900}
        className="hero-illustration"
        priority
      />
    </div>
  </div>
</section>






{/* SEO Beneficio */}
{/*
<section className="relative z-[10] px-4 md:px-6 py-10">
  <SeoBeneficio />
</section>
*/}




<HeroResenas />

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
          {t("home.blueSection.headline")}
        </h2>
      </div>
















      <div className="md:col-span-5 flex flex-col items-end justify-start space-y-1">
















  <p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
  {t("home.blueSection.bullets.0")}
</p>
<p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
  {t("home.blueSection.bullets.1")}
</p>
<p className="text-[13px] md:text-sm lg:text-base text-gray-400 leading-relaxed text-right">
  {t("home.blueSection.bullets.2")}
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


