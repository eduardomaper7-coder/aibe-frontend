import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal | AIBE Technologies",
  description: "Información legal y condiciones de uso del sitio web de AIBE Technologies.",
};

const sections = [
  {
    title: "1. Titular del sitio web",
    paragraphs: [
      "El presente sitio web, disponible en aibetech.es, es gestionado bajo el nombre comercial AIBE Technologies por Eduardo Martínez Perdomo, profesional establecido en España.",
      "Correo electrónico de contacto: info@aibetech.es. Teléfono de contacto: +34 686 01 26 85.",
    ],
  },
  {
    title: "2. Objeto",
    paragraphs: [
      "Este aviso regula el acceso, la navegación y el uso del sitio web, así como las responsabilidades derivadas de la utilización de sus contenidos y servicios.",
      "El acceso al sitio implica la aceptación de estas condiciones. Cuando un servicio disponga de condiciones particulares, estas prevalecerán en lo que resulte aplicable.",
    ],
  },
  {
    title: "3. Servicios e información",
    paragraphs: [
      "AIBE Technologies presta servicios relacionados con marketing digital, presencia en Google, gestión de redes sociales, reputación online y soluciones apoyadas en inteligencia artificial.",
      "La información publicada tiene carácter general y comercial. Las propuestas, presupuestos y condiciones definitivas se concretarán de forma individual con cada cliente.",
    ],
  },
  {
    title: "4. Uso correcto del sitio",
    paragraphs: [
      "La persona usuaria se compromete a utilizar el sitio de forma lícita, diligente y respetuosa, y a no introducir código malicioso, intentar acceder a zonas restringidas, suplantar identidades ni realizar acciones que puedan dañar el servicio o a terceros.",
    ],
  },
  {
    title: "5. Propiedad intelectual e industrial",
    paragraphs: [
      "Los textos, diseños, logotipos, elementos gráficos, código y demás contenidos propios del sitio pertenecen a AIBE Technologies o se utilizan con la autorización correspondiente. No se permite su reproducción, distribución, transformación o explotación sin autorización previa, salvo los usos permitidos por la ley.",
      "Las marcas, logotipos y contenidos de terceros pertenecen a sus respectivos titulares.",
    ],
  },
  {
    title: "6. Enlaces externos",
    paragraphs: [
      "El sitio puede incluir enlaces a páginas o servicios de terceros. AIBE Technologies no controla esos contenidos ni responde de su disponibilidad, seguridad o políticas. La inclusión de un enlace no implica aprobación o asociación con el tercero enlazado.",
    ],
  },
  {
    title: "7. Responsabilidad",
    paragraphs: [
      "Se adoptan medidas razonables para mantener la web disponible y actualizada, pero no se garantiza la ausencia absoluta de interrupciones, errores o elementos dañinos. AIBE Technologies no responderá de daños indirectos derivados del uso del sitio cuando no sean imputables a una actuación dolosa o negligente.",
      "Las estimaciones, ejemplos y resultados mostrados no constituyen una garantía de resultados futuros, ya que estos dependen de factores propios de cada negocio, mercado y plataforma externa.",
    ],
  },
  {
    title: "8. Comunicaciones",
    paragraphs: [
      "Las solicitudes enviadas mediante formularios, correo electrónico, teléfono o WhatsApp se atenderán con fines informativos, comerciales o contractuales. No se enviarán comunicaciones comerciales no solicitadas fuera de los supuestos permitidos por la normativa aplicable.",
    ],
  },
  {
    title: "9. Legislación y jurisdicción",
    paragraphs: [
      "Este aviso se rige por la legislación española. Cuando la normativa permita pactar jurisdicción, cualquier controversia se someterá a los juzgados y tribunales que correspondan al domicilio del titular; en relaciones con consumidores se respetará siempre el fuero legalmente aplicable.",
    ],
  },
  {
    title: "10. Cambios",
    paragraphs: [
      "AIBE Technologies puede actualizar este aviso para adaptarlo a cambios legales, técnicos o de los servicios. La versión publicada en esta página será la vigente.",
    ],
  },
];

export default function LegalNoticePage() {
  return (
    <main className="legalPage">
      <article>
        <Link className="back" href="/es">← Volver a AIBE Technologies</Link>
        <span className="eyebrow">Información legal</span>
        <h1>Aviso legal</h1>
        <p className="updated">Última actualización: 12 de julio de 2026</p>

        <div className="intro">
          Este documento identifica al responsable del sitio y establece las reglas básicas de acceso y uso de aibetech.es.
        </div>

        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <p className="note">
          Este texto es un borrador informativo y debe revisarse con asesoramiento jurídico antes de considerarse definitivo.
        </p>
      </article>

      <style>{`
        .legalPage { min-height: 100vh; background: #f6f8fc; padding: 64px 20px; color: #172033; font-family: "Montserrat", Arial, sans-serif; }
        .legalPage article { width: min(100%, 900px); margin: 0 auto; background: white; border: 1px solid #e6ebf4; border-radius: 28px; padding: clamp(28px, 6vw, 64px); box-shadow: 0 24px 70px rgba(30, 58, 110, .08); }
        .legalPage .back { display: inline-flex; margin-bottom: 42px; color: #2e7bff; text-decoration: none; font-weight: 800; }
        .legalPage .eyebrow { color: #2e7bff; font-size: .82rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .legalPage h1 { margin: 10px 0 8px; font-size: clamp(2.6rem, 7vw, 4.8rem); line-height: 1; letter-spacing: -.055em; color: #0b1324; }
        .legalPage .updated { margin: 0; color: #6b7280; }
        .legalPage .intro { margin: 34px 0 42px; padding: 22px 24px; border-radius: 18px; background: #eef4ff; color: #24406f; font-size: 1.06rem; line-height: 1.7; }
        .legalPage section { margin-top: 34px; }
        .legalPage h2 { margin: 0 0 12px; font-size: 1.35rem; color: #111827; }
        .legalPage p { line-height: 1.75; }
        .legalPage section p { margin: 10px 0; color: #465166; }
        .legalPage .note { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e6ebf4; color: #6b7280; font-size: .9rem; }
      `}</style>
    </main>
  );
}
