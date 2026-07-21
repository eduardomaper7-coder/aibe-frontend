"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import { serviceNavigation } from "@/lib/service-landings";
import styles from "./SiteNavbar.module.css";

const WHATSAPP_NUMBER = "34686012685";

const alicanteNavigation = [
  {
    slug: "marketing-digital-alicante",
    label: "Marketing digital en Alicante",
  },
  {
    slug: "seo-alicante",
    label: "SEO en Alicante",
  },
  {
    slug: "diseno-web-alicante",
    label: "Diseño web en Alicante",
  },
  {
    slug: "google-ads-alicante",
    label: "Google Ads en Alicante",
  },
  {
    slug: "gestion-redes-sociales-alicante",
    label: "Gestión de redes sociales en Alicante",
  },
] as const;

type SiteNavbarProps = {
  activeServiceSlug?: string;
  activeAlicanteSlug?: string;
};

export default function SiteNavbar({
  activeServiceSlug,
  activeAlicanteSlug,
}: SiteNavbarProps) {
  const params = useParams();
  const pathname = usePathname();

  const locale = String(params?.locale ?? "es");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const localizedHref = (slug: string) => `/${locale}/${slug}`;

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

    window.location.assign(`/${locale}/#contacto`);
  };

  const sectionHref = (section: "google" | "ia") => {
    const isHome =
      pathname === `/${locale}` ||
      pathname === `/${locale}/`;

    return isHome
      ? `#${section}`
      : `/${locale}/#${section}`;
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

        {/* SERVICIOS EN TENERIFE */}
        <div className={styles.servicesDropdown}>
          <button
            type="button"
            className={styles.navLink}
            aria-haspopup="true"
          >
            Tenerife

            <ChevronDown
              className={styles.chevron}
              size={16}
              strokeWidth={2.3}
              aria-hidden="true"
            />
          </button>

          <div className={styles.dropdownMenu}>
            <span className={styles.dropdownEyebrow}>
              Servicios en Tenerife
            </span>

            <div className={styles.dropdownLinks}>
              {serviceNavigation.map((item) => (
                <Link
                  key={item.slug}
                  href={localizedHref(item.slug)}
                  className={
                    item.slug === activeServiceSlug
                      ? styles.active
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* LOGO CENTRAL */}
      <Link
        href={`/${locale}`}
        className={styles.logoLink}
        aria-label="Ir al inicio"
      >
        <Image
          src="/imagenes/logo.png"
          alt="AIBE Technologies"
          width={190}
          height={54}
          priority
          className={styles.logo}
        />
      </Link>

      {/* NAVEGACIÓN DERECHA - ESCRITORIO */}
      <nav
        className={`${styles.navSide} ${styles.navRight} ${styles.desktopNav}`}
        aria-label="Servicios en Alicante y soluciones destacadas"
      >
        {/* SERVICIOS EN ALICANTE */}
        <div className={styles.servicesDropdown}>
          <button
            type="button"
            className={styles.navLink}
            aria-haspopup="true"
          >
            Alicante

            <ChevronDown
              className={styles.chevron}
              size={16}
              strokeWidth={2.3}
              aria-hidden="true"
            />
          </button>

          <div className={styles.dropdownMenu}>
            <span className={styles.dropdownEyebrow}>
              Servicios en Alicante
            </span>

            <div className={styles.dropdownLinks}>
              {alicanteNavigation.map((item) => (
                <Link
                  key={item.slug}
                  href={localizedHref(item.slug)}
                  className={
                    item.slug === activeAlicanteSlug
                      ? styles.active
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

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

          {/* SERVICIOS EN TENERIFE - MÓVIL */}
          <div className={styles.mobileServices}>
            <span>Servicios en Tenerife</span>

            {serviceNavigation.map((item) => (
              <Link
                key={item.slug}
                href={localizedHref(item.slug)}
                className={
                  item.slug === activeServiceSlug
                    ? styles.mobileActive
                    : undefined
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* SERVICIOS EN ALICANTE - MÓVIL */}
          <div className={styles.mobileServices}>
            <span>Servicios en Alicante</span>

            {alicanteNavigation.map((item) => (
              <Link
                key={item.slug}
                href={localizedHref(item.slug)}
                className={
                  item.slug === activeAlicanteSlug
                    ? styles.mobileActive
                    : undefined
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

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