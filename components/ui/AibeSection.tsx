"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/imagenes/imagen-hero-1.png",
  "/imagenes/imagen-hero-4.JPG",
  "/imagenes/imagen-hero-2.jpeg",
];

export default function AibeSection() {
  const [mounted, setMounted] = useState(false);
  const [mobileImage, setMobileImage] = useState(0);

  useEffect(() => {
    setMounted(true);

    const interval = window.setInterval(() => {
      setMobileImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section id="aibe" className="aibeSection">
      <div className="titleWrap">
        <h2>
          <span>Haz visible tu negocio donde tus clientes deciden.</span>
          <span>Google, redes sociales y buscadores con IA.</span>
        </h2>
      </div>

      <div className="galleryWrap">
        <div className="mobileSingleImage">
          <div className="imageCard mobileCard">
            <Image
              src={images[mobileImage]}
              alt="Proyecto de marketing digital de AIBE Technologies"
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 0px"
              priority={mobileImage === 0}
              className="image"
            />
          </div>
        </div>

        <div className="gallery">
          <div className="imageCard wide">
            <Image
              src={images[0]}
              alt="Proyecto de marketing digital de AIBE Technologies"
              fill
              sizes="(max-width: 1400px) 38vw, 520px"
              priority
              className="image"
            />
          </div>

          <div className="imageCard vertical">
            <Image
              src={images[1]}
              alt="Equipo trabajando en una estrategia digital"
              fill
              sizes="(max-width: 1400px) 24vw, 330px"
              className="image portraitImage"
            />
          </div>

          <div className="imageCard extraWide">
            <Image
              src={images[2]}
              alt="Proyecto de visibilidad online de AIBE Technologies"
              fill
              sizes="(max-width: 1400px) 34vw, 480px"
              className="image"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .aibeSection {
          padding: 110px 0 48px;
          background: #ffffff;
          overflow: hidden;
          font-family: "Montserrat", sans-serif;
          scroll-margin-top: 110px;
        }

        .titleWrap {
          width: min(100%, 1500px);
          margin: 0 auto 64px;
          padding: 0 4%;
        }

        h2 {
          max-width: 1350px;
          margin: 0;
          color: #111111;
          font-size: clamp(2.8rem, 4.4vw, 5rem);
          line-height: 1.08;
          letter-spacing: -0.06em;
          font-weight: 300;
          text-align: left;
        }

        h2 span {
          display: block;
        }

        h2 span:nth-child(2) {
          color: #2e7bff;
        }

        .galleryWrap {
          width: min(100%, 1500px);
          margin: 0 auto;
          padding: 0 4%;
        }

        .mobileSingleImage {
          display: none;
        }

        .gallery {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.72fr) minmax(0, 1.08fr);
          gap: 18px;
        }

        .imageCard {
          position: relative;
          min-width: 0;
          height: clamp(330px, 34vw, 470px);
          overflow: hidden;
          border-radius: 22px;
          background: #f3f7ff;
          isolation: isolate;
        }

        .image {
          object-fit: cover;
          object-position: center;
        }

        .portraitImage {
          object-position: center 35%;
        }

        @media (max-width: 900px) {
          .aibeSection {
            padding: 78px 0 22px;
            scroll-margin-top: 90px;
          }

          .titleWrap {
            padding: 0 20px;
            margin-bottom: 36px;
          }

          h2 {
            font-size: clamp(2.05rem, 9vw, 2.6rem);
            letter-spacing: -0.045em;
          }

          .galleryWrap {
            padding: 0 20px;
          }

          .gallery {
            display: none;
          }

          .mobileSingleImage {
            display: block;
          }

          .mobileCard {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            border-radius: 20px;
          }
        }
      `}</style>
    </section>
  );
}
