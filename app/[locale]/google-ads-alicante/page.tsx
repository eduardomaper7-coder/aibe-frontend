"use client";

import { useState } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  BadgeEuro,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  LineChart,
  MousePointerClick,
  Search,
  Settings2,
  Target,
  TrendingUp,
  Users,
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
    icon: Search,
    title: "Campañas de búsqueda",
    description:
      "Creamos anuncios para aparecer cuando tus potenciales clientes buscan exactamente los servicios que ofreces.",
  },
  {
    icon: Target,
    title: "Segmentación estratégica",
    description:
      "Definimos ubicaciones, horarios, audiencias y búsquedas para invertir el presupuesto donde existe mayor intención.",
  },
  {
    icon: Settings2,
    title: "Optimización continua",
    description:
      "Revisamos términos de búsqueda, anuncios, pujas y conversiones para mejorar el rendimiento de forma progresiva.",
  },
  {
    icon: MousePointerClick,
    title: "Landing pages",
    description:
      "Mejoramos o creamos páginas orientadas a convertir el tráfico de pago en llamadas, formularios y oportunidades.",
  },
  {
    icon: CircleDollarSign,
    title: "Control de presupuesto",
    description:
      "Distribuimos la inversión según rentabilidad, demanda y capacidad comercial de cada servicio.",
  },
  {
    icon: BarChart3,
    title: "Medición de conversiones",
    description:
      "Configuramos llamadas, formularios y acciones relevantes para saber qué campañas generan negocio.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analizamos tu negocio",
    description:
      "Estudiamos servicios, márgenes, competencia, zonas de trabajo y objetivos comerciales.",
  },
  {
    number: "02",
    title: "Creamos la estrategia",
    description:
      "Seleccionamos búsquedas, estructura de campañas, presupuesto y mensajes publicitarios.",
  },
  {
    number: "03",
    title: "Lanzamos y medimos",
    description:
      "Publicamos las campañas y configuramos la medición de contactos y conversiones.",
  },
  {
    number: "04",
    title: "Optimizamos",
    description:
      "Eliminamos gasto improductivo y reforzamos las campañas, anuncios y búsquedas con mejor rendimiento.",
  },
];

const faqItems = [
  {
    question: "¿Cuánto presupuesto necesito para Google Ads?",
    answer:
      "Depende del sector, la competencia, el coste por clic y la zona geográfica. Antes de comenzar analizamos la demanda y proponemos un presupuesto coherente con tus objetivos.",
  },
  {
    question: "¿Cuándo puedo empezar a recibir contactos?",
    answer:
      "Las campañas pueden comenzar a generar tráfico desde su activación. La calidad y el coste de los contactos mejoran a medida que recopilamos datos y optimizamos.",
  },
  {
    question: "¿Trabajáis campañas locales en Alicante?",
    answer:
      "Sí. Podemos orientar las campañas a Alicante, municipios concretos o radios alrededor de tus zonas de servicio.",
  },
  {
    question: "¿Incluye la creación de anuncios?",
    answer:
      "Sí. Redactamos anuncios, extensiones y mensajes adaptados a cada grupo de búsquedas y servicio.",
  },
  {
    question: "¿Cómo sabré si las campañas funcionan?",
    answer:
      "Medimos clics, coste, llamadas, formularios, conversiones y coste por oportunidad para evaluar el rendimiento comercial.",
  },
];

