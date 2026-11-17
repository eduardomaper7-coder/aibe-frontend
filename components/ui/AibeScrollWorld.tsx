"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { Outfit } from "next/font/google";
import { ArrowRight, Bot, Check, TrendingUp } from "lucide-react";
import AibeHomeContact from "./AibeHomeContact";
import Footer from "./Footer";

// Rounded geometric sans that matches the aibe wordmark
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit", display: "swap" });

type Locale = "es" | "en";

declare global {
  interface Window {
    mountScrollWorld?: (el: HTMLElement, config: unknown) => (() => void) | undefined;
  }
}

const W = "/world";
const ENGINE_VERSION = "2026-11-17g";
const IDS = ["personas", "reto", "agentes", "marketing", "resultado", "aibe"] as const;

const COPY: Record<Locale, { label: string; eyebrow: string; title: string; body: string; tags: string[] }[]> = {
  es: [
    { label: "Personas", eyebrow: "Las personas", title: "Detrás de cada empresa hay personas.", body: "Equipos, clientes y proyectos que quieren crecer, mejorar y alcanzar nuevos retos.", tags: [] },
    { label: "El reto", eyebrow: "El reto", title: "Gestionar todo a la vez no siempre es fácil.", body: "Clientes, solicitudes, tareas, coordinación del equipo… El día a día puede hacer que pierdas tiempo en lo que realmente importa.", tags: [] },
    { label: "Agentes IA", eyebrow: "Agentes IA", title: "La tecnología que te ayuda de verdad.", body: "Automatizamos tareas, atendemos consultas y gestionamos solicitudes para que tu equipo gane tiempo y eficiencia.", tags: [] },
    { label: "Marketing", eyebrow: "Marketing digital", title: "Conecta tu empresa con más clientes.", body: "Hacemos que las personas adecuadas te descubran, confíen en tu propuesta y se conviertan en oportunidades reales.", tags: [] },
    { label: "Resultado", eyebrow: "El resultado", title: "Un negocio más eficiente, con más oportunidades.", body: "Menos tareas repetitivas, clientes mejor atendidos y un equipo con más tiempo para lo que aporta más valor.", tags: [] },
    { label: "aibe", eyebrow: "aibe", title: "Tecnología con sentido humano.", body: "", tags: ["Cercanía", "Confianza", "Transparencia"] },
  ],
  en: [
    { label: "People", eyebrow: "The people", title: "Behind every company there are people.", body: "Teams, customers and projects that want to grow, improve and take on new challenges.", tags: [] },
    { label: "The challenge", eyebrow: "The challenge", title: "Handling everything at once isn't always easy.", body: "Customers, requests, tasks, team coordination… Day-to-day work can make you lose time on what really matters.", tags: [] },
    { label: "AI agents", eyebrow: "AI agents", title: "Technology that truly helps you.", body: "We automate tasks, answer enquiries and handle requests so your team gains time and efficiency.", tags: [] },
    { label: "Marketing", eyebrow: "Digital marketing", title: "Connect your company with more customers.", body: "We help the right people discover you, trust your offer and become real opportunities.", tags: [] },
    { label: "Results", eyebrow: "The result", title: "A more efficient business, with more opportunities.", body: "Fewer repetitive tasks, better-served customers and a team with more time for what adds most value.", tags: [] },
    { label: "aibe", eyebrow: "aibe", title: "Technology with a human touch.", body: "", tags: ["Closeness", "Trust", "Transparency"] },
  ],
};

