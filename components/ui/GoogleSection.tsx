"use client";

import GoogleMapsFichaAnimation from "./GoogleMapsFichaAnimation";
import GoogleSearchAnimation from "./GoogleSearchAnimation";

export default function GoogleSection() {
  return (
    <section id="google" className="googleSection">
      <div className="sectionHeader">
        <h2>Haz que te encuentren en Google</h2>
      </div>

      <div className="left">
        <GoogleMapsFichaAnimation />
      </div>

      <div className="right">
        <GoogleSearchAnimation />

        <div className="textBlock">
          <span>Posicionamiento en Google</span>

          <h3>Aparece cuando tus clientes te están buscando</h3>

          <p>
            Trabajamos tanto el posicionamiento de tu web en Google como tu ficha
            de Google Maps para que tu negocio gane visibilidad local,
            confianza y más oportunidades de contacto.
          </p>
        </div>
      </div>

      <style jsx>{`
        .googleSection {
          padding: 110px 6%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 42px;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
        }

        .sectionHeader {
          grid-column: 1 / -1;
          width: 100%;
          margin: 0 0 28px;
        }

        .sectionHeader h2 {
          max-width: 1350px;
          color: #111111;
          font-size: clamp(2.8rem, 4.4vw, 5rem);
          line-height: 1.08;
          letter-spacing: -0.06em;
          font-weight: 300;
          text-align: left;
          margin: 0;
          font-family: "Montserrat", sans-serif;
        }

        .left,
        .right {
          min-height: 620px;
        }

        .right {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 28px;
        }

        .textBlock {
          border-radius: 34px;
          background: #07111f;
          color: white;
          padding: 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        span {
          color: #74a8ff;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .textBlock h3 {
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0 0 22px;
          color: white;
          font-weight: 800;
        }

        p {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 1.05rem;
          margin: 0;
          max-width: 620px;
        }

       @media (max-width: 900px) {
  .googleSection {
    grid-template-columns: 1fr;
    padding: 60px 22px 20px;
  }
}

  .sectionHeader {
    margin-bottom: 22px;
  }

  .sectionHeader h2 {
    font-size: 2.3rem;
  }

  .left,
  .right {
    min-height: auto;
  }
}
      `}</style>
    </section>
  );
}