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
import { useTranslations } from "next-intl";




import { useRouter, useParams } from "next/navigation";










export default function Home() {
const [placeName, setPlaceName] = useState("");
const [placeZone, setPlaceZone] = useState("");
const [candidates, setCandidates] = useState<any[] | null>(null);
const t = useTranslations();
const router = useRouter();




  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const [progressIndex, setProgressIndex] = useState(0);
const PROGRESS_MESSAGES = t.raw("home.progress.messages") as string[];
const params = useParams();
const locale = String((params as any)?.locale ?? "es");


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




  router.push(`/${locale}/panel?job_id=${encodeURIComponent(data.job_id)}`);
}
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
      alert(t("errors.noBusinessFound"));
      return;
    }


    if (list.length === 1) {
      await runScrapeWithCandidate(list[0]);
      return;
    }


    setCandidates(list);
  } catch (e) {
    console.error(e);
    alert(t("errors.searchFailed"));
  } finally {
    setLoading(false);
  }
}


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
      Más reseñas en Google para tu clínica.
    </h1>


    <p className="hero-price">Todo incluido por 12€ al mes.</p>


    <p className="hero-subtitle">
      Fácil de integrar. Atención personalizada.
    </p>


   


    {/* Recuadro grande abajo izquierda */}
    <div className="hero-form-card">
      {/* Texto dentro del recuadro */}
  <p className="hero-form-hint">
    Escribe el nombre de tu clínica y tu ciudad para analizar todas tus reseñas en segundos.
  </p>
      <div className="hero-form-row">
        {/* Nombre clínica */}
        <div className="hero-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80 shrink-0" aria-hidden="true">
            <path d="M10.5 18a7.5 7.5 0 1 1 5.3-12.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>


          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Nombre de la clínica"
            disabled={loading}
          />
        </div>


        {/* Ciudad */}
        <div className="hero-input hero-input-city">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80 shrink-0" aria-hidden="true">
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
            placeholder="Ciudad"
            disabled={loading}
          />
        </div>
      </div>


      <div className="hero-cta-row">
        <div className="hero-progress">
          {!loading ? (
            <span />
          ) : (
            <p>{PROGRESS_MESSAGES[progressIndex]}</p>
          )}
        </div>


        <button
          type="button"
          onClick={handleStart}
          disabled={loading || !placeName.trim()}
          className="hero-cta"
        >
          {loading ? (
            <>
              <span className="hero-spinner" />
              {t("home.hero.cta.analyzing")}
            </>
          ) : (
            <>
              Analizar reseñas <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </div>


    {!loading && (
      <p className="hero-microcopy">
        {t("home.hero.microcopy")}
      </p>
    )}


    {/* Candidates igual que lo tienes (solo muévelo aquí debajo si quieres que aparezca bajo el recuadro) */}
    {candidates?.length ? (
      <div className="hero-candidates">
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-3">
          <p className="text-sm text-white/80 mb-2">{t("home.candidates.title")}</p>
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
                    alert(t("errors.startAnalysisFailed"));
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
                  {c.user_ratings_total ? `(${c.user_ratings_total} ${t("home.candidates.reviewsLabel")})` : ""}
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
            {t("home.candidates.cancel")}
          </button>
        </div>
      </div>
    ) : null}
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


