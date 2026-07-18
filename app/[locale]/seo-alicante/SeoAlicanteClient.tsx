"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  FileSearch,
  Gauge,
  MapPin,
  Search,
  Settings2,
  Target,
} from "lucide-react";

import SiteNavbar from "@/components/ui/SiteNavbar";
import SearchRiseAnimation from "@/components/ui/SearchRiseAnimation";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const rotatingWords = [
  "clientes",
  "contactos",
  "ventas",
  "visibilidad",
];

const seoServices = [
  {
    icon: FileSearch,
    title: "Auditoría SEO",
    description:
      "Analizamos la estructura, el contenido, la indexación y el rendimiento de tu web para detectar los problemas que limitan su posicionamiento.",
  },
  {
    icon: Settings2,
    title: "SEO técnico",
    description:
      "Mejoramos velocidad, rastreo, indexación, arquitectura, enlazado interno y experiencia móvil.",
  },
  {
    icon: Search,
    title: "Estudio de palabras clave",
    description:
      "Identificamos las búsquedas que realizan tus potenciales clientes y las priorizamos según intención y oportunidad.",
  },
  {
    icon: MapPin,
    title: "SEO local en Alicante",
    description:
      "Optimizamos tu presencia para búsquedas locales y reforzamos tu visibilidad en Google Maps y Google Business Profile.",
  },
  {
    icon: Target,
    title: "Contenido SEO",
    description:
      "Creamos y optimizamos páginas que responden a búsquedas reales y convierten visitas orgánicas en oportunidades.",
  },
  {
    icon: BarChart3,
    title: "Medición y mejora",
    description:
      "Controlamos posiciones, tráfico, conversiones y oportunidades para optimizar continuamente la estrategia.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analizamos tu negocio",
    description:
      "Estudiamos tus servicios, tus clientes, tu web y la competencia que aparece en Google.",
  },
  {
    number: "02",
    title: "Definimos la estrategia",
    description:
      "Seleccionamos palabras clave, páginas prioritarias y acciones con mayor potencial comercial.",
  },
  {
    number: "03",
    title: "Optimizamos la web",
    description:
      "Corregimos problemas técnicos y mejoramos contenidos, estructura y enlazado interno.",
  },
  {
    number: "04",
    title: "Medimos y escalamos",
    description:
      "Analizamos resultados y ampliamos la estrategia hacia nuevas búsquedas y oportunidades.",
  },
];

const faqItems = [
  {
    question: "¿Cuánto tiempo tarda el SEO en dar resultados?",
    answer:
      "Depende de la situación inicial de la web, la competencia y la autoridad del dominio. Normalmente las primeras mejoras pueden observarse durante los primeros meses, pero una estrategia SEO sólida requiere trabajo continuo.",
  },
  {
    question: "¿Trabajáis el SEO local en Alicante?",
    answer:
      "Sí. Optimizamos páginas locales, Google Business Profile, señales geográficas, contenidos y otros elementos que ayudan a aparecer en búsquedas relacionadas con Alicante.",
  },
  {
    question: "¿Podéis posicionar una web que ya está creada?",
    answer:
      "Sí. Primero realizamos una auditoría para detectar problemas técnicos, de contenido y estructura. Después priorizamos las mejoras según su impacto potencial.",
  },
  {
    question: "¿El SEO sustituye a Google Ads?",
    answer:
      "No necesariamente. El SEO genera visibilidad orgánica progresiva y Google Ads permite captar demanda de forma inmediata. En muchos proyectos ambos canales funcionan mejor cuando se coordinan.",
  },
  {
    question: "¿Cómo se miden los resultados?",
    answer:
      "Medimos visibilidad, posiciones, clics, tráfico orgánico, formularios, llamadas y otras conversiones relevantes para el negocio.",
  },
];