export default function GoogleAdsAlicantePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SiteNavbar
        variant="alicante"
        activeAlicanteSlug="google-ads-alicante"
      />

      <main>
        <section className="hero">
          <div className="heroLeft">
            <p className="heroEyebrow">Agencia Google Ads en Alicante</p>

            <h1>
              <span className="titleLine mainTitleLine">
                Campañas de Google Ads
              </span>

              <span className="titleLine locationLine">
                en{" "}
                <span className={`${caveat.className} alicanteWord`}>
                  Alicante
                </span>{" "}
                para conseguir clientes
              </span>

              <span className="titleLine outcomeLine">
                desde el primer día
              </span>
            </h1>

            <p className="heroDescription">
              Creamos y optimizamos campañas para que tu empresa aparezca
              cuando tus potenciales clientes están buscando tus servicios.
            </p>

            <div className="heroBenefits">
              <span>
                <Check size={17} aria-hidden="true" />
                Campañas orientadas a conversión
              </span>

              <span>
                <Check size={17} aria-hidden="true" />
                Control de inversión
              </span>

              <span>
                <Check size={17} aria-hidden="true" />
                Resultados medibles
              </span>
            </div>

            <div className="mobileHeroButtons">
              <a href="#contact-formulario" className="primaryButton">
                Solicitar análisis de campañas
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

            <div className="adsVisual" aria-hidden="true">
              <div className="adsDashboard">
                <aside className="dashboardSidebar">
                  <div className="adsMark">
                    <span className="markBlue" />
                    <span className="markYellow" />
                    <span className="markGreen" />
                  </div>

                  <span className="sideItem sideItemActive">
                    <BarChart3 size={18} />
                  </span>
                  <span className="sideItem">
                    <Target size={18} />
                  </span>
                  <span className="sideItem">
                    <Search size={18} />
                  </span>
                  <span className="sideItem">
                    <Settings2 size={18} />
                  </span>
                </aside>

                <div className="dashboardMain">
                  <div className="dashboardTopbar">
                    <div>
                      <span className="dashboardLabel">Vista general</span>
                      <strong>Rendimiento de campañas</strong>
                    </div>

                    <div className="datePill">Últimos 30 días</div>
                  </div>

                  <div className="kpiGrid">
                    <article className="kpiCard kpiBlue">
                      <span>Clics</span>
                      <strong>65</strong>
                      <small>Más tráfico cualificado</small>
                    </article>

                    <article className="kpiCard kpiRed">
                      <span>Impresiones</span>
                      <strong>574</strong>
                      <small>Mayor visibilidad</small>
                    </article>

                    <article className="kpiCard kpiYellow">
                      <span>CPC medio</span>
                      <strong>Optimizado</strong>
                      <small>Control continuo</small>
                    </article>

                    <article className="kpiCard kpiGreen">
                      <span>Conversiones</span>
                      <strong>En crecimiento</strong>
                      <small>Objetivos medidos</small>
                    </article>
                  </div>

                  <div className="dashboardChart">
                    <div className="dashboardChartHeader">
                      <div>
                        <strong>Evolución de la campaña</strong>
                        <span>Clics y conversiones</span>
                      </div>

                      <div className="chartLegend">
                        <span className="legendBlue">Clics</span>
                        <span className="legendRed">Conversiones</span>
                      </div>
                    </div>

                    <div className="chartSurface">
                      <span className="gridLine lineA" />
                      <span className="gridLine lineB" />
                      <span className="gridLine lineC" />

                      <svg viewBox="0 0 620 210" className="googleChart">
                        <path
                          className="blueChartLine"
                          d="M10 176 L90 176 L165 174 L238 174 L310 172 L382 170 L435 132 L482 84 L525 42 L572 82 L610 58"
                        />
                        <path
                          className="redChartLine"
                          d="M10 178 L90 178 L165 178 L238 177 L310 175 L382 172 L435 140 L482 92 L525 65 L572 50 L610 36"
                        />
                        <circle className="blueDot" cx="525" cy="42" r="6" />
                        <circle className="redDot" cx="610" cy="36" r="6" />
                      </svg>
                    </div>
                  </div>

                  <div className="dashboardFooterCards">
                    <div>
                      <Target size={18} />
                      <span>
                        <strong>Campañas enfocadas</strong>
                        Búsquedas con intención
                      </span>
                    </div>

                    <div>
                      <Gauge size={18} />
                      <span>
                        <strong>Inversión controlada</strong>
                        Sin gasto innecesario
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floatingMetric metricOne">
                <TrendingUp size={20} />
                <span>
                  <strong>Mejor rendimiento</strong>
                  Optimización continua
                </span>
              </div>

              <div className="floatingMetric metricTwo">
                <MousePointerClick size={20} />
                <span>
                  <strong>Más contactos</strong>
                  Tráfico con intención
                </span>
              </div>
            </div>
          </div>

          <aside className="consultancyCard">
            <h2>Consultoría gratuita para impulsar tu negocio</h2>

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

              <a href="#contact-formulario" className="informationButton">
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
              <p className="sectionEyebrow">Publicidad en Google</p>

              <h2>
                Aparece justo cuando tus clientes están preparados para comprar
              </h2>
            </div>

            <div className="introText">
              <p>
                Google Ads permite captar demanda existente. Tus anuncios
                aparecen ante personas que ya están buscando una solución y
                comparando empresas.
              </p>

              <p>
                La clave no es conseguir más clics, sino convertir la inversión
                en contactos y oportunidades reales para tu negocio.
              </p>
            </div>
          </div>
        </section>

        <section className="problemSection">
          <div className="sectionContainer">
            <div className="sectionHeading centeredHeading">
              <p className="sectionEyebrow">¿Por qué una campaña no funciona?</p>

              <h2>
                Los errores que pueden hacerte perder presupuesto
              </h2>

              <p>
                Una campaña mal estructurada puede atraer búsquedas poco
                relevantes, consumir presupuesto y generar pocos contactos.
              </p>
            </div>

            <div className="problemGrid">
              <article>
                <span>01</span>
                <h3>Palabras clave demasiado amplias</h3>
                <p>
                  Los anuncios pueden aparecer en búsquedas que no tienen
                  intención de contratar tus servicios.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>No se miden las conversiones</h3>
                <p>
                  Sin seguimiento de llamadas y formularios no es posible saber
                  qué campañas generan resultados.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Anuncios poco diferenciados</h3>
                <p>
                  Mensajes genéricos reducen la relevancia y dificultan que el
                  usuario elija tu empresa.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>Landing page poco efectiva</h3>
                <p>
                  Una página lenta, confusa o sin llamadas a la acción puede
                  desperdiciar tráfico de calidad.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="servicesSection" id="servicios-google-ads">
          <div className="sectionContainer">
            <div className="sectionHeading">
              <p className="sectionEyebrow">Gestión de Google Ads</p>

              <h2>
                Una estrategia completa para convertir inversión en oportunidades
              </h2>

              <p>
                Trabajamos la estructura, segmentación, anuncios, páginas de
                destino y medición de tus campañas.
              </p>
            </div>

            <div className="servicesGrid">
              {services.map((service) => {
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

        <section className="strategySection">
          <div className="sectionContainer strategyGrid">
            <div className="strategyCopy">
              <p className="sectionEyebrow">Google Ads local</p>

              <h2>
                Capta clientes en Alicante y en tus zonas de servicio
              </h2>

              <p>
                Podemos orientar las campañas a toda la provincia, municipios
                concretos o radios alrededor de tu ubicación.
              </p>

              <ul>
                <li>
                  <Check size={19} aria-hidden="true" />
                  Segmentación por ubicación
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Horarios según demanda
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Anuncios adaptados a cada servicio
                </li>

                <li>
                  <Check size={19} aria-hidden="true" />
                  Medición de llamadas y formularios
                </li>
              </ul>

              <a href="#contact-formulario">
                Analizar mis campañas
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="budgetCard">
              <div className="budgetHeader">
                <span>Distribución del presupuesto</span>
                <strong>Optimizada</strong>
              </div>

              <div className="budgetMetric">
                <span>Distribución estratégica</span>
                <strong>Presupuesto optimizado</strong>
              </div>

              <div className="budgetRows">
                <div>
                  <span>Servicio principal</span>
                  <strong>55%</strong>
                  <div><i style={{ width: "55%" }} /></div>
                </div>

                <div>
                  <span>Servicios secundarios</span>
                  <strong>30%</strong>
                  <div><i style={{ width: "30%" }} /></div>
                </div>

                <div>
                  <span>Remarketing</span>
                  <strong>15%</strong>
                  <div><i style={{ width: "15%" }} /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="processSection">
          <div className="sectionContainer">
            <div className="sectionHeading centeredHeading">
              <p className="sectionEyebrow">Nuestro proceso</p>

              <h2>
                Cómo gestionamos tus campañas de Google Ads
              </h2>

              <p>
                Trabajamos con una metodología enfocada en reducir gasto
                improductivo y aumentar las oportunidades comerciales.
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
              <p className="sectionEyebrow">Publicidad orientada a negocio</p>

              <h2>
                No buscamos solo clics. Buscamos contactos rentables.
              </h2>

              <p>
                Analizamos los datos desde una perspectiva comercial para
                invertir más en lo que funciona y corregir lo que no genera
                resultados.
              </p>

              <div className="resultPoints">
                <div>
                  <Users size={23} aria-hidden="true" />
                  <span>
                    <strong>Más oportunidades</strong>
                    Atrae usuarios con intención real.
                  </span>
                </div>

                <div>
                  <Gauge size={23} aria-hidden="true" />
                  <span>
                    <strong>Mayor eficiencia</strong>
                    Reduce gasto en búsquedas poco relevantes.
                  </span>
                </div>

                <div>
                  <LineChart size={23} aria-hidden="true" />
                  <span>
                    <strong>Decisiones con datos</strong>
                    Mide campañas, anuncios y servicios.
                  </span>
                </div>
              </div>
            </div>

            <div className="performanceCard">
              <div className="performanceHeader">
                <span>Rendimiento de campaña</span>
                <strong>Últimos 90 días</strong>
              </div>

              <div className="performanceMetric">
                <span>Conversiones</span>
                <strong>+64%</strong>
              </div>

              <div className="performanceChart" aria-hidden="true">
                <span style={{ height: "32%" }} />
                <span style={{ height: "41%" }} />
                <span style={{ height: "46%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "69%" }} />
                <span style={{ height: "88%" }} />
              </div>

              <div className="performanceFooter">
                <span>Clics</span>
                <span>Contactos</span>
                <span>Rentabilidad</span>
              </div>
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="sectionContainer ctaBox">
            <div>
              <p className="sectionEyebrow">Análisis inicial</p>

              <h2>
                Descubre cómo mejorar el rendimiento de tu inversión
              </h2>

              <p>
                Revisamos tu situación, tus objetivos y las oportunidades de
                captación mediante Google Ads.
              </p>
            </div>

            <a href="#contact-formulario">
              Solicitar análisis
              <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="faqSection">
          <div className="sectionContainer faqGrid">
            <div className="faqHeading">
              <p className="sectionEyebrow">Preguntas frecuentes</p>

              <h2>
                Dudas habituales sobre Google Ads en Alicante
              </h2>

              <p>
                Estas son algunas preguntas frecuentes antes de comenzar una
                estrategia de publicidad en Google.
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
              rgba(46, 123, 255, 0.08),
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
          max-width: 900px;
          margin: 0 0 25px;
          color: #111111;
          font-size: clamp(2.35rem, 3.7vw, 4rem);
          line-height: 0.98;
          font-weight: 800;
          letter-spacing: -0.052em;
        }

        .titleLine {
          display: block;
        }

        .mainTitleLine {
          white-space: nowrap;
        }

        .locationLine {
          margin-top: 0.04em;
          font-size: 0.76em;
          line-height: 1.05;
          white-space: nowrap;
        }

        .outcomeLine {
          margin-top: 0.12em;
          font-size: 0.82em;
          line-height: 1.04;
          white-space: nowrap;
        }

        .alicanteWord {
          display: inline-block;
          margin: 0 0.03em;
          color: #2e7bff;
          font-size: 1.52em;
          font-weight: 700;
          line-height: 0.68;
          letter-spacing: -0.02em;
          vertical-align: -0.05em;
          transform: rotate(-1deg);
          transform-origin: center;
          white-space: nowrap;
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

        .adsVisual {
          position: relative;
          width: 100%;
          max-width: 790px;
          margin-top: 30px;
          padding: 22px 28px 50px 0;
        }

        .adsDashboard {
          display: grid;
          grid-template-columns: 62px minmax(0, 1fr);
          overflow: hidden;
          min-height: 430px;
          border: 1px solid #d9e1ec;
          border-radius: 28px;
          background: #f4f6f8;
          box-shadow: 0 30px 75px rgba(25, 59, 115, 0.14);
        }

        .dashboardSidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 18px 10px;
          border-right: 1px solid #dfe5ed;
          background: #ffffff;
        }

        .adsMark {
          position: relative;
          width: 31px;
          height: 33px;
          margin-bottom: 8px;
        }

        .adsMark span {
          position: absolute;
          display: block;
          border-radius: 999px;
          transform-origin: bottom center;
        }

        .markBlue {
          left: 11px;
          top: 0;
          width: 9px;
          height: 29px;
          background: #4285f4;
          transform: rotate(-27deg);
        }

        .markYellow {
          left: 4px;
          bottom: 3px;
          width: 10px;
          height: 20px;
          background: #fbbc04;
          transform: rotate(29deg);
        }

        .markGreen {
          right: 1px;
          bottom: 1px;
          width: 12px;
          height: 12px;
          background: #34a853;
        }

        .sideItem {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 12px;
          color: #6e7785;
        }

        .sideItemActive {
          background: #e8f0fe;
          color: #1a73e8;
        }

        .dashboardMain {
          min-width: 0;
          padding: 22px;
        }

        .dashboardTopbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .dashboardTopbar span,
        .dashboardTopbar strong {
          display: block;
        }

        .dashboardLabel {
          margin-bottom: 4px;
          color: #707984;
          font-size: 0.74rem;
        }

        .dashboardTopbar strong {
          color: #202124;
          font-size: 1.04rem;
        }

        .datePill {
          padding: 9px 13px;
          border: 1px solid #d8dee8;
          border-radius: 9px;
          background: #ffffff;
          color: #5f6368;
          font-size: 0.74rem;
          font-weight: 650;
        }

        .kpiGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 20px;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(31, 45, 68, 0.08);
        }

        .kpiCard {
          min-width: 0;
          min-height: 116px;
          padding: 17px 15px;
          color: #ffffff;
        }

        .kpiCard span,
        .kpiCard strong,
        .kpiCard small {
          display: block;
        }

        .kpiCard span {
          font-size: 0.73rem;
          font-weight: 650;
          opacity: 0.92;
        }

        .kpiCard strong {
          margin-top: 9px;
          font-size: clamp(1rem, 1.45vw, 1.45rem);
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        .kpiCard small {
          margin-top: 8px;
          font-size: 0.66rem;
          line-height: 1.25;
          opacity: 0.88;
        }

        .kpiBlue {
          background: #1a73e8;
        }

        .kpiRed {
          background: #d93025;
        }

        .kpiYellow {
          background: #f9ab00;
        }

        .kpiGreen {
          background: #188038;
        }

        .dashboardChart {
          margin-top: 16px;
          overflow: hidden;
          border: 1px solid #dfe4eb;
          border-radius: 16px;
          background: #ffffff;
        }

        .dashboardChartHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 16px 18px 9px;
        }

        .dashboardChartHeader strong,
        .dashboardChartHeader span {
          display: block;
        }

        .dashboardChartHeader strong {
          color: #202124;
          font-size: 0.84rem;
        }

        .dashboardChartHeader > div:first-child span {
          margin-top: 3px;
          color: #7a818c;
          font-size: 0.7rem;
        }

        .chartLegend {
          display: flex;
          gap: 12px;
          color: #606771;
          font-size: 0.68rem;
        }

        .chartLegend span {
          position: relative;
          padding-left: 12px;
        }

        .chartLegend span::before {
          position: absolute;
          top: 50%;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          content: "";
          transform: translateY(-50%);
        }

        .legendBlue::before {
          background: #1a73e8;
        }

        .legendRed::before {
          background: #d93025;
        }

        .chartSurface {
          position: relative;
          height: 190px;
          overflow: hidden;
          border-top: 1px solid #edf0f4;
          background: #ffffff;
        }

        .gridLine {
          position: absolute;
          right: 0;
          left: 0;
          height: 1px;
          background: #e5e8ec;
        }

        .lineA {
          top: 25%;
        }

        .lineB {
          top: 52%;
        }

        .lineC {
          top: 78%;
        }

        .googleChart {
          position: absolute;
          inset: 12px 14px 4px;
          width: calc(100% - 28px);
          height: calc(100% - 16px);
        }

        .blueChartLine,
        .redChartLine {
          fill: none;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .blueChartLine {
          stroke: #1a73e8;
        }

        .redChartLine {
          stroke: #d93025;
        }

        .blueDot {
          fill: #1a73e8;
        }

        .redDot {
          fill: #d93025;
        }

        .dashboardFooterCards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 14px;
        }

        .dashboardFooterCards > div {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 14px;
          border: 1px solid #dfe4eb;
          border-radius: 13px;
          background: #ffffff;
          color: #1a73e8;
        }

        .dashboardFooterCards span,
        .dashboardFooterCards strong {
          display: block;
        }

        .dashboardFooterCards span {
          color: #727984;
          font-size: 0.66rem;
          line-height: 1.35;
        }

        .dashboardFooterCards strong {
          color: #2a2d31;
          font-size: 0.74rem;
        }

        .floatingMetric {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 190px;
          padding: 14px 16px;
          border: 1px solid #dfe8f5;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.97);
          color: #1a73e8;
          box-shadow: 0 20px 48px rgba(24, 55, 108, 0.14);
        }

        .floatingMetric span,
        .floatingMetric strong {
          display: block;
        }

        .floatingMetric span {
          color: #6b7280;
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .floatingMetric strong {
          color: #1b2433;
          font-size: 0.9rem;
        }

        .metricOne {
          right: 0;
          bottom: 0;
        }

        .metricTwo {
          left: -16px;
          top: 4px;
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
          min-height: 58px;
          align-items: center;
          justify-content: center;
          gap: 10px;
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
        .strategyCopy h2,
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
          width: 52px;
          height: 52px;
          margin-bottom: 42px;
          place-items: center;
          border-radius: 16px;
          background: #edf4ff;
          color: #2e7bff;
        }

        .strategySection,
        .resultsSection {
          padding: 120px 0;
        }

        .strategyGrid,
        .resultsGrid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 85px;
          align-items: center;
        }

        .strategyCopy > p:not(.sectionEyebrow),
        .resultsCopy > p:not(.sectionEyebrow) {
          margin: 25px 0 0;
          color: #596273;
          font-size: 1.04rem;
          line-height: 1.75;
        }

        .strategyCopy ul {
          display: grid;
          gap: 15px;
          margin: 30px 0 33px;
          padding: 0;
          list-style: none;
        }

        .strategyCopy li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #343c4b;
          font-weight: 600;
        }

        .strategyCopy li :global(svg) {
          color: #2e7bff;
        }

        .strategyCopy > a,
        .ctaBox > a {
          display: inline-flex;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #2e7bff;
          color: #ffffff;
          text-decoration: none;
          font-weight: 750;
          box-shadow: 0 15px 35px rgba(46, 123, 255, 0.25);
        }

        .budgetCard,
        .performanceCard {
          padding: 32px;
          border: 1px solid #dfe8f5;
          border-radius: 28px;
          background: #ffffff;
          box-shadow: 0 30px 75px rgba(25, 59, 115, 0.12);
        }

        .budgetHeader,
        .performanceHeader,
        .performanceFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .budgetHeader,
        .performanceHeader {
          color: #697180;
          font-size: 0.85rem;
        }

        .budgetHeader strong,
        .performanceHeader strong {
          color: #2e7bff;
        }

        .budgetMetric,
        .performanceMetric {
          margin-top: 32px;
        }

        .budgetMetric span,
        .budgetMetric strong,
        .performanceMetric span,
        .performanceMetric strong {
          display: block;
        }

        .budgetMetric span,
        .performanceMetric span {
          color: #687180;
        }

        .budgetMetric strong,
        .performanceMetric strong {
          margin-top: 7px;
          color: #111111;
          font-size: 2.8rem;
          letter-spacing: -0.05em;
        }

        .budgetMetric strong {
          max-width: 440px;
          font-size: clamp(1.8rem, 3.1vw, 2.65rem);
          line-height: 1.05;
        }

        .budgetRows {
          display: grid;
          gap: 19px;
          margin-top: 35px;
        }

        .budgetRows > div {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px 15px;
          align-items: center;
        }

        .budgetRows span {
          color: #4f5867;
          font-size: 0.88rem;
        }

        .budgetRows strong {
          color: #2e7bff;
          font-size: 0.88rem;
        }

        .budgetRows > div > div {
          grid-column: 1 / -1;
          overflow: hidden;
          height: 10px;
          border-radius: 999px;
          background: #edf1f6;
        }

        .budgetRows i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #2e7bff, #75a9ff);
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

        .performanceChart {
          display: flex;
          height: 220px;
          align-items: flex-end;
          gap: 14px;
          margin-top: 25px;
          padding: 20px 15px 0;
          border-bottom: 1px solid #e3e9f2;
        }

        .performanceChart span {
          flex: 1;
          min-width: 18px;
          border-radius: 9px 9px 3px 3px;
          background: linear-gradient(180deg, #5f9cff, #2e7bff);
        }

        .performanceFooter {
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
            padding: 145px 16px 60px;
            gap: 15px;
            box-sizing: border-box;
          }

          .heroLeft {
            padding-top: 20px;
          }

          .heroEyebrow {
            text-align: center;
          }

          .hero h1 {
            width: 100%;
            max-width: 620px;
            margin: 0 auto 20px;
            text-align: center;
            font-size: clamp(2rem, 7.6vw, 2.9rem);
            line-height: 1;
          }

          .mainTitleLine,
          .locationLine,
          .outcomeLine {
            white-space: nowrap;
          }

          .locationLine {
            margin-top: 0.08em;
            font-size: 0.66em;
          }

          .outcomeLine {
            max-width: 570px;
            margin: 0.28em auto 0;
            font-size: 0.76em;
            line-height: 1.08;
          }

          .alicanteWord {
            font-size: 1.46em;
          }

          .heroDescription {
            max-width: 560px;
            margin: 0 auto;
            text-align: center;
            font-size: 0.97rem;
          }

          .heroBenefits {
            justify-content: center;
            max-width: 560px;
            margin-right: auto;
            margin-left: auto;
          }

          .mobileHeroButtons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 340px;
            margin: 24px auto 0;
          }

          .primaryButton,
          .secondaryButton {
            display: flex;
            min-height: 54px;
            align-items: center;
            justify-content: center;
            gap: 8px;
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

          .adsVisual {
            width: 100%;
            max-width: 680px;
            margin: 25px auto 0;
            padding: 20px 20px 55px;
          }

          .adsDashboard {
            grid-template-columns: 54px minmax(0, 1fr);
          }

          .dashboardMain {
            padding: 18px;
          }

          .kpiCard {
            padding: 15px 12px;
          }

          .consultancyCard {
            display: none;
          }

          .introGrid,
          .strategyGrid,
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

          .hero {
            padding-top: 135px;
          }

          .hero h1 {
            max-width: 410px;
            font-size: clamp(1.86rem, 9.4vw, 2.58rem);
          }

          .mainTitleLine {
            font-size: 0.9em;
          }

          .locationLine {
            margin-top: 0.16em;
            font-size: 0.53em;
            letter-spacing: -0.04em;
          }

          .alicanteWord {
            display: inline-block;
            width: auto;
            margin: 0 0.03em;
            font-size: 1.48em;
            line-height: 0.7;
          }

          .outcomeLine {
            max-width: 350px;
            margin-top: 0.42em;
            font-size: 0.72em;
            line-height: 1.12;
          }

          .heroBenefits {
            display: grid;
            justify-content: center;
          }

          .adsVisual {
            padding-right: 0;
            padding-left: 0;
          }

          .adsDashboard {
            grid-template-columns: 1fr;
            min-height: 0;
            border-radius: 22px;
          }

          .dashboardSidebar {
            display: none;
          }

          .dashboardMain {
            padding: 14px;
          }

          .dashboardTopbar {
            align-items: flex-start;
          }

          .datePill {
            padding: 7px 9px;
            font-size: 0.65rem;
          }

          .kpiGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .kpiCard {
            min-height: 105px;
          }

          .dashboardChartHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .chartSurface {
            height: 150px;
          }

          .dashboardFooterCards {
            grid-template-columns: 1fr;
          }

          .floatingMetric {
            position: static;
            width: 100%;
            margin-top: 12px;
          }

          .introSection,
          .problemSection,
          .servicesSection,
          .strategySection,
          .processSection,
          .resultsSection,
          .faqSection {
            padding: 78px 0;
          }

          .introGrid h2,
          .sectionHeading h2,
          .strategyCopy h2,
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