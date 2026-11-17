import { Outfit } from "next/font/google";
import {
  ArrowRight, BellRing, Briefcase, CalendarCheck, Check, ChevronDown, Home, LineChart,
  MessageCircle, MessagesSquare, PhoneCall, Plug, ShieldCheck, Sparkles, Stethoscope,
  UserCheck, Users, UtensilsCrossed,
} from "lucide-react";
import SiteNavbar from "../ui/SiteNavbar";
import AibeHomeContact from "../ui/AibeHomeContact";
import Footer from "../ui/Footer";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit", display: "swap" });

type Locale = "es" | "en";

const C = {
  es: {
    eyebrow: "Agentes IA",
    h1a: "Tu negocio, atendido 24/7.",
    h1b: "Sin perder el trato humano.",
    lead: "Creamos asistentes con inteligencia artificial que responden a tus clientes, gestionan citas y hacen el seguimiento por WhatsApp, teléfono y tu web, mientras tu equipo se centra en lo que de verdad importa.",
    ctaPrimary: "Hablemos de tu negocio", ctaSecondary: "Cómo funciona",
    chips: ["Disponible 24/7", "Responde en segundos", "Conectado a tu agenda"],
    chat: {
      name: "Clínica dental", status: "Asistente aibe · en línea",
      m: [
        { me: false, t: "Hola, ¿tenéis cita para una limpieza dental esta semana?", h: "23:47" },
        { me: true, t: "¡Hola! Sí 😊 Tengo hueco el jueves a las 10:30 o el viernes a las 17:00. ¿Cuál te viene mejor?", h: "23:47" },
        { me: false, t: "El viernes, perfecto.", h: "23:48" },
        { me: true, t: "Hecho ✅ Te he reservado el viernes a las 17:00. Te enviaré un recordatorio el día antes.", h: "23:48" },
      ],
      badge: "Cita añadida a la agenda",
    },
    capEyebrow: "Qué hace", capTitle: "Un equipo que no descansa, en todos tus canales.",
    caps: [
      { i: "wa", t: "WhatsApp", d: "Responde al instante las consultas de tus clientes, a cualquier hora y con el tono de tu marca." },
      { i: "phone", t: "Llamadas", d: "Atiende el teléfono con voz natural, resuelve dudas y toma nota cuando no puedes contestar." },
      { i: "web", t: "Chat en tu web", d: "Convierte las visitas de tu página en conversaciones, solicitudes y citas." },
      { i: "cal", t: "Citas y reservas", d: "Consulta tu disponibilidad, reserva, cambia y cancela citas sin que tengas que intervenir." },
      { i: "lead", t: "Cualificación de clientes", d: "Hace las preguntas clave y te pasa cada oportunidad ordenada y lista para cerrar." },
      { i: "bell", t: "Seguimiento y recordatorios", d: "Envía recordatorios y retoma conversaciones para que ningún cliente se quede sin respuesta." },
    ],
    howEyebrow: "Cómo funciona", howTitle: "De la idea a tu agente funcionando, en cuatro pasos.",
    steps: [
      { t: "Conocemos tu negocio", d: "Analizamos tus procesos, tus canales y las preguntas que más se repiten." },
      { t: "Entrenamos a tu agente", d: "Con tu información, tus servicios, tus precios y tu forma de hablar con los clientes." },
      { t: "Lo conectamos", d: "A WhatsApp, tu teléfono, tu web, tu agenda y las herramientas que ya usas." },
      { t: "Lo mejoramos contigo", d: "Revisamos conversaciones y resultados para que cada semana funcione mejor." },
    ],
    secEyebrow: "Para tu sector", secTitle: "Pensado para negocios que viven de atender bien.",
    sectors: [
      { i: "clinic", t: "Clínicas y salud", d: "Citas, recordatorios y dudas frecuentes de pacientes, a cualquier hora." },
      { i: "food", t: "Restauración", d: "Reservas de mesa, horarios, cartas y pedidos sin saturar el teléfono." },
      { i: "home", t: "Inmobiliarias", d: "Respuesta inmediata a cada interesado y visitas agendadas automáticamente." },
      { i: "pro", t: "Servicios profesionales", d: "Primeras consultas, presupuestos y seguimiento de cada cliente potencial." },
    ],
    whyEyebrow: "Por qué aibe", whyTitle: "Tecnología con sentido humano.",
    whyLead: "La inteligencia artificial está para ayudar a tu equipo, no para sustituir el trato cercano que te diferencia.",
    why: [
      { i: "users", t: "Tu equipo, siempre al mando", d: "El agente deriva a una persona cuando la conversación lo necesita, con todo el contexto." },
      { i: "spark", t: "Hecho a medida", d: "Nada de respuestas genéricas: habla de tus servicios, con tu tono y tus normas." },
      { i: "shield", t: "Datos protegidos", d: "Diseñamos cada integración pensando en la privacidad y el cumplimiento del RGPD." },
      { i: "chart", t: "Resultados medibles", d: "Ves qué preguntan tus clientes, cuántas citas se gestionan y dónde mejorar." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Mis clientes notarán que hablan con una IA?", a: "El agente conversa de forma natural y con el tono de tu negocio. Aun así, recomendamos ser transparentes: puede presentarse como asistente virtual y pasar la conversación a tu equipo cuando haga falta." },
      { q: "¿Qué pasa si no sabe responder algo?", a: "Lo definimos contigo: puede tomar los datos del cliente, avisar a tu equipo o transferir la conversación a una persona, para que nadie se quede sin respuesta." },
      { q: "¿Con qué herramientas se integra?", a: "WhatsApp, teléfono y el chat de tu web, además de agendas y otras herramientas habituales. Revisamos las que usas en la primera reunión." },
      { q: "¿Cuánto se tarda en ponerlo en marcha?", a: "Depende de los canales y de las integraciones que necesites. En la primera conversación te damos un plan y un calendario concretos para tu caso." },
    ],
  },
  en: {
    eyebrow: "AI agents",
    h1a: "Your business, attended 24/7.",
    h1b: "Without losing the human touch.",
    lead: "We build AI assistants that answer your customers, manage bookings and follow up on WhatsApp, phone and your website, while your team focuses on what really matters.",
    ctaPrimary: "Let's talk about your business", ctaSecondary: "How it works",
    chips: ["Available 24/7", "Replies in seconds", "Connected to your calendar"],
    chat: {
      name: "Dental clinic", status: "aibe assistant · online",
      m: [
        { me: false, t: "Hi, do you have an appointment for a dental cleaning this week?", h: "23:47" },
        { me: true, t: "Hi! Yes 😊 I have Thursday at 10:30 or Friday at 17:00. Which suits you best?", h: "23:47" },
        { me: false, t: "Friday, perfect.", h: "23:48" },
        { me: true, t: "Done ✅ You're booked for Friday at 17:00. I'll send you a reminder the day before.", h: "23:48" },
      ],
      badge: "Appointment added to calendar",
    },
    capEyebrow: "What it does", capTitle: "A team that never rests, on every channel.",
    caps: [
      { i: "wa", t: "WhatsApp", d: "Answers your customers instantly, at any hour, in your brand's voice." },
      { i: "phone", t: "Phone calls", d: "Picks up with a natural voice, solves questions and takes notes when you can't answer." },
      { i: "web", t: "Website chat", d: "Turns your website visits into conversations, requests and bookings." },
      { i: "cal", t: "Bookings", d: "Checks availability, books, moves and cancels appointments without you stepping in." },
      { i: "lead", t: "Lead qualification", d: "Asks the key questions and hands you every opportunity, organised and ready to close." },
      { i: "bell", t: "Follow-ups and reminders", d: "Sends reminders and picks conversations back up so no customer goes unanswered." },
    ],
    howEyebrow: "How it works", howTitle: "From idea to a working agent, in four steps.",
    steps: [
      { t: "We learn your business", d: "We review your processes, your channels and your most frequent questions." },
      { t: "We train your agent", d: "With your information, services, prices and the way you talk to customers." },
      { t: "We connect it", d: "To WhatsApp, your phone, your website, your calendar and the tools you already use." },
      { t: "We improve it with you", d: "We review conversations and results so it works better every week." },
    ],
    secEyebrow: "For your sector", secTitle: "Built for businesses that live by great service.",
    sectors: [
      { i: "clinic", t: "Clinics and health", d: "Appointments, reminders and frequent patient questions, at any hour." },
      { i: "food", t: "Restaurants", d: "Table bookings, opening hours, menus and orders without a jammed phone line." },
      { i: "home", t: "Real estate", d: "Instant replies to every lead and viewings booked automatically." },
      { i: "pro", t: "Professional services", d: "First enquiries, quotes and follow-up on every potential client." },
    ],
    whyEyebrow: "Why aibe", whyTitle: "Technology with a human touch.",
    whyLead: "Artificial intelligence is here to help your team, not to replace the personal service that sets you apart.",
    why: [
      { i: "users", t: "Your team stays in charge", d: "The agent hands over to a person whenever the conversation needs it, with full context." },
      { i: "spark", t: "Tailor-made", d: "No generic replies: it talks about your services, in your tone, by your rules." },
      { i: "shield", t: "Protected data", d: "Every integration is designed with privacy and GDPR compliance in mind." },
      { i: "chart", t: "Measurable results", d: "See what customers ask, how many bookings are handled and where to improve." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Will my customers notice they're talking to an AI?", a: "The agent converses naturally and in your business's tone. We still recommend transparency: it can introduce itself as a virtual assistant and hand over to your team when needed." },
      { q: "What if it doesn't know an answer?", a: "We define that with you: it can take the customer's details, alert your team or transfer the conversation to a person, so nobody is left without a reply." },
      { q: "Which tools does it integrate with?", a: "WhatsApp, phone and your website chat, plus calendars and other common tools. We review the ones you use in our first meeting." },
      { q: "How long does it take to launch?", a: "It depends on the channels and integrations you need. In our first conversation we give you a concrete plan and timeline for your case." },
    ],
  },
} as const;

const ICONS: Record<string, React.ReactNode> = {
  wa: <MessageCircle size={24} />, phone: <PhoneCall size={24} />, web: <MessagesSquare size={24} />,
  cal: <CalendarCheck size={24} />, lead: <UserCheck size={24} />, bell: <BellRing size={24} />,
  clinic: <Stethoscope size={24} />, food: <UtensilsCrossed size={24} />, home: <Home size={24} />, pro: <Briefcase size={24} />,
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
              <a href="#como-funciona" className="agp-btn agp-btn--ghost">{t.ctaSecondary}</a>
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

      {/* CAPABILITIES */}
      <section className="agp-sec">
        <div className="agp-wrap">
          <header className="agp-head">
            <span className="agp-eyebrow">{t.capEyebrow}</span>
            <h2 className="agp-h2">{t.capTitle}</h2>
          </header>
          <div className="agp-caps">
            {t.caps.map((c) => (
              <article key={c.t} className="agp-cap">
                <span className="agp-icon">{ICONS[c.i]}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="agp-sec agp-sec--tint" id="como-funciona">
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

      {/* SECTORS */}
      <section className="agp-sec">
        <div className="agp-wrap">
          <header className="agp-head">
            <span className="agp-eyebrow">{t.secEyebrow}</span>
            <h2 className="agp-h2">{t.secTitle}</h2>
          </header>
          <div className="agp-sectors">
            {t.sectors.map((s) => (
              <article key={s.t} className="agp-sector">
                <span className="agp-icon agp-icon--soft">{ICONS[s.i]}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
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
        .agp-cap h3,.agp-sector h3{margin:22px 0 0;font-size:1.3rem;font-weight:700;}
        .agp-cap p,.agp-sector p{margin:8px 0 0;font-size:1rem;line-height:1.55;color:#3A4F72;}

        .agp-steps{list-style:none;padding:0;margin:clamp(40px,5vw,60px) 0 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;counter-reset:s;}
        .agp-step{position:relative;padding:30px 26px;border-radius:24px;background:#fff;border:1px solid #E1EAF5;}
        .agp-step__n{display:inline-block;font-weight:700;font-size:2.4rem;line-height:1;letter-spacing:-.02em;
          background:linear-gradient(135deg,#0077FF,#19D3FF);-webkit-background-clip:text;background-clip:text;color:transparent;}
        .agp-step h3{margin:18px 0 0;font-size:1.2rem;font-weight:700;}
        .agp-step p{margin:8px 0 0;line-height:1.55;color:#3A4F72;}

        .agp-sectors{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:clamp(40px,5vw,60px);}
        .agp-sector{padding:28px 26px;border-radius:24px;background:#F7FAFE;border:1px solid #E1EAF5;}

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
          .agp-steps,.agp-sectors{grid-template-columns:repeat(2,minmax(0,1fr));}
        }
        @media (max-width:860px){
          .agp-hero__grid,.agp-why__grid{grid-template-columns:1fr;}
          .agp-chat{justify-self:center;}
        }
        @media (max-width:600px){
          .agp-caps,.agp-steps,.agp-sectors,.agp-why__list{grid-template-columns:1fr;}
        }
      `}</style>
    </div>
  );
}
