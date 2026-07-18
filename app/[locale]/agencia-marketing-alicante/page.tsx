"use client";




import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});


const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
);




import AibeSection from "@/components/ui/AibeSection";
import GoogleSection from "@/components/ui/GoogleSection";
import SearchRiseAnimation from "@/components/ui/SearchRiseAnimation";
import SocialBoostAnimation from "@/components/ui/SocialBoostAnimation";
import AiRecommendationAnimation from "@/components/ui/AiRecommendationAnimation";
import AiAgentsSection from "@/components/ui/AiAgentsSection";
import Footer from "@/components/ui/Footer";
import RedesSocialesSection from "@/components/ui/redesSociales-seccion";
import ContactSection from "@/components/ui/ContactSection";
import SiteNavbar from "@/components/ui/SiteNavbar";
const words = ["clientes", "ventas", "reservas", "visibilidad"];




export default function Page() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);





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
      <SiteNavbar activeAlicanteSlug="agencia-marketing-alicante" />




      <main className="hero">
        <section className="heroLeft">
          <h1>
  <span className="titleLine">
    Marketing digital en
  </span>

  <span className="titleLine">
    <span className={`${caveat.className} alicanteWord`}>
      Alicante
    </span>{" "}
    para conseguir
  </span>

  <span className="titleLine">
    más{" "}
    <span className={`rotatingWord ${fade ? "show" : "hide"}`}>
      {words[index]}
    </span>
  </span>
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

  <a
    href="#contact-formulario"
    className="callButton"
  >
    Solicitar información ahora
  </a>
</div>




  
</aside>




<div className="mobileConsultancy">
 <div className="mobileButtons">
  <a
    href="#contact-formulario"
    className="consultancyButton"
  >
    Solicitar información
  </a>
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
  cursor:pointer;
  touch-action:manipulation;
  -webkit-tap-highlight-color:transparent;
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
  max-width: 860px;
  margin: 0 0 34px;

  color: #111111;
  font-size: clamp(2.25rem, 3.65vw, 3.75rem);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.045em;
}

.titleLine {
  display: block;
  white-space: nowrap;
}

.alicanteWord {
  display: inline-block;
  margin-right: 0.08em;

  color: #2e7bff;
  font-size: 1.24em;
  font-weight: 700;
  line-height: 0.82;
  letter-spacing: -0.025em;
  vertical-align: -0.04em;
  transform: rotate(-1deg);
  transform-origin: center;
  white-space: nowrap;
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
          top: 16px;
          left: 50%;
          z-index: 1000;
          width: calc(100% - 48px);
          max-width: 1360px;
          min-height: 92px;
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          padding: 12px 36px;
          background: #ffffff;
          border: 1px solid #dce8fa;
          border-radius: 28px;
          box-shadow: 0 22px 54px rgba(15, 23, 42, 0.1);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .heroHeader.scrolled {
          background: #ffffff;
          border-color: #dce8fa;
          box-shadow: 0 22px 54px rgba(15, 23, 42, 0.1);
        }

        .logoLink {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .headerLogo {
          display: block;
          width: 190px;
          height: auto;
        }

        .navSide {
          display: flex;
          align-items: center;
        }

        .navLeft {
          justify-content: flex-end;
          gap: clamp(26px, 3vw, 44px);
          padding-right: clamp(38px, 5vw, 74px);
        }

        .navRight {
          justify-content: flex-start;
          gap: clamp(26px, 3vw, 44px);
          padding-left: clamp(38px, 5vw, 74px);
        }

        .navSide > a,
        .navButton,
        .servicesTrigger {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: #3478f6;
          text-decoration: none;
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          font-weight: 750;
          letter-spacing: -0.015em;
          line-height: 1.2;
          white-space: nowrap;
          cursor: pointer;
          box-shadow: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .navSide > a:hover,
        .navButton:hover,
        .servicesTrigger:hover {
          color: #0b56d4;
          background: transparent;
          transform: translateY(-1px);
        }

        .servicesDropdown {
          position: relative;
          padding: 8px 0;
        }

        .servicesDropdown::after {
          content: "";
          position: absolute;
          top: 100%;
          left: -26px;
          width: 360px;
          height: 18px;
        }

        .servicesTrigger svg {
          transition: transform 0.2s ease;
        }

        .dropdownMenu {
          position: absolute;
          top: calc(100% + 9px);
          left: 50%;
          z-index: 10;
          width: min(348px, calc(100vw - 48px));
          padding: 18px 16px 17px;
          transform: translate(-50%, 10px);
          transform-origin: top center;
          background: #ffffff;
          border: 1px solid #dce8fa;
          border-radius: 18px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        }

        .dropdownEyebrow {
          display: block;
          padding: 0 6px 11px;
          color: #7e8eac;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .dropdownLinks {
          display: grid;
          gap: 0;
        }

        .servicesDropdown:hover .dropdownMenu,
        .servicesDropdown:focus-within .dropdownMenu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }

        .servicesDropdown:hover .servicesTrigger svg,
        .servicesDropdown:focus-within .servicesTrigger svg {
          transform: rotate(180deg);
        }

        .dropdownMenu a {
          display: block;
          width: 100%;
          padding: 5px 0;
          color: #171717;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 520;
          line-height: 1.28;
          letter-spacing: -0.012em;
          transition: color 0.18s ease, transform 0.18s ease;
        }

        .dropdownMenu a:hover {
          color: #3478f6;
          transform: translateX(3px);
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
  text-decoration: none;
  position: relative;
  z-index: 30;
  pointer-events: auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
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


