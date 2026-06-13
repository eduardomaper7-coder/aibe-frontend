"use client";


import { useEffect, useState } from "react";
import Image from "next/image";


const imageGroups = [
  [
    "/imagenes/imagen-hero-1.png",
    "/imagenes/imagen-hero-4.JPG",
    "/imagenes/imagen-hero-2.jpeg",
  ],
  [
    "/imagenes/imagen-hero-5.jpeg",
    "/imagenes/imagen-hero-6.jpeg",
    "/imagenes/imagen-hero-3.jpg",
  ],
];


export default function AibeSection() {
  const [group, setGroup] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [noTransition, setNoTransition] = useState(false);


  const nextGroup = (group + 1) % imageGroups.length;


  useEffect(() => {
    const interval = setInterval(() => {
      setNoTransition(false);
      setSliding(true);


      setTimeout(() => {
        setNoTransition(true);
        setGroup((prev) => (prev + 1) % imageGroups.length);
        setSliding(false);
      }, 900);


      setTimeout(() => {
        setNoTransition(false);
      }, 950);
    }, 20000);


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
        <div
          className={`track ${sliding ? "slide" : ""} ${
            noTransition ? "noTransition" : ""
          }`}
        >
          <div className="group">
            <div className="imageCard wide">
              <Image src={imageGroups[group][0]} alt="Proyecto AIBE" fill className="image" />
            </div>


            <div className="imageCard vertical">
              <Image src={imageGroups[group][1]} alt="Proyecto AIBE" fill className="image" />
            </div>


            <div className="imageCard extraWide">
              <Image src={imageGroups[group][2]} alt="Proyecto AIBE" fill className="image" />
            </div>
          </div>


          <div className="group">
            <div className="imageCard wide">
              <Image src={imageGroups[nextGroup][0]} alt="Proyecto AIBE" fill className="image" />
            </div>


            <div className="imageCard vertical">
              <Image src={imageGroups[nextGroup][1]} alt="Proyecto AIBE" fill className="image" />
            </div>


            <div className="imageCard wide">
              <Image src={imageGroups[nextGroup][2]} alt="Proyecto AIBE" fill className="image" />
            </div>
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
  color: #2E7BFF;
}


        .slider {
          width: 100%;
          overflow: hidden;
        }


        .track {
          display: flex;
          width: max-content;
          transform: translateX(0);
          transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
        }


        .track.slide {
          transform: translateX(-100vw);
        }


        .track.noTransition {
          transition: none;
        }


        .group {
  width: 100vw;
  display: flex;
  gap: 16px;
  padding-left: 2%;
  padding-right: 0;
  flex-shrink: 0;
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
            padding: 80px 0 100px;
          }


          .titleWrap {
            padding: 0 22px;
          }


          h2 {
            font-size: 2.3rem;
          }


          .group {
            padding: 0 22px;
            gap: 12px;
          }


          .imageCard {
            height: 320px;
          }


          .imageCard.extraWide {
            width: 58%;
          }


          .imageCard.wide {
            width: 48%;
          }


          .imageCard.vertical {
            width: 30%;
          }
        }
      `}</style>
    </section>
  );
}
