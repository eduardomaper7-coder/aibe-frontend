"use client";

import { FormEvent, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
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
  type LucideIcon,
} from "lucide-react";

import Footer from "@/components/ui/Footer";
import SiteNavbar from "@/components/ui/SiteNavbar";
import { type ServiceLandingConfig } from "@/lib/service-landings";
import styles from "./ServiceLanding.module.css";

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

type VisualSet = {
  hero: string;
  heroAlt: string;
  portrait: string;
  portraitAlt: string;
  detail: string;
  detailAlt: string;
  proof: string;
  proofAlt: string;
  result?: string;
  resultAlt?: string;
  objectPosition?: string;
};

const visualSets: Record<string, VisualSet> = {
  "redes-sociales-tenerife": {
    hero: "/imagenes/clinica-redes-sociales.webp",
    heroAlt: "Equipo de una clínica mostrando un producto en consulta",
    portrait: "/imagenes/recuadro2.jpg",
    portraitAlt: "Persona utilizando una red social desde el móvil",
    detail: "/imagenes/tenerife-1.jpg",
    detailAlt: "Paisaje de Tenerife conectado con la identidad local de la marca",
    proof: "/imagenes/resenas-google.png",
    proofAlt: "Panel visual con métricas y canales digitales",
    result: "/imagenes/marketing-digital-redes-sociales.webp",
    resultAlt: "Profesional gestionando redes sociales y canales digitales desde un portátil",
    objectPosition: "center 28%",
  },
  "marketing-digital-tenerife": {
    hero: "/imagenes/pexels-fauxels-3183153.jpg",
    heroAlt: "Equipo revisando una estrategia de marketing digital",
    portrait: "/imagenes/pexels-olly-926390.jpg",
    portraitAlt: "Profesional trabajando en una campaña digital",
    detail: "/imagenes/marketing-digital-analiticas-azul.webp",
    detailAlt: "Ilustración azul con distintos paneles y gráficos de analítica digital",
    proof: "/imagenes/marketing-digital-resultados.webp",
    proofAlt: "Concepto de marketing digital con indicadores de SEO, SEM y canales online",
  },
  "diseno-web-branding-tenerife": {
    hero: "/imagenes/pexels-olly-926390.jpg",
    heroAlt: "Profesional desarrollando una propuesta visual para una marca",
    portrait: "/imagenes/imagen-hero-3.jpg",
    portraitAlt: "Identidad gráfica aplicada a un negocio real",
    detail: "/imagenes/imagen-hero-1.png",
    detailAlt: "Fachada de negocio con una identidad visual reconocible",
    proof: "/imagenes/pexels-fauxels-3183153.jpg",
    proofAlt: "Equipo colaborando en el diseño de una experiencia digital",
  },
  "desarrollo-web-tenerife": {
    hero: "/imagenes/pexels-serpstat-177219-572056.jpg",
    heroAlt: "Espacio de trabajo con una web y datos de rendimiento",
    portrait: "/imagenes/pexels-fauxels-3183153.jpg",
    portraitAlt: "Equipo coordinando el desarrollo de una solución web",
    detail: "/imagenes/trafico-web-clinica.png",
    detailAlt: "Proyecto web orientado a aumentar el tráfico y las conversiones",
    proof: "/imagenes/hero-resenas.png",
    proofAlt: "Panel digital de gestión y seguimiento de resultados",
  },
  "automatizacion-ia-tenerife": {
    hero: "/imagenes/pexels-cottonbro-6153354.jpg",
    heroAlt: "Colaboración entre una persona y un sistema de inteligencia artificial",
    portrait: "/imagenes/hero-imagen.png",
    portraitAlt: "Automatización ejecutándose desde un dispositivo móvil",
    detail: "/imagenes/resenas-google.png",
    detailAlt: "Ecosistema de herramientas digitales conectadas mediante automatización",
    proof: "/imagenes/pexels-fauxels-3183153.jpg",
    proofAlt: "Equipo analizando procesos que pueden automatizarse",
  },
};

type ServiceLandingProps = {
  config: ServiceLandingConfig;
};

const viewport = { once: true, amount: 0.22 };

