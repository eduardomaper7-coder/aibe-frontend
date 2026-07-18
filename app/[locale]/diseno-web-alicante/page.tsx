"use client";

import { useState } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Gauge,
  Layout,
  MonitorSmartphone,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import SiteNavbar from "@/components/ui/SiteNavbar";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const services = [
  {
    icon: Layout,
    title: "Diseño web corporativo",
    description:
      "Creamos una web profesional que comunica con claridad qué haces, para quién trabajas y por qué deberían elegirte.",
  },
  {
    icon: MonitorSmartphone,
    title: "Diseño responsive",
    description:
      "Adaptamos cada página para que funcione correctamente en ordenador, tablet y móvil.",
  },
  {
    icon: Palette,
    title: "Identidad visual",
    description:
      "Aplicamos una dirección visual coherente con tu marca, tus servicios y el tipo de cliente que quieres atraer.",
  },
  {
    icon: Zap,
    title: "Velocidad y rendimiento",
    description:
      "Optimizamos imágenes, estructura y carga para conseguir una experiencia rápida y fluida.",
  },
  {
    icon: Search,
    title: "Base preparada para SEO",
    description:
      "Construimos una estructura comprensible para Google y preparada para futuras acciones de posicionamiento.",
  },
  {
    icon: Target,
    title: "Diseño orientado a conversión",
    description:
      "Organizamos contenidos, llamadas a la acción y formularios para facilitar que el usuario contacte contigo.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Analizamos tu negocio, servicios, público, referencias y objetivos comerciales.",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Definimos páginas, contenidos, jerarquía y recorrido del usuario antes de diseñar.",
  },
  {
    number: "03",
    title: "Diseño y desarrollo",
    description:
      "Creamos la interfaz, desarrollamos la web y adaptamos cada sección a todos los dispositivos.",
  },
  {
    number: "04",
    title: "Revisión y publicación",
    description:
      "Comprobamos rendimiento, formularios, enlaces, visualización y detalles finales antes de publicar.",
  },
];

const faqItems = [
  {
    question: "¿Cuánto cuesta una página web profesional?",
    answer:
      "El precio depende del número de páginas, funcionalidades, contenidos y nivel de personalización. Antes de comenzar definimos el alcance y te entregamos una propuesta clara.",
  },
  {
    question: "¿La web estará adaptada para móviles?",
    answer:
      "Sí. Diseñamos cada página para ordenador, tablet y móvil, cuidando especialmente la lectura, navegación y botones de contacto.",
  },
  {
    question: "¿Podré modificar textos e imágenes?",
    answer:
      "Sí. Podemos preparar la web para que puedas actualizar los contenidos habituales sin depender de cambios técnicos.",
  },
  {
    question: "¿Incluye posicionamiento SEO?",
    answer:
      "La web se entrega con una base técnica y estructural preparada para SEO. Una estrategia continua de posicionamiento puede contratarse como servicio adicional.",
  },
  {
    question: "¿Cuánto tiempo tarda el proyecto?",
    answer:
      "Depende del alcance y de la disponibilidad de contenidos. Una web corporativa suele requerir varias semanas desde la definición hasta la publicación.",
  },
];

export default function DisenoWebAlicantePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SiteNavbar
  activeAlicanteSlug="diseno-web-alicante"
