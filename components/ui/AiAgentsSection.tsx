"use client";

import AiAgentsAnimation from "./AiAgentsAnimation";

export default function AiAgentsSection() {
  return (
    <section id="ia" className="aiAgentsSection">
      <div className="titleWrap">
        <h2>
          Haz que ChatGPT, Gemini y Claude recomienden tu negocio.
        </h2>

        <p>
          Optimizamos tu presencia digital para que los nuevos buscadores con IA
          entiendan, confíen y muestren tu empresa cuando tus clientes preguntan.
        </p>

        <div className="logos">
          
        </div>
      </div>

      <AiAgentsAnimation />

      <style jsx>{`
        .aiAgentsSection {
          padding: 90px 6% 120px;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
          overflow: hidden;
        }

        .titleWrap {
          max-width: 1350px;
          margin: 0 0 60px;
        }

        h2 {
          max-width: 1200px;
          color: #111111;
          font-size: clamp(2.8rem, 4.4vw, 5rem);
          line-height: 1.08;
          letter-spacing: -0.06em;
          font-weight: 300;
          text-align: left;
          margin: 0 0 24px;
        }

        p {
          max-width: 780px;
          color: #4b5563;
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
          line-height: 1.55;
          margin: 0 0 28px;
          font-weight: 500;
        }

        .logos {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .logos span {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 999px;
          padding: 12px 18px;
          color: #111111;
          font-weight: 800;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 900px) {
          .aiAgentsSection {
            padding: 70px 22px 90px;
          }

          h2 {
            font-size: 2.3rem;
          }

          .titleWrap {
            margin-bottom: 36px;
          }
        }
      `}</style>
    </section>
  );
}