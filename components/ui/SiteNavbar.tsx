"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import styles from "./SiteNavbar.module.css";

const WHATSAPP_NUMBER = "34699301819";

type SiteNavbarProps = {
  activeMarketingSlug?: string;
};

export default function SiteNavbar({
  activeMarketingSlug,
}: SiteNavbarProps) {
  const params = useParams();
  const pathname = usePathname();

  const locale = String(params?.locale ?? "es");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const scrollToContact = () => {
    const target =
      document.getElementById("contact-formulario") ??
      document.getElementById("contacto");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setMobileMenuOpen(false);
      return;
    }

    window.location.assign(`/${locale}/marketing-digital#contacto`);
  };

  const sectionHref = (section: "google" | "ia") => {
    const marketingPath = `/${locale}/marketing-digital`;
    const isMarketing =
      pathname === marketingPath ||
      pathname === `${marketingPath}/`;

    return isMarketing
      ? `#${section}`
      : `${marketingPath}#${section}`;
  };

  return (
    <header className={styles.header}>
      {/* NAVEGACIÓN IZQUIERDA - ESCRITORIO */}
      <nav
        className={`${styles.navSide} ${styles.navLeft} ${styles.desktopNav}`}
        aria-label="Navegación principal"
      >
        <button
          type="button"
          onClick={scrollToContact}
          className={styles.navLink}
        >
          Contacto
        </button>

        <Link className={styles.navLink} href={`/${locale}/agentes-ia`}>
          Agentes IA
        </Link>
      </nav>

      {/* LOGO CENTRAL */}
      <Link
        href={`/${locale}`}
        className={styles.logoLink}
        aria-label="Ir al inicio"
      >
        <Image
          src="/world/aibe-logo-v2.webp"
          alt="aibe"
          width={480}
          height={126}
          priority
          unoptimized
          className={styles.logo}
        />
      </Link>

      {/* NAVEGACIÓN DERECHA - ESCRITORIO */}
      <nav
        className={`${styles.navSide} ${styles.navRight} ${styles.desktopNav}`}
        aria-label="Soluciones destacadas"
      >
        <Link
          className={styles.navLink}
          href={sectionHref("ia")}
        >
          Buscadores con IA
        </Link>

      </nav>

      {/* ACCIONES MÓVILES */}
      <div className={styles.mobileActions}>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
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
          className={styles.menuButton}
          onClick={() => {
            setMobileMenuOpen((open) => !open);
          }}
          aria-label={
            mobileMenuOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="site-mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <nav
          className={styles.mobileMenu}
          id="site-mobile-navigation"
          aria-label="Navegación móvil"
        >
          <Link
            href={`/${locale}`}
            className={styles.mobileMainLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>

          <button
            type="button"
            className={styles.mobileMainLink}
            onClick={scrollToContact}
          >
            Contacto
          </button>

          <Link
            className={styles.mobileMainLink}
            href={`/${locale}/agentes-ia`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Agentes IA
          </Link>

          <Link
            className={styles.mobileMainLink}
            href={sectionHref("google")}
            onClick={() => setMobileMenuOpen(false)}
          >
            Google
          </Link>

          <Link
            className={styles.mobileMainLink}
            href={sectionHref("ia")}
            onClick={() => setMobileMenuOpen(false)}
          >
            Buscadores con IA
          </Link>
        </nav>
      )}
    </header>
  );
}