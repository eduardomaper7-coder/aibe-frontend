"use client";




import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceNavigation } from "@/lib/service-landings";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";




const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
);




import AibeSection from "../../components/ui/AibeSection";
import GoogleSection from "../../components/ui/GoogleSection";
import SearchRiseAnimation from "../../components/ui/SearchRiseAnimation";
import SocialBoostAnimation from "../../components/ui/SocialBoostAnimation";
import AiRecommendationAnimation from "../../components/ui/AiRecommendationAnimation";
import AiAgentsSection from "../../components/ui/AiAgentsSection";
import Footer from "../../components/ui/Footer";
import RedesSocialesSection from "../../components/ui/redesSociales-seccion";
import ContactSection from "../../components/ui/ContactSection";
const words = ["clientes", "ventas", "reservas", "visibilidad"];




export default function Page() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  const scrollToContact = () => {
    const target =
      document.getElementById("contact-formulario") ??
      document.getElementById("contacto");

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  setRootElement(document.body);
}, []);




   




  useEffect(() => {
    const timers = [5000, 7000, 14000];




    const timeout = setTimeout(() => {
      setActiveAnimation((prev) => (prev + 1) % 3);
    }, timers[activeAnimation]);




    return () => clearTimeout(timeout);
  }, [activeAnimation]);




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
      <button type="button" className="servicesTrigger" aria-haspopup="true">
        Servicios
        <ChevronDown size={16} strokeWidth={2.3} aria-hidden="true" />
      </button>

      <div className="dropdownMenu">
        <span className="dropdownEyebrow">Soluciones AIBE</span>
        <div className="dropdownLinks">
          {serviceNavigation.map((item) => (
            <Link key={item.slug} href={`/es/${item.slug}`}>
              <span>{item.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
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
    <a href="#google">Google</a>
    <a href="#ia">Buscadores con IA</a>
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
        {serviceNavigation.map((item) => (
          <Link
            key={item.slug}
            href={`/es/${item.slug}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <a href="#google" onClick={() => setMobileMenuOpen(false)}>Google</a>
      <a href="#ia" onClick={() => setMobileMenuOpen(false)}>Buscadores con IA</a>
    </div>
  )}
</header>




      <main className="hero">
        <section className="heroLeft">
          <h1>
  <span className="mobileTitleLine">Consigue más</span>




  <span className="mobileTitleLine">
    <span className={`rotatingWord ${fade ? "show" : "hide"}`}>
      {words[index]}
    </span>{" "}
    para tu
  </span>




  <span className="mobileTitleLine"> negocio</span>
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
  width={26}
  height={26}
  className="whatsappIcon"
/>
Escribir por WhatsApp
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
    Sin compromiso · Respuesta inmediata
  </p>
</aside>




<div className="mobileConsultancy">
 <div className="mobileButtons">
  <button
    type="button"
    onClick={scrollToContact}
    className="consultancyButton"
  >
    Solicitar información
  </button>
</div>




  <p className="consultancyInfo">
    30 minutos · Presencial u online · Sin compromiso ·
    Respuesta en menos de 24h
  </p>
</div>
      </main>




      <AibeSection />
      <GoogleSection />
      <RedesSocialesSection />
      <AiAgentsSection />
      <ContactSection />
      <Footer />




      {rootElement && (
  <PopupModal
    url="https://calendly.com/aibe-technologies7/30min"
    open={isCalendlyOpen}
    onModalClose={() => setIsCalendlyOpen(false)}
    rootElement={rootElement}
  />
)}

<a
  href="https://wa.me/34686012685"
  target="_blank"
  rel="noopener noreferrer"
  className="floatingWhatsapp"
  aria-label="WhatsApp"
>
  <Image
  src="/imagenes/whatsapp.png"
  alt="WhatsApp"
  width={75}
  height={75}
/>
</a>


      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }




        .heroAnimations {
          width: 100%;
          aspect-ratio: 16 / 9;
          position: relative;
        }



.contactButtons{
  display:flex;
  flex-direction:column;
  gap:14px;
}
.whatsappButton {
  gap: 10px;
}

.whatsappIcon {
  width: 26px;
  height: 26px;
}

@media (max-width: 980px) {
  .mobileConsultancy .contactButtons {
    width: 100%;
    align-items: center;
  }

  .mobileConsultancy .consultancyButton {
    width: min(100%, 300px);
    max-width: 300px;
    text-align: center;
    justify-content: center;
    text-decoration: none;
  }
}
.whatsappButton,
.callButton{
  display:flex;
  justify-content:center;
  align-items:center;
  text-decoration:none;
  padding:18px;
  border-radius:999px;
  font-weight:700;
  color:#fff;
  transition:.25s;
}

.whatsappButton{
  background:#25D366;
}

.whatsappButton:hover{
  background:#1ebe5d;
}

.callButton{
  background:#2e7bff;
}

.callButton:hover{
  background:#1769f5;
}

.floatingWhatsapp{
  position:fixed;
  right:24px;
  bottom:24px;
  z-index:9999;

  display:flex;
  align-items:center;
  justify-content:center;

  width:75px;
  height:75px;

  background:transparent;
  border:none;
  border-radius:0;
  box-shadow:none;
  padding:0;
}

.floatingWhatsapp img{
  display:block;
}

.floatingWhatsapp:hover{
  transform:scale(1.08);
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



@media (max-width: 980px) {
  .floatingWhatsapp {
    display: none;
  }
}
        .rotatingWord.hide {
          opacity: 0;
          transform: translateY(8px);
        }
.servicesDropdown {
  position: relative;
  padding: 8px 0;
}

.servicesDropdown::after {
  content: "";
  position: absolute;
  top: 100%;
  left: -40px;
  width: 380px;
  height: 18px;
}

.servicesTrigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: #2e7bff;
  font: inherit;
  font-size: 1rem;
  font-weight: 750;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: color .2s ease, transform .2s ease;
}

.servicesTrigger svg {
  transition: transform .2s ease;
}

.dropdownMenu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  z-index: 10;
  width: min(348px, calc(100vw - 48px));
  transform: translate(-50%, 10px) scale(.98);
  transform-origin: top center;
  padding: 16px;
  background: rgba(255,255,255,.99);
  border: 1px solid rgba(46,123,255,.14);
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(15,23,42,.16);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
}

.dropdownEyebrow {
  display: block;
  padding: 2px 6px 12px;
  color: #7a8ba8;
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.dropdownLinks {
  display: grid;
  gap: 7px;
}

.servicesDropdown:hover .dropdownMenu,
.servicesDropdown:focus-within .dropdownMenu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate(-50%, 0) scale(1);
}

.servicesDropdown:hover .servicesTrigger svg,
.servicesDropdown:focus-within .servicesTrigger svg {
  transform: rotate(180deg);
}

.dropdownMenu a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 13px;
  border: 1px solid transparent;
  border-radius: 13px;
  background: #f7faff;
  color: #2e7bff;
  text-decoration: none;
  font-size: .92rem;
  font-weight: 720;
  line-height: 1.25;
  white-space: normal;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
}

.dropdownMenu a svg {
  flex: 0 0 auto;
  opacity: .55;
  transition: transform .2s ease, opacity .2s ease;
}

.dropdownMenu a:hover {
  background: #edf4ff;
  border-color: rgba(46,123,255,.18);
  color: #0b56d4;
  transform: translateX(2px);
}

.dropdownMenu a:hover svg {
  opacity: 1;
  transform: translateX(2px);
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
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(calc(100% - 48px), 1240px);
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
  border: 1px solid rgba(46, 123, 255, 0.12);
  border-radius: 28px;
  padding: 12px 24px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.11);
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




        .navSide > a,
        .navButton,
        .servicesTrigger {
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




        .navSide > a:hover,
        .navButton:hover,
        .servicesTrigger:hover {
          color: #001a5c;
          transform: translateY(-1px);
          background: transparent;
        }




        /* NUEVOS ESTILOS */




.mobileMenuButton {
  display: none;
}




.mobileMenu {
  display: none;
}




.mobileConsultancy {
  display: none;
}

.mobileHeaderActions {
  display: none;
}

.mobileWhatsappHeader {
  display: none;
}


        @media (max-width: 1000px) {


.mobileButtons {
  display: flex;
  width: 100%;
  max-width: calc(100vw - 32px);
  gap: 10px;
  box-sizing: border-box;
}

.mobileWhatsappButton {
  width: 50%;
  min-width: 0;
  max-width: none;

  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;

  background:#25D366;
  color:#fff;
  text-decoration:none;

  font:inherit;
  font-weight:700;

  padding:18px 28px;
  border-radius:999px;

  box-shadow:0 16px 34px rgba(37,211,102,.35);
}

.mobileWhatsappButton img{
  width:24px;
  height:24px;
}

        .consultancyInfo {
  display: none;
}
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
  min-height: auto;
  width: 100%;
  max-width: 100vw;
  padding: 105px 16px 30px;
  gap: 8px;
  overflow: hidden;
  box-sizing: border-box;
}



.mobileWhatsappButton img{
  width:36px;
  height:36px;
}


.heroLeft {
  padding-top: 55px;
}




  .heroLeft h1 {
  text-align: center;
  font-size: clamp(2rem, 10vw, 2.35rem);
  line-height: 1.05;
  margin: 0 auto 22px;
  max-width: 100%;
  overflow-wrap: anywhere;
}




.mobileTitleLine {
  display: block;
}




  .heroAnimations {
  width: 100%;
  max-width: min(360px, calc(100vw - 32px));
  height: 300px;
  min-height: 300px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.heroAnimations > * {
  width: 100%;
  max-width: 360px;
  height: 100%;
  min-height: 100%;
  margin: 0 auto;
}




  .card {
    display: none;
  }




  .mobileConsultancy {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -45px;
  position: relative;
  z-index: 20;
}
 




  .consultancyButton {
  width: min(100%, 300px);
  max-width: 300px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  cursor: pointer;
  background: #2e7bff;
  color: white;
  font: inherit;
  font-weight: 700;
  padding: 18px 28px;
  border-radius: 999px;
  box-shadow: 0 16px 34px rgba(46, 123, 255, 0.35);
}




  .consultancyInfo {
    margin-top: 12px;
    text-align: center;
    color: #6b7280;
    font-size: 0.82rem;
    line-height: 1.5;
    max-width: 340px;
  }




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

  background: #25D366;
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
  max-height: calc(100vh - 90px);
  overflow-y: auto;
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
}
`}</style>
    </>
  );
}