export default function ServiceLanding({ config }: ServiceLandingProps) {
  const params = useParams();
  const locale = String(params?.locale ?? "es");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const HeroIcon = iconMap[config.heroIcon] ?? Sparkles;
  const visuals = visualSets[config.slug] ?? visualSets["marketing-digital-tenerife"];

  const revealInitial = reduceMotion ? false : { opacity: 0, y: 34 };
  const revealViewport = reduceMotion ? undefined : viewport;

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

  const tickerItems = [
    ...config.heroKeywords,
    ...config.capabilities.slice(0, 4).map((item) => item.title),
  ];

  return (
    <div className={styles.page} style={themeStyle}>
      <SiteNavbar activeServiceSlug={config.slug} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} />
          <div className={`${styles.orb} ${styles.orbOne}`} />
          <div className={`${styles.orb} ${styles.orbTwo}`} />

          <motion.div
            className={styles.heroCopy}
            initial={reduceMotion ? false : { opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}>{config.eyebrow}</span>
            <h1>
              {config.title} <strong>{config.highlightedTitle}</strong>
            </h1>
            <p>{config.description}</p>

            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={scrollToContact}>
                Solicitar una valoración
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className={styles.heroNote}>
              <span className={styles.noteDot} />
              Primera conversación sin compromiso · Respuesta en menos de 24h
            </div>
          </motion.div>

          <motion.div
            className={styles.heroMedia}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.heroPhoto}>
              <Image
                src={visuals.hero}
                alt={visuals.heroAlt}
                fill
                priority
                sizes="(max-width: 1000px) 90vw, 46vw"
                style={{ objectPosition: visuals.objectPosition }}
              />
              <div className={styles.photoVeil} />
              <div className={styles.photoCaption}>
                <span>AIBE / {config.navLabel}</span>
                <strong>{config.highlightedTitle}</strong>
              </div>
            </div>

            <div className={styles.floatingStatus}>
              <span className={styles.liveDot} />
              Estrategia en movimiento
            </div>

            <div className={styles.floatingIcon} aria-hidden="true">
              <HeroIcon size={31} strokeWidth={1.8} />
            </div>

            <div className={styles.heroDashboard}>
              {config.heroSignals.map((signal, index) => (
                <div className={styles.dashboardItem} key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                  <i style={{ width: `${72 + index * 9}%` }} />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className={styles.marquee} aria-label="Áreas del servicio">
          <div className={styles.marqueeTrack}>
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`}>
                <Sparkles size={15} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <motion.section
          className={styles.outcomes}
          initial={revealInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.outcomeIntro}>
            <span className={styles.sectionEyebrow}>Enfoque AIBE</span>
            <h2>{config.outcomeTitle}</h2>
          </div>
          <div className={styles.outcomeGrid}>
            {config.outcomes.map((outcome, index) => (
              <motion.article
                key={outcome.label}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
              >
                <strong>{outcome.value}</strong>
                <p>{outcome.label}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <section className={styles.visualStory}>
          <motion.div
            className={styles.storyCopy}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.sectionEyebrow}>Una experiencia más visual</span>
            <h2>Ideas que se pueden ver, tocar y entender.</h2>
            <p>
              Combinamos estrategia con materiales visuales, prototipos y datos para que cada decisión sea más clara y el resultado conecte mejor con las personas.
            </p>
            <div className={styles.storyTags}>
              {config.heroKeywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </motion.div>

          <div className={styles.mosaic}>
            <motion.figure
              className={styles.mosaicMain}
              initial={reduceMotion ? false : { opacity: 0, x: 45, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.75 }}
            >
              <Image src={visuals.portrait} alt={visuals.portraitAlt} fill sizes="(max-width: 900px) 90vw, 42vw" />
              {config.slug !== "marketing-digital-tenerife" ? <figcaption>Contenido con contexto real</figcaption> : null}
            </motion.figure>

            <motion.figure
              className={styles.mosaicDetail}
              initial={reduceMotion ? false : { opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              <Image src={visuals.detail} alt={visuals.detailAlt} fill sizes="(max-width: 900px) 43vw, 20vw" />
            </motion.figure>

            <motion.figure
              className={styles.mosaicProof}
              initial={reduceMotion ? false : { opacity: 0, y: -35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <Image src={visuals.proof} alt={visuals.proofAlt} fill sizes="(max-width: 900px) 43vw, 20vw" />
              <span className={styles.proofBadge}>
                <ChartNoAxesCombined size={16} /> Resultados visibles
              </span>
            </motion.figure>
          </div>
        </section>

        <section className={styles.capabilities}>
          <motion.div
            className={styles.sectionHeading}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.sectionEyebrow}>{config.capabilitiesEyebrow}</span>
            <h2>{config.capabilitiesTitle}</h2>
            <p>{config.capabilitiesIntro}</p>
          </motion.div>

          <div className={styles.capabilityGrid}>
            {config.capabilities.map((capability, index) => {
              const CapabilityIcon = iconMap[capability.icon] ?? Sparkles;
              return (
                <motion.article
                  className={styles.capabilityCard}
                  key={capability.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                  whileHover={reduceMotion ? undefined : { y: -10, rotate: index % 2 ? 0.5 : -0.5 }}
                >
                  <div className={styles.cardGlow} />
                  <div className={styles.cardTopline}>
                    <span className={styles.capabilityIcon}>
                      <CapabilityIcon size={25} strokeWidth={1.8} />
                    </span>
                    <span className={styles.cardIndex}>0{index + 1}</span>
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className={styles.process}>
          <motion.div
            className={styles.processHeader}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <div>
              <span className={styles.sectionEyebrow}>{config.processEyebrow}</span>
              <h2>{config.processTitle}</h2>
            </div>
            <p>{config.processIntro}</p>
          </motion.div>

          <div className={styles.processLayout}>
            <motion.div
              className={styles.processImage}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={revealViewport}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={visuals.hero}
                alt=""
                fill
                sizes="(max-width: 900px) 90vw, 38vw"
                style={visuals.objectPosition ? { objectPosition: visuals.objectPosition } : undefined}
              />
              <div className={styles.processImageOverlay}>
                <HeroIcon size={24} />
                <span>Un proceso que se entiende de principio a fin</span>
              </div>
            </motion.div>

            <div className={styles.processList}>
              {config.process.map((step, index) => (
                <motion.article
                  className={styles.processStep}
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                >
                  <span className={styles.processNumber}>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.deliverables}>
          <div className={styles.deliverablesGlow} />
          <motion.div
            className={styles.deliverablesCopy}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <span className={`${styles.sectionEyebrow} ${styles.lightEyebrow}`}>{config.deliverablesEyebrow}</span>
            <h2>{config.deliverablesTitle}</h2>
            <p>{config.deliverablesDescription}</p>

            <ul>
              {config.deliverables.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <span><Check size={17} strokeWidth={2.5} /></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.resultStage}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.75 }}
          >
            <div className={styles.resultImage}>
              <Image
                src={visuals.result ?? visuals.proof}
                alt={visuals.resultAlt ?? visuals.proofAlt}
                fill
                sizes="(max-width: 900px) 90vw, 42vw"
              />
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultCardHeader}>
                <span><HeroIcon size={23} /></span>
                AIBE SYSTEM
              </div>
              <h3>{config.sideCardTitle}</h3>
              <p>{config.sideCardText}</p>
              <div className={styles.resultPills}>
                {config.sideCardItems.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </motion.div>
        </section>

        <section className={styles.faq}>
          <motion.div
            className={styles.faqHeading}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.sectionEyebrow}>{config.faqEyebrow}</span>
            <h2>{config.faqTitle}</h2>
          </motion.div>

          <div className={styles.faqList}>
            {config.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.article
                  className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}
                  key={faq.question}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={22} />
                  </button>
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className={styles.contact} id="contacto">
          <motion.div
            className={styles.contactCopy}
            initial={revealInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65 }}
          >
            <span className={styles.sectionEyebrow}>Primer paso</span>
            <h2>{config.contactTitle}</h2>
            <p>{config.contactText}</p>

            <div className={styles.contactRoutes}>
              <a href="mailto:info@aibetech.es">
                <span>Email</span>
                <strong>info@aibetech.es</strong>
              </a>
              <a href="tel:+34686012685">
                <span>Teléfono</span>
                <strong>686 01 26 85</strong>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <span>WhatsApp</span>
                <strong>Escribir ahora ↗</strong>
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.contactCard}
            initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.formLabel}>Solicitud de información</span>
            <h3>Cuéntanos brevemente tu situación</h3>

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label>
                  Nombre
                  <input name="nombre" type="text" autoComplete="name" required />
                </label>
                <label>
                  Empresa
                  <input name="empresa" type="text" autoComplete="organization" required />
                </label>
              </div>

              <div className={styles.formRow}>
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

              <label className={styles.legalCheck}>
                <input type="checkbox" required />
                <span>
                  Acepto el <Link href={`/${locale}/aviso-legal`}>Aviso Legal</Link> y la{" "}
                  <Link href={`/${locale}/politica-privacidad`}>Política de Privacidad</Link>.
                </span>
              </label>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Enviando..." : "Solicitar valoración"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
