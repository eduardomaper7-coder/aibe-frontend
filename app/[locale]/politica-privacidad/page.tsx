import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad | AIBE Technologies",
  description: "Información sobre el tratamiento de datos personales en AIBE Technologies.",
};

const sections = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      "Responsable: Eduardo Martínez Perdomo, bajo el nombre comercial AIBE Technologies, España.",
      "Contacto para asuntos de privacidad: info@aibetech.es. Teléfono: +34 686 01 26 85.",
    ],
  },
  {
    title: "2. Datos que podemos tratar",
    paragraphs: [
      "Cuando utilizas el formulario de contacto podemos tratar tu nombre, empresa, correo electrónico, teléfono, página web, situación del negocio y el contenido del mensaje.",
      "También podemos tratar los datos que facilites por correo, teléfono o WhatsApp, así como datos técnicos básicos necesarios para la seguridad y funcionamiento del sitio, como dirección IP, dispositivo, navegador, fecha, hora y registros de errores.",
      "Si contratas o utilizas otros servicios de AIBE Technologies, podrán tratarse los datos adicionales necesarios para prestar el servicio, gestionar pagos, facturación, soporte y cumplimiento contractual.",
    ],
  },
  {
    title: "3. Finalidades",
    paragraphs: [
      "Responder solicitudes de información y preparar propuestas o presupuestos.",
      "Mantener comunicaciones precontractuales o contractuales y prestar los servicios solicitados.",
      "Gestionar soporte, facturación, seguridad, prevención del fraude y cumplimiento de obligaciones legales.",
      "Enviar comunicaciones comerciales sobre servicios similares únicamente cuando exista consentimiento o una base jurídica válida. Podrás oponerte en cualquier momento.",
    ],
  },
  {
    title: "4. Bases jurídicas",
    paragraphs: [
      "El tratamiento se basa, según el caso, en tu consentimiento, en la aplicación de medidas precontractuales solicitadas por ti, en la ejecución de un contrato, en el cumplimiento de obligaciones legales o en intereses legítimos como la seguridad del sitio y la atención de consultas.",
      "Puedes retirar el consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento realizado previamente.",
    ],
  },
  {
    title: "5. Conservación",
    paragraphs: [
      "Los datos de consultas se conservarán durante el tiempo necesario para responder y hacer seguimiento razonable de la solicitud. Los datos contractuales y de facturación se conservarán durante los plazos exigidos por la normativa aplicable.",
      "Cuando el tratamiento se base en el consentimiento, los datos podrán conservarse hasta que lo retires, sin perjuicio de los plazos necesarios para atender responsabilidades legales.",
    ],
  },
  {
    title: "6. Destinatarios y proveedores",
    paragraphs: [
      "No vendemos datos personales. Podemos comunicar o permitir el acceso a proveedores necesarios para operar el servicio, como alojamiento web, correo electrónico, formularios, analítica, CRM, facturación, pagos, automatización o herramientas de inteligencia artificial, siempre bajo las garantías contractuales correspondientes.",
      "El formulario del sitio utiliza servicios técnicos de envío de correo. WhatsApp, Google, LinkedIn y otras plataformas externas aplican sus propias políticas cuando accedes a ellas mediante un enlace.",
      "También podrán comunicarse datos a administraciones, juzgados o autoridades cuando exista una obligación legal.",
    ],
  },
  {
    title: "7. Transferencias internacionales",
    paragraphs: [
      "Algunos proveedores tecnológicos pueden tratar datos fuera del Espacio Económico Europeo. En esos casos se utilizarán mecanismos reconocidos por la normativa, como decisiones de adecuación o cláusulas contractuales tipo, cuando resulten exigibles.",
    ],
  },
  {
    title: "8. Derechos",
    paragraphs: [
      "Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento y no ser objeto de decisiones basadas únicamente en tratamientos automatizados cuando proceda.",
      "Para ejercerlos, escribe a info@aibetech.es indicando tu solicitud y aportando la información necesaria para verificar tu identidad. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos.",
    ],
  },
  {
    title: "9. Seguridad",
    paragraphs: [
      "Aplicamos medidas técnicas y organizativas razonables para reducir riesgos de pérdida, alteración, acceso no autorizado o divulgación. Ningún sistema conectado a Internet puede garantizar seguridad absoluta.",
    ],
  },
  {
    title: "10. Datos de menores",
    paragraphs: [
      "Los servicios comerciales de AIBE Technologies no se dirigen a menores. Si detectamos que se han facilitado datos de un menor sin autorización válida, adoptaremos medidas para eliminarlos.",
    ],
  },
  {
    title: "11. Cookies y analítica",
    paragraphs: [
      "El sitio puede utilizar tecnologías técnicas necesarias para su funcionamiento y, cuando corresponda, herramientas de medición o analítica. Las tecnologías no necesarias se activarán conforme a las preferencias y al consentimiento exigible.",
    ],
  },
  {
    title: "12. Cambios en esta política",
    paragraphs: [
      "Podemos actualizar esta política cuando cambien los tratamientos, proveedores o requisitos legales. La versión vigente y su fecha de actualización estarán disponibles en esta página.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="legalPage">
      <article>
        <Link className="back" href="/es">← Volver a AIBE Technologies</Link>
        <span className="eyebrow">Protección de datos</span>
        <h1>Política de privacidad</h1>
        <p className="updated">Última actualización: 12 de julio de 2026</p>

        <div className="intro">
          Esta política explica qué datos personales tratamos, para qué los utilizamos y cómo puedes ejercer tus derechos.
        </div>

        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        
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
