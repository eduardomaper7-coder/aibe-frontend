"use client";

export default function GoogleMapsFichaAnimation() {
  const details = [
    {
      icon: "📍",
      title: "Calle Principal, 24",
      text: "28001 Madrid",
    },
    {
      icon: "🕒",
      title: "Abierto",
      text: "Cierra a las 20:30",
      highlight: true,
    },
    {
      icon: "☰",
      title: "Servicios profesionales",
      text: "Atención personalizada",
    },
    {
      icon: "🌐",
      title: "tuempresa.com",
      text: "Sitio web oficial",
    },
    {
      icon: "☎",
      title: "922 123 456",
      text: "Llamar ahora",
    },
  ];

  return (
    <div className="mapsMockup">
      <div className="mapOverlay" />

      <div className="filters">
        <span>★ Valoración</span>
        <span>◷ Horario</span>
        <span>☰ Todos los filtros</span>
      </div>

      <div className="panel">
        <button className="close">×</button>

        <div className="photo">
          <div className="photoShade" />
          <div className="verifiedBadge">Perfil verificado</div>
          <div className="logoCircle">TE</div>
        </div>

        <div className="content">
          <h3>Tu Empresa</h3>

          <div className="rating">
            <strong>5,0</strong>
            <span>★★★★★</span>
            <small>(923 reseñas) Google</small>
          </div>

          <p className="category">Empresa de servicios · Verificada</p>

          <div className="tabs">
            <b>Vista general</b>
            <span>Reseñas</span>
            <span>Información</span>
          </div>
        </div>

        <div className="actions">
          <div>
            <i>↱</i>
            <small>Cómo llegar</small>
          </div>
          <div>
            <i>♡</i>
            <small>Guardar</small>
          </div>
          <div>
            <i>◎</i>
            <small>Cercano</small>
          </div>
          <div>
            <i>⇪</i>
            <small>Compartir</small>
          </div>
        </div>

        <div className="details">
          {details.map((item) => (
            <div className="detailItem" key={item.title}>
              <div className="detailIcon">{item.icon}</div>
              <div>
                <p className={item.highlight ? "open" : ""}>{item.title}</p>
                <small>{item.text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mapsMockup {
          height: 100%;
          min-height: 620px;
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          background-image: url("/imagenes/ficha-google-clinica.png");
          background-size: cover;
          background-position: center;
          box-shadow: 0 24px 70px rgba(46, 123, 255, 0.14);
        }

        .mapOverlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: saturate(1.15);
        }

        .filters {
          position: absolute;
          top: 18px;
          left: 18px;
          right: 18px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .filters span {
          background: rgba(255, 255, 255, 0.94);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #263238;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(10px);
        }

        .panel {
          position: absolute;
          left: 22px;
          right: 22px;
          top: 70px;
          bottom: 22px;
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.2);
          animation: panelIn 0.9s ease both;
          display: flex;
          flex-direction: column;
        }

        .close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #202124;
          font-size: 1.8rem;
          line-height: 1;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .photo {
          height: 245px;
          position: relative;
          background-image: url("/imagenes/ficha-google.jpeg");
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
        }

        .photoShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.36)
          );
        }

        .verifiedBadge {
          position: absolute;
          left: 18px;
          bottom: 18px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.94);
          color: #0f766e;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
        }

        .logoCircle {
          position: absolute;
          right: 22px;
          bottom: -34px;
          z-index: 3;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #2e7bff;
          color: white;
          display: grid;
          place-items: center;
          font-size: 1.45rem;
          font-weight: 900;
          border: 5px solid white;
          box-shadow: 0 16px 34px rgba(46, 123, 255, 0.38);
          animation: bounce 2s ease-in-out infinite;
        }

        .content {
          padding: 22px 24px 0;
        }

        h3 {
          margin: 0 88px 10px 0;
          color: #202124;
          font-size: clamp(1.45rem, 2.4vw, 2rem);
          line-height: 1.12;
          font-weight: 800;
        }

        .rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 6px;
        }

        .rating strong {
          color: #444;
          font-size: 0.95rem;
        }

        .rating span {
          color: #fbbc04;
          letter-spacing: 1px;
          font-size: 0.95rem;
        }

        .rating small,
        .category {
          color: #5f6368;
          font-weight: 500;
        }

        .category {
          margin: 0 0 14px;
        }

        .tabs {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
        }

        .tabs span,
        .tabs b {
          padding: 12px 0;
          font-size: 0.88rem;
          color: #5f6368;
        }

        .tabs b {
          color: #00838f;
          border-bottom: 3px solid #00838f;
        }

        .actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 14px 18px;
          border-bottom: 1px solid #e5e7eb;
        }

        .actions div {
          display: grid;
          place-items: center;
          gap: 6px;
          color: #00796b;
          font-weight: 800;
        }

        .actions i {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #e7f7f5;
          display: grid;
          place-items: center;
          font-style: normal;
          font-size: 1rem;
        }

        .actions small {
          color: #006064;
          font-size: 0.68rem;
          text-align: center;
          font-weight: 800;
        }

        .details {
          padding: 14px 18px 18px;
          display: grid;
          gap: 8px;
          background: linear-gradient(180deg, #ffffff, #f8fbff);
          flex: 1;
        }

        .detailItem {
          display: grid;
          grid-template-columns: 38px 1fr;
          gap: 12px;
          align-items: center;
          padding: 9px 10px;
          border-radius: 16px;
          background: rgba(245, 248, 252, 0.9);
          border: 1px solid rgba(226, 232, 240, 0.9);
        }

        .detailIcon {
          width: 38px;
          height: 38px;
          border-radius: 14px;
          background: #eaf2ff;
          display: grid;
          place-items: center;
          font-size: 1rem;
        }

        .detailItem p {
          margin: 0 0 2px;
          color: #202124;
          font-size: 0.9rem;
          line-height: 1.25;
          font-weight: 800;
        }

        .detailItem small {
          color: #6b7280;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .detailItem .open {
          color: #188038;
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 520px) {
          .mapsMockup {
            min-height: 680px;
          }

          .filters {
            flex-wrap: wrap;
          }

          .photo {
            height: 220px;
          }

          .panel {
            left: 14px;
            right: 14px;
          }
        }
      `}</style>
    </div>
  );
}