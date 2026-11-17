"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { openCookieSettings } from "@/lib/cookie-consent";

const WHATSAPP_NUMBER = "34699301819";

export default function Footer() {
  const params = useParams();
  const locale = String(params?.locale ?? "es");
  const legalBase = `/${locale}`;

  return (
    <footer className="footer">
      <div className="content">
        <div className="brand">
          <Image
            src="/world/aibe-logo-dark.webp"
            alt="aibe"
            width={900}
            height={236}
            className="logo"
            style={{ width: 200, height: "auto", display: "block", marginBottom: 18 }}
          />

          <p className="slogan">Tecnología con sentido humano.</p>

          <p>
            Unimos estrategia, diseño y tecnología para ayudar a los negocios a crecer con una base digital más sólida.
          </p>
        </div>

        <div className="footerColumns">
          <div className="contactBlock">
            <span>Contacto</span>

            <a href="mailto:info@aibetech.es">info@aibetech.es</a>

            <a href="tel:+34699301819">699 301 819</a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="contactBlock">
            <span>Servicios</span>
            <Link href={`${legalBase}/agentes-ia`}>Agentes IA</Link>
            <Link href={`${legalBase}/marketing-digital`}>Marketing digital</Link>
          </div>

          <div className="contactBlock">
            <span>Privacidad</span>
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
          background: #001E4B;
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
          flex: 0 1 440px;
          max-width: 520px;
        }

        .logo {
          display: block;
          width: 200px;
          height: auto;
          margin-bottom: 18px;
          filter: none;
        }

        .brand .slogan {
          margin: 0 0 14px;
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .brand p {
          margin: 0;
          color: #aeb8c7;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .footerColumns {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(145px, 1fr));
          gap: clamp(28px, 4vw, 56px);
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
            gap: 40px;
          }

          .brand {
            flex: none;
            max-width: none;
          }

          .footerColumns {
            grid-template-columns: 1fr;
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
