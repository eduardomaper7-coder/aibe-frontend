import Link from "next/link";

type GraciasPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function GraciasPage({
  params,
}: GraciasPageProps) {
  const { locale } = await params;

  return (
    <main className="thankYouPage">
      <section className="thankYouCard">
        <div className="checkIcon" aria-hidden="true">
          ✓
        </div>

        <span className="eyebrow">Solicitud recibida</span>

        <h1>Gracias por contactar con AIBE Technologies</h1>

        <p>
          Hemos recibido correctamente tu solicitud. Revisaremos la información
          y nos pondremos en contacto contigo lo antes posible.
        </p>

        <p className="secondaryText">
          Nuestro equipo revisará tu solicitud y preparará una propuesta
          adaptada a las necesidades de tu empresa.
        </p>

        <Link href={`/${locale}`} className="backButton">
          Ir a la página principal
        </Link>
      </section>

      <style>{`
        .thankYouPage {
          min-height: 100vh;
          padding: 120px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background:
            radial-gradient(
              circle at top,
              rgba(46, 123, 255, 0.14),
              transparent 42%
            ),
            #f7f9fc;
          font-family: "Montserrat", sans-serif;
        }

        .thankYouCard {
          width: 100%;
          max-width: 760px;
          padding: 64px 48px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e5eaf2;
          border-radius: 32px;
          box-shadow: 0 28px 70px rgba(17, 24, 39, 0.1);
        }

        .checkIcon {
          width: 84px;
          height: 84px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #2e7bff;
          color: #ffffff;
          font-size: 2.8rem;
          font-weight: 900;
          box-shadow: 0 16px 35px rgba(46, 123, 255, 0.3);
        }

        .eyebrow {
          display: block;
          margin-bottom: 14px;
          color: #2e7bff;
          font-weight: 800;
        }

        h1 {
          margin: 0 0 22px;
          color: #111111;
          font-size: clamp(2rem, 5vw, 3.7rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        p {
          max-width: 620px;
          margin: 0 auto 16px;
          color: #4b5563;
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .secondaryText {
          margin-bottom: 32px;
          font-size: 0.98rem;
        }

        .backButton {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 17px 28px;
          border-radius: 999px;
          background: #2e7bff;
          color: #ffffff;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 16px 34px rgba(46, 123, 255, 0.3);
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .backButton:hover {
          transform: translateY(-2px);
          background: #1769f5;
        }

        .backButton:focus-visible {
          outline: 3px solid rgba(46, 123, 255, 0.35);
          outline-offset: 4px;
        }

        @media (max-width: 640px) {
          .thankYouPage {
            padding: 90px 16px;
          }

          .thankYouCard {
            padding: 44px 22px;
            border-radius: 26px;
          }
        }
      `}</style>
    </main>
  );
}