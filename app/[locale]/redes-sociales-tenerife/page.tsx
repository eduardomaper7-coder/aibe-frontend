"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import RedesSocialesHeroAnimation from "@/components/ui/RedesSocialesHeroAnimation";
import AibeSection from "@/components/ui/AibeSection";
import GoogleSection from "@/components/ui/GoogleSection";
import RedesSocialesSection from "@/components/ui/redesSociales-seccion";
import AiAgentsSection from "@/components/ui/AiAgentsSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";

const rotatingWords = ["clientes", "visibilidad", "ventas"];

export default function RedesSocialesTenerifePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToContact = () => {
    const target =
      window.innerWidth <= 980
        ? document.getElementById("contact-formulario")
        : document.getElementById("contacto");

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="topBar">
        Redes Sociales en Tenerife
        <span>|</span>
        ¿Empezamos?
      </div>

      <header className="heroHeader">
        <nav className="navSide navLeft desktopNav">
          {mobileMenuOpen && (
  <div className="mobileMenu">
    <a
      href="/es/#aibe"
      onClick={() => setMobileMenuOpen(false)}
    >
      ¿Por qué AIBE?
    </a>

    <a
      href="/es/#google"
      onClick={() => setMobileMenuOpen(false)}
    >
      Google
    </a>

    <a
      href="/es/redes-sociales-tenerife"
      onClick={() => setMobileMenuOpen(false)}
    >
      Redes Sociales Tenerife
    </a>

    <a
      href="/es/#ia"
      onClick={() => setMobileMenuOpen(false)}
    >
      Buscadores con IA
    </a>

    <button
      type="button"
      className="mobileMenuContact"
      onClick={() => {
        scrollToContact();
        setMobileMenuOpen(false);
      }}
    >
      Contacto
    </button>
  </div>
)}
          <a href="/es/#aibe">¿Por qué AIBE?</a>

          <button
            type="button"
            onClick={scrollToContact}
            className="navButton"
          >
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

<div className="mobileHeaderActions">
  <a
    href="https://wa.me/34686012685"
    target="_blank"
    rel="noopener noreferrer"
    className="mobileWhatsappHeader"
    aria-label="Abrir WhatsApp"
  >
    <Image
      src="/imagenes/whatsapp.png"
      alt="WhatsApp"
      width={24}
      height={24}
    />
  </a>

  <button
    type="button"
    className="mobileMenuButton"
    onClick={() => setMobileMenuOpen((open) => !open)}
    aria-label="Abrir menú"
    aria-expanded={mobileMenuOpen}
  >
    ☰
  </button>
</div>

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
              <span className="rotatingWord">
                {rotatingWords[wordIndex]}
              </span>
            </h1>

            <div className="animationWrap">
              <RedesSocialesHeroAnimation />
            </div>

            <button
              type="button"
              onClick={scrollToContact}
              className="heroInfoButton"
            >
              Solicitar información ahora
            </button>
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

          <div className="contactButtons">
            <a
              href="https://wa.me/34686012685"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsappButton"
            >
              <Image
                src="/imagenes/whatsapp.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="whatsappIcon"
              />

              <span>Escribir por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={scrollToContact}
              className="callButton"
            >
              Solicitar información ahora
            </button>
          </div>

          <p className="microcopy">
            Sin compromiso · Respuesta en menos de 24h
          </p>
        </aside>
      </main>

      <AibeSection />
      <GoogleSection />
      <RedesSocialesSection />
      <AiAgentsSection />
      <ContactSection />
      <Footer />

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        * {
          box-sizing: border-box;
        }

        /*
         * BARRA SUPERIOR
         * Ocupa todo el ancho y tiene 54 px de alto.
         */
        .topBar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1001;

          width: 100%;
          height: 36px;

          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          padding: 0 24px;

          background: #2e7bff;
          color: #ffffff;

          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .topBar span {
          opacity: 0.7;
        }

        /*
         * MENÚ PRINCIPAL
         * También ocupa todo el ancho y tiene 54 px de alto.
         */
        .heroHeader {
  position: fixed;
  top: 36px;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 66px;

          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;

          padding: 0 6vw;

          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
        }

        .logoLink {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .headerLogo {
          width: 125px;
          height: auto;
          display: block;
        }

        .navSide {
          display: flex;
          align-items: center;
        }

        .navLeft {
          justify-content: flex-end;
          gap: 28px;
          padding-right: 42px;
        }

        .navRight {
          justify-content: flex-start;
          gap: 28px;
          padding-left: 42px;
        }

        .navSide a,
        .navButton,
        .servicesDropdown span {
          color: #2e7bff;
          text-decoration: none;

          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .navSide a {
          transition: color 0.2s ease;
        }

        .navSide a:hover,
        .servicesDropdown span:hover {
          color: #001a5c;
        }

        .navButton {
          width: auto;
          padding: 0;

          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;

          cursor: pointer;
        }

        .navButton:hover {
          color: #001a5c;
          background: transparent;
          transform: none;
        }

        .servicesDropdown {
          position: relative;
        }

        .servicesDropdown > span {
          cursor: pointer;
        }

        .dropdownMenu {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);

          min-width: 230px;
          padding: 10px;

          background: #ffffff;
          border-radius: 14px;
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
          color: #111111;
          border-radius: 10px;
        }

        .dropdownMenu a:hover {
          color: #111111;
          background: #f4f7ff;
        }

        /*
         * HERO
         * Tiene más espacio respecto al menú.
         */
        .hero {
          position: relative;
          overflow: hidden;

          min-height: 100vh;
          display: grid;
          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(320px, 0.8fr);
          gap: 60px;
          align-items: center;

          padding: 215px 7vw 70px;

          background: #ffffff;
          color: #050505;
          font-family: "Montserrat", sans-serif;
        }

        .heroBackground {
          position: absolute;
          inset: 0;
          z-index: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.12),
              rgba(255, 255, 255, 0.12)
            ),
            url("/imagenes/tenerife-1.jpg");

          background-size: cover;
          background-position: center;
          filter: blur(1px);
        }

        .heroLeft,
        .consultancyCard {
          position: relative;
          z-index: 2;
        }

        .heroLeft {
          min-height: 500px;
          display: flex;
          align-items: flex-start;
        }

        .heroContent {
          max-width: 680px;
          padding: 16px 30px 30px;
        }

        /*
         * Título más pequeño en ordenador.
         */
        h1 {
          max-width: 680px;
          margin: 0;

          color: #050505;
          text-shadow: 0 2px 12px rgba(255, 255, 255, 0.45);

          font-size: clamp(2.7rem, 4.2vw, 4.65rem);
          line-height: 1;
          letter-spacing: -0.065em;
          font-weight: 800;
        }

        .rotatingWord {
          display: inline-block;
          color: #2e7bff;
        }

        .animationWrap {
          max-width: 450px;
          min-height: 290px;
          margin-top: 44px;

          overflow: visible;

          transform: scale(0.82);
          transform-origin: left top;
        }

       .heroInfoButton {
  display: none;

  width: auto;
  margin-top: 12px;
  padding: 15px 30px;

  background: #2e7bff;
  color: #ffffff;

  font-size: 0.96rem;
  font-weight: 800;

  border: none;
  border-radius: 999px;

  cursor: pointer;
  box-shadow: 0 16px 34px rgba(46, 123, 255, 0.35);
  transition: 0.25s ease;
}

        .heroInfoButton:hover {
          background: #1769f5;
          transform: translateY(-3px);
        }

        /*
         * Tarjeta más arriba y más pequeña.
         */
        .consultancyCard {
          align-self: start;

          width: 100%;
          max-width: 380px;
          margin-top: -62px;
          margin-left: auto;

          padding: 25px;

          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #e9e9e9;
          border-radius: 26px;

          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .cardLabel {
          display: inline-flex;

          margin-bottom: 13px;
          padding: 8px 12px;

          background: rgba(255, 255, 255, 0.94);
          color: #2e7bff;

          border-radius: 999px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);

          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .consultancyCard h2 {
          margin: 0;

          color: #050505;

          font-size: clamp(1.5rem, 2vw, 2rem);
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 800;
        }

        .duration {
          display: inline-flex;

          margin: 16px 0 18px;
          padding: 8px 14px;

          background: #f1f5ff;
          color: #2e7bff;
          border-radius: 999px;

          font-size: 0.9rem;
          font-weight: 800;
        }

        ul {
          display: grid;
          gap: 10px;

          margin: 0 0 21px;
          padding: 0;

          list-style: none;
        }

        li {
          color: #333333;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.4;
        }

        li::before {
          content: "✓";
          margin-right: 9px;

          color: #2e7bff;
          font-weight: 800;
        }

        .contactButtons {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .whatsappButton,
        .callButton {
          width: 100%;
          min-height: 49px;

          display: flex;
          justify-content: center;
          align-items: center;
          gap: 9px;

          padding: 14px 20px;

          color: #ffffff;
          text-decoration: none;

          border: 0;
          border-radius: 999px;

          font-family: inherit;
          font-size: 0.91rem;
          font-weight: 800;

          cursor: pointer;
          transition: 0.25s ease;
        }

        .whatsappButton {
          background: #25d366;
        }

        .whatsappButton:hover {
          background: #1ebe5d;
          transform: translateY(-2px);
        }

        .callButton {
          background: #2e7bff;
          box-shadow: none;
        }

        .callButton:hover {
          background: #1769f5;
          transform: translateY(-2px);
        }

        .whatsappIcon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .microcopy {
          margin: 13px 0 0;

          color: #747474;

          font-size: 0.8rem;
          line-height: 1.4;
          text-align: center;
        }
.mobileHeaderActions,
.mobileMenu {
  display: none;
}
        /*
         * MÓVIL
         */
        @media (max-width: 980px) {
          .topBar {
  height: 25px;
  padding: 0 10px;
  font-size: 0.68rem;
  gap: 7px;
}

.desktopNav {
  display: none;
}

/* Menú blanco móvil */
.heroHeader {
  top: 25px;
  left: 0;
  transform: none;

  width: 100%;
  height: 64px;
  min-height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 16px;

  background: #ffffff;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 0;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.logoLink {
  justify-content: flex-start;
}

.headerLogo {
  width: 108px;
  height: auto;
}

.mobileHeaderActions {
  display: flex;
  align-items: center;
  gap: 9px;
}

.mobileWhatsappHeader {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #25d366;
  border-radius: 999px;
  text-decoration: none;
}

.mobileWhatsappHeader img {
  width: 23px;
  height: 23px;
}

.mobileMenuButton {
  width: 42px;
  height: 42px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #2e7bff;
  color: #ffffff;

  border: none;
  border-radius: 999px;
  box-shadow: none;

  font-size: 1.3rem;
}

.mobileMenu {
  position: absolute;
  top: calc(100% + 8px);
  left: 12px;
  right: 12px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 20px;

  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);

  z-index: 1002;
}

.mobileMenu a,
.mobileMenuContact {
  color: #2e7bff;
  text-decoration: none;
  text-align: center;

  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
}

.mobileMenuContact {
  width: 100%;
  padding: 10px;

  background: transparent;
  border: 0;
  box-shadow: none;
}

/* El hero empieza después de las dos barras:
   25px azul + 64px blanca */
.hero {
  min-height: 100vh;
  grid-template-columns: 1fr;
  gap: 12px;

  padding: 200px 16px 44px;
}

.heroLeft {
  min-height: auto;
  align-items: flex-start;
}

.heroContent {
  width: 100%;
  max-width: none;
  padding: 70px 10px 24px;
  text-align: center;
}

/* Título más pequeño y sin quedar detrás del menú */
h1 {
  max-width: 100%;
  margin: 0 auto;

  text-align: center;

  font-size: clamp(2rem, 9.2vw, 2.75rem);
  line-height: 0.98;
  letter-spacing: -0.06em;

  overflow-wrap: normal;
}

/* Animación más pequeña */
.animationWrap {
  width: 100%;
  max-width: 360px;
  min-height: 260px;

  margin: 28px auto 0;

  transform: scale(0.78);
  transform-origin: top center;
}

/* El botón sigue apareciendo solo en móvil */
.heroInfoButton {
  display: block;
  width: 100%;
  margin-top: -20px;
}

          .consultancyCard {
            display: none;
          }
        }
      `}</style>
    </>
  );
}