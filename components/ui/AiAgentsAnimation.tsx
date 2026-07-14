"use client";

import Image from "next/image";

const agents = [
  {
    name: "ChatGPT",
    logo: "/imagenes/logo-chatgpt.png",
  },
  {
    name: "Gemini",
    logo: "/imagenes/logo-gemini.png",
  },
  {
    name: "Claude",
    logo: "/imagenes/logo-claude.png",
  },
];

export default function AiAgentsAnimation() {
  return (
    <div className="animationBox">
      <div className="questionCard">
        <span>Pregunta de un cliente</span>
        <h3>¿Cuál es la mejor empresa cerca de mí?</h3>
      </div>

      <div className="agents">
        {agents.map((agent, index) => (
          <div
            className="agent"
            key={agent.name}
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            <Image
              src={agent.logo}
              alt={agent.name}
              width={80}
              height={80}
              className="logoImage"
            />

            <p>
              Analizando reputación, web, reseñas y autoridad...
            </p>
          </div>
        ))}
      </div>

      <div className="answerCard">
        <span>Respuesta generada por IA</span>

        <h3>Te recomiendo Tu Empresa.</h3>

        <p>
          Tiene una presencia digital sólida, buenas valoraciones y aparece como
          una opción relevante para este servicio.
        </p>
      </div>

      <style jsx>{`
        .animationBox {
          min-height: 560px;
          border-radius: 38px;
          background:
            radial-gradient(
              circle at top left,
              rgba(46, 123, 255, 0.18),
              transparent 35%
            ),
            linear-gradient(135deg, #07111f, #101827);
          padding: 42px;
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          gap: 28px;
          align-items: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.16);
          overflow: hidden;
        }

        .questionCard,
        .answerCard,
        .agent {
          background: rgba(255, 255, 255, 0.94);
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
        }

        .questionCard {
          animation: float 4s ease-in-out infinite;
        }

        .answerCard {
          animation: glow 2.8s ease-in-out infinite;
        }

        span {
          color: #2e7bff;
          font-weight: 900;
          font-size: 0.85rem;
        }

        h3 {
          color: #111111;
          font-size: clamp(1.6rem, 2.4vw, 2.8rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin: 12px 0 0;
        }

        p {
          color: #4b5563;
          line-height: 1.55;
          margin: 12px 0 0;
          font-weight: 500;
        }

        .agents {
          display: grid;
          gap: 22px;
        }

        .agent {
          animation: agentPulse 2.5s ease-in-out infinite;
          text-align: left;
        }

        .logoImage {
          width: 80px;
          height: 80px;
          object-fit: contain;
          display: block;
          margin-bottom: 16px;
        }

        .agent p {
          margin: 0;
          font-size: 0.95rem;
          color: #4b5563;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
          }
          50% {
            box-shadow: 0 20px 60px rgba(46, 123, 255, 0.45);
          }
        }

        @keyframes agentPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.035);
          }
        }

        @media (max-width: 1000px) {
  .animationBox {
    grid-template-columns: 1fr;
    min-height: 760px;
    padding: 24px;
    gap: 28px;
    align-content: start;
  }

  .questionCard,
  .answerCard,
  .agent {
    border-radius: 22px;
    padding: 20px;
  }

  .agents {
    gap: 14px;
  }

  .agent {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .logoImage {
    width: 52px;
    height: 52px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .answerCard {
    margin-top: 70px;
  }

  h3 {
    font-size: 1.55rem;
  }

  p {
    font-size: 0.9rem;
  }

  .agent p {
    font-size: 0.82rem;
  }
}
      `}</style>
    </div>
  );
}