"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/imagenes/imagen-hero-1.png",
  "/imagenes/imagen-hero-4.JPG",
  "/imagenes/imagen-hero-2.jpeg",
];

export default function AibeSection() {
  const [mobileImage, setMobileImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="aibe" className="aibeSection">
      <div className="titleWrap">
        <h2>
          <span>Haz visible tu negocio donde tus clientes deciden.</span>
          <span>Google, redes sociales y buscadores con IA.</span>
        </h2>
      </div>

      <div className="slider">
        <div className="mobileSingleImage">
          <div className="imageCard mobileCard">
            <Image
              src={images[mobileImage]}
              alt="Proyecto AIBE"
              fill
              className="image"
            />
          </div>
        </div>

        <div className="group">
          <div className="imageCard wide">
            <Image src={images[0]} alt="Proyecto AIBE" fill className="image" />
          </div>

          <div className="imageCard vertical">
            <Image src={images[1]} alt="Proyecto AIBE" fill className="image" />
          </div>

          <div className="imageCard extraWide">
            <Image src={images[2]} alt="Proyecto AIBE" fill className="image" />
          </div>
        </div>
      </div>

      <style jsx>{`
  .aibeSection {
    padding: 110px 0 40px;
    background: #ffffff;
    overflow: hidden;
    font-family: "Montserrat", sans-serif;
  }

  .titleWrap {
    width: 100vw;
    margin: 0 0 70px;
    padding: 0 4%;
  }

  h2 {
    max-width: 1350px;
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

  .slider {
    width: 100%;
    overflow: hidden;
  }

  .mobileSingleImage {
    display: none;
  }

  .group {
    width: 100vw;
    display: flex;
    gap: 16px;
    padding-left: 2%;
    padding-right: 0;
  }

  .imageCard {
    position: relative;
    height: 460px;
    overflow: hidden;
    border-radius: 18px;
    background: #f3f7ff;
    flex-shrink: 0;
  }

  .imageCard.extraWide {
    width: 38%;
  }

  .imageCard.wide {
    width: 36%;
  }

  .imageCard.vertical {
    width: 20%;
  }

  .image {
    object-fit: cover;
  }

  @media (max-width: 900px) {
    .aibeSection {
      padding: 80px 0 10px;
    }

    .titleWrap {
      padding: 0 22px;
      margin-bottom: 40px;
    }

    h2 {
      font-size: 2.3rem;
    }

    .group {
      display: none;
    }

    .mobileSingleImage {
      display: block;
      padding: 0 22px;
    }

    .mobileCard {
      width: 100%;
      height: 360px;
    }
  }
`}</style>
    </section>
  );
}