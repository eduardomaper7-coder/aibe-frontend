import React from 'react';

export default function AIBELogo() {
  return (
    <div
      className="aibe-logo flex items-center gap-2"
      style={{ lineHeight: 1, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
    >
      {/* ICONO AZUL */}
      <div
        className="logo-icon flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"
        style={{ width: 'clamp(26px,3vw,36px)', height: 'clamp(26px,3vw,36px)' }}
        aria-hidden="true"
      >
        <span
          className="font-semibold leading-none"
          style={{ color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(11px,1.4vw,15px)' }}
        >
          AI
        </span>
      </div>

      {/* TEXTO */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-baseline gap-[6px]">
          {/* AIBE (bold) */}
          <span
            style={{
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(16px,2.4vw,26px)',
              lineHeight: 1,
              textRendering: 'optimizeLegibility',
            }}
          >
            AIBE
          </span>

          {/* Technologies (light) con stroke/shadow sutil para igualar brillo */}
          <span
            style={{
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(12px,1.2vw,17px)',
              lineHeight: 1,
              // Compensa la “pérdida” visual del peso ligero
              WebkitTextStroke: '0.25px rgba(255,255,255,0.6)',
              textShadow: '0 0 0.4px rgba(255,255,255,0.9)',
              textRendering: 'optimizeLegibility',
            }}
          >
            Technologies
          </span>
        </div>

        <span
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(9px,0.85vw,12px)',
            lineHeight: 1.1,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          Artificial Intelligence for Business Efficiency
        </span>
      </div>
    </div>
  );
}
