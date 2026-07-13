"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { openCookieSettings } from "@/lib/cookie-consent";

const WHATSAPP_NUMBER = "34686012685";

export default function Footer() {
  const params = useParams();
  const locale = String(params?.locale ?? "es");
  const legalBase = `/${locale}`;

  return (
    <footer className="footer">
      <div className="content">
        <div className="brand">
          <Image
            src="/imagenes/logo-footer.png"
            alt="AIBE Technologies"
            width={256}
            height={100}
            className="logo"
          />

          <p>
            Impulsamos negocios mediante Google, redes sociales y buscadores con IA.
          </p>
        </div>

        <div className="footerColumns">
          <div className="contactBlock">
            <span>Contacto</span>

            <a href="mailto:info@aibetech.es">info@aibetech.es</a>

            <a href="tel:+34686012685">686 01 26 85</a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="contactBlock">
            <span>Legal</span>
            <Link href={`${legalBase}/aviso-legal`}>Aviso legal</Link>
            <Link href={`${legalBase}/politica-privacidad`}>
              Política de privacidad
            </Link>
            <Link href={`${legalBase}/politica-cookies`}>
              Política de cookies
            </Link>
            <button type="button" onClick={openCookieSettings}>
              Configurar cookies
            </button>
          </div>
        </div>
      </div>

      <div className="bottom">
        <p>
          © 2026 <strong>AIBE Technologies</strong>
        </p>

        <a
          href="https://www.linkedin.com/company/120514369/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>

      <style jsx>{`
        .footer {
          background: #07111f;
          padding: 90px 6% 36px;
          color: white;
          font-family: "Montserrat", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: rgba(46, 123, 255, 0.08);
          top: -350px;
          right: -250px;
          filter: blur(40px);
        }

        .content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          gap: 80px;
          margin-bottom: 60px;
        }

        .brand {
          max-width: 520px;
        }

        .logo {
          display: block;
          width: 220px;
          height: auto;
          margin-bottom: 24px;
          filter: none;
        }

        .brand p {
          margin: 0;
          color: #aeb8c7;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .footerColumns {
          display: flex;
          gap: clamp(48px, 7vw, 100px);
        }

        .contactBlock {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .contactBlock span {
          color: #74a8ff;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.85rem;
          margin-bottom: 10px;
        }

        .contactBlock a,
        .contactBlock button {
          color: white;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .contactBlock button {
          appearance: none;
          padding: 0;
          background: transparent;
          border: 0;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }

        .contactBlock a:hover,
        .contactBlock button:hover {
          color: #74a8ff;
        }

        .bottom {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bottom p {
          margin: 0;
          color: #7f8ba0;
          font-size: 0.95rem;
        }

        .bottom strong {
          color: #ffffff;
          font-weight: 700;
        }

        .bottom a {
          color: white;
          text-decoration: none;
          font-weight: 700;
          transition: 0.25s ease;
        }

        .bottom a:hover {
          color: #74a8ff;
        }

        @media (max-width: 900px) {
          .footer {
            padding: 70px 24px 30px;
          }

          .content,
          .footerColumns {
            flex-direction: column;
          }

          .content {
            gap: 46px;
          }

          .footerColumns {
            gap: 38px;
          }

          .bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
