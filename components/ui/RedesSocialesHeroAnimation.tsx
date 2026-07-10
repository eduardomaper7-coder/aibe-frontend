"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Sparkles,
  Lightbulb,
  Camera,
  Scissors,
  Send,
  BarChart3,
  Instagram,
  Facebook,
  Music2,
} from "lucide-react";

const slides = [
  {
    icon: MapPin,
    text: "Por todo Tenerife",
  },
  {
    icon: Sparkles,
    text: "Nosotros nos encargamos de todo",
  },
  {
    icon: Lightbulb,
    text: "Elaboramos ideas y guiones creativos",
  },
  {
    icon: Camera,
    text: "Grabamos el contenido",
  },
  {
    icon: Scissors,
    text: "Editamos de forma profesional",
  },
  
  {
    icon: BarChart3,
    text: "Analizamos qué funciona",
  },
];

export default function RedesSocialesHeroAnimation() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaving(true);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setLeaving(false);
      }, 350);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = slides[current].icon;

  return (
    <div className="animationBox">
      <div className={`sliderCard ${leaving ? "leaving" : "entering"}`}>
        <div className="iconCircle">
          <CurrentIcon size={38} strokeWidth={2.4} />
        </div>

        <h3>{slides[current].text}</h3>

        <div className="socials">
          <span>
            <Instagram size={16} />
            Instagram
          </span>

          <span>
            <Music2 size={16} />
            TikTok
          </span>

          <span>
            <Facebook size={16} />
            Facebook
          </span>
        </div>
      </div>

      <div className="dots">
        {slides.map((slide, index) => (
          <span
            key={slide.text}
            className={index === current ? "active" : ""}
          />
        ))}
      </div>

      <style jsx>{`
        .animationBox {
          width: 100%;
          max-width: 430px;
        }

        .sliderCard {
  height: 270px;
  padding: 30px;

  display: flex;
  flex-direction: column;

  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14px);

  overflow: hidden;
}

        .sliderCard.entering {
          animation: enterCard 0.35s ease forwards;
        }

        .sliderCard.leaving {
          animation: leaveCard 0.35s ease forwards;
        }

        .iconCircle {
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          margin-bottom: 24px;
          border-radius: 50%;
          background: #2e7bff;
          color: white;
          box-shadow: 0 15px 35px rgba(46, 123, 255, 0.35);
        }

        h3 {
          margin: 0;
          color: #050505;
          font-size: clamp(1.55rem, 2.2vw, 2rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 800;
        }

        .socials {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;

  margin-top: auto;
  padding-top: 24px;
}

        .socials span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 999px;
          background: #050505;
          color: white;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .dots {
          display: flex;
          gap: 7px;
          margin-top: 14px;
          padding-left: 4px;
        }

        .dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          transition: 0.25s ease;
        }

        .dots span.active {
          width: 24px;
          border-radius: 999px;
          background: #2e7bff;
        }

        @keyframes enterCard {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes leaveCard {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          to {
            opacity: 0;
            transform: translateY(-16px) scale(0.98);
          }
        }

       @media (max-width: 640px) {
  .sliderCard {
    height: 270px;
    padding: 24px;
  }

          .iconCircle {
            width: 66px;
            height: 66px;
            margin-bottom: 20px;
          }

          h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}