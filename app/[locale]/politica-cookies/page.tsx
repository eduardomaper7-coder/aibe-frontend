import type { Metadata } from "next";
import Link from "next/link";

const content = {
  es: {
    metadataTitle: "Política de cookies | AIBE Technologies",
    metadataDescription:
      "Información sobre las cookies y tecnologías similares utilizadas por AIBE Technologies.",
    back: "← Volver a AIBE Technologies",
    eyebrow: "Privacidad y transparencia",
    title: "Política de cookies",
    updated: "Última actualización: 13 de julio de 2026",
    intro:
      "Esta política explica qué cookies y tecnologías similares utiliza aibetech.es, para qué sirven, durante cuánto tiempo permanecen y cómo puedes aceptar, rechazar o retirar tu consentimiento.",
    sections: [
      {
        title: "1. Responsable",
        paragraphs: [
          "El responsable del sitio web es Eduardo Martínez Perdomo, que opera bajo el nombre comercial AIBE Technologies, con domicilio profesional en España.",
          "Puedes realizar consultas sobre privacidad y cookies escribiendo a info@aibetech.es o llamando al +34 686 01 26 85.",
        ],
      },
      {
        title: "2. Qué son las cookies y tecnologías similares",
        paragraphs: [
          "Las cookies son pequeños archivos que un sitio web almacena en el navegador o dispositivo. Permiten recordar información sobre la visita, mantener una sesión, proteger formularios o conocer de forma agregada cómo se utiliza una página.",
          "También utilizamos tecnologías similares, como el almacenamiento local del navegador, para conservar datos técnicos necesarios durante procesos de registro, acceso o contratación. En esta política utilizamos el término “cookies” para referirnos conjuntamente a estas tecnologías cuando resulte aplicable.",
        ],
      },
      {
        title: "3. Base jurídica y consentimiento",
        paragraphs: [
          "Las cookies estrictamente necesarias se utilizan porque permiten prestar el servicio solicitado, mantener la seguridad, gestionar el inicio de sesión y recordar tus preferencias de privacidad. No requieren consentimiento previo cuando cumplen exclusivamente estas finalidades.",
          "Las tecnologías de analítica permanecen desactivadas hasta que selecciones “Aceptar todas” o las actives desde el panel de configuración. Rechazar las cookies opcionales no impide utilizar las funciones esenciales del sitio.",
          "Puedes retirar o modificar el consentimiento en cualquier momento mediante el enlace “Configurar cookies” del pie de página. La retirada no afecta a la licitud del tratamiento realizado antes de modificar tu elección.",
        ],
      },
      {
        title: "4. Categorías utilizadas",
        paragraphs: [
          "Cookies técnicas o necesarias: hacen posible la navegación, la seguridad, la autenticación, la gestión de sesiones, los procesos de registro o contratación y el almacenamiento de tu elección sobre cookies.",
          "Cookies o tecnologías de analítica: permiten medir de forma agregada las visitas, páginas consultadas, rendimiento y errores para mejorar la experiencia. Solo se activan con consentimiento.",
          "Actualmente AIBE Technologies no utiliza cookies publicitarias propias para crear perfiles comerciales ni mostrar publicidad personalizada. Si esto cambia, se actualizará esta política y se solicitará el consentimiento correspondiente.",
        ],
      },
    ],
    tableTitle: "5. Inventario de cookies y tecnologías similares",
    tableHeaders: ["Nombre o servicio", "Proveedor", "Finalidad", "Tipo", "Duración"],
    tableRows: [
      [
        "aibe_cookie_consent",
        "AIBE Technologies",
        "Guardar la elección del usuario y acreditar si autorizó o rechazó la analítica.",
        "Técnica / necesaria",
        "12 meses",
      ],
      [
        "next-auth.session-token / __Secure-next-auth.session-token",
        "AIBE Technologies / NextAuth",
        "Mantener la sesión autenticada del usuario.",
        "Técnica / necesaria",
        "Sesión o hasta 30 días, según la configuración de acceso",
      ],
      [
        "next-auth.csrf-token / __Host-next-auth.csrf-token",
        "AIBE Technologies / NextAuth",
        "Prevenir ataques de falsificación de solicitudes durante el inicio de sesión.",
        "Técnica / seguridad",
        "Sesión",
      ],
      [
        "next-auth.callback-url / __Secure-next-auth.callback-url",
        "AIBE Technologies / NextAuth",
        "Recordar la página a la que debe volver el usuario después de autenticarse.",
        "Técnica / necesaria",
        "Sesión",
      ],
      [
        "aibe-auth",
        "AIBE Technologies / Supabase",
        "Conservar en el almacenamiento local la sesión necesaria para acceder al área privada.",
        "Técnica / autenticación",
        "Hasta cerrar sesión, caducar la sesión o borrar los datos del navegador",
      ],
      [
        "job_id",
        "AIBE Technologies",
        "Mantener el identificador técnico de un proceso iniciado por el usuario entre distintas pantallas.",
        "Técnica / funcional",
        "Hasta completar el proceso o borrar los datos del navegador",
      ],
      [
        "user_email",
        "AIBE Technologies",
        "Recordar el correo introducido durante determinados flujos de acceso solicitados por el usuario.",
        "Técnica / funcional",
        "Hasta sustituirlo o borrar los datos del navegador",
      ],
      [
        "Vercel Web Analytics",
        "Vercel Inc.",
        "Medir visitas, navegación y rendimiento de forma agregada para mejorar el sitio. El componente solo se carga después del consentimiento.",
        "Analítica / opcional",
        "Según la configuración y política vigente del proveedor",
      ],
    ],
    afterTable: [
      {
        title: "6. Servicios de terceros activados por el usuario",
        paragraphs: [
          "Al iniciar sesión con Google, abrir una herramienta de reserva como Calendly, efectuar un pago mediante Stripe o acceder a enlaces de WhatsApp, LinkedIn u otros servicios externos, el tercero correspondiente puede tratar datos o utilizar sus propias cookies bajo su responsabilidad.",
          "Estas herramientas se activan cuando solicitas expresamente la funcionalidad o abandonas este sitio. Te recomendamos consultar las políticas de privacidad y cookies del proveedor antes de continuar.",
        ],
      },
      {
        title: "7. Transferencias internacionales",
        paragraphs: [
          "Algunos proveedores tecnológicos pueden encontrarse fuera del Espacio Económico Europeo. Cuando exista una transferencia internacional de datos, se aplicarán los mecanismos legalmente previstos, como decisiones de adecuación o cláusulas contractuales tipo, cuando sean necesarios.",
        ],
      },
      {
        title: "8. Cómo modificar o retirar el consentimiento",
        paragraphs: [
          "Puedes abrir de nuevo el panel mediante “Configurar cookies” en el pie de página. Al guardar una nueva elección se sustituye la anterior.",
          "También puedes eliminar las cookies y el almacenamiento local desde la configuración de tu navegador. Si eliminas la cookie de consentimiento, el aviso volverá a mostrarse en tu próxima visita.",
        ],
      },
      {
        title: "9. Configuración del navegador",
        paragraphs: [
          "Los navegadores permiten bloquear, limitar o eliminar cookies. Normalmente encontrarás estas opciones en los apartados Privacidad, Seguridad, Cookies o Datos de sitios. El bloqueo de cookies técnicas puede impedir el inicio de sesión o el funcionamiento correcto del área privada.",
          "Las instrucciones pueden variar entre Chrome, Safari, Firefox, Edge y navegadores móviles. Consulta la ayuda oficial de tu navegador para aplicar la configuración adecuada a tu dispositivo.",
        ],
      },
      {
        title: "10. Actualizaciones de esta política",
        paragraphs: [
          "Podemos actualizar esta política cuando cambien las tecnologías utilizadas, los proveedores o los requisitos legales. La fecha de la versión vigente aparece al inicio de la página.",
        ],
      },
    ],
    related: "Documentos relacionados:",
    privacy: "Política de privacidad",
    legal: "Aviso legal",
    note:
      "",
  },
  en: {
    metadataTitle: "Cookie Policy | AIBE Technologies",
    metadataDescription:
      "Information about cookies and similar technologies used by AIBE Technologies.",
    back: "← Back to AIBE Technologies",
    eyebrow: "Privacy and transparency",
    title: "Cookie Policy",
    updated: "Last updated: July 13, 2026",
    intro:
      "This policy explains which cookies and similar technologies aibetech.es uses, why they are used, how long they remain and how you can accept, reject or withdraw consent.",
    sections: [
      {
        title: "1. Controller",
        paragraphs: [
          "The website is operated by Eduardo Martínez Perdomo under the trade name AIBE Technologies, professionally established in Spain.",
          "For privacy and cookie enquiries, contact info@aibetech.es or +34 686 01 26 85.",
        ],
      },
      {
        title: "2. What cookies and similar technologies are",
        paragraphs: [
          "Cookies are small files stored by a website in the browser or device. They can remember visit information, maintain a session, protect forms or provide aggregated information about website use.",
          "We also use similar technologies, such as browser local storage, to retain technical data required during registration, sign-in or purchase processes. In this policy, the term “cookies” may refer to all these technologies where applicable.",
        ],
      },
      {
        title: "3. Legal basis and consent",
        paragraphs: [
          "Strictly necessary cookies are used to provide requested services, maintain security, manage sign-in and remember privacy preferences. Prior consent is not required when they are used solely for these purposes.",
          "Analytics technologies remain disabled until you select “Accept all” or enable them in the settings panel. Rejecting optional cookies does not prevent use of essential website features.",
          "You can change or withdraw consent at any time through the “Cookie settings” link in the footer. Withdrawal does not affect processing carried out before your choice was changed.",
        ],
      },
      {
        title: "4. Categories used",
        paragraphs: [
          "Essential cookies: enable navigation, security, authentication, session management, registration or purchase flows and storage of your cookie choice.",
          "Analytics cookies or technologies: measure aggregated visits, page views, performance and errors to improve the experience. They are only activated with consent.",
          "AIBE Technologies does not currently use its own advertising cookies to build commercial profiles or show personalised advertising. If this changes, this policy will be updated and the appropriate consent will be requested.",
        ],
      },
    ],
    tableTitle: "5. Cookie and similar technology inventory",
    tableHeaders: ["Name or service", "Provider", "Purpose", "Type", "Duration"],
    tableRows: [
      ["aibe_cookie_consent", "AIBE Technologies", "Stores the user's choice and records whether analytics was accepted or rejected.", "Essential", "12 months"],
      ["next-auth.session-token / __Secure-next-auth.session-token", "AIBE Technologies / NextAuth", "Maintains the authenticated user session.", "Essential", "Session or up to 30 days, depending on sign-in configuration"],
      ["next-auth.csrf-token / __Host-next-auth.csrf-token", "AIBE Technologies / NextAuth", "Helps prevent request-forgery attacks during sign-in.", "Essential / security", "Session"],
      ["next-auth.callback-url / __Secure-next-auth.callback-url", "AIBE Technologies / NextAuth", "Remembers where the user should return after authentication.", "Essential", "Session"],
      ["aibe-auth", "AIBE Technologies / Supabase", "Keeps the session required to access the private area in local storage.", "Essential / authentication", "Until sign-out, session expiry or browser data deletion"],
      ["job_id", "AIBE Technologies", "Keeps the technical identifier of a user-initiated process between screens.", "Essential / functional", "Until the process is completed or browser data is deleted"],
      ["user_email", "AIBE Technologies", "Remembers the email entered during certain user-requested sign-in flows.", "Essential / functional", "Until replaced or browser data is deleted"],
      ["Vercel Web Analytics", "Vercel Inc.", "Measures aggregated visits, navigation and performance. The component is loaded only after consent.", "Analytics / optional", "According to the provider's current configuration and policy"],
    ],
    afterTable: [
      {
        title: "6. Third-party services initiated by the user",
        paragraphs: [
          "When you sign in with Google, open a booking tool such as Calendly, make a payment through Stripe or visit WhatsApp, LinkedIn or other external services, the relevant third party may process data or use its own cookies under its responsibility.",
          "These tools are activated when you expressly request the feature or leave this website. We recommend reviewing the provider's privacy and cookie policies before continuing.",
        ],
      },
      {
        title: "7. International transfers",
        paragraphs: [
          "Some technology providers may be located outside the European Economic Area. Where an international data transfer occurs, legally recognised safeguards such as adequacy decisions or standard contractual clauses will be used when required.",
        ],
      },
      {
        title: "8. Changing or withdrawing consent",
        paragraphs: [
          "You can reopen the panel through “Cookie settings” in the footer. Saving a new choice replaces the previous one.",
          "You can also remove cookies and local storage through your browser settings. If you delete the consent cookie, the banner will appear again on your next visit.",
        ],
      },
      {
        title: "9. Browser settings",
        paragraphs: [
          "Browsers allow you to block, limit or delete cookies. These controls are usually available under Privacy, Security, Cookies or Site data. Blocking essential cookies may prevent sign-in or proper operation of the private area.",
          "Instructions vary between Chrome, Safari, Firefox, Edge and mobile browsers. Refer to your browser's official help pages for the settings applicable to your device.",
        ],
      },
      {
        title: "10. Policy updates",
        paragraphs: [
          "We may update this policy when technologies, providers or legal requirements change. The date of the current version appears at the top of this page.",
        ],
      },
    ],
    related: "Related documents:",
    privacy: "Privacy Policy",
    legal: "Legal Notice",
    note:
      "This content is a legal draft adapted to the reviewed technical configuration of the project. It should be validated by a legal professional before final publication and updated whenever new tools or cookies are introduced.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "es";
  const text = content[language];

  return {
    title: text.metadataTitle,
    description: text.metadataDescription,
    alternates: {
      canonical: `/${language}/politica-cookies`,
      languages: {
        es: "/es/politica-cookies",
        en: "/en/politica-cookies",
      },
    },
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const language = locale === "en" ? "en" : "es";
  const text = content[language];

  return (
    <main className="legalPage">
      <article>
        <Link className="back" href={`/${language}`}>
          {text.back}
        </Link>
        <span className="eyebrow">{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p className="updated">{text.updated}</p>

        <div className="intro">{text.intro}</div>

        {text.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>{text.tableTitle}</h2>
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  {text.tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {text.tableRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>
                        {index === 0 ? <code>{cell}</code> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {text.afterTable.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <div className="related">
          <strong>{text.related}</strong>
          <Link href={`/${language}/politica-privacidad`}>{text.privacy}</Link>
          <Link href={`/${language}/aviso-legal`}>{text.legal}</Link>
        </div>

        <p className="note">{text.note}</p>
      </article>

      <style>{`
        .legalPage { min-height: 100vh; background: radial-gradient(circle at top right, #eaf2ff 0, transparent 34%), #f6f8fc; padding: 64px 20px; color: #172033; font-family: "Montserrat", Arial, sans-serif; }
        .legalPage article { width: min(100%, 1080px); margin: 0 auto; background: rgba(255,255,255,.96); border: 1px solid #e2e8f2; border-radius: 30px; padding: clamp(28px, 6vw, 68px); box-shadow: 0 30px 90px rgba(30, 58, 110, .1); }
        .legalPage .back { display: inline-flex; margin-bottom: 42px; color: #2e7bff; text-decoration: none; font-weight: 800; }
        .legalPage .back:hover { text-decoration: underline; text-underline-offset: 4px; }
        .legalPage .eyebrow { color: #2e7bff; font-size: .82rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .legalPage h1 { margin: 10px 0 8px; font-size: clamp(2.55rem, 7vw, 5rem); line-height: .98; letter-spacing: -.055em; color: #0b1324; }
        .legalPage .updated { margin: 0; color: #6b7280; }
        .legalPage .intro { margin: 34px 0 44px; padding: 24px 26px; border: 1px solid #d9e6fb; border-radius: 20px; background: #eef4ff; color: #24406f; font-size: 1.06rem; line-height: 1.75; }
        .legalPage section { margin-top: 38px; scroll-margin-top: 32px; }
        .legalPage h2 { margin: 0 0 13px; font-size: clamp(1.2rem, 3vw, 1.5rem); color: #111827; letter-spacing: -.02em; }
        .legalPage p { line-height: 1.78; }
        .legalPage section p { margin: 10px 0; color: #465166; }
        .tableWrap { width: 100%; margin-top: 18px; overflow-x: auto; border: 1px solid #e1e7f0; border-radius: 18px; }
        .legalPage table { width: 100%; min-width: 900px; border-collapse: collapse; font-size: .82rem; }
        .legalPage th { padding: 15px 16px; color: #ffffff; background: #0d1d33; text-align: left; font-size: .74rem; letter-spacing: .04em; text-transform: uppercase; }
        .legalPage td { padding: 16px; color: #465166; border-top: 1px solid #e7ebf2; vertical-align: top; line-height: 1.55; }
        .legalPage tbody tr:nth-child(even) { background: #f8faff; }
        .legalPage code { color: #174a9b; background: #edf3ff; border-radius: 7px; padding: 3px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .75rem; word-break: break-word; }
        .related { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px; margin-top: 42px; padding: 20px 22px; background: #f7f9fd; border: 1px solid #e4eaf3; border-radius: 18px; }
        .related strong { color: #1c2a3d; }
        .related a { color: #2e69ca; font-weight: 800; text-underline-offset: 3px; }
        .legalPage .note { margin-top: 34px; padding-top: 24px; border-top: 1px solid #e6ebf4; color: #6b7280; font-size: .88rem; line-height: 1.65; }
        @media (max-width: 620px) { .legalPage { padding: 18px 10px; } .legalPage article { border-radius: 22px; } .legalPage .back { margin-bottom: 30px; } .legalPage .intro { padding: 19px; } }
      `}</style>
    </main>
  );
}
