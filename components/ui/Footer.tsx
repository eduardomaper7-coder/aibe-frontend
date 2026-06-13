"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="content">
        <div className="brand">
          <Image
            src="/imagenes/logo.png"
            alt="AIBE"
            width={220}
            height={70}
            className="logo"
          />

          <p>
            Impulsamos negocios mediante Google, redes sociales y buscadores con IA.
          </p>
        </div>

        <div className="contactBlock">
          <span>Contacto</span>

          <a href="mailto:info@aibetech.es">
            info@aibetech.es
          </a>

          <a href="tel:+34699301819">
            699 30 18 19
          </a>

          <a
            href="https://wa.me/34699301819"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="bottom">
        <p>© 2026 AIBE Technologies</p>

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
          margin-bottom: 24px;
          height: auto;
        }

        .brand p {
          margin: 0;
          color: #aeb8c7;
          font-size: 1.1rem;
          line-height: 1.7;
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

        .contactBlock a {
          color: white;
          text-decoration: none;
          font-size: 1.15rem;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .contactBlock a:hover {
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
          .content {
            flex-direction: column;
            gap: 50px;
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