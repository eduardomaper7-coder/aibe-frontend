"use client";

import { FormEvent, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BadgeEuro,
  Blocks,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  Code2,
  DatabaseZap,
  FileSearch2,
  Fingerprint,
  GalleryHorizontalEnd,
  Gauge,
  Globe2,
  HardDriveDownload,
  Headphones,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageSquareMore,
  MonitorSmartphone,
  Network,
  PackageOpen,
  Palette,
  PanelsTopLeft,
  PlugZap,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Workflow,
  Wrench,
  X,
  Menu,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import Footer from "@/components/ui/Footer";
import {
  serviceNavigation,
  type ServiceLandingConfig,
} from "@/lib/service-landings";

const WHATSAPP_NUMBER = "34686012685";

const iconMap: Record<string, LucideIcon> = {
  BadgeEuro,
  Blocks,
  BrainCircuit,
  ChartNoAxesCombined,
  Code2,
  DatabaseZap,
  FileSearch2,
  Fingerprint,
  GalleryHorizontalEnd,
  Gauge,
  Globe2,
  HardDriveDownload,
  Headphones,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageSquareMore,
  MonitorSmartphone,
  Network,
  PackageOpen,
  Palette,
  PanelsTopLeft,
  PlugZap,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Workflow,
  Wrench,
};

type ServiceLandingProps = {
  config: ServiceLandingConfig;
};

export default function ServiceLanding({ config }: ServiceLandingProps) {
  const params = useParams();
  const locale = String(params?.locale ?? "es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const HeroIcon = iconMap[config.heroIcon] ?? Sparkles;

  const scrollToContact = () => {
    document
      .getElementById("contacto")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setLoading(true);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.get("nombre"),
          empresa: formData.get("empresa"),
          email: formData.get("email"),
          telefono: formData.get("telefono"),
          situacion: `Interés en ${config.navLabel}`,
          web: formData.get("web"),
          mensaje: formData.get("mensaje"),
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "No se ha podido enviar el mensaje.");
      }

      form.reset();
      window.alert("Mensaje enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error al enviar el mensaje."
      );
    } finally {
      setLoading(false);
    }
  };

  const themeStyle = {
    "--accent": config.accent,
    "--accent-rgb": config.accentRgb,
    "--accent-soft": config.accentSoft,
    "--accent-ink": config.accentInk,
  } as CSSProperties;

  return (
    <div className="servicePage" style={themeStyle}>
      <header className="serviceHeader">
        <nav className="navSide navLeft desktopNav" aria-label="Navegación principal">
          <button type="button" className="navButton" onClick={scrollToContact}>
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
                  <Link
                    key={item.slug}
                    href={`/${locale}/${item.slug}`}
                    className={item.slug === config.slug ? "active" : undefined}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <Link href={`/${locale}`} className="logoLink" aria-label="Ir al inicio">
          <Image
            src="/imagenes/logo.png"
            alt="AIBE Technologies"
            width={190}
            height={54}
            priority
            className="headerLogo"
          />
        </Link>

        <div className="mobileHeaderActions">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobileWhatsappHeader"
            aria-label="Contactar por WhatsApp"
          >
            <Image
              src="/imagenes/whatsapp.png"
              alt=""
              width={25}
              height={25}
            />
          </a>

          <button
            type="button"
            className="mobileMenuButton"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="service-mobile-navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="navSide navRight desktopNav" aria-label="Accesos destacados">
          <Link href={`/${locale}/#google`}>Google</Link>
          <Link href={`/${locale}/#ia`}>Buscadores con IA</Link>
        </nav>

        {mobileMenuOpen && (
          <div className="mobileMenu" id="service-mobile-navigation">
            <button
              type="button"
              className="navButton"
              onClick={() => {
                scrollToContact();
                setMobileMenuOpen(false);
              }}
            >
              Contacto
            </button>

            <div className="mobileServices">
              <span>Servicios</span>
              {serviceNavigation.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/${item.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link href={`/${locale}/#google`} onClick={() => setMobileMenuOpen(false)}>
              Google
            </Link>
            <Link href={`/${locale}/#ia`} onClick={() => setMobileMenuOpen(false)}>
              Buscadores con IA
            </Link>
          </div>
        )}
      </header>

      <main>
        <section className="serviceHero">
          <div className="heroGlow heroGlowOne" />
          <div className="heroGlow heroGlowTwo" />

          <div className="heroCopy">
            <span className="eyebrow">{config.eyebrow}</span>
            <h1>
              {config.title} <strong>{config.highlightedTitle}</strong>
            </h1>
            <p>{config.description}</p>

            <div className="heroActions">
              <button type="button" className="primaryButton" onClick={scrollToContact}>
                Solicitar una valoración
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="secondaryButton"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className="heroNote">
              <span className="noteDot" />
              Primera conversación sin compromiso · Respuesta en menos de 24h
            </div>
          </div>

          <div className="heroVisual" aria-hidden="true">
            <div className="visualTopline">
              <span className="visualBrand">
                <HeroIcon size={20} />
                AIBE / {config.navLabel}
              </span>
              <span className="statusPill">En evolución</span>
            </div>

            <div className="visualCore">
              <div className="coreIcon">
                <HeroIcon size={38} strokeWidth={1.8} />
              </div>
              <div>
                <span className="visualOverline">Objetivo compartido</span>
                <strong>{config.highlightedTitle}</strong>
              </div>
            </div>

            <div className="signalGrid">
              {config.heroSignals.map((signal) => (
                <div className="signalCard" key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                  <i />
                </div>
              ))}
            </div>

            <div className="keywordRail">
              {config.heroKeywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="outcomeSection">
          <div className="outcomeIntro">
            <span>Enfoque AIBE</span>
            <h2>{config.outcomeTitle}</h2>
          </div>
          <div className="outcomeGrid">
            {config.outcomes.map((outcome) => (
              <article key={outcome.label}>
                <strong>{outcome.value}</strong>
                <p>{outcome.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilitiesSection">
          <div className="sectionHeading">
            <span className="sectionEyebrow">{config.capabilitiesEyebrow}</span>
            <h2>{config.capabilitiesTitle}</h2>
            <p>{config.capabilitiesIntro}</p>
          </div>

          <div className="capabilityGrid">
            {config.capabilities.map((capability, index) => {
              const CapabilityIcon = iconMap[capability.icon] ?? Sparkles;
              return (
                <article className="capabilityCard" key={capability.title}>
                  <div className="cardTopline">
                    <span className="capabilityIcon">
                      <CapabilityIcon size={24} strokeWidth={1.8} />
                    </span>
                    <span className="cardIndex">0{index + 1}</span>
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="processSection">
          <div className="processHeader">
            <div>
              <span className="sectionEyebrow">{config.processEyebrow}</span>
              <h2>{config.processTitle}</h2>
            </div>
            <p>{config.processIntro}</p>
          </div>

          <div className="processList">
            {config.process.map((step) => (
              <article className="processStep" key={step.number}>
                <span className="processNumber">{step.number}</span>
                <div className="processLine" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="deliverablesSection">
          <div className="deliverablesCopy">
            <span className="sectionEyebrow light">{config.deliverablesEyebrow}</span>
            <h2>{config.deliverablesTitle}</h2>
            <p>{config.deliverablesDescription}</p>

            <ul>
              {config.deliverables.map((item) => (
                <li key={item}>
                  <span>
                    <Check size={17} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="deliverablesVisual">
            <div className="sideCard">
              <div className="sideCardHeader">
                <span className="sideCardIcon">
                  <HeroIcon size={25} />
                </span>
                <span>AIBE SYSTEM</span>
              </div>
              <h3>{config.sideCardTitle}</h3>
              <p>{config.sideCardText}</p>
              <div className="sideCardItems">
                {config.sideCardItems.map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="faqSection">
          <div className="faqHeading">
            <span className="sectionEyebrow">{config.faqEyebrow}</span>
            <h2>{config.faqTitle}</h2>
          </div>

          <div className="faqList">
            {config.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faqItem ${isOpen ? "open" : ""}`} key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={22} />
                  </button>
                  <div className="faqAnswer">
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="contactSection" id="contacto">
          <div className="contactCopy">
            <span className="sectionEyebrow">Primer paso</span>
            <h2>{config.contactTitle}</h2>
            <p>{config.contactText}</p>

            <div className="contactRoutes">
              <a href="mailto:info@aibetech.es">
                <span>Email</span>
                <strong>info@aibetech.es</strong>
              </a>
              <a href="tel:+34686012685">
                <span>Teléfono</span>
                <strong>686 01 26 85</strong>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp</span>
                <strong>Escribir ahora ↗</strong>
              </a>
            </div>
          </div>

          <div className="contactCard">
            <span className="formLabel">Solicitud de información</span>
            <h3>Cuéntanos brevemente tu situación</h3>

            <form onSubmit={handleSubmit}>
              <div className="formRow">
                <label>
                  Nombre
                  <input name="nombre" type="text" autoComplete="name" required />
                </label>
                <label>
                  Empresa
                  <input name="empresa" type="text" autoComplete="organization" required />
                </label>
              </div>

              <div className="formRow">
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  Teléfono
                  <input name="telefono" type="tel" autoComplete="tel" required />
                </label>
              </div>

              <label>
                Web actual <small>(opcional)</small>
                <input name="web" type="text" inputMode="url" />
              </label>

              <label>
                ¿Qué necesitas?
                <textarea name="mensaje" rows={5} required />
              </label>

              <label className="legalCheck">
                <input type="checkbox" required />
                <span>
                  Acepto el <Link href={`/${locale}/aviso-legal`}>Aviso Legal</Link> y la{" "}
                  <Link href={`/${locale}/politica-privacidad`}>
                    Política de Privacidad
                  </Link>
                  .
                </span>
              </label>

              <button type="submit" className="submitButton" disabled={loading}>
                {loading ? "Enviando..." : "Solicitar valoración"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .servicePage {
          min-height: 100vh;
          background: #ffffff;
          color: #111827;
          font-family: "Montserrat", Arial, sans-serif;
        }

        .serviceHeader {
          position: fixed;
          top: 24px;
          left: 50%;
          z-index: 1000;
          width: min(calc(100% - 48px), 1240px);
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(46, 123, 255, 0.12);
          border-radius: 28px;
          box-shadow: 0 18px 50px rgba(15, 23, 42, 0.11);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
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
        }

        .navSide {
          display: flex;
          align-items: center;
        }

        .navLeft {
          justify-content: flex-end;
          gap: clamp(24px, 3vw, 42px);
          padding-right: clamp(32px, 5vw, 68px);
        }

        .navRight {
          justify-content: flex-start;
          gap: clamp(24px, 3vw, 42px);
          padding-left: clamp(32px, 5vw, 68px);
        }

        .navSide > a,
        .navButton,
        .servicesTrigger {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: #2e7bff;
          text-decoration: none;
          font: inherit;
          font-size: 1rem;
          font-weight: 750;
          letter-spacing: -0.015em;
          line-height: 1.2;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .navSide > a:hover,
        .navButton:hover,
        .servicesTrigger:hover {
          color: #001a5c;
          transform: translateY(-1px);
        }

        .servicesTrigger svg {
          transition: transform 0.2s ease;
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

        .dropdownMenu {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          z-index: 10;
          width: min(348px, calc(100vw - 48px));
          transform: translate(-50%, 10px) scale(0.98);
          transform-origin: top center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.99);
          border: 1px solid rgba(46, 123, 255, 0.14);
          border-radius: 20px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        }

        .dropdownEyebrow {
          display: block;
          padding: 2px 6px 12px;
          color: #7a8ba8;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
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
          font-size: 0.92rem;
          font-weight: 720;
          line-height: 1.25;
          white-space: normal;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .dropdownMenu a svg {
          flex: 0 0 auto;
          opacity: 0.55;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .dropdownMenu a:hover,
        .dropdownMenu a.active {
          background: #edf4ff;
          border-color: rgba(46, 123, 255, 0.18);
          color: #0b56d4;
          transform: translateX(2px);
        }

        .dropdownMenu a:hover svg,
        .dropdownMenu a.active svg {
          opacity: 1;
          transform: translateX(2px);
        }

        .mobileHeaderActions,
        .mobileMenu {
          display: none;
        }

        main {
          overflow: hidden;
        }

        .serviceHero {
          position: relative;
          min-height: 820px;
          padding: 190px max(6vw, 24px) 105px;
          display: grid;
          grid-template-columns: minmax(0, 1.03fr) minmax(420px, 0.97fr);
          align-items: center;
          gap: clamp(60px, 8vw, 120px);
          background:
            linear-gradient(135deg, rgba(var(--accent-rgb), 0.05), transparent 42%),
            #f8fafc;
          isolation: isolate;
        }

        .serviceHero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background-image: radial-gradient(rgba(15, 23, 42, 0.09) 0.8px, transparent 0.8px);
          background-size: 28px 28px;
          mask-image: linear-gradient(to right, black, transparent 74%);
          opacity: 0.45;
        }

        .heroGlow {
          position: absolute;
          z-index: -2;
          border-radius: 50%;
          filter: blur(10px);
          pointer-events: none;
        }

        .heroGlowOne {
          width: 430px;
          height: 430px;
          right: 6%;
          top: 18%;
          background: rgba(var(--accent-rgb), 0.16);
        }

        .heroGlowTwo {
          width: 280px;
          height: 280px;
          left: -90px;
          bottom: -80px;
          background: rgba(46, 123, 255, 0.1);
        }

        .heroCopy {
          position: relative;
          z-index: 2;
          max-width: 760px;
        }

        .eyebrow,
        .sectionEyebrow {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 13px;
          border: 1px solid rgba(var(--accent-rgb), 0.24);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.75);
          color: var(--accent-ink);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .heroCopy h1 {
          margin: 26px 0 26px;
          color: #0b1220;
          font-size: clamp(3.6rem, 6.3vw, 6.9rem);
          line-height: 0.94;
          letter-spacing: -0.066em;
          font-weight: 780;
        }

        .heroCopy h1 strong {
          display: inline;
          color: var(--accent);
          font-weight: 820;
        }

        .heroCopy > p {
          max-width: 700px;
          margin: 0;
          color: #526075;
          font-size: clamp(1.08rem, 1.5vw, 1.28rem);
          line-height: 1.68;
          font-weight: 520;
        }

        .heroActions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 36px;
        }

        .primaryButton,
        .secondaryButton,
        .submitButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 54px;
          padding: 0 25px;
          border-radius: 999px;
          font: inherit;
          font-weight: 750;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }

        .primaryButton,
        .submitButton {
          border: 1px solid var(--accent);
          background: var(--accent);
          color: #ffffff;
          box-shadow: 0 16px 34px rgba(var(--accent-rgb), 0.28);
        }

        .secondaryButton {
          border: 1px solid #d8e0eb;
          background: rgba(255, 255, 255, 0.86);
          color: #182033;
        }

        .primaryButton:hover,
        .secondaryButton:hover,
        .submitButton:hover:not(:disabled) {
          transform: translateY(-3px);
        }

        .primaryButton:hover,
        .submitButton:hover:not(:disabled) {
          box-shadow: 0 20px 42px rgba(var(--accent-rgb), 0.34);
        }

        .heroNote {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 20px;
          color: #69758a;
          font-size: 0.87rem;
          font-weight: 600;
        }

        .noteDot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #32c36c;
          box-shadow: 0 0 0 5px rgba(50, 195, 108, 0.12);
        }

        .heroVisual {
          position: relative;
          z-index: 2;
          width: min(100%, 570px);
          justify-self: center;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.76);
          box-shadow: 0 34px 90px rgba(15, 23, 42, 0.16);
          backdrop-filter: blur(22px);
          transform: rotate(1.5deg);
        }

        .heroVisual::after {
          content: "";
          position: absolute;
          inset: 16px -18px -18px 18px;
          z-index: -1;
          border-radius: 34px;
          border: 1px solid rgba(var(--accent-rgb), 0.24);
          background: rgba(var(--accent-rgb), 0.07);
        }

        .visualTopline,
        .sideCardHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .visualBrand {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #223047;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .visualBrand :global(svg),
        .coreIcon :global(svg),
        .capabilityIcon :global(svg),
        .sideCardIcon :global(svg) {
          color: var(--accent);
        }

        .statusPill {
          padding: 7px 10px;
          border-radius: 999px;
          background: #eefbf3;
          color: #23834a;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .visualCore {
          display: flex;
          align-items: center;
          gap: 18px;
          min-height: 160px;
          margin-top: 18px;
          padding: 26px;
          border-radius: 24px;
          background: #0b1220;
          color: #ffffff;
          overflow: hidden;
          position: relative;
        }

        .visualCore::after {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          right: -70px;
          bottom: -100px;
          border-radius: 50%;
          background: var(--accent);
          filter: blur(6px);
          opacity: 0.45;
        }

        .coreIcon {
          flex: 0 0 auto;
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .visualOverline {
          display: block;
          margin-bottom: 7px;
          color: #9cabbe;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .visualCore strong {
          position: relative;
          z-index: 1;
          display: block;
          max-width: 300px;
          font-size: clamp(1.5rem, 2.2vw, 2.15rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .signalGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 12px;
        }

        .signalCard {
          position: relative;
          min-height: 116px;
          padding: 16px;
          border: 1px solid #e5eaf1;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.78);
          overflow: hidden;
        }

        .signalCard span {
          display: block;
          color: #7b8799;
          font-size: 0.72rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .signalCard strong {
          display: block;
          margin-top: 13px;
          color: #182033;
          font-size: 0.95rem;
          line-height: 1.18;
        }

        .signalCard i {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 13px;
          height: 4px;
          border-radius: 99px;
          background: linear-gradient(to right, var(--accent) 68%, #e6eaf0 68%);
        }

        .keywordRail {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 14px;
        }

        .keywordRail span {
          padding: 8px 11px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: var(--accent-ink);
          font-size: 0.76rem;
          font-weight: 750;
        }

        .outcomeSection {
          padding: 90px max(6vw, 24px);
          display: grid;
          grid-template-columns: minmax(300px, 0.85fr) 1.15fr;
          align-items: end;
          gap: clamp(60px, 8vw, 120px);
          border-top: 1px solid #e8edf3;
          border-bottom: 1px solid #e8edf3;
          background: #ffffff;
        }

        .outcomeIntro > span {
          color: var(--accent);
          font-size: 0.78rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .outcomeIntro h2 {
          margin: 14px 0 0;
          max-width: 610px;
          color: #111827;
          font-size: clamp(2rem, 3.6vw, 3.5rem);
          line-height: 1.04;
          letter-spacing: -0.045em;
        }

        .outcomeGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .outcomeGrid article {
          min-height: 170px;
          padding: 22px;
          border-radius: 22px;
          background: #f6f8fb;
          border: 1px solid #ebeff5;
        }

        .outcomeGrid strong {
          display: block;
          color: var(--accent);
          font-size: clamp(2rem, 3vw, 3.2rem);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .outcomeGrid p {
          margin: 34px 0 0;
          color: #4f5c70;
          font-size: 0.95rem;
          line-height: 1.45;
          font-weight: 650;
        }

        .capabilitiesSection,
        .faqSection {
          padding: 120px max(6vw, 24px);
          background: #ffffff;
        }

        .sectionHeading {
          max-width: 840px;
          margin-bottom: 56px;
        }

        .sectionHeading h2,
        .processHeader h2,
        .faqHeading h2,
        .contactCopy h2 {
          margin: 20px 0 18px;
          color: #0e1728;
          font-size: clamp(2.6rem, 5vw, 5.2rem);
          line-height: 0.98;
          letter-spacing: -0.058em;
        }

        .sectionHeading p,
        .processHeader > p,
        .contactCopy > p {
          max-width: 700px;
          margin: 0;
          color: #5b687b;
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .capabilityGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .capabilityCard {
          min-height: 300px;
          padding: 26px;
          border: 1px solid #e6ebf2;
          border-radius: 26px;
          background: #fbfcfe;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .capabilityCard:hover {
          transform: translateY(-7px);
          border-color: rgba(var(--accent-rgb), 0.32);
          box-shadow: 0 24px 55px rgba(15, 23, 42, 0.09);
        }

        .cardTopline {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .capabilityIcon,
        .sideCardIcon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: var(--accent-soft);
        }

        .cardIndex {
          color: #a0a9b8;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .capabilityCard h3 {
          margin: 45px 0 13px;
          color: #121b2b;
          font-size: 1.35rem;
          line-height: 1.12;
          letter-spacing: -0.025em;
        }

        .capabilityCard p {
          margin: 0;
          color: #657185;
          font-size: 0.98rem;
          line-height: 1.62;
        }

        .processSection {
          padding: 120px max(6vw, 24px);
          background: var(--accent-soft);
        }

        .processHeader {
          display: grid;
          grid-template-columns: 1fr minmax(320px, 0.68fr);
          align-items: end;
          gap: 80px;
          margin-bottom: 64px;
        }

        .processList {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .processStep {
          position: relative;
          padding: 0 26px 0 0;
        }

        .processStep:not(:last-child) {
          border-right: 1px solid rgba(var(--accent-rgb), 0.2);
          margin-right: 26px;
        }

        .processNumber {
          color: var(--accent);
          font-size: 0.78rem;
          font-weight: 850;
          letter-spacing: 0.1em;
        }

        .processLine {
          width: 44px;
          height: 4px;
          margin: 20px 0 34px;
          border-radius: 99px;
          background: var(--accent);
        }

        .processStep h3 {
          margin: 0 0 14px;
          color: #121b2b;
          font-size: 1.3rem;
          letter-spacing: -0.025em;
        }

        .processStep p {
          margin: 0;
          color: #58667a;
          font-size: 0.95rem;
          line-height: 1.62;
        }

        .deliverablesSection {
          position: relative;
          padding: 120px max(6vw, 24px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(400px, 0.82fr);
          align-items: center;
          gap: clamp(60px, 9vw, 140px);
          background: #07111f;
          color: #ffffff;
          overflow: hidden;
        }

        .deliverablesSection::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          right: -180px;
          top: -230px;
          border-radius: 50%;
          background: rgba(var(--accent-rgb), 0.18);
          filter: blur(20px);
        }

        .sectionEyebrow.light {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
        }

        .deliverablesCopy {
          position: relative;
          z-index: 2;
        }

        .deliverablesCopy h2 {
          margin: 21px 0 20px;
          max-width: 760px;
          font-size: clamp(2.8rem, 5vw, 5.3rem);
          line-height: 0.98;
          letter-spacing: -0.058em;
        }

        .deliverablesCopy > p {
          max-width: 680px;
          margin: 0;
          color: #aab5c5;
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .deliverablesCopy ul {
          display: grid;
          gap: 14px;
          margin: 38px 0 0;
          padding: 0;
          list-style: none;
        }

        .deliverablesCopy li {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #e8edf4;
          font-weight: 600;
        }

        .deliverablesCopy li > span {
          flex: 0 0 auto;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(var(--accent-rgb), 0.18);
          color: var(--accent);
        }

        .deliverablesVisual {
          position: relative;
          z-index: 2;
        }

        .sideCard {
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(18px);
        }

        .sideCardHeader > span:last-child {
          color: #8290a6;
          font-size: 0.72rem;
          font-weight: 850;
          letter-spacing: 0.12em;
        }

        .sideCard h3 {
          margin: 48px 0 16px;
          max-width: 500px;
          font-size: clamp(2rem, 3.4vw, 3.55rem);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .sideCard > p {
          margin: 0;
          color: #aeb9c8;
          line-height: 1.65;
        }

        .sideCardItems {
          display: grid;
          gap: 10px;
          margin-top: 34px;
        }

        .sideCardItems div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 17px 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.07);
        }

        .sideCardItems span {
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 850;
        }

        .sideCardItems strong {
          font-size: 0.98rem;
          letter-spacing: -0.01em;
        }

        .faqSection {
          display: grid;
          grid-template-columns: minmax(260px, 0.7fr) 1.3fr;
          align-items: start;
          gap: clamp(60px, 9vw, 150px);
        }

        .faqHeading {
          position: sticky;
          top: 150px;
        }

        .faqList {
          border-top: 1px solid #dfe5ed;
        }

        .faqItem {
          border-bottom: 1px solid #dfe5ed;
        }

        .faqItem > button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 27px 0;
          border: 0;
          background: transparent;
          color: #172033;
          text-align: left;
          font: inherit;
          font-size: 1.12rem;
          font-weight: 750;
          cursor: pointer;
        }

        .faqItem > button :global(svg) {
          flex: 0 0 auto;
          color: var(--accent);
          transition: transform 0.25s ease;
        }

        .faqItem.open > button :global(svg) {
          transform: rotate(180deg);
        }

        .faqAnswer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }

        .faqAnswer > p {
          overflow: hidden;
          margin: 0;
          color: #647085;
          font-size: 0.99rem;
          line-height: 1.68;
        }

        .faqItem.open .faqAnswer {
          grid-template-rows: 1fr;
        }

        .faqItem.open .faqAnswer > p {
          padding: 0 46px 27px 0;
        }

        .contactSection {
          scroll-margin-top: 120px;
          padding: 120px max(6vw, 24px);
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(470px, 1.14fr);
          align-items: start;
          gap: clamp(60px, 9vw, 140px);
          background:
            radial-gradient(circle at 12% 22%, rgba(var(--accent-rgb), 0.12), transparent 36%),
            #f5f7fb;
        }

        .contactCopy {
          position: sticky;
          top: 145px;
        }

        .contactRoutes {
          display: grid;
          gap: 10px;
          margin-top: 38px;
        }

        .contactRoutes a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 18px 20px;
          border: 1px solid #e0e6ee;
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.75);
          color: #172033;
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .contactRoutes a:hover {
          transform: translateX(4px);
          border-color: rgba(var(--accent-rgb), 0.4);
        }

        .contactRoutes span {
          color: #778397;
          font-size: 0.78rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .contactRoutes strong {
          font-size: 0.95rem;
        }

        .contactCard {
          padding: 38px;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          background: #ffffff;
          box-shadow: 0 28px 70px rgba(15, 23, 42, 0.1);
        }

        .formLabel {
          color: var(--accent);
          font-size: 0.76rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.09em;
        }

        .contactCard h3 {
          margin: 12px 0 28px;
          color: #111827;
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          line-height: 1.04;
          letter-spacing: -0.045em;
        }

        form {
          display: grid;
          gap: 16px;
        }

        .formRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        form label:not(.legalCheck) {
          display: grid;
          gap: 8px;
          color: #485468;
          font-size: 0.84rem;
          font-weight: 750;
        }

        form small {
          color: #8b96a7;
          font-size: 0.75rem;
          font-weight: 600;
        }

        form input,
        form textarea {
          width: 100%;
          border: 1px solid #dfe5ed;
          border-radius: 13px;
          background: #f8fafc;
          color: #101827;
          font: inherit;
          font-size: 0.96rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        form input {
          height: 50px;
          padding: 0 15px;
        }

        form textarea {
          min-height: 130px;
          resize: vertical;
          padding: 14px 15px;
        }

        form input:focus,
        form textarea:focus {
          border-color: var(--accent);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.1);
        }

        .legalCheck {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #687488;
          font-size: 0.79rem;
          line-height: 1.45;
          font-weight: 550;
        }

        .legalCheck input {
          flex: 0 0 auto;
          width: 17px;
          height: 17px;
          margin-top: 1px;
          accent-color: var(--accent);
        }

        .legalCheck a {
          color: var(--accent-ink);
          font-weight: 750;
        }

        .submitButton {
          width: 100%;
          min-height: 57px;
          margin-top: 3px;
        }

        .submitButton:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        @media (max-width: 1160px) {
          .navLeft {
            gap: 28px;
            padding-right: 38px;
          }

          .navRight {
            gap: 28px;
            padding-left: 38px;
          }

          .serviceHero {
            grid-template-columns: minmax(0, 1fr) minmax(380px, 0.8fr);
            gap: 55px;
          }

          .heroCopy h1 {
            font-size: clamp(3.4rem, 6vw, 5.6rem);
          }
        }

        @media (max-width: 1000px) {
          .desktopNav {
            display: none;
          }

          .serviceHeader {
            top: 9px;
            width: calc(100% - 28px);
            display: flex;
            justify-content: space-between;
            padding: 10px 14px;
            border-radius: 18px;
          }

          .headerLogo {
            width: 112px;
          }

          .mobileHeaderActions {
            display: flex;
            align-items: center;
            gap: 9px;
          }

          .mobileWhatsappHeader,
          .mobileMenuButton {
            width: 43px;
            height: 43px;
            display: grid;
            place-items: center;
            border-radius: 50%;
          }

          .mobileWhatsappHeader {
            background: #25d366;
          }

          .mobileMenuButton {
            appearance: none;
            border: 0;
            background: #2e7bff;
            color: #ffffff;
            cursor: pointer;
          }

          .mobileMenu {
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: calc(100vh - 90px);
            overflow-y: auto;
            padding: 20px;
            border: 1px solid #e5eaf1;
            border-radius: 18px;
            background: #ffffff;
            box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
          }

          .mobileMenu > a,
          .mobileMenu > .navButton,
          .mobileServices > span {
            color: #2e7bff;
            text-decoration: none;
            text-align: center;
            font: inherit;
            font-weight: 750;
          }

          .mobileServices {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 15px;
            border-radius: 14px;
            background: #f6f8fb;
            text-align: center;
          }

          .mobileServices a {
            color: #334056;
            text-decoration: none;
            font-size: 0.88rem;
            font-weight: 650;
            padding: 5px;
          }

          .serviceHero {
            min-height: auto;
            padding-top: 145px;
            grid-template-columns: 1fr;
          }

          .heroCopy {
            max-width: 850px;
          }

          .heroVisual {
            width: min(100%, 680px);
          }

          .outcomeSection,
          .faqSection,
          .contactSection {
            grid-template-columns: 1fr;
          }

          .outcomeSection {
            align-items: start;
            gap: 42px;
          }

          .capabilityGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .processHeader {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .processList {
            grid-template-columns: repeat(2, 1fr);
            gap: 44px 28px;
          }

          .processStep:not(:last-child) {
            border-right: 0;
            margin-right: 0;
          }

          .deliverablesSection {
            grid-template-columns: 1fr;
          }

          .deliverablesVisual {
            width: min(100%, 680px);
          }

          .faqHeading,
          .contactCopy {
            position: static;
          }

          .faqSection {
            gap: 42px;
          }

          .contactSection {
            gap: 52px;
          }
        }

        @media (max-width: 680px) {
          .serviceHero {
            padding: 126px 20px 74px;
            gap: 46px;
          }

          .heroCopy h1 {
            margin-top: 20px;
            font-size: clamp(2.85rem, 14vw, 4.2rem);
            line-height: 0.96;
          }

          .heroCopy > p {
            font-size: 1rem;
          }

          .heroActions {
            flex-direction: column;
            align-items: stretch;
          }

          .primaryButton,
          .secondaryButton {
            width: 100%;
          }

          .heroNote {
            align-items: flex-start;
            line-height: 1.45;
          }

          .heroVisual {
            padding: 14px;
            border-radius: 24px;
            transform: none;
          }

          .heroVisual::after {
            display: none;
          }

          .visualTopline {
            align-items: flex-start;
          }

          .visualBrand {
            max-width: 190px;
            line-height: 1.35;
          }

          .visualCore {
            min-height: 140px;
            padding: 20px;
          }

          .coreIcon {
            width: 60px;
            height: 60px;
            border-radius: 17px;
          }

          .signalGrid {
            grid-template-columns: 1fr;
          }

          .signalCard {
            min-height: 95px;
          }

          .outcomeSection,
          .capabilitiesSection,
          .processSection,
          .deliverablesSection,
          .faqSection,
          .contactSection {
            padding: 82px 20px;
          }

          .outcomeGrid,
          .capabilityGrid,
          .processList {
            grid-template-columns: 1fr;
          }

          .outcomeGrid article {
            min-height: 145px;
          }

          .capabilityCard {
            min-height: auto;
          }

          .capabilityCard h3 {
            margin-top: 34px;
          }

          .processList {
            gap: 36px;
          }

          .processStep {
            padding-right: 0;
          }

          .deliverablesCopy h2,
          .sectionHeading h2,
          .processHeader h2,
          .faqHeading h2,
          .contactCopy h2 {
            font-size: clamp(2.45rem, 12vw, 3.7rem);
          }

          .sideCard {
            padding: 23px;
          }

          .sideCard h3 {
            margin-top: 38px;
          }

          .faqItem > button {
            font-size: 1rem;
          }

          .faqItem.open .faqAnswer > p {
            padding-right: 0;
          }

          .contactCard {
            padding: 24px;
            border-radius: 23px;
          }

          .formRow {
            grid-template-columns: 1fr;
          }

          .contactRoutes a {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}
