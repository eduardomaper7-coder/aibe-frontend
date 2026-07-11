"use client";


import { useEffect, useState } from "react";


export default function SearchRiseAnimation() {
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "28px",
        background: "#ffffff",
        border: "1px solid #edf1f7",
        overflow: "hidden",
      }}
    />
  );
}

  return (
    <div className="animationWrap">
      <div className="searchBar">
        <span className="searchIcon">⌕</span>
        <span className="typedText">servicio cerca de mí</span>
        <span className="cursor" />
      </div>


      <div className="results">
        <div className="result a">
          <span>Competidor A</span>
        </div>


        <div className="result b">
          <span>Competidor B</span>
        </div>


        <div className="result company">
          <span>Tu Empresa</span>


          <div className="growth">
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
          </div>


          <svg viewBox="0 0 160 50" className="growthLine">
            <path d="M8 40 C 42 34, 58 28, 82 20 S 120 8, 152 6" />
          </svg>
        </div>


        <div className="result c">
          <span>Competidor C</span>
        </div>
      </div>


      <style jsx>{`
        .animationWrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          background: #ffffff;
          color: #111111;
          border: 1px solid #edf1f7;
          overflow: hidden;
          position: relative;
          padding: clamp(22px, 4vw, 46px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 26px;
        }


        .searchBar {
          height: 58px;
          border: 1px solid #e7ecf4;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
          color: #111111;
          background: #ffffff;
          font-weight: 600;
          animation: searchAppear 5s ease-in-out infinite;
        }


        .searchIcon {
          color: #2e7bff;
          font-size: 1.3rem;
        }


        .typedText {
          width: 0;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 5s steps(20) infinite;
        }


        .cursor {
          width: 2px;
          height: 22px;
          background: #2e7bff;
          animation: blink 0.8s infinite;
        }


        .results {
          position: relative;
          height: 250px;
          overflow: hidden;
        }


        .result {
          position: absolute;
          left: 0;
          right: 0;
          height: 52px;
          border: 1px solid #edf1f7;
          border-radius: 18px;
          background: #ffffff;
          display: flex;
          align-items: center;
          padding: 0 22px;
          font-weight: 700;
          color: #111111;
        }


        .a {
          top: 0;
          animation: fadeDownA 5s ease-in-out infinite;
        }


        .b {
          top: 66px;
          animation: fadeDownB 5s ease-in-out infinite;
        }


        .company {
          top: 132px;
          border-color: rgba(46, 123, 255, 0.35);
          animation: riseCompany 5s ease-in-out infinite;
          z-index: 2;
        }


        .c {
          top: 198px;
          animation: fadeCompetitors 5s ease-in-out infinite;
        }


        .growth {
          margin-left: auto;
          display: flex;
          gap: 8px;
          color: #2e7bff;
          font-size: 1.1rem;
          opacity: 0;
          animation: arrows 5s ease-in-out infinite;
        }


        .growthLine {
          position: absolute;
          right: 22px;
          top: -48px;
          width: 150px;
          height: 50px;
          opacity: 0;
          animation: lineShow 5s ease-in-out infinite;
        }


        .growthLine path {
          fill: none;
          stroke: #2e7bff;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 180;
          stroke-dashoffset: 180;
          animation: drawLine 5s ease-in-out infinite;
        }


        @keyframes typing {
          0%,
          12% {
            width: 0;
          }
          34%,
          100% {
            width: 172px;
          }
        }


        @keyframes riseCompany {
          0%,
          45% {
            top: 132px;
            box-shadow: none;
          }
          68%,
          100% {
            top: 0;
            box-shadow: 0 0 0 6px rgba(46, 123, 255, 0.08);
          }
        }


        @keyframes fadeDownA {
          0%,
          45% {
            top: 0;
            opacity: 1;
          }
          68%,
          100% {
            top: 66px;
            opacity: 0.42;
          }
        }


        @keyframes fadeDownB {
          0%,
          45% {
            top: 66px;
            opacity: 1;
          }
          68%,
          100% {
            top: 132px;
            opacity: 0.42;
          }
        }


        @keyframes fadeCompetitors {
          0%,
          45% {
            opacity: 1;
          }
          68%,
          100% {
            opacity: 0.35;
          }
        }


        @keyframes arrows {
          0%,
          48% {
            opacity: 0;
            transform: translateY(8px);
          }
          62%,
          85% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
          }
        }


        @keyframes lineShow {
          0%,
          50% {
            opacity: 0;
          }
          65%,
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }


        @keyframes drawLine {
          0%,
          52% {
            stroke-dashoffset: 180;
          }
          78%,
          100% {
            stroke-dashoffset: 0;
          }
        }


        @keyframes searchAppear {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          12%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }


        @keyframes blink {
          50% {
            opacity: 0;
          }
        }


        @media (max-width: 640px) {
          .animationWrap {
            aspect-ratio: auto;
            min-height: 380px;
            border-radius: 28px;
            padding: 22px;
            gap: 22px;
            justify-content: flex-start;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.12);
          }


          .searchBar {
            height: 56px;
            padding: 0 18px;
          }


          .results {
            height: 270px;
          }


          .result {
            height: 56px;
            font-size: 0.95rem;
          }


          .b {
            top: 70px;
          }


          .company {
            top: 140px;
          }


          .c {
            top: 210px;
          }


          .growthLine {
            width: 118px;
            right: 16px;
            top: -44px;
          }
        }
      `}</style>
    </div>
  );
}
