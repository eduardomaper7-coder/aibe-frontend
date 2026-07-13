"use client";

import Image from "next/image";

const featuredImage = "/imagenes/imagen-hero-4.JPG";

export default function AibeSection() {
  return (
    <section id="aibe" className="aibeSection">
      <div className="titleWrap">
        <h2>
          <span>Haz visible tu negocio donde tus clientes deciden.</span>
          <span>Google, redes sociales y buscadores con IA.</span>
        </h2>
      </div>

      <div className="featureWrap">
        <div className="photoStage">
          <div className="imageCard">
            <Image
              src={featuredImage}
              alt="Equipo de la clínica mostrando un modelo dental"
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 660px"
              priority
              className="image"
            />
            <div className="imageShade" aria-hidden="true" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .aibeSection {
          padding: 110px 0 70px;
          background:
            radial-gradient(circle at 16% 78%, rgba(46, 123, 255, 0.08), transparent 28%),
            radial-gradient(circle at 88% 35%, rgba(112, 88, 255, 0.07), transparent 26%),
            #ffffff;
          overflow: hidden;
          font-family: "Montserrat", sans-serif;
          scroll-margin-top: 110px;
        }

        .titleWrap {
          width: min(100%, 1500px);
          margin: 0 auto 60px;
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

        .featureWrap {
          width: min(100%, 1500px);
          margin: 0 auto;
          padding: 0 4%;
        }

        .photoStage {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 520px;
          padding: 42px;
          isolation: isolate;
        }

        .photoStage::before {
          content: "";
          position: absolute;
          inset: 8% 14%;
          z-index: -2;
          border-radius: 52px;
          background: linear-gradient(135deg, #edf4ff 0%, #f6f2ff 55%, #eef8ff 100%);
          transform: rotate(-2.5deg);
        }

        .photoStage::after {
          content: "";
          position: absolute;
          width: min(74vw, 780px);
          height: min(74vw, 780px);
          z-index: -1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(46, 123, 255, 0.2), rgba(46, 123, 255, 0) 68%);
          filter: blur(18px);
        }

        .imageCard {
          position: relative;
          width: min(100%, 660px);
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 10px solid rgba(255, 255, 255, 0.94);
          border-radius: 34px;
          background: #f3f7ff;
          box-shadow:
            0 34px 90px rgba(23, 54, 112, 0.19),
            0 10px 28px rgba(23, 54, 112, 0.1);
          transform: translateZ(0);
        }

        .image {
          object-fit: cover;
          object-position: center 42%;
          transition: transform 700ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .imageShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(9, 27, 63, 0) 70%, rgba(9, 27, 63, 0.08) 100%);
        }

        .imageCard:hover :global(.image) {
          transform: scale(1.025);
        }

        @media (max-width: 900px) {
          .aibeSection {
            padding: 78px 0 40px;
            scroll-margin-top: 90px;
          }

          .titleWrap {
            padding: 0 20px;
            margin-bottom: 34px;
          }

          h2 {
            font-size: clamp(2.05rem, 9vw, 2.6rem);
            letter-spacing: -0.045em;
          }

          .featureWrap {
            padding: 0 20px;
          }

          .photoStage {
            min-height: 0;
            padding: 24px 10px;
          }

          .photoStage::before {
            inset: 5% 0;
            border-radius: 32px;
            transform: rotate(-1.5deg);
          }

          .imageCard {
            width: min(100%, 520px);
            border-width: 7px;
            border-radius: 26px;
            box-shadow:
              0 24px 58px rgba(23, 54, 112, 0.17),
              0 8px 20px rgba(23, 54, 112, 0.09);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image {
            transition: none;
          }

          .imageCard:hover :global(.image) {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
