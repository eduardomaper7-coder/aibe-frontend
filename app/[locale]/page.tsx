"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PopupModal } from "react-calendly";
import AibeSection from "../../components/ui/AibeSection";
import GoogleSection from "../../components/ui/GoogleSection";
import SearchRiseAnimation from "../../components/ui/SearchRiseAnimation";
import SocialBoostAnimation from "../../components/ui/SocialBoostAnimation";
import AiRecommendationAnimation from "../../components/ui/AiRecommendationAnimation";
import AiAgentsSection from "../../components/ui/AiAgentsSection";
import Footer from "../../components/ui/Footer";

const words = ["clientes", "ventas", "reservas", "visibilidad"];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const scrollToContact = () => {
    document
      .getElementById("contacto")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 250);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = [5000, 7000, 14000];

    const timeout = setTimeout(() => {
      setActiveAnimation((prev) => (prev + 1) % 3);
    }, timers[activeAnimation]);

    return () => clearTimeout(timeout);
  }, [activeAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`heroHeader ${scrolled ? "scrolled" : ""}`}>
        <nav className="navSide navLeft">
          <a href="#aibe">¿Por qué AIBE?</a>

          <button type="button" onClick={scrollToContact} className="navButton">
            Contacto
          </button>
        </nav>

        <Image
          src="/imagenes/logo.png"
          alt="AIBE"
          width={170}
          height={48}
          priority
          className="headerLogo"
        />

        <nav className="navSide navRight">
          <a href="#google">Google</a>
          <a href="#ia">Buscadores con IA</a>
        </nav>
      </header>

      <main className="hero">
        <section className="heroLeft">
          <h1>
            Consigue más{" "}
            <span className={`rotatingWord ${fade ? "show" : "hide"}`}>
              {words[index]}
            </span>{" "}
            para tu negocio
          </h1>

          <div className="heroAnimations">
            {activeAnimation === 0 && <SearchRiseAnimation key="google" />}
            {activeAnimation === 1 && <SocialBoostAnimation key="social" />}
            {activeAnimation === 2 && <AiRecommendationAnimation key="ia" />}
          </div>
        </section>

        <aside className="card">
  <h2>Consultoría gratuita para impulsar tu negocio</h2>

  <p className="duration">30 minutos</p>

  <ul>
    <li>✓ Analizamos tu situación actual</li>
    <li>✓ Detectamos oportunidades de crecimiento</li>
    <li>✓ Presencial u online</li>
  </ul>

  <button
    type="button"
    onClick={() => setIsCalendlyOpen(true)}
  >
    Reservar Consulta
  </button>

  <p className="microcopy">
    Sin compromiso · Respuesta en menos de 24h
  </p>
</aside>
      </main>

      <AibeSection />
      <GoogleSection />
      <AiAgentsSection />
      <Footer />

      <PopupModal
        url="https://calendly.com/aibe-technologies7/30min"
        open={isCalendlyOpen}
        onModalClose={() => setIsCalendlyOpen(false)}
        rootElement={typeof window !== "undefined" ? document.body : null}
      />

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        .heroAnimations {
          width: 100%;
          aspect-ratio: 16 / 9;
          position: relative;
        }

        .hero {
          min-height: 100vh;
          padding: 125px 6% 70px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
        }

        .heroLeft h1 {
          font-size: clamp(2.3rem, 5vw, 4.8rem);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #111111;
          margin-bottom: 34px;
        }

        .rotatingWord {
          color: #2e7bff;
          display: inline-block;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .rotatingWord.show {
          opacity: 1;
          transform: translateY(0);
        }

        .rotatingWord.hide {
          opacity: 0;
          transform: translateY(8px);
        }

        .card {
          background: #ffffff;
          border: 1px solid #e8ecf3;
          border-radius: 32px;
          padding: 44px;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.09);
          max-width: 470px;
          margin-left: auto;
        }

        .card h2 {
          font-size: clamp(1.8rem, 3vw, 2.7rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111111;
          margin-bottom: 18px;
        }

        .duration {
          color: #2e7bff;
          font-weight: 700;
          margin-bottom: 28px;
        }

        ul {
          list-style: none;
          display: grid;
          gap: 16px;
          margin: 0 0 34px;
          padding: 0;
        }

        li {
          color: #444b5a;
          font-weight: 500;
          line-height: 1.5;
        }

        button {
          width: 100%;
          border: none;
          cursor: pointer;
          background: #2e7bff;
          color: white;
          font: inherit;
          font-weight: 700;
          padding: 18px 28px;
          border-radius: 999px;
          box-shadow: 0 16px 34px rgba(46, 123, 255, 0.35);
          transition: 0.25s ease;
        }

        button:hover {
          transform: translateY(-3px);
          background: #1769f5;
        }

        .microcopy {
          margin-top: 18px;
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
          font-weight: 500;
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
          transition: background 0.3s ease, backdrop-filter 0.3s ease,
            box-shadow 0.3s ease, padding 0.3s ease, border 0.3s ease;
        }

        .heroHeader.scrolled {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 999px;
          padding: 14px 28px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
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
          .hero {
            grid-template-columns: 1fr;
          }

          .card {
            max-width: 100%;
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}