"use client";

import { useState } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Heart,
  Lightbulb,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";

import SiteNavbar from "@/components/ui/SiteNavbar";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

type SocialLogoProps = {
  network: "instagram" | "facebook" | "tiktok" | "youtube";
  size?: number;
};

function SocialLogo({ network, size = 24 }: SocialLogoProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  if (network === "instagram") {
    return (
      <svg {...common}>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path
          d="M14.2 8.4h3V4.3c-.5-.1-2.3-.3-4.3-.3-4.2 0-7.1 2.6-7.1 7.3v4.1H1v4.6h4.8v11.5h5.9V20h4l.6-4.6h-4.6v-3.6c0-1.3.4-2.3 2.5-2.3Z"
          fill="currentColor"
          transform="scale(.75) translate(4 0)"
        />
      </svg>
    );
  }

  if (network === "youtube") {
    return (
      <svg {...common}>
        <path
          d="M21.4 7.2a3 3 0 0 0-2.1-2.1C17.5 4.6 12 4.6 12 4.6s-5.5 0-7.3.5a3 3 0 0 0-2.1 2.1A31.5 31.5 0 0 0 2.1 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8Z"
          fill="currentColor"
        />
        <path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" fill="white" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M14.2 3c.4 2.4 1.8 3.9 4.2 4.1v3.5c-1.6 0-3-.5-4.2-1.3v6.3c0 4-3.2 6.4-6.4 6.4a6.3 6.3 0 0 1-6.2-6.3c0-3.7 3-6.5 6.9-6.3v3.7c-1.9-.3-3.2.9-3.2 2.6 0 1.5 1.2 2.7 2.7 2.7 1.8 0 2.8-1.2 2.8-3.2V3h3.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

const services = [
  {
    icon: Lightbulb,
    title: "Ideas creativas y originales",
    description:
      "Creamos conceptos, formatos y guiones pensados para tu marca, tu público y las tendencias de cada plataforma.",
  },
  {
    icon: Camera,
    title: "Grabación de contenido",
    description:
      "Nos desplazamos para grabar reels, vídeos, fotografías, testimonios y piezas que muestran tu negocio de forma auténtica.",
  },
  {
    icon: Clapperboard,
    title: "Edición profesional",
    description:
      "Editamos cada pieza con ritmo, subtítulos, sonido, grafismos y una identidad visual coherente con tu marca.",
  },
  {
    icon: CalendarDays,
    title: "Planificación y publicación",
    description:
      "Preparamos el calendario, adaptamos formatos y publicamos el contenido en los días y horarios más adecuados.",
  },
  {
    icon: MessageCircle,
    title: "Gestión de comunidad",
    description:
      "Supervisamos comentarios, mensajes y conversaciones para cuidar la atención y la imagen de tu negocio.",
  },
  {
    icon: TrendingUp,
    title: "Análisis y mejora continua",
    description:
      "Revisamos resultados, detectamos oportunidades y ajustamos la estrategia para mejorar alcance, interacción y contactos.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Estrategia",
    description:
      "Analizamos tu negocio, competencia, público y objetivos para definir una línea de comunicación clara.",
  },
  {
    number: "02",
    title: "Ideas y guiones",
    description:
      "Diseñamos el calendario mensual, las ideas creativas y los guiones de cada pieza.",
  },
  {
    number: "03",
    title: "Grabación y edición",
    description:
      "Producimos el contenido y lo editamos con acabado profesional para cada red social.",
  },
  {
    number: "04",
    title: "Publicación y gestión",
    description:
      "Publicamos, gestionamos la comunidad, medimos resultados y optimizamos el siguiente mes.",
  },
];

const faqItems = [
  {
    question: "¿Os encargáis realmente de todo?",
    answer:
      "Sí. Podemos asumir la estrategia, las ideas, los guiones, la grabación, la edición, los textos, la publicación y la gestión diaria de las redes sociales.",
  },
  {
    question: "¿Trabajáis con negocios de Alicante?",
    answer:
      "Sí. Trabajamos con empresas y profesionales de Alicante y alrededores, lo que nos permite organizar sesiones de grabación presenciales con facilidad.",
  },
  {
    question: "¿En qué redes sociales trabajáis?",
    answer:
      "Gestionamos principalmente Instagram, Facebook, TikTok y YouTube. Seleccionamos las plataformas adecuadas según el negocio y el tipo de cliente que quieras atraer.",
  },
  {
    question: "¿Cuántas publicaciones incluye el servicio?",
    answer:
      "La frecuencia depende del plan y de los objetivos. Antes de empezar definimos una propuesta mensual clara con número de piezas, sesiones de grabación y tareas de gestión.",
  },
  {
    question: "¿También respondéis comentarios y mensajes?",
    answer:
      "Podemos incluir la gestión de comunidad, siguiendo criterios previamente acordados para responder consultas habituales y derivar oportunidades comerciales.",
  },
];

export default function GestionRedesSocialesAlicantePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SiteNavbar activeAlicanteSlug="gestion-redes-sociales-alicante" />

      <main>
        <section className="hero">
          <div className="heroCopy">
            <p className="eyebrow">Gestión de redes sociales en Alicante</p>
            <h1>
              <span>Nos encargamos</span>
              <span>de tus redes</span>
              <span className={`${caveat.className} accentWord`}>
                de principio a fin
              </span>
            </h1>
            <p className="heroDescription">
              Creamos las ideas, grabamos el contenido, editamos cada pieza,
              publicamos y gestionamos tus perfiles para que tu negocio tenga
              una presencia constante, profesional y diferente.
            </p>

            <div className="heroActions">
              <a href="#contact-formulario" className="primaryButton">
                Solicitar presupuesto <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/34686012685"
                target="_blank"
                rel="noopener noreferrer"
                className="secondaryButton"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className="heroPoints">
              <span>
                <Check size={17} /> Ideas originales
              </span>
              <span>
                <Check size={17} /> Grabación y edición
              </span>
              <span>
                <Check size={17} /> Publicación y gestión completa
              </span>
            </div>
          </div>

          <div
            className="heroVisual"
            aria-label="Producción y gestión completa de contenido para redes sociales"
          >
            <div className="visualGlow visualGlowOne" />
            <div className="visualGlow visualGlowTwo" />
            <div className="visualBrush" aria-hidden="true" />

            <div className="productionScene">
              <div className="contentCalendar">
                <div className="calendarRings">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>

                <div className="calendarTitle">
                  <div>
                    <small>PLANIFICACIÓN MENSUAL</small>
                    <strong>Calendario de contenido</strong>
                  </div>
                  <CalendarDays size={21} />
                </div>

                <div className="calendarDays">
                  {["LUN", "MAR", "MIÉ", "JUE", "VIE"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="calendarGrid">
                  <article className="calendarTask taskReel">
                    <b>REEL</b>
                    <small>Idea + guion</small>
                  </article>
                  <article className="calendarTask taskStories">
                    <b>STORIES</b>
                    <small>Grabación</small>
                  </article>
                  <article className="calendarTask taskPost">
                    <b>POST</b>
                    <small>Diseño + copy</small>
                  </article>
                  <article className="calendarTask taskVideo">
                    <b>VÍDEO</b>
                    <small>Edición final</small>
                  </article>
                </div>
              </div>

              <div className="socialPhone">
                <div className="phoneStatus">
                  <span>9:41</span>
                  <i />
                </div>

                <div className="phoneProfile">
                  <div className="profileAvatar">TM</div>
                  <div>
                    <strong>tu_marca</strong>
                    <small>Alicante</small>
                  </div>
                  <Send size={14} />
                </div>

                <div className="phoneStories">
                  {["N", "P", "E", "R"].map((letter, index) => (
                    <span key={letter} className={index === 0 ? "activeStory" : ""}>
                      {letter}
                    </span>
                  ))}
                </div>

                <div className="phonePublication">
                  <div className="publicationVisual">
                    <Camera size={29} />
                    <strong>Contenido real</strong>
                    <small>Grabado para tu negocio</small>
                  </div>

                  <div className="publicationActions">
                    <div>
                      <Heart size={16} />
                      <MessageCircle size={16} />
                      <Send size={16} />
                    </div>
                    <span>•••</span>
                  </div>

                  <b>1.284 Me gusta</b>
                  <p>
                    Una idea original, grabada y editada para captar atención.
                  </p>
                </div>
              </div>

              <div className="cameraIllustration" aria-hidden="true">
                <div className="cameraUpper">
                  <span />
                  <i />
                </div>
                <div className="cameraGrip" />
                <div className="cameraLens">
                  <div className="lensOuter">
                    <div className="lensInner">
                      <span />
                    </div>
                  </div>
                </div>
                <small>4K</small>
              </div>

              <div className="editingPanel">
                <div className="editingThumbnail">
                  <Clapperboard size={23} />
                  <span>▶</span>
                </div>
                <div className="editingDetails">
                  <strong>Editando contenido</strong>
                  <div className="editingBar">
                    <i />
                  </div>
                  <small>Subtítulos · ritmo · sonido</small>
                </div>
              </div>

              <div className="socialMetric metricLikes">
                <Heart size={15} fill="currentColor" />
                <strong>2,3K</strong>
              </div>

              <div className="socialMetric metricFollowers">
                <Users size={15} />
                <strong>+1,1K</strong>
              </div>

              <div className="socialMetric metricComments">
                <MessageCircle size={15} fill="currentColor" />
                <strong>320</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="socialStrip">
          <div className="sectionContainer socialGrid">
            {(
              [
                ["instagram", "Instagram"],
                ["facebook", "Facebook"],
                ["tiktok", "TikTok"],
                ["youtube", "YouTube"],
              ] as const
            ).map(([network, label]) => (
              <div key={network}>
                <SocialLogo network={network} size={28} />
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="introSection">
          <div className="sectionContainer introGrid">
            <div>
              <p className="eyebrow">Tu equipo externo de contenidos</p>
              <h2>Deja de improvisar cada semana qué publicar</h2>
            </div>
            <div className="introCopy">
              <p>
                Gestionar redes sociales exige tiempo, constancia y muchas
                habilidades diferentes. No basta con subir una foto de vez en
                cuando.
              </p>
              <p>
                Nos convertimos en el equipo que piensa, produce y mantiene
                activa la comunicación digital de tu negocio mientras tú te
                centras en atenderlo y hacerlo crecer.
              </p>
            </div>
          </div>
        </section>

        <section className="allInOneSection">
          <div className="sectionContainer allInOneGrid">
            <div className="workflowBoard">
              <div className="workflowHeader">
                <span>Flujo de trabajo</span>
                <strong>Todo incluido</strong>
              </div>
              <div className="workflowSteps">
                <div>
                  <Lightbulb size={21} />
                  <span>
                    <strong>01. Idea</strong>Concepto y guion
                  </span>
                  <Check size={18} />
                </div>
                <div>
                  <Camera size={21} />
                  <span>
                    <strong>02. Grabación</strong>Producción presencial
                  </span>
                  <Check size={18} />
                </div>
                <div>
                  <Clapperboard size={21} />
                  <span>
                    <strong>03. Edición</strong>Acabado profesional
                  </span>
                  <Check size={18} />
                </div>
                <div>
                  <Send size={21} />
                  <span>
                    <strong>04. Publicación</strong>Copy, formato y horario
                  </span>
                  <Check size={18} />
                </div>
                <div>
                  <Users size={21} />
                  <span>
                    <strong>05. Gestión</strong>Comunidad y resultados
                  </span>
                  <Check size={18} />
                </div>
              </div>
            </div>

            <div className="allInOneCopy">
              <p className="eyebrow">Nos encargamos de todo</p>
              <h2>Una solución integral para que tus redes funcionen</h2>
              <p>
                No tendrás que coordinar a un creativo, un cámara, un editor y
                un community manager por separado. Nuestro equipo conecta todas
                las fases para mantener una comunicación coherente y
                profesional.
              </p>
              <ul>
                <li>
                  <Check size={19} /> Una estrategia adaptada a tu negocio
                </li>
                <li>
                  <Check size={19} /> Contenido original grabado para tu marca
                </li>
                <li>
                  <Check size={19} /> Edición pensada para retener la atención
                </li>
                <li>
                  <Check size={19} /> Publicación, seguimiento y optimización
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="servicesSection" id="servicios-redes-sociales">
          <div className="sectionContainer">
            <div className="sectionHeading">
              <p className="eyebrow">Gestión integral de redes sociales</p>
              <h2>Todo lo que tu marca necesita para comunicar mejor</h2>
              <p>
                Combinamos creatividad, producción y gestión para construir una
                presencia digital constante y reconocible.
              </p>
            </div>
            <div className="servicesGrid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title}>
                    <div className="serviceIcon">
                      <Icon size={25} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="processSection">
          <div className="sectionContainer">
            <div className="sectionHeading centered">
              <p className="eyebrow">Nuestro proceso</p>
              <h2>Así trabajamos tus redes cada mes</h2>
              <p>
                Un sistema claro para producir contenido con continuidad y
                mejorar a partir de datos reales.
              </p>
            </div>
            <div className="processGrid">
              {processSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="sectionContainer ctaBox">
            <div>
              <p className="eyebrow">Haz que tu marca se vea</p>
              <h2>
                Cuéntanos tu negocio y prepararemos una estrategia de contenidos
              </h2>
              <p>
                Te proponemos el enfoque, los formatos y el plan de gestión más
                adecuado para tus objetivos.
              </p>
            </div>
            <a href="#contact-formulario">
              Solicitar presupuesto <ArrowRight size={19} />
            </a>
          </div>
        </section>

        <section className="faqSection">
          <div className="sectionContainer faqGrid">
            <div className="faqHeading">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2>Dudas sobre la gestión de redes sociales en Alicante</h2>
              <p>Resolvemos las preguntas más habituales antes de comenzar.</p>
            </div>
            <div className="faqList">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article
                    key={item.question}
                    className={isOpen ? "faqOpen" : undefined}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <ChevronDown size={20} />
                    </button>
                    {isOpen && <p>{item.answer}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
      <Footer />

      <a
        href="https://wa.me/34686012685"
        target="_blank"
        rel="noopener noreferrer"
        className="floatingWhatsapp"
        aria-label="Contactar por WhatsApp"
      >
        <Image src="/imagenes/whatsapp.png" alt="" width={72} height={72} />
      </a>

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }
        main {
          overflow-x: hidden;
          background: #fff;
          font-family: "Montserrat", sans-serif;
        }
        .sectionContainer {
          width: min(100% - 48px, 1280px);
          margin: 0 auto;
        }
        .eyebrow {
          margin: 0 0 17px;
          color: #7c3aed;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }
        .hero {
          min-height: 900px;
          box-sizing: border-box;
          padding: 170px 6% 90px;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(470px, 1.08fr);
          gap: clamp(55px, 7vw, 105px);
          align-items: center;
          background:
            radial-gradient(
              circle at 12% 42%,
              rgba(124, 58, 237, 0.1),
              transparent 30%
            ),
            radial-gradient(
              circle at 88% 25%,
              rgba(244, 63, 94, 0.13),
              transparent 27%
            ),
            #fff;
        }
        .hero h1 {
          max-width: 760px;
          margin: 0;
          color: #101010;
          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 0.91;
          font-weight: 820;
          letter-spacing: -0.065em;
        }
        .hero h1 span {
          display: block;
        }
        .accentWord {
          margin-top: 0.1em;
          color: #7c3aed;
          font-size: 0.82em;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          transform: rotate(-1deg);
        }
        .heroDescription {
          max-width: 680px;
          margin: 30px 0 0;
          color: #596172;
          font-size: clamp(1rem, 1.2vw, 1.17rem);
          line-height: 1.75;
        }
        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }
        .primaryButton,
        .secondaryButton {
          display: inline-flex;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 24px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 750;
        }
        .primaryButton {
          background: linear-gradient(90deg, #7c3aed, #db2777);
          color: #fff;
          box-shadow: 0 16px 36px rgba(124, 58, 237, 0.25);
        }
        .secondaryButton {
          border: 1px solid #e5def5;
          background: #fff;
          color: #7c3aed;
        }
        .heroPoints {
          display: flex;
          flex-wrap: wrap;
          gap: 11px 19px;
          margin-top: 25px;
        }
        .heroPoints span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #394252;
          font-size: 0.9rem;
          font-weight: 650;
        }
        .heroPoints :global(svg) {
          color: #7c3aed;
        }
        .heroVisual {
          position: relative;
          min-width: 0;
          min-height: 620px;
          padding: 42px 26px 64px 8px;
          isolation: isolate;
        }
        .visualGlow {
          position: absolute;
          z-index: -3;
          border-radius: 999px;
          filter: blur(2px);
          pointer-events: none;
        }
        .visualGlowOne {
          top: 24px;
          right: 3%;
          width: 320px;
          height: 320px;
          background: rgba(46, 123, 255, 0.2);
        }
        .visualGlowTwo {
          right: 34%;
          bottom: 22px;
          width: 210px;
          height: 210px;
          background: rgba(111, 164, 255, 0.2);
        }
        .visualBrush {
          position: absolute;
          inset: 54px 2% 58px 4%;
          z-index: -2;
          border-radius: 44% 56% 47% 53% / 54% 42% 58% 46%;
          background: linear-gradient(
            105deg,
            rgba(46, 123, 255, 0.05),
            rgba(46, 123, 255, 0.22),
            rgba(151, 190, 255, 0.08)
          );
          transform: rotate(-5deg);
        }
        .productionScene {
          position: relative;
          min-height: 560px;
        }
        .contentCalendar {
          position: absolute;
          top: 52px;
          right: 4px;
          z-index: 1;
          width: min(74%, 440px);
          min-height: 360px;
          padding: 34px 28px 28px;
          border: 1px solid #dce7f8;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 30px 75px rgba(21, 58, 119, 0.15);
          transform: rotate(2deg);
        }
        .calendarRings {
          position: absolute;
          top: -13px;
          left: 28px;
          right: 28px;
          display: flex;
          justify-content: space-between;
        }
        .calendarRings span {
          width: 9px;
          height: 28px;
          border: 3px solid #1f2937;
          border-bottom: 0;
          border-radius: 999px 999px 0 0;
          background: #fff;
        }
        .calendarTitle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e8eef7;
          color: #2e7bff;
        }
        .calendarTitle small,
        .calendarTitle strong {
          display: block;
        }
        .calendarTitle small {
          margin-bottom: 4px;
          color: #7b8798;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.11em;
        }
        .calendarTitle strong {
          color: #1b2432;
          font-size: 1rem;
        }
        .calendarDays {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 7px;
          margin-top: 18px;
        }
        .calendarDays span {
          color: #8a95a5;
          font-size: 0.58rem;
          font-weight: 800;
          text-align: center;
        }
        .calendarGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, 58px);
          gap: 7px;
          margin-top: 8px;
          padding: 8px;
          border: 1px solid #edf1f7;
          border-radius: 15px;
          background:
            linear-gradient(#edf1f7 1px, transparent 1px),
            linear-gradient(90deg, #edf1f7 1px, transparent 1px),
            #fbfcff;
          background-size: 20% 33.333%;
        }
        .calendarTask {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 8px;
          border-radius: 9px;
          box-shadow: 0 8px 18px rgba(31, 60, 110, 0.08);
        }
        .calendarTask b {
          font-size: 0.59rem;
        }
        .calendarTask small {
          margin-top: 3px;
          font-size: 0.5rem;
        }
        .taskReel {
          grid-column: 1 / 3;
          grid-row: 1;
          background: #e0ecff;
          color: #1e63d8;
        }
        .taskStories {
          grid-column: 4 / 6;
          grid-row: 1;
          background: #fff0d8;
          color: #b76d05;
        }
        .taskPost {
          grid-column: 2 / 4;
          grid-row: 2;
          background: #e1f7ec;
          color: #168258;
        }
        .taskVideo {
          grid-column: 4 / 6;
          grid-row: 3;
          background: #e9e4ff;
          color: #6842d8;
        }
        .socialPhone {
          position: absolute;
          left: 5px;
          top: 25px;
          z-index: 4;
          width: 210px;
          padding: 9px;
          border: 1px solid #172033;
          border-radius: 35px;
          background: #111827;
          box-shadow: 0 34px 70px rgba(17, 24, 39, 0.28);
          transform: rotate(-5deg);
        }
        .phoneStatus {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 11px 8px;
          color: #fff;
          font-size: 0.62rem;
        }
        .phoneStatus i {
          width: 45px;
          height: 5px;
          border-radius: 999px;
          background: #364152;
        }
        .phoneProfile {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: 24px 24px 0 0;
          background: #fff;
        }
        .profileAvatar {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 2px solid #2e7bff;
          border-radius: 999px;
          background: #eaf2ff;
          color: #2e7bff;
          font-size: 0.6rem;
          font-weight: 850;
        }
        .phoneProfile strong,
        .phoneProfile small {
          display: block;
        }
        .phoneProfile strong {
          color: #192131;
          font-size: 0.68rem;
        }
        .phoneProfile small {
          margin-top: 2px;
          color: #7b8493;
          font-size: 0.52rem;
        }
        .phoneStories {
          display: flex;
          gap: 8px;
          padding: 10px 12px;
          background: #fff;
        }
        .phoneStories span {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border-radius: 999px;
          background: #eef2f7;
          color: #7b8493;
          font-size: 0.55rem;
          font-weight: 800;
        }
        .phoneStories .activeStory {
          border: 2px solid #2e7bff;
          background: #eaf2ff;
          color: #2e7bff;
        }
        .phonePublication {
          overflow: hidden;
          padding-bottom: 12px;
          border-radius: 0 0 24px 24px;
          background: #fff;
        }
        .publicationVisual {
          display: flex;
          min-height: 220px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin: 0 10px;
          padding: 18px;
          border-radius: 17px;
          background:
            radial-gradient(circle at 78% 22%, rgba(255,255,255,.34), transparent 25%),
            linear-gradient(145deg, #dbe9ff, #6ea4ff 58%, #2e7bff);
          color: #fff;
          text-align: center;
        }
        .publicationVisual strong {
          font-size: 0.9rem;
        }
        .publicationVisual small {
          max-width: 120px;
          font-size: 0.62rem;
          line-height: 1.35;
        }
        .publicationActions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px 5px;
        }
        .publicationActions > div {
          display: flex;
          gap: 9px;
        }
        .phonePublication > b,
        .phonePublication > p {
          display: block;
          margin: 0;
          padding: 0 12px;
          font-size: 0.6rem;
        }
        .phonePublication > p {
          margin-top: 5px;
          color: #697386;
          line-height: 1.4;
        }
        .cameraIllustration {
          position: absolute;
          right: -10px;
          bottom: 45px;
          z-index: 5;
          width: 220px;
          height: 150px;
          border: 1px solid #202939;
          border-radius: 30px 24px 26px 26px;
          background: linear-gradient(145deg, rgba(255,255,255,.1), transparent 32%), #202938;
          box-shadow: 0 28px 55px rgba(17, 24, 39, 0.3);
          transform: rotate(4deg);
        }
        .cameraUpper {
          position: absolute;
          top: -21px;
          left: 40px;
          display: flex;
          width: 105px;
          height: 35px;
          align-items: center;
          justify-content: space-around;
          border: 1px solid #202939;
          border-radius: 13px 13px 5px 5px;
          background: #252f40;
        }
        .cameraUpper span {
          width: 22px;
          height: 11px;
          border-radius: 4px;
          background: #111827;
        }
        .cameraUpper i {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #596579;
        }
        .cameraGrip {
          position: absolute;
          right: -1px;
          top: 34px;
          width: 42px;
          height: 82px;
          border-radius: 15px 25px 23px 13px;
          background: #151c28;
        }
        .cameraLens {
          position: absolute;
          left: 48px;
          top: 20px;
          display: grid;
          width: 116px;
          height: 116px;
          place-items: center;
          border-radius: 999px;
          background: #0e1520;
          box-shadow: 0 0 0 8px #364152;
        }
        .lensOuter {
          display: grid;
          width: 92px;
          height: 92px;
          place-items: center;
          border: 5px solid #111827;
          border-radius: inherit;
          background: #4b5565;
        }
        .lensInner {
          display: grid;
          width: 68px;
          height: 68px;
          place-items: center;
          border-radius: inherit;
          background:
            radial-gradient(circle at 35% 30%, #9ec4ff 0 8%, transparent 9%),
            radial-gradient(circle at 48% 44%, #315d9d 0 17%, #102642 45%, #07111f 72%);
          box-shadow: inset 0 0 18px rgba(126, 174, 255, 0.45);
        }
        .lensInner span {
          width: 28px;
          height: 28px;
          border-radius: inherit;
          background: rgba(17, 24, 39, 0.54);
        }
        .cameraIllustration > small {
          position: absolute;
          right: 19px;
          top: 17px;
          color: #d8e1ed;
          font-size: 0.58rem;
          font-weight: 800;
        }
        .editingPanel {
          position: absolute;
          left: 39%;
          bottom: 4px;
          z-index: 7;
          display: grid;
          grid-template-columns: 92px 1fr;
          width: min(58%, 330px);
          gap: 13px;
          padding: 12px;
          border: 1px solid #d8e4f6;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 24px 48px rgba(25, 56, 108, 0.18);
          transform: rotate(3deg);
          backdrop-filter: blur(12px);
        }
        .editingThumbnail {
          position: relative;
          display: grid;
          min-height: 68px;
          place-items: center;
          border-radius: 13px;
          background: linear-gradient(145deg, #dceaff, #7aafff);
          color: #fff;
        }
        .editingThumbnail span {
          position: absolute;
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.78);
          font-size: 0.55rem;
        }
        .editingDetails {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
        }
        .editingDetails strong {
          color: #202938;
          font-size: 0.76rem;
        }
        .editingDetails small {
          margin-top: 7px;
          color: #7b8798;
          font-size: 0.58rem;
        }
        .editingBar {
          overflow: hidden;
          height: 6px;
          margin-top: 9px;
          border-radius: 999px;
          background: #e9eef6;
        }
        .editingBar i {
          display: block;
          width: 72%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #2e7bff, #78aaff);
        }
        .socialMetric {
          position: absolute;
          z-index: 8;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border-radius: 12px;
          color: #fff;
          box-shadow: 0 15px 30px rgba(20, 43, 80, 0.2);
          font-size: 0.78rem;
          transform: rotate(3deg);
        }
        .metricLikes {
          top: 35px;
          right: 7px;
          background: #ff5b68;
        }
        .metricFollowers {
          top: 92px;
          right: -15px;
          background: #2e7bff;
        }
        .metricComments {
          top: 150px;
          right: 8px;
          background: #252a34;
        }
        .socialStrip {
          border-top: 1px solid #f0ebf5;
          border-bottom: 1px solid #f0ebf5;
          background: #fcfbfe;
        }
        .socialGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .socialGrid > div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 28px;
          border-right: 1px solid #eee8f4;
          color: #29232f;
        }
        .socialGrid > div:last-child {
          border-right: 0;
        }
        .socialGrid > div:first-child {
          color: #c026d3;
        }
        .socialGrid > div:nth-child(2) {
          color: #2563eb;
        }
        .socialGrid > div:nth-child(3) {
          color: #111;
        }
        .socialGrid > div:nth-child(4) {
          color: #dc2626;
        }
        .introSection,
        .allInOneSection,
        .servicesSection,
        .processSection,
        .faqSection {
          padding: 115px 0;
        }
        .introSection,
        .servicesSection,
        .processSection,
        .faqSection {
          background: #faf8fd;
        }
        .introGrid {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 85px;
        }
        .introGrid h2,
        .allInOneCopy h2,
        .sectionHeading h2,
        .ctaBox h2,
        .faqHeading h2 {
          margin: 0;
          color: #111;
          font-size: clamp(2.2rem, 4vw, 4rem);
          line-height: 1.06;
          font-weight: 760;
          letter-spacing: -0.052em;
        }
        .introCopy {
          padding-top: 34px;
        }
        .introCopy p,
        .allInOneCopy > p:not(.eyebrow),
        .faqHeading > p:last-child {
          margin: 0;
          color: #5f5868;
          font-size: 1.04rem;
          line-height: 1.75;
        }
        .introCopy p + p {
          margin-top: 18px;
        }
        .allInOneGrid {
          display: grid;
          grid-template-columns: 1.03fr 0.97fr;
          gap: 85px;
          align-items: center;
        }
        .workflowBoard {
          padding: 28px;
          border: 1px solid #e7dff0;
          border-radius: 30px;
          background: #fff;
          box-shadow: 0 28px 75px rgba(54, 31, 84, 0.12);
        }
        .workflowHeader {
          display: flex;
          justify-content: space-between;
          color: #776f80;
          font-size: 0.84rem;
        }
        .workflowHeader strong {
          color: #7c3aed;
        }
        .workflowSteps {
          display: grid;
          gap: 12px;
          margin-top: 25px;
        }
        .workflowSteps > div {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 13px;
          padding: 17px;
          border: 1px solid #eee7f4;
          border-radius: 16px;
          background: #fcfbfe;
          color: #7c3aed;
        }
        .workflowSteps span,
        .workflowSteps strong {
          display: block;
        }
        .workflowSteps span {
          color: #81798a;
          font-size: 0.78rem;
        }
        .workflowSteps strong {
          margin-bottom: 3px;
          color: #26202c;
          font-size: 0.9rem;
        }
        .allInOneCopy > p:not(.eyebrow) {
          margin-top: 25px;
        }
        .allInOneCopy ul {
          display: grid;
          gap: 15px;
          margin: 30px 0 0;
          padding: 0;
          list-style: none;
        }
        .allInOneCopy li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #38313f;
          font-weight: 600;
        }
        .allInOneCopy li :global(svg) {
          color: #7c3aed;
        }
        .sectionHeading {
          max-width: 870px;
          margin-bottom: 55px;
        }
        .sectionHeading > p:last-child {
          max-width: 710px;
          margin: 22px 0 0;
          color: #665f6e;
          font-size: 1.04rem;
          line-height: 1.7;
        }
        .servicesGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .servicesGrid article {
          min-height: 300px;
          padding: 32px;
          border: 1px solid #e9e1f1;
          border-radius: 26px;
          background: #fff;
          box-shadow: 0 18px 48px rgba(54, 31, 84, 0.06);
          transition: 0.25s;
        }
        .servicesGrid article:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 65px rgba(54, 31, 84, 0.11);
        }
        .serviceIcon {
          display: grid;
          width: 52px;
          height: 52px;
          margin-bottom: 42px;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(145deg, #f3e8ff, #fce7f3);
          color: #7c3aed;
        }
        .servicesGrid h3,
        .processGrid h3 {
          margin: 0 0 13px;
          color: #151515;
          font-size: 1.26rem;
          line-height: 1.25;
          font-weight: 750;
          letter-spacing: -0.025em;
        }
        .servicesGrid p,
        .processGrid p {
          margin: 0;
          color: #68606f;
          line-height: 1.65;
        }
        .centered {
          margin-right: auto;
          margin-left: auto;
          text-align: center;
        }
        .centered > p:last-child {
          margin-right: auto;
          margin-left: auto;
        }
        .processGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .processGrid article {
          min-height: 270px;
          padding: 30px;
          border-top: 2px solid #e5d8f3;
        }
        .processGrid article > span {
          display: block;
          margin-bottom: 35px;
          color: #7c3aed;
          font-size: 0.8rem;
          font-weight: 800;
        }
        .ctaSection {
          padding: 35px 0 115px;
        }
        .ctaBox {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 45px;
          align-items: center;
          padding: 58px;
          border-radius: 32px;
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(255, 255, 255, 0.14),
              transparent 28%
            ),
            linear-gradient(120deg, #17121d, #4c1d63);
        }
        .ctaBox h2 {
          max-width: 800px;
          color: #fff;
        }
        .ctaBox > div > p:last-child {
          max-width: 700px;
          margin: 22px 0 0;
          color: #d9d1df;
          line-height: 1.7;
        }
        .ctaBox > a {
          display: inline-flex;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #fff;
          color: #7c3aed;
          text-decoration: none;
          font-weight: 750;
          white-space: nowrap;
        }
        .faqGrid {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 85px;
        }
        .faqHeading {
          position: sticky;
          top: 135px;
        }
        .faqHeading > p:last-child {
          margin-top: 22px;
        }
        .faqList {
          display: grid;
          gap: 13px;
        }
        .faqList article {
          overflow: hidden;
          border: 1px solid #e6dfed;
          border-radius: 20px;
          background: #fff;
        }
        .faqList button {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 24px;
          border: 0;
          background: transparent;
          color: #151515;
          text-align: left;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }
        .faqList button :global(svg) {
          flex: 0 0 auto;
          color: #7c3aed;
          transition: 0.2s;
        }
        .faqOpen button :global(svg) {
          transform: rotate(180deg);
        }
        .faqList article > p {
          margin: 0;
          padding: 0 24px 23px;
          color: #655d6d;
          line-height: 1.7;
        }
        .floatingWhatsapp {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          display: flex;
          width: 72px;
          height: 72px;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .floatingWhatsapp:hover {
          transform: scale(1.08);
        }
        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: minmax(0, 0.9fr) minmax(410px, 1.1fr);
            gap: 45px;
          }
          .processGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 980px) {
          .hero {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 45px;
            padding: 160px 16px 70px;
          }
          .heroCopy {
            text-align: center;
          }
          .hero h1 {
            max-width: 650px;
            margin: 0 auto;
            font-size: clamp(2.5rem, 8vw, 4rem);
          }
          .heroDescription {
            max-width: 600px;
            margin-right: auto;
            margin-left: auto;
          }
          .heroActions,
          .heroPoints {
            justify-content: center;
          }
          .heroVisual {
            width: 100%;
            max-width: 690px;
            min-height: 580px;
            margin: 0 auto;
          }
          .productionScene {
            min-height: 570px;
          }
          .socialGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .socialGrid > div:nth-child(2) {
            border-right: 0;
          }
          .socialGrid > div:nth-child(-n + 2) {
            border-bottom: 1px solid #eee8f4;
          }
          .introGrid,
          .allInOneGrid,
          .faqGrid {
            grid-template-columns: 1fr;
            gap: 45px;
          }
          .introCopy {
            padding-top: 0;
          }
          .servicesGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .faqHeading {
            position: static;
          }
          .ctaBox {
            grid-template-columns: 1fr;
            padding: 42px 30px;
          }
          .ctaBox > a {
            justify-self: start;
          }
          .floatingWhatsapp {
            display: none;
          }
        }
        @media (max-width: 680px) {
          .sectionContainer {
            width: min(100% - 32px, 1280px);
          }
          .hero {
            padding-top: 150px;
          }
          .hero h1 {
            font-size: clamp(2.35rem, 12vw, 3.2rem);
            line-height: 0.95;
          }
          .accentWord {
            font-size: 0.85em;
          }
          .heroActions {
            flex-direction: column;
            width: 100%;
            max-width: 340px;
            margin-right: auto;
            margin-left: auto;
          }
          .primaryButton,
          .secondaryButton {
            width: 100%;
          }
          .heroPoints {
            display: none;
          }
          .heroVisual {
            width: calc(100% - 24px);
            min-height: 440px;
            margin-right: auto;
            margin-left: auto;
            padding: 12px 0 54px;
          }
          .visualBrush {
            inset: 36px 0 42px;
          }
          .productionScene {
            min-height: 410px;
          }
          .contentCalendar {
            top: 48px;
            right: 0;
            width: 76%;
            min-height: 255px;
            padding: 25px 14px 15px;
            border-radius: 18px;
          }
          .calendarRings {
            top: -9px;
            left: 18px;
            right: 18px;
          }
          .calendarRings span {
            width: 6px;
            height: 19px;
            border-width: 2px;
          }
          .calendarTitle {
            gap: 8px;
            padding-bottom: 10px;
          }
          .calendarTitle small {
            font-size: 0.43rem;
          }
          .calendarTitle strong {
            font-size: 0.68rem;
          }
          .calendarDays {
            gap: 3px;
            margin-top: 10px;
          }
          .calendarDays span {
            font-size: 0.42rem;
          }
          .calendarGrid {
            grid-template-rows: repeat(3, 38px);
            gap: 4px;
            padding: 5px;
          }
          .calendarTask {
            padding: 5px;
            border-radius: 6px;
          }
          .calendarTask b {
            font-size: 0.4rem;
          }
          .calendarTask small {
            display: none;
          }
          .socialPhone {
            left: 0;
            top: 24px;
            width: 132px;
            padding: 6px;
            border-radius: 24px;
          }
          .phoneStatus {
            padding: 3px 7px 5px;
            font-size: 0.44rem;
          }
          .phoneStatus i {
            width: 29px;
            height: 3px;
          }
          .phoneProfile {
            grid-template-columns: auto 1fr;
            gap: 5px;
            padding: 7px;
            border-radius: 17px 17px 0 0;
          }
          .phoneProfile :global(svg) {
            display: none;
          }
          .profileAvatar {
            width: 23px;
            height: 23px;
            font-size: 0.42rem;
          }
          .phoneProfile strong {
            font-size: 0.48rem;
          }
          .phoneProfile small {
            font-size: 0.38rem;
          }
          .phoneStories {
            gap: 4px;
            padding: 6px 7px;
          }
          .phoneStories span {
            width: 20px;
            height: 20px;
            font-size: 0.4rem;
          }
          .publicationVisual {
            min-height: 125px;
            gap: 5px;
            margin: 0 6px;
            padding: 8px;
            border-radius: 11px;
          }
          .publicationVisual strong {
            font-size: 0.58rem;
          }
          .publicationVisual small {
            font-size: 0.42rem;
          }
          .publicationActions {
            padding: 6px 7px 3px;
          }
          .publicationActions > div {
            gap: 5px;
          }
          .phonePublication > b,
          .phonePublication > p {
            padding: 0 7px;
            font-size: 0.4rem;
          }
          .cameraIllustration {
            right: -2px;
            bottom: 30px;
            width: 132px;
            height: 89px;
            border-radius: 20px 15px 17px 17px;
          }
          .cameraUpper {
            top: -13px;
            left: 24px;
            width: 64px;
            height: 22px;
          }
          .cameraGrip {
            top: 21px;
            width: 26px;
            height: 48px;
          }
          .cameraLens {
            left: 28px;
            top: 12px;
            width: 70px;
            height: 70px;
            box-shadow: 0 0 0 5px #364152;
          }
          .lensOuter {
            width: 55px;
            height: 55px;
            border-width: 3px;
          }
          .lensInner {
            width: 40px;
            height: 40px;
          }
          .lensInner span {
            width: 17px;
            height: 17px;
          }
          .editingPanel {
            left: 27%;
            bottom: 0;
            grid-template-columns: 58px 1fr;
            width: 63%;
            gap: 7px;
            padding: 7px;
            border-radius: 13px;
          }
          .editingThumbnail {
            min-height: 44px;
            border-radius: 9px;
          }
          .editingDetails strong {
            font-size: 0.52rem;
          }
          .editingDetails small {
            display: none;
          }
          .editingBar {
            height: 4px;
            margin-top: 6px;
          }
          .socialMetric {
            gap: 4px;
            padding: 6px 8px;
            font-size: 0.52rem;
          }
          .metricLikes {
            top: 19px;
            right: 0;
          }
          .metricFollowers {
            top: 60px;
            right: -4px;
          }
          .metricComments {
            top: 101px;
            right: 2px;
          }
          .socialGrid > div {
            padding: 20px 10px;
          }
          .introSection,
          .allInOneSection,
          .servicesSection,
          .processSection,
          .faqSection {
            padding: 80px 0;
          }
          .servicesGrid,
          .processGrid {
            grid-template-columns: 1fr;
          }
          .servicesGrid article {
            min-height: auto;
          }
          .workflowBoard {
            padding: 18px;
          }
          .ctaSection {
            padding-bottom: 80px;
          }
          .ctaBox {
            padding: 34px 22px;
          }
          .faqList button {
            padding: 19px;
          }
          .faqList article > p {
            padding: 0 19px 20px;
          }
        }
      `}</style>
    </>
  );
}