export default function SeoAlicanteClient() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let changeTimeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setWordVisible(false);

      changeTimeout = setTimeout(() => {
        setWordIndex(
          (current) => (current + 1) % rotatingWords.length,
        );
        setWordVisible(true);
      }, 250);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(changeTimeout);
    };
  }, []);

  return (
    <>
      <SiteNavbar activeAlicanteSlug="seo-alicante" />
      <main>
        <section className="hero">
          <div className="heroLeft">
            <p className="heroEyebrow">
              Agencia SEO en Alicante
            </p>

            <h1>
              <span className="titleLine">
                Posicionamiento SEO
              </span>

              <span className="titleLine">
                en{" "}
                <span
                  className={`${caveat.className} alicanteWord`}
                >
                  Alicante
                </span>{" "}
                para conseguir
              </span>

              <span className="titleLine">
                más{" "}
                <span
                  className={`rotatingWord ${
                    wordVisible ? "show" : "hide"
                  }`}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>
            </h1>

            <p className="heroDescription">
              Mejoramos la visibilidad de tu empresa en Google para
              atraer personas que ya están buscando los servicios que
              ofreces.
            </p>

            <div className="heroBenefits">
              <span>
                <Check size={17} aria-hidden="true" />
                Estrategia personalizada
              </span>

              <span>
                <Check size={17} aria-hidden="true" />
                SEO local en Alicante
              </span>

              <span>
                <Check size={17} aria-hidden="true" />
                Resultados medibles
              </span>
            </div>

            <div className="mobileHeroButtons">
              <a
                href="#contact-formulario"
                className="primaryButton"
              >
                Solicitar análisis SEO
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

            <div className="heroAnimation">
              <SearchRiseAnimation />
            </div>
          </div>

          <aside className="consultancyCard">
            <h2>
              Consultoría gratuita para impulsar tu negocio
            </h2>

            <p className="duration">30 minutos</p>

            <ul>
              <li>
                <Check size={19} aria-hidden="true" />
                Analizamos tu situación actual
              </li>

              <li>
                <Check size={19} aria-hidden="true" />
                Detectamos oportunidades de crecimiento
              </li>

              <li>
                <Check size={19} aria-hidden="true" />
                Presencial u online
              </li>
            </ul>

            <div className="contactButtons">
              <a
                href="https://wa.me/34686012685"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsappButton"
              >
                <Image
                  src="/imagenes/whatsapp.png"
                  alt=""
                  width={26}
                  height={26}
                />
                Escribir por WhatsApp
              </a>

              <a
                href="#contact-formulario"
                className="informationButton"
              >
                Solicitar información ahora
              </a>
            </div>

            <p className="microcopy">
              Sin compromiso · Respuesta inmediata
            </p>
          </aside>
        </section>

        <section className="introSection">
          <div className="sectionContainer introGrid">
            <div>
              <p className="sectionEyebrow">
                Posicionamiento web en Alicante
              </p>

              <h2>
                Aparece cuando tus potenciales clientes buscan tus
                servicios
              </h2>
            </div>

            <div className="introText">
              <p>
                Una estrategia SEO no consiste únicamente en incluir
                palabras clave. Tu web debe ser comprensible para
                Google, responder a la intención de búsqueda y
                facilitar que el usuario contacte contigo.
              </p>

              <p>
                Trabajamos el posicionamiento orgánico para convertir
                Google en un canal estable de captación de clientes
                para tu negocio.
              </p>
            </div>
          </div>
        </section>

        <section className="problemSection">
          <div className="sectionContainer">
            <div className="sectionHeading centeredHeading">
              <p className="sectionEyebrow">
                ¿Por qué tu web no aparece?
              </p>

              <h2>
                Los problemas SEO que pueden estar limitando tu
                crecimiento
              </h2>

              <p>
                Una página atractiva no garantiza que Google pueda
                encontrarla, comprenderla y mostrarla en las búsquedas
                adecuadas.
              </p>
            </div>

            <div className="problemGrid">
              <article>
                <span>01</span>
                <h3>No atacas las búsquedas correctas</h3>
                <p>
                  Tus páginas pueden no responder a las consultas que
                  realizan tus clientes potenciales.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Google no comprende la estructura</h3>
                <p>
                  Una arquitectura confusa dificulta el rastreo, la
                  indexación y la distribución de autoridad.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>La competencia está mejor optimizada</h3>
                <p>
                  Otras empresas pueden tener contenidos más completos,
                  mayor autoridad o una estrategia local más sólida.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>La web no genera conversiones</h3>
                <p>
                  Recibir visitas no es suficiente si las páginas no
                  transmiten confianza ni facilitan el contacto.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="servicesSection" id="servicios-seo">
          <div className="sectionContainer">
            <div className="sectionHeading">
              <p className="sectionEyebrow">
                Servicios SEO
              </p>

              <h2>
                Una estrategia completa para mejorar tu visibilidad en
                Google
              </h2>

              <p>
                Trabajamos los factores técnicos, locales y de
                contenido que influyen en el posicionamiento.
              </p>
            </div>

            <div className="servicesGrid">
              {seoServices.map((service) => {
                const Icon = service.icon;

                return (
                  <article key={service.title}>
                    <div className="serviceIcon">
                      <Icon size={26} aria-hidden="true" />
                    </div>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="localSeoSection">
          <div className="sectionContainer localSeoGrid">
            <div className="localSeoCopy">
              <p className="sectionEyebrow">
                SEO local en Alicante
              </p>

              <h2>
                Haz que tu negocio destaque en las búsquedas locales
              </h2>

              <p>
                Cuando alguien busca un servicio cerca de su ubicación,
                Google utiliza señales locales para decidir qué
                empresas mostrar.
              </p>

              <ul>
                <li>
                  <Check size={19} aria-hidden="true" />
                  Optimización de Google Business Profile
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Páginas orientadas a búsquedas locales
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Mejora de relevancia geográfica
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Estrategia de reseñas y autoridad local
                </li>
              </ul>

              <a href="#contact-formulario">
                Analizar mi posicionamiento local
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="mapCard">
              <div className="mapSearch">
                <Search size={19} aria-hidden="true" />
                <span>Tu servicio en Alicante</span>
              </div>

              <div className="mapSurface">
                <div className="mapLine lineOne" />
                <div className="mapLine lineTwo" />
                <div className="mapLine lineThree" />

                <div className="mapPin">
                  <MapPin size={30} aria-hidden="true" />
                </div>
              </div>

              <div className="businessResult">
                <div className="resultIcon">
                  <MapPin size={21} aria-hidden="true" />
                </div>

                <div>
                  <strong>Tu empresa</strong>
                  <span>Alicante · Posición destacada</span>
                </div>

                <strong className="rating">4,9 ★</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="processSection">
          <div className="sectionContainer">
            <div className="sectionHeading centeredHeading">
              <p className="sectionEyebrow">
                Nuestro proceso
              </p>

              <h2>
                Cómo desarrollamos tu estrategia SEO
              </h2>

              <p>
                Priorizamos las acciones con mayor capacidad para
                generar visibilidad, tráfico cualificado y contactos.
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

        <section className="resultsSection">
          <div className="sectionContainer resultsGrid">
            <div className="resultsCopy">
              <p className="sectionEyebrow">
                SEO orientado a negocio
              </p>

              <h2>
                No buscamos únicamente visitas. Buscamos oportunidades.
              </h2>

              <p>
                Una estrategia SEO debe conectar las búsquedas con los
                objetivos comerciales de tu empresa.
              </p>

              <div className="resultPoints">
                <div>
                  <Search size={23} aria-hidden="true" />
                  <span>
                    <strong>Más visibilidad</strong>
                    Aparece en búsquedas relevantes.
                  </span>
                </div>

                <div>
                  <Target size={23} aria-hidden="true" />
                  <span>
                    <strong>Tráfico cualificado</strong>
                    Atrae usuarios con intención real.
                  </span>
                </div>

                <div>
                  <Gauge size={23} aria-hidden="true" />
                  <span>
                    <strong>Mejor conversión</strong>
                    Optimiza páginas para conseguir contactos.
                  </span>
                </div>
              </div>
            </div>

            <div className="analyticsCard">
              <div className="analyticsHeader">
                <span>Rendimiento orgánico</span>
                <strong>Últimos 6 meses</strong>
              </div>

              <div className="metric">
                <span>Visibilidad en Google</span>
                <strong>+128%</strong>
              </div>

              <div className="chart" aria-hidden="true">
                <span style={{ height: "26%" }} />
                <span style={{ height: "36%" }} />
                <span style={{ height: "44%" }} />
                <span style={{ height: "59%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "92%" }} />
              </div>

              <div className="analyticsFooter">
                <span>Posiciones</span>
                <span>Tráfico</span>
                <span>Contactos</span>
              </div>
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="sectionContainer ctaBox">
            <div>
              <p className="sectionEyebrow">
                Auditoría inicial
              </p>

              <h2>
                Descubre qué está frenando el posicionamiento de tu web
              </h2>

              <p>
                Revisamos tu situación actual y detectamos las
                oportunidades SEO más relevantes para tu empresa.
              </p>
            </div>

            <a href="#contact-formulario">
              Solicitar análisis SEO
              <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="faqSection">
          <div className="sectionContainer faqGrid">
            <div className="faqHeading">
              <p className="sectionEyebrow">
                Preguntas frecuentes
              </p>

              <h2>
                Dudas habituales sobre SEO en Alicante
              </h2>

              <p>
                Estas son algunas de las preguntas más frecuentes antes
                de comenzar una estrategia de posicionamiento.
              </p>
            </div>

            <div className="faqList">
              {faqItems.map((item, itemIndex) => {
                const isOpen = openFaq === itemIndex;

                return (
                  <article
                    key={item.question}
                    className={isOpen ? "faqOpen" : undefined}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(
                          isOpen ? null : itemIndex,
                        )
                      }
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>

                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                      />
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
  overflow-y: visible;
  background: #ffffff;
  font-family: "Montserrat", sans-serif;
}

        .hero {
  min-height: 1020px;
  box-sizing: border-box;
  padding: 165px 6% 70px;
  display: grid;
  grid-template-columns:
    minmax(0, 1.15fr)
    minmax(390px, 0.85fr);
  gap: clamp(42px, 5vw, 76px);
  align-items: start;
  background:
    radial-gradient(
      circle at 15% 45%,
      rgba(46, 123, 255, 0.07),
      transparent 32%
    ),
    #ffffff;
}

        .heroLeft {
          min-width: 0;
        }

        .heroEyebrow,
        .sectionEyebrow {
          margin: 0 0 17px;
          color: #2e7bff;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .hero h1 {
          max-width: 880px;
          margin: 0 0 25px;
          color: #111111;
          font-size: clamp(2.35rem, 3.75vw, 4rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.052em;
        }

        .titleLine {
          display: block;
          white-space: nowrap;
        }

        .alicanteWord {
          display: inline-block;
          margin-right: 0.06em;
          color: #2e7bff;
          font-size: 1.2em;
          font-weight: 700;
          line-height: 0.8;
          letter-spacing: -0.02em;
          vertical-align: -0.035em;
          transform: rotate(-1deg);
          transform-origin: center;
          white-space: nowrap;
        }

        .rotatingWord {
          display: inline-block;
          min-width: 4.7em;
          color: #2e7bff;
          transition:
            opacity 0.25s ease,
            transform 0.25s ease;
        }

        .rotatingWord.show {
          opacity: 1;
          transform: translateY(0);
        }

        .rotatingWord.hide {
          opacity: 0;
          transform: translateY(8px);
        }

        .heroDescription {
          max-width: 720px;
          margin: 0;
          color: #535b6b;
          font-size: clamp(1rem, 1.2vw, 1.16rem);
          font-weight: 500;
          line-height: 1.7;
        }

        .heroBenefits {
          display: flex;
          flex-wrap: wrap;
          gap: 11px 20px;
          margin-top: 23px;
        }

        .heroBenefits span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #384152;
          font-size: 0.9rem;
          font-weight: 650;
        }

        .heroBenefits :global(svg) {
          color: #2e7bff;
        }

        .mobileHeroButtons {
          display: none;
        }

        .heroAnimation {
  width: 100%;
  max-width: 760px;
  margin-top: 25px;
}

       .heroAnimation > :global(*) {
  width: 100%;
}

        .consultancyCard {
          width: 100%;
          max-width: 470px;
          margin-left: auto;
          padding: 44px;
          background: #ffffff;
          border: 1px solid #e8ecf3;
          border-radius: 32px;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.09);
        }

        .consultancyCard h2 {
          margin: 0 0 18px;
          color: #111111;
          font-size: clamp(1.8rem, 3vw, 2.7rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .duration {
          margin: 0 0 28px;
          color: #2e7bff;
          font-weight: 700;
        }

        .consultancyCard ul {
          display: grid;
          gap: 16px;
          margin: 0 0 34px;
          padding: 0;
          list-style: none;
        }

        .consultancyCard li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #444b5a;
          font-weight: 500;
          line-height: 1.5;
        }

        .consultancyCard li :global(svg) {
          flex: 0 0 auto;
          margin-top: 2px;
          color: #2e7bff;
        }

        .contactButtons {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .whatsappButton,
        .informationButton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 58px;
          padding: 15px 20px;
          border-radius: 999px;
          color: #ffffff;
          text-decoration: none;
          text-align: center;
          font-weight: 700;
          transition:
            transform 0.25s ease,
            background-color 0.25s ease;
        }

        .whatsappButton {
          background: #25d366;
        }

        .whatsappButton:hover {
          background: #1ebe5d;
          transform: translateY(-2px);
        }

        .informationButton {
          background: #2e7bff;
        }

        .informationButton:hover {
          background: #1769f5;
          transform: translateY(-2px);
        }

        .microcopy {
          margin: 18px 0 0;
          color: #6b7280;
          text-align: center;
          font-size: 0.88rem;
          font-weight: 500;
        }

        .sectionContainer {
          width: min(100% - 48px, 1280px);
          margin: 0 auto;
        }

        .introSection {
          padding: 110px 0;
          background: #f7faff;
        }

        .introGrid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 75px;
          align-items: start;
        }

        .introGrid h2,
        .sectionHeading h2,
        .localSeoCopy h2,
        .resultsCopy h2,
        .ctaBox h2,
        .faqHeading h2 {
          margin: 0;
          color: #111111;
          font-size: clamp(2.2rem, 4vw, 4rem);
          line-height: 1.06;
          font-weight: 760;
          letter-spacing: -0.052em;
        }

        .introText {
          padding-top: 37px;
        }

        .introText p {
          margin: 0;
          color: #535b6b;
          font-size: 1.08rem;
          line-height: 1.75;
        }

        .introText p + p {
          margin-top: 18px;
        }

        .problemSection,
        .servicesSection,
        .processSection,
        .faqSection {
          padding: 115px 0;
        }

        .sectionHeading {
          max-width: 880px;
          margin-bottom: 55px;
        }

        .sectionHeading > p:last-child,
        .faqHeading > p:last-child {
          max-width: 720px;
          margin: 23px 0 0;
          color: #606878;
          font-size: 1.04rem;
          line-height: 1.7;
        }

        .centeredHeading {
          margin-right: auto;
          margin-left: auto;
          text-align: center;
        }

        .centeredHeading > p:last-child {
          margin-right: auto;
          margin-left: auto;
        }

        .problemGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .problemGrid article {
          min-height: 285px;
          padding: 30px;
          border: 1px solid #e1e9f5;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 18px 48px rgba(24, 54, 104, 0.06);
        }

        .problemGrid article > span,
        .processGrid article > span {
          display: block;
          margin-bottom: 35px;
          color: #2e7bff;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .problemGrid h3,
        .servicesGrid h3,
        .processGrid h3 {
          margin: 0 0 13px;
          color: #151515;
          font-size: 1.26rem;
          line-height: 1.25;
          font-weight: 750;
          letter-spacing: -0.025em;
        }

        .problemGrid p,
        .servicesGrid p,
        .processGrid p {
          margin: 0;
          color: #636b7a;
          line-height: 1.65;
        }

        .servicesSection {
          background: #f7faff;
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
          place-items: center;
          width: 52px;
          height: 52px;
          margin-bottom: 42px;
          border-radius: 16px;
          background: #edf4ff;
          color: #2e7bff;
        }

        .localSeoSection,
        .resultsSection {
          padding: 120px 0;
        }

        .localSeoGrid,
        .resultsGrid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 85px;
          align-items: center;
        }

        .localSeoCopy > p:not(.sectionEyebrow),
        .resultsCopy > p:not(.sectionEyebrow) {
          margin: 25px 0 0;
          color: #596273;
          font-size: 1.04rem;
          line-height: 1.75;
        }

        .localSeoCopy ul {
          display: grid;
          gap: 15px;
          margin: 30px 0 33px;
          padding: 0;
          list-style: none;
        }

        .localSeoCopy li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #343c4b;
          font-weight: 600;
        }

        .localSeoCopy li :global(svg) {
          color: #2e7bff;
        }

        .localSeoCopy > a,
        .ctaBox > a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 56px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #2e7bff;
          color: #ffffff;
          text-decoration: none;
          font-weight: 750;
          box-shadow: 0 15px 35px rgba(46, 123, 255, 0.25);
        }

        .mapCard {
          padding: 22px;
          border: 1px solid #dae6f7;
          border-radius: 30px;
          background: #ffffff;
          box-shadow: 0 28px 75px rgba(25, 59, 115, 0.13);
        }

        .mapSearch {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 15px 18px;
          border: 1px solid #e0e6ee;
          border-radius: 999px;
          color: #525b69;
        }

        .mapSurface {
          position: relative;
          min-height: 300px;
          margin: 18px 0;
          overflow: hidden;
          border-radius: 22px;
          background:
            linear-gradient(
              35deg,
              transparent 45%,
              rgba(255, 255, 255, 0.95) 46%,
              rgba(255, 255, 255, 0.95) 51%,
              transparent 52%
            ),
            linear-gradient(
              -25deg,
              transparent 43%,
              rgba(255, 255, 255, 0.9) 44%,
              rgba(255, 255, 255, 0.9) 49%,
              transparent 50%
            ),
            #edf3ec;
        }

        .mapLine {
          position: absolute;
          height: 9px;
          border-radius: 999px;
          background: rgba(46, 123, 255, 0.2);
        }

        .lineOne {
          top: 20%;
          left: -8%;
          width: 76%;
          transform: rotate(18deg);
        }

        .lineTwo {
          top: 58%;
          right: -10%;
          width: 85%;
          transform: rotate(-15deg);
        }

        .lineThree {
          bottom: 13%;
          left: 8%;
          width: 62%;
          transform: rotate(7deg);
        }

        .mapPin {
          position: absolute;
          top: 50%;
          left: 54%;
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          background: #2e7bff;
          color: #ffffff;
          box-shadow: 0 18px 34px rgba(46, 123, 255, 0.3);
          transform: translate(-50%, -50%);
        }

        .businessResult {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 13px;
          align-items: center;
          padding: 16px;
          border: 1px solid #e4eaf2;
          border-radius: 18px;
        }

        .resultIcon {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          border-radius: 13px;
          background: #edf4ff;
          color: #2e7bff;
        }

        .businessResult strong,
        .businessResult span {
          display: block;
        }

        .businessResult span {
          margin-top: 4px;
          color: #6c7482;
          font-size: 0.84rem;
        }

        .rating {
          color: #2e7bff;
        }

        .processSection {
          background: #f7faff;
        }

        .processGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .processGrid article {
          min-height: 270px;
          padding: 30px;
          border-left: 2px solid #dce8fb;
          background: transparent;
        }

        .resultsGrid {
          grid-template-columns: 1fr 0.9fr;
        }

        .resultPoints {
          display: grid;
          gap: 18px;
          margin-top: 32px;
        }

        .resultPoints > div {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .resultPoints :global(svg) {
          flex: 0 0 auto;
          color: #2e7bff;
        }

        .resultPoints strong,
        .resultPoints span {
          display: block;
        }

        .resultPoints strong {
          margin-bottom: 5px;
          color: #20242b;
        }

        .resultPoints span {
          color: #626b79;
          line-height: 1.5;
        }

        .analyticsCard {
          padding: 32px;
          border: 1px solid #dfe8f5;
          border-radius: 28px;
          background: #ffffff;
          box-shadow: 0 30px 75px rgba(25, 59, 115, 0.12);
        }

        .analyticsHeader,
        .analyticsFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .analyticsHeader {
          color: #697180;
          font-size: 0.85rem;
        }

        .analyticsHeader strong {
          color: #2e7bff;
        }

        .metric {
          margin-top: 32px;
        }

        .metric span,
        .metric strong {
          display: block;
        }

        .metric span {
          color: #687180;
        }

        .metric strong {
          margin-top: 7px;
          color: #111111;
          font-size: 2.8rem;
          letter-spacing: -0.05em;
        }

        .chart {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          height: 220px;
          margin-top: 25px;
          padding: 20px 15px 0;
          border-bottom: 1px solid #e3e9f2;
        }

        .chart span {
          flex: 1;
          min-width: 18px;
          border-radius: 9px 9px 3px 3px;
          background: linear-gradient(180deg, #5f9cff, #2e7bff);
        }

        .analyticsFooter {
          margin-top: 18px;
          color: #7a8290;
          font-size: 0.8rem;
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
          max-width: 820px;
          color: #ffffff;
        }

        .ctaBox > div > p:last-child {
          max-width: 720px;
          margin: 22px 0 0;
          color: #c7cfdb;
          line-height: 1.7;
        }

        .ctaBox > a {
          background: #ffffff;
          color: #1867ec;
          box-shadow: none;
          white-space: nowrap;
        }

        .faqSection {
          background: #f7faff;
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
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
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
            grid-template-columns:
              minmax(0, 1fr)
              minmax(350px, 0.75fr);
            gap: 35px;
          }

          .hero h1 {
            font-size: clamp(2.2rem, 3.7vw, 3.4rem);
          }

          .problemGrid,
          .processGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 980px) {
          .hero {
  grid-template-columns: 1fr;
  min-height: auto;
  width: 100%;
  max-width: 100vw;
  padding: 145px 16px 55px;
  gap: 10px;
  overflow: visible;
  box-sizing: border-box;
}

          .heroLeft {
            padding-top: 22px;
          }

          .heroEyebrow {
            text-align: center;
          }

          .hero h1 {
  width: 100%;
  max-width: 580px;
  margin: 0 auto 20px;
  text-align: center;
  font-size: clamp(2rem, 8vw, 2.7rem);
  line-height: 1.03;
}

          .titleLine {
            white-space: normal;
          }

          .alicanteWord {
            font-size: 1.16em;
            line-height: 0.9;
          }

          .rotatingWord {
            min-width: 0;
          }

          .heroDescription {
  max-width: 560px;
  margin: 0 auto;
  padding: 0 14px;
  text-align: center;
  font-size: 0.97rem;
}

          .heroBenefits {
  display: none;
}

          .mobileHeroButtons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 330px;
            margin: 24px auto 0;
          }

          .primaryButton,
          .secondaryButton {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 54px;
            padding: 14px 20px;
            border-radius: 999px;
            text-decoration: none;
            text-align: center;
            font-weight: 750;
          }

          .primaryButton {
            background: #2e7bff;
            color: #ffffff;
            box-shadow: 0 14px 30px rgba(46, 123, 255, 0.28);
          }

          .secondaryButton {
            border: 1px solid #dbe6f8;
            background: #ffffff;
            color: #2e7bff;
          }

          .heroAnimation {
  width: 100%;
  max-width: min(390px, calc(100vw - 32px));
  height: auto;
  margin: 18px auto 0;
}

          .consultancyCard {
            display: none;
          }

          .introGrid,
          .localSeoGrid,
          .resultsGrid,
          .faqGrid {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .introText {
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

          .introSection,
          .problemSection,
          .servicesSection,
          .localSeoSection,
          .processSection,
          .resultsSection,
          .faqSection {
            padding: 78px 0;
          }

          .introGrid h2,
          .sectionHeading h2,
          .localSeoCopy h2,
          .resultsCopy h2,
          .ctaBox h2,
          .faqHeading h2 {
            font-size: clamp(2rem, 9vw, 2.65rem);
          }

          .problemGrid,
          .servicesGrid,
          .processGrid {
            grid-template-columns: 1fr;
          }

          .problemGrid article,
          .servicesGrid article,
          .processGrid article {
            min-height: 0;
          }

          .servicesGrid article {
            padding: 27px;
          }

          .serviceIcon {
            margin-bottom: 29px;
          }

          .mapSurface {
            min-height: 240px;
          }

          .businessResult {
            grid-template-columns: auto 1fr;
          }

          .rating {
            grid-column: 2;
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

          .heroBenefits {
  display: none;
}
        }

        @media (prefers-reduced-motion: reduce) {
          .rotatingWord,
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