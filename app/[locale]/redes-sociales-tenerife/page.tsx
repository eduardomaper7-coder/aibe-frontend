"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      document.getElementById("contact-formulario") ??
      document.getElementById("contacto");

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
      <header className="heroHeader scrolled">
        <nav className="navSide navLeft desktopNav">
          <button
            type="button"
            onClick={scrollToContact}
            className="navButton"
          >
            Contacto
          </button>

          <div className="servicesDropdown">
            <span>Servicios</span>

            <div className="dropdownMenu">
              <Link href="/es/redes-sociales-tenerife">
                Redes Sociales Tenerife
              </Link>
            </div>
          </div>
        </nav>

        <Link href="/es" className="logoLink" aria-label="Ir al inicio">
          <Image
            src="/imagenes/logo.png"
            alt="AIBE Technologies"
            width={170}
            height={48}
            priority
            className="headerLogo"
          />
        </Link>

        <div className="mobileHeaderActions">
          <a
            href="https://wa.me/34686012685"
            target="_blank"
            rel="noopener noreferrer"
            className="mobileWhatsappHeader"
            aria-label="WhatsApp"
          >
            <Image
              src="/imagenes/whatsapp.png"
              alt="WhatsApp"
              width={26}
              height={26}
            />
          </a>

          <button
            type="button"
            className="mobileMenuButton"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        <nav className="navSide navRight desktopNav">
          <Link href="/es/#google">Google</Link>
          <Link href="/es/#ia">Buscadores con IA</Link>
        </nav>

        {mobileMenuOpen && (
          <div className="mobileMenu" id="mobile-navigation">
            <button
              type="button"
              onClick={() => {
                scrollToContact();
                setMobileMenuOpen(false);
              }}
              className="navButton"
            >
              Contacto
            </button>

            <div className="mobileServices">
              <span>Servicios</span>
              <Link
                href="/es/redes-sociales-tenerife"
                onClick={() => setMobileMenuOpen(false)}
              >
                Redes Sociales Tenerife
              </Link>
            </div>

            <Link href="/es/#google" onClick={() => setMobileMenuOpen(false)}>
              Google
            </Link>
            <Link href="/es/#ia" onClick={() => setMobileMenuOpen(false)}>
              Buscadores con IA
            </Link>
          </div>
        )}
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

        .heroHeader {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: min(92%, 1200px);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          background: transparent;
          transition: background 0.3s ease, backdrop-filter 0.3s ease,
            box-shadow 0.3s ease, padding 0.3s ease, border 0.3s ease;
        }

        .heroHeader.scrolled {
          background: #ffffff !important;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 999px;
          padding: 14px 28px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
        }

        .logoLink {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .headerLogo {
          width: 190px;
          height: auto;
          display: block;
        }

        .navSide {
          display: flex;
          align-items: center;
        }

        .navLeft {
          justify-content: flex-end;
          gap: 42px;
          padding-right: 70px;
        }

        .navRight {
          justify-content: flex-start;
          gap: 42px;
          padding-left: 70px;
        }

        .navSide a,
        .navButton {
          color: #2e7bff;
          text-decoration: none;
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .navButton {
          width: auto;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          box-shadow: none;
          border-radius: 0;
          appearance: none;
          -webkit-appearance: none;
        }

        .navSide a:hover,
        .navButton:hover {
          color: #001a5c;
          transform: translateY(-1px);
          background: transparent;
        }

        .servicesDropdown {
          position: relative;
        }

        .servicesDropdown span {
          color: #2e7bff;
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
          cursor: pointer;
        }

        .dropdownMenu {
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 240px;
          background: #ffffff;
          border-radius: 16px;
          padding: 12px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
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
          padding: 10px 12px;
          border-radius: 10px;
          color: #111111;
          text-decoration: none;
        }

        .dropdownMenu a:hover {
          color: #111111;
          background: #f5f7fb;
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
          width: 88%;
          align-self: center;
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
.mobileMenuButton,
.mobileMenu,
.mobileHeaderActions,
.mobileWhatsappHeader {
  display: none;
}

        @media (max-width: 1000px) {
          .heroHeader {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 18px;
          }

          .heroHeader.scrolled {
            border-radius: 28px;
            padding: 16px 22px;
          }

          .navSide {
            justify-content: center;
            flex-wrap: wrap;
            gap: 18px 26px;
          }

          .navSide a,
          .navButton {
            font-size: 0.9rem;
          }

          .headerLogo {
            width: 160px;
          }
        }

        @media (max-width: 980px) {
          .desktopNav {
            display: none;
          }

          .heroHeader {
            top: 8px;
            width: calc(100% - 28px);
            padding: 10px 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            border-radius: 16px;
            box-shadow: none;
          }

          .heroHeader.scrolled {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 16px;
            padding: 10px 14px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          }

          .logoLink {
            display: flex;
            align-items: center;
            text-decoration: none;
          }

          .headerLogo {
            width: 110px;
            display: block;
          }

          .mobileHeaderActions {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .mobileWhatsappHeader {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: #25d366;
            border-radius: 999px;
          }

          .mobileWhatsappHeader img {
            width: 24px;
            height: 24px;
          }

          .mobileMenuButton {
            display: flex;
            width: 44px;
            height: 44px;
            align-items: center;
            justify-content: center;
            padding: 0;
            border-radius: 999px;
            background: #2e7bff;
            color: #ffffff;
            font-size: 1.4rem;
            box-shadow: none;
          }

          .mobileMenu {
            display: flex;
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            flex-direction: column;
            gap: 16px;
            padding: 22px;
            background: #ffffff;
            border-radius: 18px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
            z-index: 1001;
          }

          .mobileMenu a,
          .mobileMenu .navButton,
          .mobileServices > span {
            color: #2e7bff;
            text-decoration: none;
            text-align: center;
            font-weight: 700;
          }

          .mobileServices {
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .mobileServices a {
            font-size: 0.9rem;
            font-weight: 600;
          }

/* El hero empieza después del menú y mantiene la foto visible. */
.hero {
  min-height: 100vh;
  grid-template-columns: 1fr;
  gap: 12px;

  padding: 150px 16px 44px;
}

.heroBackground {
  background-position: center 28%;
}

.heroLeft {
  min-height: auto;
  align-items: flex-start;
}

.heroContent {
  width: 100%;
  max-width: none;
  padding: 42px 10px 24px;
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
  width: min(100%, 300px);
  margin: -20px auto 0;
}

          .consultancyCard {
            display: none;
          }
        }
      `}</style>
    </>
  );
}