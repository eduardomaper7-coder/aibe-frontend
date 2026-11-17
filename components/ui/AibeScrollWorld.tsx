"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

type Locale = "es" | "en";

declare global {
  interface Window {
    mountScrollWorld?: (el: HTMLElement, config: unknown) => (() => void) | undefined;
  }
}

const W = "/world";
const ENGINE_VERSION = "2026-11-17c";
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

const AFTER: Record<Locale, {
  servicesEyebrow: string; servicesTitle: string;
  services: { title: string; body: string; cta: string; href: (l: string) => string }[];
  clientsEyebrow: string; clientsTitle: string;
}> = {
  es: {
    servicesEyebrow: "Qué hacemos",
    servicesTitle: "Dos formas de ayudarte a crecer.",
    services: [
      { title: "Agentes IA", body: "Asistentes que atienden consultas 24/7, gestionan citas y solicitudes y hacen el seguimiento por ti, en WhatsApp, web o teléfono.", cta: "Ver agentes IA", href: (l) => `/${l}/marketing-digital#ia` },
      { title: "Marketing digital", body: "Google, redes sociales y web para que las personas adecuadas te encuentren, confíen en ti y te contacten.", cta: "Ver marketing digital", href: (l) => `/${l}/marketing-digital` },
    ],
    clientsEyebrow: "Confían en nosotros",
    clientsTitle: "Negocios que ya trabajan con aibe.",
  },
  en: {
    servicesEyebrow: "What we do",
    servicesTitle: "Two ways to help you grow.",
    services: [
      { title: "AI agents", body: "Assistants that answer enquiries 24/7, manage bookings and requests and follow up for you, on WhatsApp, web or phone.", cta: "See AI agents", href: (l) => `/${l}/marketing-digital#ia` },
      { title: "Digital marketing", body: "Google, social media and web so the right people find you, trust you and get in touch.", cta: "See digital marketing", href: (l) => `/${l}/marketing-digital` },
    ],
    clientsEyebrow: "They trust us",
    clientsTitle: "Businesses already working with aibe.",
  },
};

const CLIENT_LOGOS = [
  { src: "/imagenes/cliente1.png", alt: "Laser Point" },
  { src: "/imagenes/cliente2.webp", alt: "Nadora" },
  { src: "/imagenes/cliente3.png", alt: "Clínica D+" },
  { src: "/imagenes/cliente4.png", alt: "Clínica Dental Bances Sanz" },
  { src: "/imagenes/cliente5.png", alt: "Grupo Maitias" },
  { src: "/imagenes/cliente6.png", alt: "Siete Notas" },
];

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
      cta: { label: UI[loc].top, href: "#contacto" },
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
    const onScroll = () => world.classList.toggle("is-after", after.getBoundingClientRect().top < 90);
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
        .aibe-after{position:relative;z-index:45;background:#fff;color:#001E4B;}
        .aibe-after__band{padding:clamp(64px,10vw,120px) clamp(18px,5vw,64px);}
        .aibe-after__band--tint{background:#EEF4FB;}
        .aibe-after__inner{max-width:1180px;margin:0 auto;}
        .aibe-after__eyebrow{display:block;font-weight:700;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:#0077FF;}
        .aibe-after__title{font-weight:700;font-size:clamp(1.8rem,3.6vw,2.8rem);line-height:1.08;margin:12px 0 0;color:#001E4B;}
        .aibe-services{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:40px;}
        .aibe-service{display:flex;flex-direction:column;gap:14px;padding:clamp(24px,3vw,40px);border-radius:24px;background:#EEF4FB;
          border:1px solid rgba(0,119,255,.12);text-decoration:none;color:inherit;transition:transform .25s ease,box-shadow .25s ease;}
        .aibe-service:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,30,75,.12);}
        .aibe-service h3{font-size:clamp(1.4rem,2.2vw,1.8rem);font-weight:700;margin:0;color:#001E4B;}
        .aibe-service p{margin:0;font-size:1.02rem;line-height:1.55;color:#3A4F72;}
        .aibe-service span{margin-top:auto;font-weight:600;color:#0077FF;}
        .aibe-logos{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px;margin-top:40px;}
        .aibe-logo{display:flex;align-items:center;justify-content:center;height:110px;padding:12px;border-radius:18px;background:#fff;
          border:1px solid rgba(0,30,75,.08);overflow:hidden;}
        .aibe-logo img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;}
        @media (max-width:860px){
          .aibe-services{grid-template-columns:1fr;}
          .aibe-logos{grid-template-columns:repeat(3,minmax(0,1fr));}
          .aibe-logo{height:90px;}
        }
      `}</style>
      {/* bump ENGINE_VERSION whenever public/world/scrub-engine.js changes, so browsers drop the cached copy */}
      <Script src={`${W}/scrub-engine.js?v=${ENGINE_VERSION}`} strategy="afterInteractive" onReady={mount} />
      <div id="world" ref={ref} />

      <div className="aibe-after">
        <section className="aibe-after__band">
          <div className="aibe-after__inner">
            <span className="aibe-after__eyebrow">{AFTER[loc].servicesEyebrow}</span>
            <h2 className="aibe-after__title">{AFTER[loc].servicesTitle}</h2>
            <div className="aibe-services">
              {AFTER[loc].services.map((sv) => (
                <a key={sv.title} className="aibe-service" href={sv.href(loc)}>
                  <h3>{sv.title}</h3>
                  <p>{sv.body}</p>
                  <span>{sv.cta} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="aibe-after__band aibe-after__band--tint">
          <div className="aibe-after__inner">
            <span className="aibe-after__eyebrow">{AFTER[loc].clientsEyebrow}</span>
            <h2 className="aibe-after__title">{AFTER[loc].clientsTitle}</h2>
            <div className="aibe-logos">
              {CLIENT_LOGOS.map((c) => (
                <div key={c.src} className="aibe-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
