"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Locale = "es" | "en";

declare global {
  interface Window {
    mountScrollWorld?: (el: HTMLElement, config: unknown) => (() => void) | undefined;
  }
}

const W = "/world";
const IDS = ["personas", "reto", "agentes", "marketing", "resultado", "aibe"] as const;

const COPY: Record<Locale, { label: string; eyebrow: string; title: string; body: string; tags: string[] }[]> = {
  es: [
    { label: "Personas", eyebrow: "Las personas", title: "Detrás de cada empresa hay personas.", body: "Equipos, clientes y proyectos que quieren crecer, mejorar y alcanzar nuevos retos.", tags: [] },
    { label: "El reto", eyebrow: "El reto", title: "Gestionar todo a la vez no siempre es fácil.", body: "Clientes, solicitudes, tareas, coordinación del equipo… El día a día puede hacer que pierdas tiempo en lo que realmente importa.", tags: [] },
    { label: "Agentes IA", eyebrow: "Agentes IA", title: "La tecnología que te ayuda de verdad.", body: "Automatizamos tareas, atendemos consultas y gestionamos solicitudes para que tu equipo gane tiempo y eficiencia.", tags: ["Atiende consultas 24/7", "Gestiona citas y solicitudes", "Organiza y hace seguimiento"] },
    { label: "Marketing", eyebrow: "Marketing digital", title: "Conecta tu empresa con más clientes.", body: "Hacemos que las personas adecuadas te descubran, confíen en tu propuesta y se conviertan en oportunidades reales.", tags: [] },
    { label: "Resultado", eyebrow: "El resultado", title: "Un negocio más eficiente, con más oportunidades.", body: "Menos tareas repetitivas, clientes mejor atendidos y un equipo con más tiempo para lo que aporta más valor.", tags: ["Equipo más enfocado", "Clientes mejor atendidos", "Procesos más ágiles", "Más oportunidades de crecimiento"] },
    { label: "aibe", eyebrow: "aibe", title: "Tecnología con sentido humano.", body: "", tags: ["Cercanía", "Confianza", "Transparencia"] },
  ],
  en: [
    { label: "People", eyebrow: "The people", title: "Behind every company there are people.", body: "Teams, customers and projects that want to grow, improve and take on new challenges.", tags: [] },
    { label: "The challenge", eyebrow: "The challenge", title: "Handling everything at once isn't always easy.", body: "Customers, requests, tasks, team coordination… Day-to-day work can make you lose time on what really matters.", tags: [] },
    { label: "AI agents", eyebrow: "AI agents", title: "Technology that truly helps you.", body: "We automate tasks, answer enquiries and handle requests so your team gains time and efficiency.", tags: ["Answers enquiries 24/7", "Manages bookings and requests", "Organises and follows up"] },
    { label: "Marketing", eyebrow: "Digital marketing", title: "Connect your company with more customers.", body: "We help the right people discover you, trust your offer and become real opportunities.", tags: [] },
    { label: "Results", eyebrow: "The result", title: "A more efficient business, with more opportunities.", body: "Fewer repetitive tasks, better-served customers and a team with more time for what adds most value.", tags: ["More focused team", "Better-served customers", "Faster processes", "More growth opportunities"] },
    { label: "aibe", eyebrow: "aibe", title: "Technology with a human touch.", body: "", tags: ["Closeness", "Trust", "Transparency"] },
  ],
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
    const destroy = window.mountScrollWorld(el, {
      brand: { name: "aibe", href: `/${loc}` },
      cta: { label: UI[loc].top, href: `${mk}#contacto` },
      hint: UI[loc].hint,
      diveScroll: 1.3,
      connScroll: 0.9,
      sections: IDS.map((id, i) => ({
        id,
        ...copy[i],
        still: `${W}/${id}.webp`,
        stillMobile: `${W}/${id}-m.webp`,
        clip: `${W}/vid/${id}.mp4`,
        clipMobile: `${W}/vid/${id}-m.mp4`,
        accent: id === "aibe" ? "#19D3FF" : "#0077FF",
        ...(i === 0 ? { scroll: 1.6, linger: 0.4 } : {}),
        ...(i === IDS.length - 1
          ? {
              scroll: 1.8,
              linger: 0.5,
              cta: {
                primary: { label: UI[loc].primary, href: `${mk}#contacto` },
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
    <>
      <style>{`
        #world.sw-root{--sw-bg:#EEF4FB;--sw-ink:#001E4B;--sw-ink-soft:#3A4F72;--sw-accent:#0077FF;
          --sw-font-display:var(--font-display, "Poppins", ui-rounded, "Segoe UI", system-ui, sans-serif);}
        /* globals.css sets height:100% + overflow-x:hidden on html/body, which turns body into
           the scroll container; the scrub engine needs the window to scroll. Home only. */
        html,body{height:auto!important;overflow-x:clip!important;scroll-behavior:auto!important;}
        body{background:#EEF4FB;}
        #world .sw-brand__mark{display:none!important;}
        #world .sw-brand__name{font-size:0!important;width:120px;height:40px;background:url(${W}/aibe-logo.webp) left center/contain no-repeat;}
        #world .sw-brand{background:rgba(255,255,255,.85);padding:6px 14px;border-radius:14px;backdrop-filter:blur(8px);}
        #world .sw-topcta{background:#0077FF!important;}
        #world .sw-btn--primary{background:#0077FF!important;box-shadow:0 10px 30px rgba(0,119,255,.35);}
        /* Final scene sits on deep blue: light ink, real logo (dark-bg variant), placed on the open right side */
        #world .sw-copylayer .sw-copy:last-child .sw-copy__eyebrow{font-size:0;height:clamp(56px,7vw,92px);
          background:url(${W}/aibe-logo-dark.webp) left center/contain no-repeat;margin-bottom:6px;}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__title{color:#fff;text-shadow:0 2px 24px rgba(0,30,75,.6);}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__body,
        #world .sw-copylayer .sw-copy:last-child .sw-copy__num{color:rgba(255,255,255,.85);}
        #world .sw-copylayer .sw-copy:last-child .sw-copy__tags li{color:#fff;background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.35);}
        #world .sw-copylayer .sw-copy:last-child .sw-btn--ghost{color:#fff;border-color:rgba(255,255,255,.45);}
        /* On the dark final scene the light copy scrim would wash the image: swap it for a soft navy one */
        #world .sw-copylayer::before{transition:opacity .5s ease;}
        #world .sw-copylayer::after{content:"";position:absolute;inset:0;opacity:0;transition:opacity .5s ease;pointer-events:none;
          background:linear-gradient(270deg,rgba(0,30,75,.55) 0%,rgba(0,30,75,.25) 40%,transparent 65%);}
        #world[data-active="5"] .sw-copylayer::before{opacity:0;}
        #world[data-active="5"] .sw-copylayer::after{opacity:1;}
        @media (min-width:861px){
          #world .sw-copylayer .sw-copy:last-child{left:auto;right:clamp(24px,7vw,120px);}
        }
        @media (max-width:860px){
          #world .sw-copylayer::after{background:linear-gradient(0deg,rgba(0,30,75,.7) 0%,rgba(0,30,75,.3) 45%,transparent 70%);}
        }
      `}</style>
      <Script src={`${W}/scrub-engine.js`} strategy="afterInteractive" onReady={mount} />
      <div id="world" ref={ref} />
    </>
  );
}
