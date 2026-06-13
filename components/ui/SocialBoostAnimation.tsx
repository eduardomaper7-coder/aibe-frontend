"use client";

import Image from "next/image";

export default function SocialBoostAnimation() {
  return (
    <div className="socialBoost">
      <div className="logos">
        <Image src="/imagenes/logo-instagram.png" alt="Instagram" width={72} height={72} />
        <Image src="/imagenes/logo-tiktok.avif" alt="TikTok" width={72} height={72} />
        <Image src="/imagenes/Logo-Facebook.png" alt="Facebook" width={72} height={72} />
      </div>

      <div className="metrics">
        <div className="metric">
          <small>Visualizaciones</small>
          <strong className="views">24.800</strong>
        </div>

        <div className="metric">
          <small>Alcance</small>
          <strong className="reach">18.600</strong>
        </div>

        <div className="metric">
          <small>Interacciones</small>
          <strong className="engagement">3.200</strong>
        </div>
      </div>

      <svg viewBox="0 0 460 120" className="chart">
        <path d="M14 98 C80 90, 115 74, 165 76 C220 78, 252 48, 310 38 C365 28, 395 18, 446 12" />
      </svg>

      <style jsx>{`
        .socialBoost {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          border: 1px solid #edf1f7;
          background: transparent;
          padding: 42px;
          overflow: hidden;
          font-family: "Montserrat", sans-serif;
          display: grid;
          align-content: center;
          gap: 34px;
        }

        .logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(26px, 5vw, 56px);
          animation: logosEnter 7s ease-in-out infinite;
        }

        .logos :global(img) {
          object-fit: contain;
          animation: logoFloat 7s ease-in-out infinite;
        }

        .logos :global(img:nth-child(2)) {
          animation-delay: 0.18s;
        }

        .logos :global(img:nth-child(3)) {
          animation-delay: 0.36s;
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .metric {
          border: 1px solid #edf1f7;
          border-radius: 22px;
          background: #fff;
          padding: 18px;
          text-align: center;
          animation: metricAppear 7s ease-in-out infinite;
        }

        .metric small {
          display: block;
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .metric strong {
          color: #2e7bff;
          font-size: clamp(1.6rem, 3vw, 2.35rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          display: inline-block;
          overflow: hidden;
          height: 1.1em;
          line-height: 1.1;
        }

        .views::before,
        .reach::before,
        .engagement::before {
          display: block;
          animation: countUp 7s ease-in-out infinite;
        }

        .views::before {
          content: "1.200\\A 6.900\\A 12.400\\A 19.800\\A 24.800";
        }

        .reach::before {
          content: "850\\A 4.700\\A 9.200\\A 14.500\\A 18.600";
        }

        .engagement::before {
          content: "140\\A 760\\A 1.480\\A 2.400\\A 3.200";
        }

        .chart {
          width: 100%;
          height: 78px;
        }

        .chart path {
          fill: none;
          stroke: #2e7bff;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-dasharray: 520;
          stroke-dashoffset: 520;
          animation: drawLine 7s ease-in-out infinite;
        }

        @keyframes logosEnter {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          16%,
          92% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        @keyframes logoFloat {
          0%,
          20% {
            transform: translateY(0) scale(1);
          }
          48% {
            transform: translateY(-8px) scale(1.06);
          }
          76% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes metricAppear {
          0%,
          20% {
            opacity: 0;
            transform: translateY(14px);
          }
          38%,
          92% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        @keyframes countUp {
          0%,
          28% {
            transform: translateY(0);
          }
          42% {
            transform: translateY(-1.1em);
          }
          56% {
            transform: translateY(-2.2em);
          }
          70% {
            transform: translateY(-3.3em);
          }
          84%,
          100% {
            transform: translateY(-4.4em);
          }
        }

        @keyframes drawLine {
          0%,
          34% {
            stroke-dashoffset: 520;
          }
          78%,
          100% {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 700px) {
          .socialBoost {
            padding: 24px;
            gap: 22px;
          }

          .logos :global(img) {
            width: 48px;
            height: 48px;
          }

          .metrics {
            grid-template-columns: 1fr;
          }

          .chart {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}