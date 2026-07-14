"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    icon: "💡",
    title: "Idea",
    subtitle: "Ideas originales y creativas",
  },
  {
    icon: "🎥",
    title: "Grabación",
    subtitle: "Contenido profesional",
  },
  {
    icon: "✂️",
    title: "Edición",
    subtitle: "Vídeos optimizados",
  },
  {
    icon: "📲",
    title: "Publicación",
    subtitle: "Instagram · TikTok · Facebook",
  },
  {
    icon: "📈",
    title: "Resultados",
    subtitle: "Métricas y crecimiento",
  },
];

export default function SocialMediaAnimation() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="animation-container">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`step ${active === index ? "active" : ""}`}
          >
            <div className="icon">{step.icon}</div>

            <div className="content">
              <h4>{step.title}</h4>
              <p>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animation-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border-radius: 18px;
          background: #f7f7f7;
          border: 1px solid #ececec;
          transition: all .45s ease;
          opacity: .55;
        }

        .step.active {
          background: #2e7bff;
          border-color: #2e7bff;
          transform: translateX(10px);
          opacity: 1;
          box-shadow: 0 18px 40px rgba(46,123,255,.25);
        }

        .icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .content h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #111;
          transition: .3s;
        }

        .content p {
          margin: 4px 0 0;
          font-size: .9rem;
          color: #666;
          transition: .3s;
        }

        .step.active .content h4,
        .step.active .content p {
          color: white;
        }

        @media (max-width: 900px) {
          .step.active {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}