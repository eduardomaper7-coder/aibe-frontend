import { Outfit } from "next/font/google";
import {
  ArrowRight, BarChart3, BookOpen, CalendarCheck, Check, ChevronDown, FileText, Headset,
  LineChart, PhoneCall, Plug, RefreshCw, Settings2, ShieldCheck, Sparkles, Target, Users, Workflow,
} from "lucide-react";
import SiteNavbar from "../ui/SiteNavbar";
import AibeHomeContact from "../ui/AibeHomeContact";
import Footer from "../ui/Footer";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit", display: "swap" });

type Locale = "es" | "en";

const C = {
  es: {
    eyebrow: "Agentes IA a medida",
    h1a: "Inteligencia artificial",
    h1b: "diseñada para tu empresa.",
    lead: "Creamos agentes de IA personalizados que atienden a tus clientes, automatizan tareas y conectan tus herramientas. Cada solución se diseña a partir de cómo trabaja tu empresa, para que tu equipo dedique su tiempo a lo que aporta más valor.",
    ctaPrimary: "Hablemos de tu empresa", ctaSecondary: "Ver soluciones",
    chips: ["100% personalizados", "Integrados con tus herramientas", "Disponibles 24/7"],
    chat: {
      name: "Tu empresa", status: "Asistente aibe · en línea",
      m: [
        { me: false, t: "Hola, quería información sobre vuestros servicios y saber si podemos hablar esta semana.", h: "23:47" },
        { me: true, t: "¡Hola! Claro 😊 Te resumo lo principal y te propongo una llamada. ¿Te viene bien el jueves a las 10:30 o el viernes a las 12:00?", h: "23:47" },
        { me: false, t: "El jueves, perfecto.", h: "23:48" },
        { me: true, t: "Hecho ✅ Llamada confirmada el jueves a las 10:30. Te he enviado la invitación por email.", h: "23:48" },
      ],
      badge: "Reunión añadida al calendario",
    },
    solEyebrow: "Soluciones",
    solTitle: "Mucho más que un chatbot.",
    solLead: "Estas son algunas de las soluciones que desarrollamos. Las combinamos y adaptamos según las necesidades de cada empresa.",
    sols: [
      { i: "support", t: "Atención al cliente", d: "Responde consultas al instante por WhatsApp, web o email, con el tono de tu marca y a cualquier hora." },
      { i: "voice", t: "Agentes de voz", d: "Atienden y realizan llamadas con voz natural: resuelven dudas, toman datos y derivan cuando hace falta." },
      { i: "cal", t: "Citas y agenda", d: "Consultan disponibilidad y reservan, cambian o cancelan citas directamente en tu calendario." },
      { i: "sales", t: "Captación y ventas", d: "Cualifican a cada contacto, hacen el seguimiento y entregan a tu equipo oportunidades listas para cerrar." },
      { i: "flow", t: "Automatización de procesos", d: "Se encargan de tareas repetitivas entre tus herramientas: altas, avisos, actualizaciones y flujos de trabajo." },
      { i: "docs", t: "Documentos y datos", d: "Leen facturas, pedidos, contratos o correos, extraen la información clave y la llevan donde la necesitas." },
      { i: "kb", t: "Asistente interno", d: "Un experto en tu empresa para tu equipo: responde dudas sobre procedimientos, productos y documentación." },
      { i: "bi", t: "Informes y análisis", d: "Resumen la actividad, detectan patrones y te avisan de lo importante para decidir con datos." },
    ],
    customEyebrow: "Hecho a medida",
    customTitle: "Ninguna empresa es igual. Tu agente tampoco.",
    customLead: "No vendemos una herramienta genérica: diseñamos cada agente a partir de tus procesos, tus datos y tus objetivos, y lo integramos con las herramientas que ya usas.",
    custom: [
      { i: "settings", t: "Se adapta a tu forma de trabajar", d: "Sigue tus procesos, tus normas y tu tono. Tú decides qué hace, qué no y cuándo pasa el testigo a una persona." },
      { i: "plug", t: "Se integra con tus herramientas", d: "CRM, ERP, agenda, email, WhatsApp, hojas de cálculo o software propio: trabaja donde ya trabaja tu equipo." },
      { i: "refresh", t: "Evoluciona con tu negocio", d: "Lo revisamos y mejoramos de forma continua para que crezca contigo y responda a nuevas necesidades." },
    ],
    tools: ["CRM", "ERP", "WhatsApp", "Email", "Calendario", "Web", "Teléfono", "Hojas de cálculo", "Software propio"],
    howEyebrow: "Cómo trabajamos", howTitle: "De la idea a tu agente funcionando, en cuatro pasos.",
    steps: [
      { t: "Analizamos tu empresa", d: "Conocemos tus procesos, tus herramientas y dónde se pierde más tiempo." },
      { t: "Diseñamos la solución", d: "Definimos contigo qué hará cada agente, con qué datos y cómo se medirá su impacto." },
      { t: "Desarrollamos e integramos", d: "Lo construimos a medida y lo conectamos con tus canales y sistemas." },
      { t: "Medimos y mejoramos", d: "Revisamos resultados y lo ajustamos para que cada mes aporte más." },
    ],
    whyEyebrow: "Por qué aibe", whyTitle: "Tecnología con sentido humano.",
    whyLead: "La inteligencia artificial está para potenciar a tu equipo, no para sustituir el trato cercano que te diferencia.",
    why: [
      { i: "users", t: "Tu equipo, siempre al mando", d: "Los agentes derivan a una persona cuando la situación lo requiere, con todo el contexto." },
      { i: "spark", t: "Diseño a medida", d: "Nada de respuestas genéricas: cada agente conoce tu empresa y actúa según tus criterios." },
      { i: "shield", t: "Datos protegidos", d: "Diseñamos cada integración pensando en la privacidad y el cumplimiento del RGPD." },
      { i: "chart", t: "Resultados medibles", d: "Sabrás qué hace cada agente, cuánto tiempo ahorra y dónde seguir mejorando." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Qué tipo de tareas puede hacer un agente de IA?", a: "Desde atender a clientes por WhatsApp, web o teléfono hasta gestionar citas, cualificar contactos, procesar documentos o automatizar tareas internas. En la primera reunión identificamos dónde puede aportar más en tu empresa." },
      { q: "¿Se adapta a las herramientas que ya usamos?", a: "Sí. Cada agente se integra con los sistemas de tu empresa (CRM, ERP, agenda, email, hojas de cálculo o software propio) para que no tengas que cambiar tu forma de trabajar." },
      { q: "¿Necesitamos conocimientos técnicos?", a: "No. Nos encargamos del análisis, el desarrollo, la integración y el mantenimiento. Tu equipo solo tiene que contarnos cómo trabaja y validar el resultado." },
      { q: "¿Qué pasa si el agente no sabe resolver algo?", a: "Lo definimos contigo: puede recoger la información, avisar a la persona adecuada o transferirle la conversación, para que nada se quede sin respuesta." },
      { q: "¿Cuánto se tarda en ponerlo en marcha?", a: "Depende del alcance y de las integraciones necesarias. Tras analizar tu caso te damos un plan y un calendario concretos." },
    ],
  },
  en: {
    eyebrow: "Tailor-made AI agents",
    h1a: "Artificial intelligence",
    h1b: "designed for your company.",
    lead: "We build custom AI agents that serve your customers, automate tasks and connect your tools. Every solution is designed around how your company works, so your team can focus on what adds the most value.",
    ctaPrimary: "Let's talk about your company", ctaSecondary: "See solutions",
    chips: ["100% custom", "Integrated with your tools", "Available 24/7"],
    chat: {
      name: "Your company", status: "aibe assistant · online",
      m: [
        { me: false, t: "Hi, I'd like to know more about your services and whether we could talk this week.", h: "23:47" },
        { me: true, t: "Hi! Of course 😊 Here's a quick overview, and I can set up a call. Does Thursday at 10:30 or Friday at 12:00 work for you?", h: "23:47" },
        { me: false, t: "Thursday, perfect.", h: "23:48" },
        { me: true, t: "Done ✅ Call confirmed for Thursday at 10:30. I've sent you the invite by email.", h: "23:48" },
      ],
      badge: "Meeting added to calendar",
    },
    solEyebrow: "Solutions",
    solTitle: "Much more than a chatbot.",
    solLead: "These are some of the solutions we build. We combine and adapt them to each company's needs.",
    sols: [
      { i: "support", t: "Customer service", d: "Answers enquiries instantly on WhatsApp, web or email, in your brand's voice, at any hour." },
      { i: "voice", t: "Voice agents", d: "Take and make calls with a natural voice: answer questions, collect details and hand over when needed." },
      { i: "cal", t: "Bookings and calendar", d: "Check availability and book, move or cancel appointments right in your calendar." },
      { i: "sales", t: "Lead generation and sales", d: "Qualify every contact, follow up and hand your team opportunities ready to close." },
      { i: "flow", t: "Process automation", d: "Handle repetitive work across your tools: sign-ups, alerts, updates and workflows." },
      { i: "docs", t: "Documents and data", d: "Read invoices, orders, contracts or emails, extract the key data and send it where it's needed." },
      { i: "kb", t: "Internal assistant", d: "An expert on your company for your team: answers questions on procedures, products and documentation." },
      { i: "bi", t: "Reports and analysis", d: "Summarise activity, spot patterns and flag what matters so you decide with data." },
    ],
    customEyebrow: "Tailor-made",
    customTitle: "No two companies are alike. Neither are their agents.",
    customLead: "We don't sell a generic tool: we design every agent around your processes, your data and your goals, and integrate it with the tools you already use.",
    custom: [
      { i: "settings", t: "Fits the way you work", d: "It follows your processes, rules and tone. You decide what it does, what it doesn't, and when it hands over to a person." },
      { i: "plug", t: "Integrates with your tools", d: "CRM, ERP, calendar, email, WhatsApp, spreadsheets or in-house software: it works where your team already works." },
      { i: "refresh", t: "Evolves with your business", d: "We keep reviewing and improving it so it grows with you and meets new needs." },
    ],
    tools: ["CRM", "ERP", "WhatsApp", "Email", "Calendar", "Website", "Phone", "Spreadsheets", "In-house software"],
    howEyebrow: "How we work", howTitle: "From idea to a working agent, in four steps.",
    steps: [
      { t: "We analyse your company", d: "We learn your processes, your tools and where the most time is lost." },
      { t: "We design the solution", d: "We define with you what each agent will do, with which data and how its impact is measured." },
      { t: "We build and integrate", d: "We build it to measure and connect it to your channels and systems." },
      { t: "We measure and improve", d: "We review results and fine-tune it so it delivers more every month." },
    ],
    whyEyebrow: "Why aibe", whyTitle: "Technology with a human touch.",
    whyLead: "Artificial intelligence is here to empower your team, not to replace the personal service that sets you apart.",
    why: [
      { i: "users", t: "Your team stays in charge", d: "Agents hand over to a person whenever the situation calls for it, with full context." },
      { i: "spark", t: "Custom design", d: "No generic replies: every agent knows your company and acts on your criteria." },
      { i: "shield", t: "Protected data", d: "Every integration is designed with privacy and GDPR compliance in mind." },
      { i: "chart", t: "Measurable results", d: "Know what each agent does, how much time it saves and where to keep improving." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What kind of tasks can an AI agent handle?", a: "From serving customers on WhatsApp, web or phone to managing bookings, qualifying leads, processing documents or automating internal tasks. In our first meeting we identify where it can add the most value in your company." },
      { q: "Does it work with the tools we already use?", a: "Yes. Each agent integrates with your company's systems (CRM, ERP, calendar, email, spreadsheets or in-house software) so you don't have to change the way you work." },
      { q: "Do we need technical knowledge?", a: "No. We handle the analysis, development, integration and maintenance. Your team just tells us how it works and validates the result." },
      { q: "What if the agent can't solve something?", a: "We define that with you: it can gather the information, alert the right person or transfer the conversation, so nothing goes unanswered." },
      { q: "How long does it take to launch?", a: "It depends on the scope and the integrations required. After reviewing your case we give you a concrete plan and timeline." },
    ],
  },
} as const;

const ICONS: Record<string, React.ReactNode> = {
  support: <Headset size={24} />, voice: <PhoneCall size={24} />, cal: <CalendarCheck size={24} />, sales: <Target size={24} />,
  flow: <Workflow size={24} />, docs: <FileText size={24} />, kb: <BookOpen size={24} />, bi: <BarChart3 size={24} />,
  settings: <Settings2 size={24} />, plug: <Plug size={24} />, refresh: <RefreshCw size={24} />,
  users: <Users size={22} />, spark: <Sparkles size={22} />, shield: <ShieldCheck size={22} />, chart: <LineChart size={22} />,
};

export default function AgentesIA({ locale }: { locale: string }) {
  const loc: Locale = locale === "en" ? "en" : "es";
  const t = C[loc];

  return (
    <div className={`agp ${outfit.variable}`}>
      <SiteNavbar />

      {/* HERO */}
      <section className="agp-hero">
        <div className="agp-glow agp-glow--a" aria-hidden />
        <div className="agp-glow agp-glow--b" aria-hidden />
        <div className="agp-wrap agp-hero__grid">
          <div>
            <span className="agp-eyebrow agp-eyebrow--light">{t.eyebrow}</span>
            <h1 className="agp-hero__title">{t.h1a}<br /><span>{t.h1b}</span></h1>
            <p className="agp-hero__lead">{t.lead}</p>
            <div className="agp-hero__ctas">
              <a href="#contacto" className="agp-btn agp-btn--primary">{t.ctaPrimary}<ArrowRight size={18} /></a>
              <a href="#soluciones" className="agp-btn agp-btn--ghost">{t.ctaSecondary}</a>
            </div>
            <ul className="agp-chips">
              {t.chips.map((c) => <li key={c}><Check size={15} strokeWidth={3} />{c}</li>)}
            </ul>
          </div>

          <div className="agp-chat" aria-label={loc === "es" ? "Ejemplo de conversación con un agente IA" : "Example conversation with an AI agent"}>
            <div className="agp-chat__head">
              <span className="agp-chat__avatar"><Sparkles size={18} /></span>
              <div><strong>{t.chat.name}</strong><small>{t.chat.status}</small></div>
            </div>
            <div className="agp-chat__body">
              {t.chat.m.map((m, i) => (
                <div key={i} className={`agp-msg ${m.me ? "agp-msg--me" : ""}`} style={{ animationDelay: `${0.25 + i * 0.55}s` }}>
                  <p>{m.t}</p><time>{m.h}</time>
                </div>
              ))}
            </div>
            <div className="agp-chat__badge"><CalendarCheck size={16} />{t.chat.badge}</div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="agp-sec" id="soluciones">
        <div className="agp-wrap">
          <header className="agp-head">
            <span className="agp-eyebrow">{t.solEyebrow}</span>
            <h2 className="agp-h2">{t.solTitle}</h2>
            <p className="agp-lead">{t.solLead}</p>
          </header>
          <div className="agp-caps agp-caps--4">
            {t.sols.map((c) => (
              <article key={c.t} className="agp-cap">
                <span className="agp-icon">{ICONS[c.i]}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TAILOR-MADE */}
      <section className="agp-sec agp-sec--tint">
        <div className="agp-wrap agp-custom">
          <div className="agp-custom__intro">
            <span className="agp-eyebrow">{t.customEyebrow}</span>
            <h2 className="agp-h2">{t.customTitle}</h2>
            <p className="agp-lead">{t.customLead}</p>
            <ul className="agp-tools" aria-label={loc === "es" ? "Herramientas con las que se integra" : "Tools it integrates with"}>
              {t.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </div>
          <div className="agp-custom__list">
            {t.custom.map((c) => (
              <article key={c.t} className="agp-custom__item">
                <span className="agp-icon">{ICONS[c.i]}</span>
                <div><h3>{c.t}</h3><p>{c.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="agp-sec" id="como-funciona">
        <div className="agp-wrap">
          <header className="agp-head">
            <span className="agp-eyebrow">{t.howEyebrow}</span>
            <h2 className="agp-h2">{t.howTitle}</h2>
          </header>
          <ol className="agp-steps">
            {t.steps.map((s, i) => (
              <li key={s.t} className="agp-step">
                <span className="agp-step__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY AIBE */}
      <section className="agp-why">
        <div className="agp-glow agp-glow--c" aria-hidden />
        <div className="agp-wrap agp-why__grid">
          <div>
            <span className="agp-eyebrow agp-eyebrow--light">{t.whyEyebrow}</span>
            <h2 className="agp-h2 agp-h2--light">{t.whyTitle}</h2>
            <p className="agp-why__lead">{t.whyLead}</p>
          </div>
          <div className="agp-why__list">
            {t.why.map((w) => (
              <div key={w.t} className="agp-why__item">
                <span className="agp-icon">{ICONS[w.i]}</span>
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="agp-sec">
        <div className="agp-wrap agp-faq">
          <h2 className="agp-h2">{t.faqTitle}</h2>
          <div className="agp-faq__list">
            {t.faq.map((f) => (
              <details key={f.q} className="agp-faq__item">
                <summary>{f.q}<ChevronDown size={20} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AibeHomeContact locale={loc} />
      <Footer />

      <style>{`
        .agp{font-family:var(--font-outfit),system-ui,sans-serif;color:#001E4B;background:#fff;}
        .agp-wrap{max-width:1180px;margin:0 auto;padding:0 clamp(18px,5vw,64px);}
        .agp-eyebrow{display:inline-block;font-weight:600;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:#0077FF;}
        .agp-eyebrow--light{color:#19D3FF;}
        .agp-h2{font-weight:700;font-size:clamp(2rem,4vw,3.1rem);line-height:1.07;letter-spacing:-.02em;margin:14px 0 0;color:#001E4B;}
        .agp-h2--light{color:#fff;}
        .agp-glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        .agp-icon{display:grid;place-items:center;width:52px;height:52px;border-radius:16px;color:#fff;flex:none;
          background:linear-gradient(135deg,#0077FF 0%,#19D3FF 100%);box-shadow:0 12px 26px -12px rgba(0,119,255,.75);}
        .agp-icon--soft{background:#EEF4FB;color:#0077FF;box-shadow:none;}

        /* hero */
        .agp-hero{position:relative;overflow:hidden;background:#001E4B;color:#fff;padding:clamp(130px,15vw,190px) 0 clamp(80px,10vw,130px);}
        .agp-glow--a{width:760px;height:760px;right:-200px;top:-260px;background:radial-gradient(circle,rgba(0,119,255,.6),transparent 65%);}
        .agp-glow--b{width:600px;height:600px;left:-260px;bottom:-320px;background:radial-gradient(circle,rgba(25,211,255,.3),transparent 65%);}
        .agp-hero__grid{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(40px,6vw,80px);align-items:center;}
        .agp-hero__title{font-weight:700;font-size:clamp(2.4rem,5.4vw,4.4rem);line-height:1.03;letter-spacing:-.025em;margin:16px 0 0;}
        .agp-hero__title span{background:linear-gradient(90deg,#4FA8FF 0%,#19D3FF 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
        .agp-hero__lead{margin:24px 0 0;max-width:560px;font-size:clamp(1.05rem,1.4vw,1.2rem);line-height:1.6;color:rgba(255,255,255,.76);}
        .agp-hero__ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;}
        .agp-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:600;font-size:1rem;text-decoration:none;transition:transform .2s,box-shadow .2s,background .2s;}
        .agp-btn--primary{color:#fff;background:linear-gradient(135deg,#0077FF 0%,#0A8DFF 55%,#19D3FF 120%);box-shadow:0 14px 32px rgba(0,119,255,.4);}
        .agp-btn--primary:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(0,119,255,.5);}
        .agp-btn--ghost{color:#fff;border:1.5px solid rgba(255,255,255,.3);}
        .agp-btn--ghost:hover{background:rgba(255,255,255,.08);}
        .agp-chips{list-style:none;padding:0;margin:34px 0 0;display:flex;flex-wrap:wrap;gap:10px 22px;}
        .agp-chips li{display:inline-flex;align-items:center;gap:8px;font-size:.95rem;color:rgba(255,255,255,.85);}
        .agp-chips svg{color:#19D3FF;}

        .agp-chat{position:relative;background:#fff;color:#001E4B;border-radius:28px;overflow:hidden;
          box-shadow:0 40px 90px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.08);max-width:440px;justify-self:end;width:100%;}
        .agp-chat__head{display:flex;align-items:center;gap:12px;padding:18px 20px;background:#F4F8FD;border-bottom:1px solid #E1EAF5;}
        .agp-chat__head strong{display:block;font-size:1rem;}
        .agp-chat__head small{display:block;font-size:.8rem;color:#16A34A;font-weight:500;}
        .agp-chat__avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;color:#fff;background:linear-gradient(135deg,#0077FF,#19D3FF);}
        .agp-chat__body{display:grid;gap:10px;padding:22px 18px 70px;background:#EEF4FB;min-height:330px;align-content:start;}
        .agp-msg{max-width:84%;padding:10px 14px 6px;border-radius:16px 16px 16px 4px;background:#fff;box-shadow:0 1px 2px rgba(0,30,75,.08);
          opacity:0;transform:translateY(8px);animation:agp-in .5s ease forwards;}
        .agp-msg p{margin:0;font-size:.93rem;line-height:1.45;}
        .agp-msg time{display:block;text-align:right;font-size:.7rem;color:#6B7FA0;margin-top:3px;}
        .agp-msg--me{justify-self:end;border-radius:16px 16px 4px 16px;background:#0077FF;color:#fff;}
        .agp-msg--me time{color:rgba(255,255,255,.75);}
        .agp-chat__badge{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);display:inline-flex;align-items:center;gap:8px;white-space:nowrap;
          padding:9px 16px;border-radius:999px;background:#001E4B;color:#fff;font-size:.85rem;font-weight:600;box-shadow:0 10px 24px rgba(0,30,75,.3);
          opacity:0;animation:agp-in .5s ease 2.6s forwards;}
        .agp-chat__badge svg{color:#19D3FF;}
        @keyframes agp-in{to{opacity:1;transform:translateY(0)}}
        .agp-chat__badge{transform:translateX(-50%) translateY(8px);}
        @keyframes agp-in-badge{to{opacity:1;transform:translateX(-50%) translateY(0)}}
        .agp-chat__badge{animation-name:agp-in-badge;}
        @media (prefers-reduced-motion:reduce){.agp-msg,.agp-chat__badge{animation:none;opacity:1;transform:none;}.agp-chat__badge{transform:translateX(-50%);}}

        /* sections */
        .agp-sec{padding:clamp(80px,10vw,130px) 0;}
        .agp-sec--tint{background:#EEF4FB;}
        .agp-head{max-width:720px;}
        .agp-caps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,5vw,60px);}
        .agp-cap{padding:30px;border-radius:24px;background:#fff;border:1px solid #E1EAF5;
          box-shadow:0 1px 2px rgba(0,30,75,.04),0 18px 40px -26px rgba(0,30,75,.2);transition:transform .3s,box-shadow .3s,border-color .3s;}
        .agp-cap:hover{transform:translateY(-5px);border-color:rgba(0,119,255,.3);box-shadow:0 28px 56px -28px rgba(0,63,160,.35);}
        .agp-cap h3{margin:22px 0 0;font-size:1.3rem;font-weight:700;}
        .agp-cap p{margin:8px 0 0;font-size:1rem;line-height:1.55;color:#3A4F72;}

        .agp-steps{list-style:none;padding:0;margin:clamp(40px,5vw,60px) 0 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;counter-reset:s;}
        .agp-step{position:relative;padding:30px 26px;border-radius:24px;background:#fff;border:1px solid #E1EAF5;}
        .agp-step__n{display:inline-block;font-weight:700;font-size:2.4rem;line-height:1;letter-spacing:-.02em;
          background:linear-gradient(135deg,#0077FF,#19D3FF);-webkit-background-clip:text;background-clip:text;color:transparent;}
        .agp-step h3{margin:18px 0 0;font-size:1.2rem;font-weight:700;}
        .agp-step p{margin:8px 0 0;line-height:1.55;color:#3A4F72;}


        .agp-why{position:relative;overflow:hidden;background:#001E4B;color:#fff;padding:clamp(80px,10vw,130px) 0;}
        .agp-glow--c{width:700px;height:700px;left:-220px;top:-300px;background:radial-gradient(circle,rgba(0,119,255,.45),transparent 65%);}
        .agp-why__grid{position:relative;display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(40px,6vw,80px);align-items:center;}
        .agp-why__lead{margin:20px 0 0;max-width:440px;font-size:1.1rem;line-height:1.6;color:rgba(255,255,255,.74);}
        .agp-why__list{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .agp-why__item{display:flex;flex-direction:column;gap:16px;padding:26px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);}
        .agp-why__item h3{margin:0;font-size:1.15rem;font-weight:700;}
        .agp-why__item p{margin:6px 0 0;line-height:1.55;color:rgba(255,255,255,.72);}

        .agp-faq{max-width:860px;}
        .agp-faq__list{margin-top:36px;display:grid;gap:12px;}
        .agp-faq__item{border:1px solid #E1EAF5;border-radius:18px;background:#fff;transition:border-color .2s,box-shadow .2s;}
        .agp-faq__item[open]{border-color:rgba(0,119,255,.35);box-shadow:0 18px 40px -28px rgba(0,63,160,.35);}
        .agp-faq__item summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 24px;cursor:pointer;list-style:none;font-weight:600;font-size:1.08rem;}
        .agp-faq__item summary::-webkit-details-marker{display:none;}
        .agp-faq__item summary svg{flex:none;color:#0077FF;transition:transform .25s;}
        .agp-faq__item[open] summary svg{transform:rotate(180deg);}
        .agp-faq__item p{margin:0;padding:0 24px 22px;line-height:1.65;color:#3A4F72;}

        @media (max-width:1020px){
          .agp-caps{grid-template-columns:repeat(2,minmax(0,1fr));}
          .agp-steps{grid-template-columns:repeat(2,minmax(0,1fr));}
        }
        @media (max-width:860px){
          .agp-hero__grid,.agp-why__grid{grid-template-columns:1fr;}
          .agp-chat{justify-self:center;}
        }
        @media (max-width:600px){
          .agp-caps,.agp-steps,.agp-why__list{grid-template-columns:1fr;}
        }
        .agp-lead{margin:16px 0 0;max-width:640px;font-size:1.1rem;line-height:1.6;color:#3A4F72;}
        .agp-caps--4{grid-template-columns:repeat(4,minmax(0,1fr));}
        .agp-caps--4 .agp-cap{padding:28px 26px;}
        .agp-caps--4 .agp-cap h3{font-size:1.2rem;}
        .agp-custom{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px);align-items:center;}
        .agp-tools{list-style:none;padding:0;margin:30px 0 0;display:flex;flex-wrap:wrap;gap:10px;}
        .agp-tools li{padding:9px 16px;border-radius:999px;background:#fff;border:1px solid #D7E4F5;font-size:.92rem;font-weight:500;color:#001E4B;}
        .agp-custom__list{display:grid;gap:16px;}
        .agp-custom__item{display:flex;gap:20px;align-items:flex-start;padding:26px;border-radius:22px;background:#fff;border:1px solid #E1EAF5;
          box-shadow:0 18px 40px -28px rgba(0,30,75,.25);}
        .agp-custom__item h3{margin:2px 0 0;font-size:1.2rem;font-weight:700;}
        .agp-custom__item p{margin:6px 0 0;line-height:1.55;color:#3A4F72;}
        @media (max-width:1020px){ .agp-caps--4{grid-template-columns:repeat(2,minmax(0,1fr));} }
        @media (max-width:860px){ .agp-custom{grid-template-columns:1fr;} }
        @media (max-width:600px){ .agp-caps--4{grid-template-columns:1fr;} }
      `}</style>
    </div>
  );
}