const AFTER: Record<Locale, {
  eyebrow: string; title: string; lead: string;
  services: { key: "ia" | "mk"; title: string; body: string; points: string[]; cta: string; href: (l: string) => string }[];
}> = {
  es: {
    eyebrow: "Qué hacemos",
    title: "Dos formas de ayudarte a crecer.",
    lead: "Combinamos inteligencia artificial y marketing digital para que tu equipo gane tiempo y tu negocio, clientes.",
    services: [
      { key: "ia", title: "Agentes IA", body: "Asistentes inteligentes que trabajan por ti, todos los días, a cualquier hora.",
        points: ["Atienden consultas 24/7 en WhatsApp, web y teléfono", "Gestionan citas y solicitudes sin intervención", "Hacen el seguimiento de cada cliente"],
        cta: "Descubrir agentes IA", href: (l) => `/${l}/agentes-ia` },
      { key: "mk", title: "Marketing digital", body: "Que las personas adecuadas te encuentren, confíen en ti y te contacten.",
        points: ["Posicionamiento en Google y campañas de Google Ads", "Gestión de redes sociales", "Webs pensadas para convertir visitas en clientes"],
        cta: "Descubrir marketing digital", href: (l) => `/${l}/marketing-digital` },
    ],
  },
  en: {
    eyebrow: "What we do",
    title: "Two ways to help you grow.",
    lead: "We combine artificial intelligence and digital marketing so your team saves time and your business wins customers.",
    services: [
      { key: "ia", title: "AI agents", body: "Smart assistants that work for you every day, at any hour.",
        points: ["Answer enquiries 24/7 on WhatsApp, web and phone", "Handle bookings and requests on their own", "Follow up with every customer"],
        cta: "Discover AI agents", href: (l) => `/${l}/agentes-ia` },
      { key: "mk", title: "Digital marketing", body: "Help the right people find you, trust you and get in touch.",
        points: ["Google rankings and Google Ads campaigns", "Social media management", "Websites built to turn visits into customers"],
        cta: "Discover digital marketing", href: (l) => `/${l}/marketing-digital` },
    ],
  },
};

const UI: Record<Locale, { hint: string; top: string; primary: string; secondary: string }> = {
  es: { hint: "desliza para entrar", top: "Hablemos", primary: "Hablemos de tu negocio →", secondary: "Ver Marketing digital" },
  en: { hint: "scroll to fly in", top: "Let's talk", primary: "Let's talk about your business →", secondary: "See digital marketing" },
};

