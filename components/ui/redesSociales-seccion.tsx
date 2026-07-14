"use client";

import Image from "next/image";
import SocialMediaAnimation from "./SocialMediaAnimation";

const WHATSAPP_URL =
  "https://wa.me/34686012685?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20gesti%C3%B3n%20de%20redes%20sociales.";

export default function RedesSocialesSection() {
  const logos = [
    "/imagenes/cliente1.png",
    "/imagenes/cliente2.webp",
    "/imagenes/cliente3.png",
    "/imagenes/cliente4.png",
    "/imagenes/cliente5.png",
    "/imagenes/cliente6.png",
  ];

  return (
    <section id="redes" className="social-section">
      <div className="social-container">
        <div className="social-content">
          <span className="eyebrow">REDES SOCIALES</span>

          <h2>Aumenta la visibilidad de tu marca</h2>

          <div className="social-platforms" aria-label="Redes sociales">
            <div className="platform-icon">
              <Image
                src="/imagenes/Instagram-Logo.png"
                alt="Instagram"
                width={42}
                height={42}
                className="instagram-logo"
              />
            </div>

            <div className="platform-icon">
              <Image
                src="/imagenes/logo-tiktok.avif"
                alt="TikTok"
                width={34}
                height={34}
              />
            </div>

            <div className="platform-icon">
              <Image
                src="/imagenes/Logo-Facebook.png"
                alt="Facebook"
                width={34}
                height={34}
              />
            </div>
          </div>

          <a
            className="cta-button"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <div className="social-card">
          <h3>Nosotros nos ocupamos de todo:</h3>
          <SocialMediaAnimation />
        </div>
      </div>

      <div className="trusted-section">
        <p>Confían en nosotros</p>

        <div className="logos-slider">
          <div className="logos-track">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="logo-item">
                <Image
                  src={logo}
                  alt={`Logo cliente ${(index % logos.length) + 1}`}
                  width={180}
                  height={80}
                  className="client-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .social-section {
          background: white;
          padding: 100px 24px;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
          scroll-margin-top: 110px;
        }

        .social-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 70px;
          align-items: center;
        }

        .eyebrow {
          color: #2E7BFF;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
        }

        .social-content h2 {
          font-size: clamp(3rem, 5vw, 4.8rem);
          line-height: 1;
          font-weight: 800;
          color: #111111;
          margin: 0 0 24px;
          letter-spacing: -2px;
        }

        .social-platforms {
          display: flex;
          gap: 16px;
          margin-bottom: 36px;
        }

        .platform-icon {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          background: white;
          border: 1px solid #ececec;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .25s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,.04);
        }

        .platform-icon:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0,0,0,.08);
        }

        .platform-icon img {
          object-fit: contain;
        }

        .instagram-logo {
          transform: scale(1.35);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          background: #25D366;
          color: white;
          padding: 18px 32px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all .3s ease;
          box-shadow: 0 15px 40px rgba(37,211,102,.24);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          background: #1ebe5d;
          box-shadow: 0 20px 50px rgba(37,211,102,.32);
        }

        .social-card {
          background: white;
          border: 1px solid #EAEAEA;
          border-radius: 30px;
          padding: 42px;
          box-shadow: 0 20px 60px rgba(0,0,0,.06);
        }

        .social-card h3 {
          font-size: 1.6rem;
          color: #111111;
          margin: 0 0 30px;
          font-weight: 800;
        }

        .trusted-section {
          max-width: 1200px;
          margin: 90px auto 0;
          text-align: center;
        }

        .trusted-section p {
          color: #888888;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 32px;
        }

        .logos-slider {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .logos-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: scroll 20s linear infinite;
        }

        .logo-item {
          min-width: 220px;
          height: 110px;
          border: 1px solid #ECECEC;
          border-radius: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          padding: 22px;
        }

        .client-logo {
          object-fit: contain;
          width: 100%;
          height: 70px;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .logos-track { animation: none; }
        }

        @media (max-width: 900px) {
          .social-section {
            padding: 80px 20px;
            scroll-margin-top: 90px;
          }

          .social-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .social-content h2 {
            font-size: clamp(2.5rem, 12vw, 3rem);
          }

          .cta-button {
            width: min(100%, 300px);
          }

          .social-card {
            padding: 30px 24px;
          }

          .logo-item {
            min-width: 160px;
            height: 80px;
            padding: 16px;
          }

          .client-logo {
            height: 46px;
          }
        }
      `}</style>
    </section>
  );
}
