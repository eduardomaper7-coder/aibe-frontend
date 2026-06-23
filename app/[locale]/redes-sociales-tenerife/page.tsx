"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import RedesSocialesHeroAnimation from "@/components/ui/RedesSocialesHeroAnimation";
import AibeSection from "@/components/ui/AibeSection";
import GoogleSection from "@/components/ui/GoogleSection";
import RedesSocialesSection from "@/components/ui/redesSociales-seccion";
import AiAgentsSection from "@/components/ui/AiAgentsSection";
import Footer from "@/components/ui/Footer";

const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
);

const rotatingWords = ["clientes", "visibilidad", "ventas"];

export default function RedesSocialesTenerifePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  return (
    <>
      <header className="heroHeader">
        <nav className="navSide navLeft desktopNav">
          <a href="/es/#aibe">¿Por qué AIBE?</a>

          <button type="button" onClick={scrollToContact} className="navButton">
            Contacto
          </button>
        </nav>

        <a href="/es" className="logoLink">
          <Image
            src="/imagenes/logo.png"
            alt="AIBE"
            width={130}
            height={38}
            priority
            className="headerLogo"
          />
        </a>

        <nav className="navSide navRight desktopNav">
          <a href="/es/#google">Google</a>

          <div className="servicesDropdown">
            <span>Servicios</span>

            <div className="dropdownMenu">
              <a href="/es/redes-sociales-tenerife">
                Redes Sociales Tenerife
              </a>
            </div>
          </div>

          <a href="/es/#ia">Buscadores con IA</a>
        </nav>
      </header>

      <main className="hero">
        <div className="heroBackground" />

        <section className="heroLeft">
          <div className="heroContent">
            <h1>
              Haz crecer tu negocio y consigue más{" "}
              <span className="rotatingWord">{rotatingWords[wordIndex]}</span>
            </h1>

            <div className="animationWrap">
              <RedesSocialesHeroAnimation />
            </div>
          </div>
        </section>

        <aside className="consultancyCard">
          <span className="cardLabel">Consultoría gratuita</span>

          <h2>Consigue más clientes con tus redes</h2>

          <p className="duration">30 minutos</p>

          <ul>
            <li>Analizamos tu situación actual</li>
            <li>Detectamos oportunidades de crecimiento</li>
            <li>Presencial u online</li>
          </ul>

          <button type="button" onClick={() => setIsCalendlyOpen(true)}>
            Agendar llamada
          </button>

          <p className="microcopy">Sin compromiso · Respuesta en menos de 24h</p>
        </aside>

        <div className="mobileConsultancy">
          <button type="button" onClick={() => setIsCalendlyOpen(true)}>
            Reservar consultoría gratuita
          </button>

          <p>30 minutos · Presencial u online · Sin compromiso</p>
        </div>
      </main>

      <AibeSection />
      <GoogleSection />
      <RedesSocialesSection />
      <AiAgentsSection />
      <Footer />

      {rootElement && (
        <PopupModal
          url="https://calendly.com/aibe-technologies7/30min"
          open={isCalendlyOpen}
          onModalClose={() => setIsCalendlyOpen(false)}
          rootElement={rootElement}
        />
      )}

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        .heroHeader {
          position: fixed;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: min(82%, 960px);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          padding: 8px 18px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }

        .logoLink {
          display: flex;
          justify-content: center;
        }

        .headerLogo {
          width: 135px;
          height: auto;
          display: block;
        }

        .navSide {
          display: flex;
          align-items: center;
        }

        .navLeft {
          justify-content: flex-end;
          gap: 20px;
          padding-right: 32px;
        }

        .navRight {
          justify-content: flex-start;
          gap: 20px;
          padding-left: 32px;
        }

        .navSide a,
        .navButton,
        .servicesDropdown span {
          color: #2e7bff;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .navButton {
          width: auto;
          background: transparent;
          border: 0;
          padding: 0;
          box-shadow: none;
          cursor: pointer;
        }

        .servicesDropdown {
          position: relative;
        }

        .dropdownMenu {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 230px;
          background: #ffffff;
          border-radius: 14px;
          padding: 10px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
          opacity: 0;
          visibility: hidden;
          transition: 0.25s ease;
        }

        .servicesDropdown:hover .dropdownMenu {
          opacity: 1;
          visibility: visible;
        }

        .dropdownMenu a {
          display: block;
          padding: 10px;
          color: #111;
          border-radius: 10px;
        }

        .dropdownMenu a:hover {
          background: #f4f7ff;
        }

        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
          gap: 40px;
          align-items: center;
          padding: 185px 7vw 70px;
          position: relative;
          overflow: hidden;
          background: #ffffff;
          color: #050505;
          font-family: "Montserrat", sans-serif;
        }

        .heroBackground {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.12),
              rgba(255, 255, 255, 0.12)
            ),
            url("/imagenes/tenerife-1.jpg");
          background-size: cover;
          background-position: center;
          filter: blur(1px);
          opacity: 1;
          z-index: 0;
        }

        .heroLeft,
        .consultancyCard,
        .mobileConsultancy {
          position: relative;
          z-index: 2;
        }

        .heroLeft {
          min-height: 560px;
          display: flex;
          align-items: center;
          background: transparent;
          border: none;
        }

        .heroContent {
          max-width: 760px;
          padding: 0 52px 46px;
        }

        h1 {
          margin: 0;
          max-width: 760px;
          color: #050505;
          text-shadow: 0 2px 12px rgba(255, 255, 255, 0.45);
          font-size: clamp(2.9rem, 5vw, 5.45rem);
          line-height: 0.96;
          letter-spacing: -0.075em;
          font-weight: 800;
        }

        .rotatingWord {
          display: inline-block;
          color: #2e7bff;
        }

        .animationWrap {
  max-width: 500px;
  min-height: 330px;
  overflow: visible;
  transform: scale(0.88);
  transform-origin: left top;
  margin-top: 54px;
}

        .cardLabel {
          display: inline-flex;
          margin-bottom: 16px;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.94);
          color: #2e7bff;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .consultancyCard {
  align-self: start;
  margin-top: -30px;

  border: 1px solid #e9e9e9;
  border-radius: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  max-width: 420px;
  backdrop-filter: blur(10px);
}

        .consultancyCard h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(1.65rem, 2.3vw, 2.25rem);
          line-height: 1.08;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .duration {
          display: inline-flex;
          margin: 20px 0 22px;
          padding: 10px 16px;
          border-radius: 999px;
          background: #f1f5ff;
          color: #2e7bff;
          font-weight: 800;
        }

        ul {
          display: grid;
          gap: 13px;
          padding: 0;
          margin: 0 0 26px;
          list-style: none;
        }

        li {
          color: #333;
          font-weight: 600;
          line-height: 1.4;
        }

        li::before {
          content: "✓";
          margin-right: 10px;
          color: #2e7bff;
          font-weight: 800;
        }

        button {
          width: 100%;
          border: 0;
          border-radius: 999px;
          padding: 17px 24px;
          background: #050505;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }

        button:hover {
          transform: translateY(-2px);
          background: #2e7bff;
        }

        .microcopy {
          margin: 15px 0 0;
          color: #747474;
          font-size: 0.88rem;
          text-align: center;
        }

        .mobileConsultancy {
          display: none;
        }

        @media (max-width: 980px) {
          .desktopNav {
            display: none;
          }

          .heroHeader {
            top: 8px;
            width: calc(100% - 28px);
            padding: 8px 16px;
            display: flex;
            justify-content: center;
            border-radius: 16px;
          }

          .headerLogo {
            width: 110px;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 115px 20px 56px;
            gap: 24px;
          }

          .heroLeft {
            min-height: auto;
          }

          .heroContent {
            padding: 0 24px 38px;
          }

          h1 {
            font-size: clamp(2.55rem, 12vw, 3.8rem);
          }

          .animationWrap {
            max-width: 100%;
            transform: scale(0.92);
            transform-origin: left top;
            margin-top: 42px;
          }

          .consultancyCard {
            display: none;
          }

          .mobileConsultancy {
            display: block;
          }
        }
      `}</style>
    </>
  );
}