export default function AibeScrollWorld({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const loc: Locale = locale === "en" ? "en" : "es";

  const mount = () => {
    const el = ref.current;
    if (!el || !window.mountScrollWorld || el.dataset.mounted) return;
    el.dataset.mounted = "1";
    const mk = `/${loc}/marketing-digital`;
    const copy = COPY[loc];
    const phone = window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches;
    const destroy = window.mountScrollWorld(el, {
      brand: { name: "aibe", href: `/${loc}` },
      cta: { label: UI[loc].top, href: "#contacto" },
      hint: UI[loc].hint,
      diveScroll: phone ? 1.1 : 1.3,
      connScroll: phone ? 0.75 : 0.9,
      sections: IDS.map((id, i) => ({
        id,
        ...copy[i],
        still: `${W}/${id}.webp`,
        stillMobile: `${W}/${id}-m.webp`,
        clip: `${W}/vid/${id}.mp4`,
        clipMobile: `${W}/vid/${id}-m.mp4`,
        accent: id === "aibe" ? "#19D3FF" : "#0077FF",
        ...(i === 0 ? (phone ? { scroll: 0.9, linger: 0.15 } : { scroll: 1.6, linger: 0.4 }) : {}),
        ...(i === IDS.length - 1
          ? {
              scroll: 1.8,
              linger: 0.5,
              cta: {
                primary: { label: UI[loc].primary, href: "#contacto" },
                secondary: { label: UI[loc].secondary, href: mk },
              },
            }
          : {}),
      })),
      // Forward-only transitions between scenes. Each one starts on the previous
      // scene clip's real last frame and ends on the next one's first frame.
      connectors: [1, 2, 3, 4, 5].map((n) => `${W}/vid/conn${n}.mp4`),
      connectorsMobile: [1, 2, 3, 4, 5].map((n) => `${W}/vid/conn${n}-m.mp4`),
    });
    (el as HTMLDivElement & { _destroy?: () => void })._destroy = destroy || undefined;
  };

  // When the content after the flight reaches the top, switch the engine chrome to a plain header.
  useEffect(() => {
    const world = ref.current;
    const after = document.querySelector(".aibe-after");
    if (!world || !after) return;
    // Only once the engine has built the flight; before that the content below would sit at the top.
    const onScroll = () => world.classList.toggle("is-after", world.classList.contains("sw-root") && after.getBoundingClientRect().top < 90);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current as (HTMLDivElement & { _destroy?: () => void }) | null;
    mount();
    return () => {
      el?._destroy?.();
      if (el) delete el.dataset.mounted;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  return (
    <div className={outfit.variable}>
      <style>{`
        #world.sw-root{--sw-bg:#EEF4FB;--sw-ink:#001E4B;--sw-ink-soft:#3A4F72;--sw-accent:#0077FF;
          --sw-font-display:var(--font-outfit), ui-rounded, "Segoe UI", system-ui, sans-serif;--sw-font-body:var(--font-outfit), system-ui, sans-serif;}
        /* globals.css sets height:100% + overflow-x:hidden on html/body, which turns body into
           the scroll container; the scrub engine needs the window to scroll. Home only. */
        html,body{height:auto!important;overflow-x:clip!important;scroll-behavior:auto!important;}
        body{background:#EEF4FB;}
        #world .sw-brand__mark{display:none!important;}
        #world .sw-brand__name{font-size:0!important;width:120px;height:40px;background:url(${W}/aibe-logo-v2.webp) left center/contain no-repeat;}
        #world .sw-brand{background:#fff;padding:6px 14px;border-radius:14px;box-shadow:0 4px 14px rgba(0,30,75,.08);}
        #world .sw-topcta{background:#0077FF!important;}
        #world .sw-btn--primary{background:#0077FF!important;box-shadow:0 10px 30px rgba(0,119,255,.35);}
        /* Final scene sits on deep blue: light ink, real logo (dark-bg variant), placed on the open right side */
        #world .sw-copylayer .sw-copy:last-child .sw-copy__eyebrow{font-size:0;height:clamp(44px,min(7vw,10vh),92px);
          background:url(${W}/aibe-logo-dark.webp) left center/contain no-repeat;margin-bottom:6px;}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__title{color:#fff;text-shadow:0 2px 24px rgba(0,30,75,.6);}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__body,
        #world .sw-copylayer .sw-copy:last-child .sw-copy__num{color:rgba(255,255,255,.85);}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__tags li{color:#fff;background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.35);}
        #world .sw-copylayer .sw-copy:last-child .sw-btn--ghost{color:#fff;border-color:rgba(255,255,255,.45);}
        /* On the dark final scene the light copy scrim would wash the image: swap it for a soft navy one */
        /* scrims must sit UNDER the copy (a positioned ::after paints over earlier children) */
        #world .sw-copylayer::before{transition:opacity .5s ease;z-index:0;}
        #world .sw-copy{z-index:1;}
        #world .sw-copylayer::after{content:"";position:absolute;inset:0;opacity:0;transition:opacity .5s ease;pointer-events:none;
          z-index:0;background:linear-gradient(270deg,rgba(0,30,75,.55) 0%,rgba(0,30,75,.25) 40%,transparent 65%);}
        #world[data-active="5"] .sw-copylayer::before{opacity:0;}
        #world[data-active="5"] .sw-copylayer::after{opacity:1;}
        @media (min-width:861px){
          /* Size copy by height too, so long titles + tags fit short laptop/browser windows */
          #world .sw-copy{width:min(44vw,600px);}
          #world .sw-copy__title{font-size:clamp(1.6rem,min(4vw,6.4vh),3.3rem);}
          #world .sw-copy__body{font-size:clamp(.9rem,min(1.2vw,2.3vh),1.1rem);}
          #world .sw-copy__eyebrow{margin-top:min(18px,1.8vh);}
          /* the translate property stacks on top of the engine's inline transform, so this lift always applies */
          #world .sw-copylayer .sw-copy:last-child{left:auto;right:clamp(24px,7vw,120px);translate:0 -9vh;}
        }
        @media (max-width:860px){
          /* Mobile URL bar: when it hides on the first scroll the visual viewport grows and a
             cover-fit video would rescale ("grows slightly"). Pin the stage to the LARGE viewport
             height so its size never changes while the bar slides in/out. */
          #world .sw-stage,#world .sw-sky{top:0;bottom:auto;height:100vh;height:100lvh;}
          /* Same for the copy scrims: anchor them from the top in lvh, so they always reach the bottom
             of the stage — otherwise a strip of unscrimmed image shows while the URL bar hides. */
          #world .sw-copylayer::before,#world .sw-copylayer::after{top:40vh;top:40lvh;bottom:auto;height:60vh;height:60lvh;}
          /* Copy too: measure from the large viewport, so it doesn't drop when the URL bar hides */
          #world .sw-copylayer{top:0;bottom:auto;height:100vh;height:100lvh;}
          #world .sw-copy{bottom:calc(clamp(56px,12vh,110px) + env(safe-area-inset-bottom));bottom:calc(clamp(56px,12lvh,110px) + env(safe-area-inset-bottom));}
          /* the scroll hint sits where the mobile copy block is: hide it on phones */
          #world .sw-hint{display:none;}
          #world .sw-copylayer::after{background:linear-gradient(0deg,rgba(0,30,75,.7) 0%,rgba(0,30,75,.3) 45%,transparent 70%);}
        }
        /* Content after the flight: opaque, above the engine's fixed layers (stage 10, copy 20,
           route 40) but under its topbar (50), so the logo + Hablemos stay reachable. */
        #world .sw-topbar{transition:background .3s ease,box-shadow .3s ease;}
        #world .sw-nav,#world .sw-route,#world .sw-scrollbar{transition:opacity .3s ease;}
        #world.is-after .sw-nav,#world.is-after .sw-route,#world.is-after .sw-scrollbar{opacity:0;pointer-events:none;}
        #world.is-after .sw-topbar{background:rgba(255,255,255,.92);backdrop-filter:blur(10px);box-shadow:0 1px 0 rgba(0,30,75,.08);}
        /* Before the engine mounts: show scene 1's poster full-screen and keep the sections below
           hidden, so the first paint (and a slow connection) never shows an empty gap or the wrong section. */
        #world:not(.sw-root){height:100vh;height:100lvh;background:#EEF4FB url(${W}/personas.webp) center 42%/cover no-repeat;}
        #world:not(.sw-root) ~ .aibe-after{display:none;}
        @media (max-width:860px){ #world:not(.sw-root){background-image:url(${W}/personas-m.webp);background-position:center 44%;} }
        .aibe-after{position:relative;z-index:45;background:#fff;color:#001E4B;font-family:var(--font-outfit),system-ui,sans-serif;}
        .asv{position:relative;overflow:hidden;padding:clamp(88px,11vw,150px) clamp(18px,5vw,64px);
          background:linear-gradient(180deg,#EEF4FB 0%,#fff 38%);}
        .asv::before{content:"";position:absolute;width:900px;height:900px;left:50%;top:-520px;transform:translateX(-50%);border-radius:50%;
          background:radial-gradient(circle,rgba(0,119,255,.10),transparent 62%);pointer-events:none;}
        .asv__inner{position:relative;max-width:1180px;margin:0 auto;}
        .asv__head{text-align:center;max-width:720px;margin:0 auto;}
        .asv__eyebrow{display:inline-block;font-weight:600;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:#0077FF;}
        .asv__title{font-weight:700;font-size:clamp(2.1rem,4.4vw,3.5rem);line-height:1.05;letter-spacing:-.02em;margin:14px 0 0;color:#001E4B;}
        .asv__lead{margin:18px auto 0;max-width:600px;font-size:1.1rem;line-height:1.6;color:#3A4F72;}
        .asv__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,2.4vw,28px);margin-top:clamp(44px,6vw,72px);}
        .asv__card{position:relative;display:flex;flex-direction:column;padding:clamp(28px,3.4vw,44px);border-radius:28px;text-decoration:none;color:inherit;
          background:#fff;border:1px solid #E1EAF5;box-shadow:0 1px 2px rgba(0,30,75,.04),0 18px 40px -24px rgba(0,30,75,.18);
          transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s,border-color .3s;isolation:isolate;overflow:hidden;}
        .asv__card::after{content:"";position:absolute;right:-20%;bottom:-60%;width:340px;height:340px;border-radius:50%;z-index:-1;
          background:radial-gradient(circle,rgba(25,211,255,.16),transparent 65%);opacity:.6;transition:opacity .3s;}
        .asv__card:hover{transform:translateY(-6px);border-color:rgba(0,119,255,.35);box-shadow:0 30px 60px -28px rgba(0,63,160,.35);}
        .asv__card:hover::after{opacity:1;}
        .asv__card--dark{background:#001E4B;border-color:#001E4B;color:#fff;}
        .asv__card--dark::after{background:radial-gradient(circle,rgba(0,119,255,.55),transparent 65%);opacity:.8;}
        .asv__icon{display:grid;place-items:center;width:56px;height:56px;border-radius:18px;color:#fff;
          background:linear-gradient(135deg,#0077FF 0%,#19D3FF 100%);box-shadow:0 12px 26px -10px rgba(0,119,255,.7);}
        .asv__card h3{margin:26px 0 0;font-size:clamp(1.6rem,2.4vw,2rem);font-weight:700;letter-spacing:-.01em;}
        .asv__body{margin:10px 0 0;font-size:1.05rem;line-height:1.55;color:#3A4F72;}
        .asv__card--dark .asv__body{color:rgba(255,255,255,.75);}
        .asv__points{list-style:none;padding:0;margin:26px 0 0;display:grid;gap:12px;}
        .asv__points li{display:flex;align-items:flex-start;gap:12px;font-size:1rem;line-height:1.45;}
        .asv__points li svg{flex:none;margin-top:2px;color:#0077FF;}
        .asv__card--dark .asv__points li svg{color:#19D3FF;}
        .asv__cta{display:inline-flex;align-items:center;gap:8px;margin-top:auto;padding-top:34px;font-weight:600;color:#0077FF;}
        .asv__card--dark .asv__cta{color:#19D3FF;}
        .asv__cta svg{transition:transform .25s;}
        .asv__card:hover .asv__cta svg{transform:translateX(4px);}
        @media (max-width:860px){
          .asv__grid{grid-template-columns:1fr;}
        }
      `}</style>
      {/* bump ENGINE_VERSION whenever public/world/scrub-engine.js changes, so browsers drop the cached copy */}
      <Script src={`${W}/scrub-engine.js?v=${ENGINE_VERSION}`} strategy="afterInteractive" onReady={mount} />
      {/* Scene 1 poster is the landing view: fetch it with the page, not after the engine script */}
      <link rel="preload" as="image" href={`${W}/personas.webp`} media="(min-width: 861px)" />
      <link rel="preload" as="image" href={`${W}/personas-m.webp`} media="(max-width: 860px)" />
      <div id="world" ref={ref} />

      <div className="aibe-after">
        <section className="asv">
          <div className="asv__inner">
            <header className="asv__head">
              <span className="asv__eyebrow">{AFTER[loc].eyebrow}</span>
              <h2 className="asv__title">{AFTER[loc].title}</h2>
              <p className="asv__lead">{AFTER[loc].lead}</p>
            </header>
            <div className="asv__grid">
              {AFTER[loc].services.map((sv) => (
                <a key={sv.key} className={`asv__card${sv.key === "ia" ? " asv__card--dark" : ""}`} href={sv.href(loc)}>
                  <span className="asv__icon">{sv.key === "ia" ? <Bot size={26} /> : <TrendingUp size={26} />}</span>
                  <h3>{sv.title}</h3>
                  <p className="asv__body">{sv.body}</p>
                  <ul className="asv__points">
                    {sv.points.map((pt) => (
                      <li key={pt}><Check size={18} strokeWidth={2.6} />{pt}</li>
                    ))}
                  </ul>
                  <span className="asv__cta">{sv.cta}<ArrowRight size={18} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <AibeHomeContact locale={loc} />
        <Footer />
      </div>
    </div>
  );
}