/>

      <main>
        <section className="hero">
          <div className="heroCopy">
            <p className="eyebrow">Diseño web en Alicante</p>

            <h1>
              <span className="heroTitleLine">Diseño web</span>
              <span className="heroTitleLine">
                en{" "}
                <span className={`${caveat.className} accentWord`}>
                  Alicante
                </span>
              </span>
              <span className="heroTitleLine">para captar clientes</span>
            </h1>

            <p className="heroDescription">
              Diseñamos webs rápidas, claras y adaptadas a móviles para
              ayudarte a transmitir confianza y conseguir más contactos.
            </p>

            <div className="heroActions">
              <a href="#contact-formulario" className="primaryButton">
                Solicitar presupuesto
                <ArrowRight size={18} aria-hidden="true" />
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
                <Check size={17} aria-hidden="true" />
                Diseño personalizado
              </span>
              <span>
                <Check size={17} aria-hidden="true" />
                Adaptada a móviles
              </span>
              <span>
                <Check size={17} aria-hidden="true" />
                Preparada para captar clientes
              </span>
            </div>
          </div>

          <div className="heroVisual" aria-hidden="true">
            <div className="visualGlow visualGlowOne" />
            <div className="visualGlow visualGlowTwo" />

            <div className="desktopMockup">
              <div className="desktopTopbar">
                <div className="browserDots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="browserAddress">
                  <ShieldCheck size={13} />
                  tuempresa.es
                </div>
                <div className="topbarAction" />
              </div>

              <div className="desktopScreen">
                <div className="siteHeaderPreview">
                  <div className="brandPreview">
                    <span className="brandMark">A</span>
                    <span className="brandName">Tu marca</span>
                  </div>
                  <div className="navPreview">
                    <span />
                    <span />
                    <span />
                    <i />
                  </div>
                </div>

                <div className="siteHeroPreview">
                  <div className="siteHeroCopy">
                    <span className="miniEyebrow">SERVICIO PROFESIONAL</span>
                    <span className="miniHeadline lineWide" />
                    <span className="miniHeadline lineMedium" />
                    <span className="miniText lineWide" />
                    <span className="miniText lineShort" />
                    <div className="miniActions">
                      <span className="miniPrimary" />
                      <span className="miniSecondary" />
                    </div>
                  </div>

                  <div className="siteHeroArtwork">
                    <div className="artOrb orbOne" />
                    <div className="artOrb orbTwo" />
                    <div className="artWindow">
                      <Sparkles size={34} />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>

                <div className="siteCardsPreview">
                  <article>
                    <Layout size={18} />
                    <span />
                    <i />
                  </article>
                  <article>
                    <Zap size={18} />
                    <span />
                    <i />
                  </article>
                  <article>
                    <Target size={18} />
                    <span />
                    <i />
                  </article>
                </div>
              </div>
            </div>

            <div className="phoneMockup">
              <div className="phoneSpeaker" />
              <div className="phoneScreen">
                <div className="phoneHeader">
                  <span className="phoneLogo">A</span>
                  <span className="phoneMenu" />
                </div>
                <div className="phoneHero">
                  <span className="phoneEyebrow" />
                  <span className="phoneTitle" />
                  <span className="phoneTitle short" />
                  <span className="phoneText" />
                  <span className="phoneText small" />
                  <span className="phoneButton" />
                </div>
                <div className="phoneCard">
                  <span />
                  <i />
                </div>
              </div>
            </div>

            <div className="floatingBadge badgeSpeed">
              <div className="badgeIcon">
                <Gauge size={19} />
              </div>
              <span>
                <strong>Rendimiento</strong>
                Carga rápida y fluida
              </span>
              <b>92</b>
            </div>

            <div className="floatingBadge badgeMobile">
              <div className="badgeIcon">
                <MonitorSmartphone size={19} />
              </div>
              <span>
                <strong>Diseño responsive</strong>
                Perfecta en móvil
              </span>
              <Check size={17} className="badgeCheck" />
            </div>
          </div>
        </section>

        <section className="trustStrip">
          <div className="sectionContainer trustGrid">
            <div>
              <strong>Diseño estratégico</strong>
              <span>No solo buscamos que la web sea bonita.</span>
            </div>
            <div>
              <strong>Experiencia clara</strong>
              <span>Facilitamos que el usuario encuentre lo que necesita.</span>
            </div>
            <div>
              <strong>Objetivos comerciales</strong>
              <span>Diseñamos para generar confianza y contactos.</span>
            </div>
          </div>
        </section>

        <section className="introSection">
          <div className="sectionContainer introGrid">
            <div>
              <p className="eyebrow">Tu web como herramienta comercial</p>
              <h2>
                Una página web debe explicar, convencer y facilitar el contacto
              </h2>
            </div>

            <div className="introCopy">
              <p>
                Tu web suele ser uno de los primeros puntos de contacto
                con un posible cliente. Si transmite poca confianza, es
                lenta o resulta difícil de entender, puedes perder
                oportunidades antes de iniciar una conversación.
              </p>

              <p>
                Creamos páginas que presentan tus servicios con claridad,
                refuerzan tu imagen y guían al usuario hacia una acción
                concreta.
              </p>
            </div>
          </div>
        </section>

        <section className="showcaseSection">
          <div className="sectionContainer showcaseGrid">
            <div className="showcasePanel">
              <div className="showcaseHeader">
                <span>Experiencia de usuario</span>
                <strong>Antes / Después</strong>
              </div>

              <div className="comparison">
                <div className="comparisonCard muted">
                  <div className="comparisonBrowser">
                    <div className="comparisonBrowserBar">
                      <div>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="comparisonScreen beforeScreen">
                      <span className="comparisonLabel">Antes</span>

                      <div className="beforeNavigation">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="comparisonContent">
                        <div className="skeletonTitle" />
                        <div className="skeletonText" />
                        <div className="skeletonText small" />
                        <div className="skeletonButton mutedButton" />
                      </div>

                      <div className="beforeBlocks">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="comparisonArrow">
                  <ArrowRight size={24} />
                </div>

                <div className="comparisonCard improved">
                  <div className="comparisonBrowser">
                    <div className="comparisonBrowserBar">
                      <div>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="comparisonScreen afterScreen">
                      <span className="comparisonLabel">Después</span>

                      <div className="afterNavigation">
                        <div className="afterLogo" />
                        <div className="afterMenu">
                          <span />
                          <span />
                          <i />
                        </div>
                      </div>

                      <div className="comparisonContent">
                        <span className="afterEyebrow" />
                        <div className="skeletonTitle" />
                        <div className="skeletonText" />
                        <div className="skeletonText small" />
                        <div className="skeletonButton" />
                      </div>

                      <div className="afterBlocks">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobileShowcaseArt" aria-hidden="true">
                <div className="mobileArtGlow mobileArtGlowOne" />
                <div className="mobileArtGlow mobileArtGlowTwo" />

                <div className="mobileArtPhone">
                  <div className="mobileArtSpeaker" />

                  <div className="mobileArtScreen">
                    <div className="mobileArtHeader">
                      <span className="mobileArtLogo">A</span>

                      <div className="mobileArtMenu">
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="mobileArtHero">
                      <span className="mobileArtEyebrow" />
                      <span className="mobileArtTitle" />
                      <span className="mobileArtTitle short" />
                      <span className="mobileArtText" />
                      <span className="mobileArtText small" />
                      <span className="mobileArtButton" />
                    </div>

                    <div className="mobileArtCards">
                      <span />
                      <span />
                    </div>
                  </div>
                </div>

                <div className="mobileArtBadge">
                  <Sparkles size={17} />
                  <span>
                    <strong>Diseño renovado</strong>
                    Más claro y atractivo
                  </span>
                </div>
              </div>
            </div>

            <div className="showcaseCopy">
              <p className="eyebrow">Diseño con intención</p>
              <h2>Mejoramos la forma en la que los usuarios perciben tu empresa</h2>
              <p>
                Trabajamos la jerarquía visual, los mensajes, el espacio,
                las llamadas a la acción y la navegación para que cada
                sección tenga una función clara.
              </p>

              <ul>
                <li>
                  <Check size={19} />
                  Mensajes comprensibles desde el primer vistazo
                </li>
                <li>
                  <Check size={19} />
                  Navegación sencilla y coherente
                </li>
                <li>
                  <Check size={19} />
                  Botones de contacto visibles
                </li>
                <li>
                  <Check size={19} />
                  Diseño alineado con tu posicionamiento
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="servicesSection" id="servicios-diseno-web">
          <div className="sectionContainer">
            <div className="sectionHeading">
              <p className="eyebrow">Servicios de diseño web</p>
              <h2>Todo lo necesario para crear una presencia digital profesional</h2>
              <p>
                Combinamos estrategia, diseño y desarrollo para construir
                una web sólida, clara y preparada para crecer.
              </p>
            </div>

            <div className="servicesGrid">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article key={service.title}>
                    <div className="serviceIcon">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="featuresSection">
          <div className="sectionContainer featuresGrid">
            <div className="featuresCopy">
              <p className="eyebrow">Desarrollo web profesional</p>
              <h2>Una web cuidada también por dentro</h2>
              <p>
                El diseño visible es solo una parte. También cuidamos la
                estructura, la adaptación, el rendimiento y la calidad
                técnica.
              </p>

              <div className="featureList">
                <div>
                  <Code2 size={22} />
                  <span>
                    <strong>Desarrollo limpio</strong>
                    Estructura mantenible y preparada para evolucionar.
                  </span>
                </div>
                <div>
                  <ShieldCheck size={22} />
                  <span>
                    <strong>Confianza y seguridad</strong>
                    Formularios y elementos esenciales correctamente configurados.
                  </span>
                </div>
                <div>
                  <Rocket size={22} />
                  <span>
                    <strong>Rendimiento</strong>
                    Carga optimizada para reducir esperas y abandonos.
                  </span>
                </div>
              </div>
            </div>

            <div className="qualityCard">
              <div className="qualityHeader">
                <span>Calidad de la web</span>
                <strong>Lista para publicar</strong>
              </div>

              <div className="qualityScore">
                <span>92</span>
                <small>/100</small>
              </div>

              <div className="qualityBars">
                <div>
                  <span>Rendimiento</span>
                  <div><i style={{ width: "92%" }} /></div>
                </div>
                <div>
                  <span>Accesibilidad</span>
                  <div><i style={{ width: "95%" }} /></div>
                </div>
                <div>
                  <span>Buenas prácticas</span>
                  <div><i style={{ width: "96%" }} /></div>
                </div>
                <div>
                  <span>Base SEO</span>
                  <div><i style={{ width: "90%" }} /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="processSection">
          <div className="sectionContainer">
            <div className="sectionHeading centered">
              <p className="eyebrow">Nuestro proceso</p>
              <h2>Cómo desarrollamos tu nueva página web</h2>
              <p>
                Trabajamos por fases para reducir cambios innecesarios y
                mantener el proyecto claro desde el principio.
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
              <p className="eyebrow">Nuevo proyecto web</p>
              <h2>Cuéntanos qué necesitas y te ayudamos a darle forma</h2>
              <p>
                Revisamos tu situación, tus objetivos y el tipo de web más
                adecuado para tu negocio.
              </p>
            </div>

            <a href="#contact-formulario">
              Solicitar presupuesto
              <ArrowRight size={19} />
            </a>
          </div>
        </section>

        <section className="faqSection">
          <div className="sectionContainer faqGrid">
            <div className="faqHeading">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2>Dudas habituales sobre diseño web en Alicante</h2>
              <p>
                Estas son algunas preguntas frecuentes antes de comenzar
                un proyecto de diseño y desarrollo web.
              </p>
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
                      <ChevronDown size={20} aria-hidden="true" />
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
        <Image
          src="/imagenes/whatsapp.png"
          alt=""
          width={72}
          height={72}
        />
      </a>

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        main {
          overflow-x: hidden;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
        }

        .sectionContainer {
          width: min(100% - 48px, 1280px);
          margin: 0 auto;
        }

        .eyebrow {
          margin: 0 0 17px;
          color: #2e7bff;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .hero {
          min-height: 900px;
          box-sizing: border-box;
          padding: 170px 6% 95px;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(460px, 1.1fr);
          gap: clamp(55px, 7vw, 105px);
          align-items: center;
          background:
            radial-gradient(
              circle at 12% 42%,
              rgba(46, 123, 255, 0.1),
              transparent 30%
            ),
            radial-gradient(
              circle at 88% 30%,
              rgba(130, 174, 255, 0.13),
              transparent 27%
            ),
            #ffffff;
        }

        .heroCopy {
          min-width: 0;
        }

        .hero h1 {
          max-width: 800px;
          margin: 0;
          color: #101010;
          font-size: clamp(2.7rem, 4.5vw, 5rem);
          line-height: 0.96;
          font-weight: 820;
          letter-spacing: -0.06em;
        }

        .heroTitleLine {
          display: block;
        }

        .heroLocationLine {
          margin-top: 0.03em;
          white-space: nowrap;
        }

        .heroOutcomeLine {
          max-width: 680px;
          margin-top: 0.13em;
          font-size: 0.66em;
          line-height: 1.08;
          letter-spacing: -0.045em;
        }

        .accentWord {
          display: inline-block;
          margin-left: 0.04em;
          color: #2e7bff;
          font-size: 1.42em;
          font-weight: 700;
          line-height: 0.72;
          letter-spacing: -0.025em;
          vertical-align: -0.04em;
          transform: rotate(-1deg);
          transform-origin: center;
        }

        .heroDescription {
          max-width: 680px;
          margin: 28px 0 0;
          color: #545d6d;
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
          background: #2e7bff;
          color: #ffffff;
          box-shadow: 0 16px 36px rgba(46, 123, 255, 0.28);
        }

        .secondaryButton {
          border: 1px solid #dbe5f4;
          background: #ffffff;
          color: #2e7bff;
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
          color: #2e7bff;
        }

        .heroVisual {
          position: relative;
          min-width: 0;
          min-height: 590px;
          padding: 42px 22px 70px 8px;
          isolation: isolate;
        }

        .visualGlow {
          position: absolute;
          z-index: -2;
          border-radius: 999px;
          filter: blur(2px);
          pointer-events: none;
        }

        .visualGlowOne {
          top: 0;
          right: 4%;
          width: 340px;
          height: 340px;
          background: rgba(46, 123, 255, 0.22);
        }

        .visualGlowTwo {
          right: 30%;
          bottom: 35px;
          width: 220px;
          height: 220px;
          background: rgba(112, 168, 255, 0.22);
        }

        .desktopMockup {
          position: relative;
          z-index: 2;
          overflow: hidden;
          border: 1px solid rgba(207, 220, 239, 0.95);
          border-radius: 30px;
          background: #ffffff;
          box-shadow:
            0 38px 90px rgba(20, 50, 101, 0.18),
            0 8px 28px rgba(20, 50, 101, 0.08);
          transform: perspective(1200px) rotateY(-4deg) rotateX(1deg) rotateZ(0.5deg);
          transform-origin: center;
        }

        .desktopTopbar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          min-height: 58px;
          align-items: center;
          gap: 16px;
          padding: 0 20px;
          border-bottom: 1px solid #e8eef7;
          background: linear-gradient(180deg, #fbfdff, #f5f8fd);
        }

        .browserDots {
          display: flex;
          gap: 7px;
        }

        .browserDots span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #c8d2e1;
        }

        .browserDots span:first-child {
          background: #ff8a8a;
        }

        .browserDots span:nth-child(2) {
          background: #ffd36a;
        }

        .browserDots span:last-child {
          background: #6ed79c;
        }

        .browserAddress {
          justify-self: center;
          display: flex;
          min-width: min(52%, 310px);
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px 18px;
          border: 1px solid #e0e8f3;
          border-radius: 999px;
          background: #ffffff;
          color: #778294;
          font-size: 0.76rem;
          box-shadow: inset 0 1px 2px rgba(25, 55, 100, 0.03);
        }

        .browserAddress :global(svg) {
          color: #2e7bff;
        }

        .topbarAction {
          width: 28px;
          height: 8px;
          border-radius: 999px;
          background: #dbe4f1;
        }

        .desktopScreen {
          padding: 25px 27px 28px;
          background:
            radial-gradient(circle at 82% 25%, rgba(46, 123, 255, 0.16), transparent 28%),
            radial-gradient(circle at 20% 85%, rgba(112, 168, 255, 0.11), transparent 26%),
            #ffffff;
        }

        .siteHeaderPreview {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brandPreview {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .brandMark,
        .phoneLogo {
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(145deg, #75a9ff, #1769f5);
          color: #ffffff;
          font-weight: 850;
          box-shadow: 0 8px 18px rgba(46, 123, 255, 0.24);
        }

        .brandMark {
          width: 31px;
          height: 31px;
          font-size: 0.9rem;
        }

        .brandName {
          color: #172033;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .navPreview {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navPreview span {
          width: 34px;
          height: 6px;
          border-radius: 999px;
          background: #dfe6ef;
        }

        .navPreview i {
          width: 58px;
          height: 24px;
          border-radius: 999px;
          background: #2e7bff;
        }

        .siteHeroPreview {
          display: grid;
          grid-template-columns: 1.03fr 0.97fr;
          gap: 26px;
          align-items: center;
          padding: 40px 0 28px;
        }

        .siteHeroCopy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .miniEyebrow {
          margin-bottom: 13px;
          color: #2e7bff;
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .miniHeadline,
        .miniText {
          display: block;
          border-radius: 999px;
        }

        .miniHeadline {
          height: 18px;
          margin-top: 8px;
          background: #131926;
        }

        .miniText {
          height: 7px;
          margin-top: 12px;
          background: #d7e0eb;
        }

        .lineWide {
          width: 92%;
        }

        .lineMedium {
          width: 68%;
        }

        .lineShort {
          width: 72%;
        }

        .miniActions {
          display: flex;
          gap: 9px;
          margin-top: 20px;
        }

        .miniPrimary,
        .miniSecondary {
          display: block;
          height: 31px;
          border-radius: 999px;
        }

        .miniPrimary {
          width: 105px;
          background: #2e7bff;
          box-shadow: 0 8px 20px rgba(46, 123, 255, 0.24);
        }

        .miniSecondary {
          width: 84px;
          border: 1px solid #d8e2f0;
          background: #ffffff;
        }

        .siteHeroArtwork {
          position: relative;
          min-height: 220px;
          overflow: hidden;
          border-radius: 25px;
          background:
            linear-gradient(150deg, rgba(255, 255, 255, 0.96), rgba(217, 233, 255, 0.92)),
            linear-gradient(135deg, #eef5ff, #dfeaff);
          box-shadow: inset 0 0 0 1px rgba(198, 217, 245, 0.75);
        }

        .artOrb {
          position: absolute;
          border-radius: 999px;
        }

        .orbOne {
          top: -20px;
          right: -25px;
          width: 150px;
          height: 150px;
          background: linear-gradient(145deg, #8bb7ff, #2e7bff 62%, #175fe4);
          opacity: 1;
        }

        .orbTwo {
          bottom: -35px;
          left: -20px;
          width: 125px;
          height: 125px;
          background: linear-gradient(145deg, #c8dbff, #8db7ff);
          opacity: 0.95;
        }

        .artWindow {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: 58%;
          min-height: 128px;
          place-items: center;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.88);
          color: #2e7bff;
          box-shadow: 0 22px 45px rgba(27, 65, 126, 0.16);
          backdrop-filter: blur(12px);
          transform: translate(-50%, -50%) rotate(-4deg);
        }

        .artWindow span {
          width: 72%;
          height: 7px;
          border-radius: 999px;
          background: #d5e3f7;
        }

        .artWindow span:last-child {
          width: 48%;
        }

        .siteCardsPreview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 11px;
        }

        .siteCardsPreview article {
          display: grid;
          min-height: 82px;
          align-content: center;
          gap: 8px;
          padding: 14px;
          border: 1px solid #e2eaf4;
          border-radius: 16px;
          background: rgba(250, 252, 255, 0.94);
          color: #2e7bff;
        }

        .siteCardsPreview article > span,
        .siteCardsPreview article > i {
          display: block;
          border-radius: 999px;
          background: #dfe7f1;
        }

        .siteCardsPreview article > span {
          width: 65%;
          height: 7px;
        }

        .siteCardsPreview article > i {
          width: 88%;
          height: 5px;
        }

        .phoneMockup {
          position: absolute;
          right: -4px;
          bottom: 4px;
          z-index: 4;
          width: 155px;
          padding: 8px;
          border: 1px solid #d4deec;
          border-radius: 31px;
          background: #111827;
          box-shadow: 0 30px 60px rgba(17, 24, 39, 0.28);
          transform: rotate(5deg);
        }

        .phoneSpeaker {
          width: 42px;
          height: 5px;
          margin: 2px auto 7px;
          border-radius: 999px;
          background: #354052;
        }

        .phoneScreen {
          overflow: hidden;
          min-height: 295px;
          padding: 13px;
          border-radius: 23px;
          background:
            radial-gradient(circle at 85% 18%, rgba(46, 123, 255, 0.15), transparent 30%),
            #ffffff;
        }

        .phoneHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .phoneLogo {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          font-size: 0.66rem;
        }

        .phoneMenu {
          width: 20px;
          height: 3px;
          border-radius: 999px;
          background: #9ca7b7;
          box-shadow: 0 6px 0 #9ca7b7;
        }

        .phoneHero {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 28px 0 21px;
        }

        .phoneEyebrow,
        .phoneTitle,
        .phoneText,
        .phoneButton {
          display: block;
          border-radius: 999px;
        }

        .phoneEyebrow {
          width: 52px;
          height: 5px;
          margin-bottom: 11px;
          background: #9fc1ff;
        }

        .phoneTitle {
          width: 93%;
          height: 13px;
          margin-top: 6px;
          background: #151b28;
        }

        .phoneTitle.short {
          width: 65%;
        }

        .phoneText {
          width: 91%;
          height: 5px;
          margin-top: 13px;
          background: #d9e1ec;
        }

        .phoneText.small {
          width: 70%;
          margin-top: 7px;
        }

        .phoneButton {
          width: 80px;
          height: 27px;
          margin-top: 17px;
          background: #2e7bff;
        }

        .phoneCard {
          display: grid;
          gap: 8px;
          padding: 14px;
          border: 1px solid #e4ebf4;
          border-radius: 15px;
          background: #f7faff;
        }

        .phoneCard span,
        .phoneCard i {
          display: block;
          border-radius: 999px;
          background: #dbe4ef;
        }

        .phoneCard span {
          width: 60%;
          height: 6px;
        }

        .phoneCard i {
          width: 90%;
          height: 5px;
        }

        .floatingBadge {
          position: absolute;
          z-index: 5;
          display: grid;
          grid-template-columns: auto 1fr auto;
          min-width: 220px;
          align-items: center;
          gap: 11px;
          padding: 13px 15px;
          border: 1px solid rgba(213, 225, 242, 0.95);
          border-radius: 19px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 22px 52px rgba(24, 55, 108, 0.16);
          backdrop-filter: blur(14px);
        }

        .badgeIcon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 13px;
          background: linear-gradient(145deg, #edf4ff, #dbe9ff);
          color: #2e7bff;
        }

        .floatingBadge span,
        .floatingBadge strong {
          display: block;
        }

        .floatingBadge span {
          color: #747e8d;
          font-size: 0.72rem;
          line-height: 1.35;
        }

        .floatingBadge strong {
          margin-bottom: 2px;
          color: #1b2433;
          font-size: 0.84rem;
        }

        .floatingBadge b {
          color: #2e7bff;
          font-size: 1.05rem;
        }

        .badgeCheck {
          color: #2e7bff;
        }

        .badgeSpeed {
          left: -18px;
          bottom: 26px;
        }

        .badgeMobile {
          right: 24px;
          top: 4px;
        }

        .trustStrip {
          border-top: 1px solid #edf1f7;
          border-bottom: 1px solid #edf1f7;
          background: #fbfcff;
        }

        .trustGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .trustGrid > div {
          padding: 30px 35px;
          border-right: 1px solid #e9eef6;
        }

        .trustGrid > div:last-child {
          border-right: 0;
        }

        .trustGrid strong,
        .trustGrid span {
          display: block;
        }

        .trustGrid strong {
          color: #1a202c;
        }

        .trustGrid span {
          margin-top: 6px;
          color: #697180;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .introSection,
        .showcaseSection,
        .servicesSection,
        .featuresSection,
        .processSection,
        .faqSection {
          padding: 115px 0;
        }

        .introSection,
        .servicesSection,
        .processSection,
        .faqSection {
          background: #f7faff;
        }

        .introGrid {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 85px;
          align-items: start;
        }

        .introGrid h2,
        .showcaseCopy h2,
        .sectionHeading h2,
        .featuresCopy h2,
        .ctaBox h2,
        .faqHeading h2 {
          margin: 0;
          color: #111111;
          font-size: clamp(2.2rem, 4vw, 4rem);
          line-height: 1.06;
          font-weight: 760;
          letter-spacing: -0.052em;
        }

        .introCopy {
          padding-top: 34px;
        }

        .introCopy p,
        .showcaseCopy > p:not(.eyebrow),
        .featuresCopy > p:not(.eyebrow),
        .faqHeading > p:last-child {
          margin: 0;
          color: #5c6575;
          font-size: 1.04rem;
          line-height: 1.75;
        }

        .introCopy p + p {
          margin-top: 18px;
        }

        .showcaseGrid,
        .featuresGrid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 85px;
          align-items: center;
        }

        .showcasePanel,
        .qualityCard {
          padding: 28px;
          border: 1px solid #dfe8f5;
          border-radius: 30px;
          background: #ffffff;
          box-shadow: 0 28px 75px rgba(25, 59, 115, 0.12);
        }

        .showcaseHeader,
        .qualityHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: #6a7382;
          font-size: 0.84rem;
        }

        .showcaseHeader strong,
        .qualityHeader strong {
          color: #2e7bff;
        }

        .comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 18px;
          align-items: center;
          margin-top: 26px;
        }

        .comparisonCard {
          min-width: 0;
          padding: 10px;
          border-radius: 24px;
        }

        .comparisonCard.muted {
          border: 1px solid #d7dce4;
          background:
            linear-gradient(145deg, #f6f1ef, #edf0f4);
        }

        .comparisonCard.improved {
          border: 1px solid #aecaFF;
          background:
            radial-gradient(
              circle at 85% 12%,
              rgba(46, 123, 255, 0.26),
              transparent 34%
            ),
            linear-gradient(145deg, #f8fbff, #eaf2ff);
          box-shadow: 0 20px 48px rgba(46, 123, 255, 0.2);
        }

        .comparisonBrowser {
          overflow: hidden;
          min-height: 300px;
          border: 1px solid #dfe6ef;
          border-radius: 18px;
          background: #ffffff;
        }

        .comparisonBrowserBar {
          display: flex;
          min-height: 32px;
          align-items: center;
          padding: 0 12px;
          border-bottom: 1px solid #e8edf4;
          background: #f8fafc;
        }

        .comparisonBrowserBar > div {
          display: flex;
          gap: 5px;
        }

        .comparisonBrowserBar span {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #c8ced7;
        }

        .comparisonBrowserBar span:first-child {
          background: #ff9292;
        }

        .comparisonBrowserBar span:nth-child(2) {
          background: #ffd16d;
        }

        .comparisonBrowserBar span:last-child {
          background: #76dba2;
        }

        .comparisonScreen {
          position: relative;
          min-height: 268px;
          padding: 18px;
        }

        .beforeScreen {
          background:
            linear-gradient(145deg, #f3eeee, #eceff3);
        }

        .afterScreen {
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(46, 123, 255, 0.22),
              transparent 34%
            ),
            radial-gradient(
              circle at 15% 85%,
              rgba(112, 168, 255, 0.16),
              transparent 28%
            ),
            linear-gradient(145deg, #ffffff, #f3f7ff);
        }

        .comparisonLabel {
          display: inline-flex;
          padding: 6px 10px;
          border-radius: 999px;
          color: #697281;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .improved .comparisonLabel {
          background: #eaf2ff;
          color: #2e7bff;
        }

        .beforeNavigation {
          display: flex;
          gap: 8px;
          margin-top: 20px;
        }

        .beforeNavigation span {
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(90deg, #c9a9a9, #c6cbd2);
        }

        .beforeNavigation span:first-child {
          width: 42%;
        }

        .beforeNavigation span:nth-child(2) {
          width: 20%;
        }

        .beforeNavigation span:last-child {
          width: 25%;
        }

        .afterNavigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
        }

        .afterLogo {
          width: 27px;
          height: 27px;
          border-radius: 9px;
          background: linear-gradient(145deg, #79adff, #2e7bff);
          box-shadow: 0 8px 17px rgba(46, 123, 255, 0.25);
        }

        .afterMenu {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .afterMenu span {
          width: 25px;
          height: 5px;
          border-radius: 999px;
          background: #d8e0eb;
        }

        .afterMenu i {
          width: 43px;
          height: 19px;
          border-radius: 999px;
          background: #2e7bff;
        }

        .comparisonContent {
          margin-top: 34px;
        }

        .afterEyebrow {
          display: block;
          width: 66px;
          height: 5px;
          margin-bottom: 11px;
          border-radius: 999px;
          background: #8db7ff;
        }

        .skeletonTitle,
        .skeletonText,
        .skeletonButton {
          border-radius: 999px;
        }

        .skeletonTitle {
          width: 86%;
          height: 20px;
          background: #182131;
        }

        .muted .skeletonTitle {
          width: 95%;
          background: #aeb4bd;
        }

        .skeletonText {
          width: 94%;
          height: 7px;
          margin-top: 17px;
          background: #d5dde8;
        }

        .muted .skeletonText {
          background: #c7cbd1;
        }

        .skeletonText.small {
          width: 66%;
          margin-top: 9px;
        }

        .skeletonButton {
          width: 105px;
          height: 34px;
          margin-top: 25px;
          background: #2e7bff;
          box-shadow: 0 9px 20px rgba(46, 123, 255, 0.24);
        }

        .mutedButton {
          width: 88px;
          border-radius: 5px;
          background: #bfc4cb;
          box-shadow: none;
        }

        .beforeBlocks,
        .afterBlocks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          margin-top: 25px;
        }

        .beforeBlocks span,
        .afterBlocks span {
          min-height: 37px;
          border-radius: 8px;
        }

        .beforeBlocks span {
          border: 1px solid #d6d9de;
          background: #e4e6e9;
        }

        .afterBlocks span {
          border: 1px solid #cfe0f8;
          border-radius: 11px;
          background:
            linear-gradient(145deg, #f8fbff, #e8f1ff);
          box-shadow: 0 8px 18px rgba(46, 123, 255, 0.08);
        }

        .comparisonArrow {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 999px;
          background: linear-gradient(145deg, #edf4ff, #dbe9ff);
          color: #2e7bff;
          box-shadow: 0 10px 24px rgba(46, 123, 255, 0.15);
        }

        .mobileShowcaseArt {
          display: none;
          position: relative;
          min-height: 360px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid #d9e6f8;
          border-radius: 24px;
          background:
            radial-gradient(
              circle at 80% 18%,
              rgba(46, 123, 255, 0.2),
              transparent 28%
            ),
            linear-gradient(145deg, #f9fbff, #eaf2ff);
          box-shadow: 0 20px 48px rgba(36, 78, 145, 0.12);
          isolation: isolate;
        }

        .mobileArtGlow {
          position: absolute;
          z-index: -1;
          border-radius: 999px;
          filter: blur(1px);
        }

        .mobileArtGlowOne {
          top: 25px;
          right: 22px;
          width: 150px;
          height: 150px;
          background: rgba(46, 123, 255, 0.2);
        }

        .mobileArtGlowTwo {
          bottom: 28px;
          left: 18px;
          width: 110px;
          height: 110px;
          background: rgba(125, 177, 255, 0.2);
        }

        .mobileArtPhone {
          position: relative;
          z-index: 2;
          width: 152px;
          padding: 7px;
          border: 1px solid #ccd8e8;
          border-radius: 30px;
          background: #111827;
          box-shadow: 0 24px 46px rgba(17, 24, 39, 0.22);
          transform: rotate(-3deg);
        }

        .mobileArtSpeaker {
          width: 38px;
          height: 4px;
          margin: 2px auto 7px;
          border-radius: 999px;
          background: #354052;
        }

        .mobileArtScreen {
          overflow: hidden;
          min-height: 286px;
          padding: 13px;
          border-radius: 22px;
          background:
            radial-gradient(
              circle at 88% 20%,
              rgba(46, 123, 255, 0.17),
              transparent 32%
            ),
            #ffffff;
        }

        .mobileArtHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobileArtLogo {
          display: grid;
          width: 25px;
          height: 25px;
          place-items: center;
          border-radius: 8px;
          background: linear-gradient(145deg, #75a9ff, #1769f5);
          color: #ffffff;
          font-size: 0.66rem;
          font-weight: 850;
          box-shadow: 0 7px 14px rgba(46, 123, 255, 0.22);
        }

        .mobileArtMenu {
          display: grid;
          gap: 4px;
        }

        .mobileArtMenu span {
          display: block;
          width: 20px;
          height: 3px;
          border-radius: 999px;
          background: #8f9bad;
        }

        .mobileArtHero {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 27px 0 20px;
        }

        .mobileArtEyebrow,
        .mobileArtTitle,
        .mobileArtText,
        .mobileArtButton {
          display: block;
          border-radius: 999px;
        }

        .mobileArtEyebrow {
          width: 54px;
          height: 5px;
          margin-bottom: 10px;
          background: #8db7ff;
        }

        .mobileArtTitle {
          width: 92%;
          height: 12px;
          margin-top: 6px;
          background: #172033;
        }

        .mobileArtTitle.short {
          width: 67%;
        }

        .mobileArtText {
          width: 90%;
          height: 5px;
          margin-top: 13px;
          background: #d6deea;
        }

        .mobileArtText.small {
          width: 72%;
          margin-top: 7px;
        }

        .mobileArtButton {
          width: 76px;
          height: 25px;
          margin-top: 17px;
          background: linear-gradient(90deg, #2e7bff, #6aa3ff);
          box-shadow: 0 8px 17px rgba(46, 123, 255, 0.24);
        }

        .mobileArtCards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 7px;
        }

        .mobileArtCards span {
          min-height: 48px;
          border: 1px solid #dce7f5;
          border-radius: 11px;
          background: linear-gradient(145deg, #f8fbff, #ebf3ff);
        }

        .mobileArtBadge {
          position: absolute;
          right: 22px;
          bottom: 34px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          border: 1px solid #d7e4f7;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.94);
          color: #2e7bff;
          box-shadow: 0 14px 32px rgba(36, 78, 145, 0.16);
          backdrop-filter: blur(10px);
        }

        .mobileArtBadge span,
        .mobileArtBadge strong {
          display: block;
        }

        .mobileArtBadge span {
          color: #6b7585;
          font-size: 0.66rem;
          line-height: 1.35;
        }

        .mobileArtBadge strong {
          margin-bottom: 2px;
          color: #1d2736;
          font-size: 0.74rem;
        }

        .showcaseCopy > p:not(.eyebrow),
        .featuresCopy > p:not(.eyebrow) {
          margin-top: 25px;
        }

        .showcaseCopy ul {
          display: grid;
          gap: 15px;
          margin: 30px 0 0;
          padding: 0;
          list-style: none;
        }

        .showcaseCopy li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #343c4b;
          font-weight: 600;
        }

        .showcaseCopy li :global(svg) {
          color: #2e7bff;
        }

        .sectionHeading {
          max-width: 870px;
          margin-bottom: 55px;
        }

        .sectionHeading > p:last-child {
          max-width: 710px;
          margin: 22px 0 0;
          color: #616a79;
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
          border: 1px solid #e0e9f8;
          border-radius: 26px;
          background: #ffffff;
          box-shadow: 0 18px 48px rgba(28, 63, 120, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .servicesGrid article:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 65px rgba(28, 63, 120, 0.11);
        }

        .serviceIcon {
          display: grid;
          width: 52px;
          height: 52px;
          margin-bottom: 42px;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(145deg, #edf4ff, #dbe9ff);
          color: #2e7bff;
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
          color: #636b7a;
          line-height: 1.65;
        }

        .featureList {
          display: grid;
          gap: 20px;
          margin-top: 34px;
        }

        .featureList > div {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .featureList :global(svg) {
          flex: 0 0 auto;
          color: #2e7bff;
        }

        .featureList span,
        .featureList strong {
          display: block;
        }

        .featureList strong {
          margin-bottom: 5px;
          color: #242a33;
        }

        .featureList span {
          color: #657080;
          line-height: 1.5;
        }

        .qualityScore {
          margin: 44px 0 35px;
          color: #111111;
        }

        .qualityScore span {
          font-size: 5rem;
          font-weight: 800;
          letter-spacing: -0.08em;
        }

        .qualityScore small {
          margin-left: 6px;
          color: #8a93a2;
        }

        .qualityBars {
          display: grid;
          gap: 19px;
        }

        .qualityBars > div > span {
          display: block;
          margin-bottom: 8px;
          color: #4e5766;
          font-size: 0.86rem;
          font-weight: 650;
        }

        .qualityBars > div > div {
          overflow: hidden;
          height: 9px;
          border-radius: 999px;
          background: #edf1f6;
        }

        .qualityBars i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #2e7bff, #73a7ff);
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
          border-top: 2px solid #dce8fb;
          background: transparent;
        }

        .processGrid article > span {
          display: block;
          margin-bottom: 35px;
          color: #2e7bff;
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
              rgba(255, 255, 255, 0.2),
              transparent 28%
            ),
            #111827;
        }

        .ctaBox h2 {
          max-width: 800px;
          color: #ffffff;
        }

        .ctaBox > div > p:last-child {
          max-width: 700px;
          margin: 22px 0 0;
          color: #c7cfdb;
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
          background: #ffffff;
          color: #1867ec;
          text-decoration: none;
          font-weight: 750;
          white-space: nowrap;
        }

        .faqGrid {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 85px;
          align-items: start;
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
          border: 1px solid #dfe7f3;
          border-radius: 20px;
          background: #ffffff;
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
          color: #2e7bff;
          transition: transform 0.2s ease;
        }

        .faqOpen button :global(svg) {
          transform: rotate(180deg);
        }

        .faqList article > p {
          margin: 0;
          padding: 0 24px 23px;
          color: #606978;
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
          transition: transform 0.2s ease;
        }

        .floatingWhatsapp:hover {
          transform: scale(1.08);
        }

        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: minmax(0, 0.9fr) minmax(400px, 1.1fr);
            gap: 45px;
          }

          .hero h1 {
            font-size: clamp(2.4rem, 4vw, 4rem);
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
            padding: 160px 16px 65px;
          }

          .heroCopy {
            text-align: center;
          }

          .hero h1 {
            width: 100%;
            max-width: 620px;
            margin: 0 auto;
            font-size: clamp(2.15rem, 8vw, 3.15rem);
            line-height: 0.98;
          }

          .heroLocationLine {
            margin-top: 0.08em;
          }

          .heroOutcomeLine {
            max-width: 560px;
            margin: 0.28em auto 0;
            font-size: 0.61em;
            line-height: 1.12;
          }

          .accentWord {
            font-size: 1.36em;
            line-height: 0.76;
          }

          .heroDescription {
            max-width: 570px;
            margin-right: auto;
            margin-left: auto;
          }

          .heroActions,
          .heroPoints {
            justify-content: center;
          }

          .heroVisual {
            width: 100%;
            max-width: 680px;
            min-height: 560px;
            margin: 0 auto;
            padding: 34px 34px 75px 10px;
          }

          .desktopMockup {
            transform: none;
          }

          .phoneMockup {
            right: 10px;
          }

          .badgeMobile {
            right: 35px;
          }

          .trustGrid {
            grid-template-columns: 1fr;
          }

          .trustGrid > div {
            border-right: 0;
            border-bottom: 1px solid #e9eef6;
          }

          .trustGrid > div:last-child {
            border-bottom: 0;
          }

          .introGrid,
          .showcaseGrid,
          .featuresGrid,
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
            padding-top: 245px;
          }

          .heroCopy {
            position: relative;
            z-index: 1;
          }

          .hero > .heroCopy > .eyebrow {
            display: none;
          }

          .hero h1 {
            width: 100%;
            max-width: 390px;
            margin: 0 auto;
            font-size: clamp(2rem, 9vw, 2.65rem);
            line-height: 1.02;
            letter-spacing: -0.05em;
          }

          .heroTitleLine {
            display: block;
            white-space: nowrap;
            font-size: 1em;
            line-height: inherit;
          }

          .accentWord {
            display: inline-block;
            margin: 0 0 0 0.04em;
            font-size: 1em;
            line-height: inherit;
            vertical-align: baseline;
            transform: rotate(-1deg);
          }

          .heroPoints {
            display: none !important;
          }

          .heroVisual {
            width: calc(100% - 32px);
            max-width: 650px;
            min-height: 450px;
            margin: 0 auto;
            padding: 22px 0 76px;
          }

          .heroDescription {
            max-width: 360px;
            margin-top: 24px;
            font-size: 0.98rem;
            line-height: 1.65;
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

          .desktopMockup {
            border-radius: 22px;
          }

          .desktopTopbar {
            min-height: 45px;
            padding: 0 13px;
          }

          .browserAddress {
            min-width: 58%;
            padding: 6px 10px;
            font-size: 0.62rem;
          }

          .topbarAction,
          .navPreview span:nth-child(2),
          .navPreview span:nth-child(3) {
            display: none;
          }

          .desktopScreen {
            padding: 17px;
          }

          .brandName {
            font-size: 0.72rem;
          }

          .siteHeroPreview {
            grid-template-columns: 1fr 0.82fr;
            gap: 13px;
            padding: 28px 0 19px;
          }

          .miniEyebrow {
            font-size: 0.42rem;
          }

          .miniHeadline {
            height: 12px;
          }

          .miniText {
            height: 5px;
            margin-top: 8px;
          }

          .miniActions {
            gap: 6px;
            margin-top: 13px;
          }

          .miniPrimary,
          .miniSecondary {
            height: 22px;
          }

          .miniPrimary {
            width: 70px;
          }

          .miniSecondary {
            width: 54px;
          }

          .siteHeroArtwork {
            min-height: 145px;
            border-radius: 18px;
          }

          .artWindow {
            width: 68%;
            min-height: 88px;
            padding: 10px;
            border-radius: 16px;
          }

          .siteCardsPreview {
            gap: 7px;
          }

          .siteCardsPreview article {
            min-height: 58px;
            padding: 9px;
            border-radius: 12px;
          }

          .phoneMockup {
            right: -4px;
            bottom: 7px;
            width: 108px;
            padding: 6px;
            border-radius: 23px;
          }

          .phoneScreen {
            min-height: 210px;
            padding: 9px;
            border-radius: 17px;
          }

          .phoneHero {
            padding: 19px 0 14px;
          }

          .phoneTitle {
            height: 9px;
          }

          .phoneButton {
            width: 57px;
            height: 20px;
          }

          .floatingBadge {
            min-width: 0;
            padding: 10px 11px;
          }

          .badgeIcon {
            width: 31px;
            height: 31px;
          }

          .floatingBadge span {
            font-size: 0.62rem;
          }

          .floatingBadge strong {
            font-size: 0.72rem;
          }

          .badgeSpeed {
            left: 4px;
            bottom: 20px;
          }

          .badgeMobile {
            top: 0;
            right: 3px;
          }

          .badgeSpeed b,
          .badgeMobile .badgeCheck {
            display: none;
          }

          .introSection,
          .showcaseSection,
          .servicesSection,
          .featuresSection,
          .processSection,
          .faqSection {
            padding: 78px 0;
          }

          .introGrid h2,
          .showcaseCopy h2,
          .sectionHeading h2,
          .featuresCopy h2,
          .ctaBox h2,
          .faqHeading h2 {
            font-size: clamp(2rem, 9vw, 2.65rem);
          }

          .comparison {
            display: none;
          }

          .mobileShowcaseArt {
            display: flex;
            min-height: 330px;
          }

          .mobileArtPhone {
            width: 138px;
          }

          .mobileArtScreen {
            min-height: 258px;
          }

          .mobileArtBadge {
            right: 12px;
            bottom: 24px;
          }

          .servicesGrid,
          .processGrid {
            grid-template-columns: 1fr;
          }

          .servicesGrid article,
          .processGrid article {
            min-height: 0;
          }

          .ctaSection {
            padding: 20px 0 78px;
          }

          .ctaBox {
            width: min(100% - 24px, 1280px);
            padding: 35px 23px;
            border-radius: 25px;
          }

          .ctaBox > a {
            width: 100%;
            white-space: normal;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .servicesGrid article,
          .faqList button :global(svg),
          .floatingWhatsapp {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}