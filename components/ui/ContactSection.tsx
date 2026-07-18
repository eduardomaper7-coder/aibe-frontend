"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const params = useParams();
  const router = useRouter();
  const locale = String(params?.locale ?? "es");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: String(formData.get("nombre") ?? "").trim(),
          empresa: String(formData.get("empresa") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          telefono: String(formData.get("telefono") ?? "").trim(),
          web: String(formData.get("web") ?? "").trim(),
          mensaje: String(formData.get("mensaje") ?? "").trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "No se ha podido enviar el mensaje."
        );
      }

      form.reset();
      setSuccess(true);

      router.push(`/${locale}/gracias`);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSuccess(false);

      alert(
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error al enviar el mensaje."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contactSection" id="contacto">
      <div className="contactLeft">
        <span className="eyebrow">Auditoría gratuita</span>

        <h2>¿Por qué nuestros clientes consiguen resultados?</h2>

        <ul>
          <li>Captamos clientes reales, no solo conseguimos visibilidad.</li>
          <li>Estrategias personalizadas para cada negocio y cada objetivo.</li>
          <li>Contenido que atrae, genera confianza y convierte en ventas.</li>
          <li>Posicionamos tu negocio donde tus clientes realmente buscan.</li>
          <li>Resultados medibles con seguimiento y optimización constante.</li>
        </ul>

        <div className="reviewsImage">
          <Image
            src="/imagenes/resenas-google.png"
            alt="Opiniones de clientes de Google"
            width={900}
            height={700}
            className="googleReviews"
          />
        </div>
      </div>

      <div className="contactCard" id="contact-formulario">
        <h2>SOLICITA INFORMACIÓN Y RECIBE UNA AUDITORÍA GRATUITA</h2>

        <form onSubmit={handleSubmit}>
          <input name="nombre" placeholder="Nombre" required />

          <input name="empresa" placeholder="Empresa" required />

          <input name="email" type="email" placeholder="Email" required />

          <input name="telefono" placeholder="Teléfono" required />

          <input
            name="web"
            placeholder="Nombre de tu página web (si existe)"
          />

          <textarea
            name="mensaje"
            placeholder="Asunto / Mensaje"
            rows={5}
            required
          />

          <label className="legalCheck">
            <input type="checkbox" required />
            <span>
              Acepto el{" "}
              <Link
                href={`/${locale}/aviso-legal`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Aviso Legal
              </Link>{" "}
              y la{" "}
              <Link
                href={`/${locale}/politica-privacidad`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </Link>
            </span>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>

          {success && (
            <p className="successMessage" role="status" aria-live="polite">
              Mensaje enviado correctamente. Redirigiendo...
            </p>
          )}
        </form>
      </div>

      <style jsx>{`
        .contactSection {
          width: 100%;
          scroll-margin-top: 110px;
          padding: 110px 6%;
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          gap: 70px;
          align-items: start;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
        }

        .contactLeft {
          min-width: 0;
        }

        .eyebrow {
          display: inline-flex;
          margin-bottom: 18px;
          color: #2e7bff;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .contactLeft h2 {
          max-width: 680px;
          font-size: clamp(2rem, 4vw, 3.7rem);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #111111;
          margin: 0 0 32px;
        }

        .contactLeft ul {
          list-style: none;
          padding: 0;
          margin: 0 0 42px;
          display: grid;
          gap: 18px;
        }

        .contactLeft li {
          position: relative;
          padding-left: 34px;
          color: #444b5a;
          font-size: 1.05rem;
          line-height: 1.55;
          font-weight: 600;
        }

        .contactLeft li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          color: #2e7bff;
          font-weight: 900;
        }

        .reviewsImage {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin-top: -10px;
        }

        .googleReviews {
          width: 78%;
          max-width: 520px;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .contactCard {
          scroll-margin-top: 110px;
          background: #ffffff;
          border: 1px solid #e8ecf3;
          border-radius: 32px;
          padding: 44px;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.09);
        }

        .contactCard h2 {
          font-size: clamp(1.55rem, 3vw, 2.45rem);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #111111;
          margin: 0 0 28px;
        }

        form {
          display: grid;
          gap: 15px;
        }

        input,
        textarea {
          width: 100%;
          border: 1px solid #dfe5ef;
          background: #f8faff;
          color: #111111;
          font: inherit;
          font-size: 0.96rem;
          font-weight: 600;
          padding: 17px 18px;
          border-radius: 16px;
          outline: none;
          transition: 0.2s ease;
        }

        textarea {
          resize: vertical;
          min-height: 130px;
        }

        input:focus,
        textarea:focus {
          border-color: #2e7bff;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(46, 123, 255, 0.1);
        }

        .legalCheck {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #555d6d;
          font-size: 0.86rem;
          line-height: 1.45;
          font-weight: 500;
          margin: 4px 0;
        }

        .legalCheck input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          flex: 0 0 auto;
        }

        .legalCheck a {
          color: #2e7bff;
          font-weight: 800;
          text-decoration: none;
        }

        .legalCheck a:hover {
          text-decoration: underline;
        }

        button {
          width: 100%;
          border: none;
          cursor: pointer;
          background: #2e7bff;
          color: white;
          font: inherit;
          font-weight: 800;
          padding: 18px 28px;
          border-radius: 999px;
          box-shadow: 0 16px 34px rgba(46, 123, 255, 0.35);
          transition: 0.25s ease;
        }

        button:hover {
          transform: translateY(-3px);
          background: #1769f5;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .successMessage {
          margin: 2px 0 0;
          text-align: center;
          color: #16a34a;
          font-size: 0.95rem;
          font-weight: 800;
        }

        @media (max-width: 980px) {
          .contactSection {
            grid-template-columns: 1fr;
            padding: 80px 16px;
            gap: 44px;
          }

          .contactLeft h2,
          .contactCard h2 {
            text-align: center;
          }

          .eyebrow {
            width: 100%;
            justify-content: center;
          }

          .contactCard {
            padding: 28px 20px;
            border-radius: 26px;
            scroll-margin-top: 95px;
          }

          .contactLeft li {
            font-size: 0.96rem;
          }
        }
      `}</style>
    </section>
  );
}