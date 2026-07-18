import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nombre = String(body.nombre ?? "").trim();
    const empresa = String(body.empresa ?? "").trim();
    const email = String(body.email ?? "").trim();
    const telefono = String(body.telefono ?? "").trim();
    const web = String(body.web ?? "").trim();
    const mensaje = String(body.mensaje ?? "").trim();

    if (!nombre || !empresa || !email || !telefono || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      return NextResponse.json(
        { error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Falta la variable RESEND_API_KEY");

      return NextResponse.json(
        { error: "El servicio de correo no está configurado." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "AIBE Tech <contacto@aibetech.es>",
      to: ["info@aibetech.es"],
      replyTo: email,
      subject: `Nuevo contacto web: ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="color: #2e7bff;">Nuevo formulario de contacto</h2>

          <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
          <p><strong>Empresa:</strong> ${escapeHtml(empresa)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
          <p><strong>Página web:</strong> ${
            web ? escapeHtml(web) : "No indicada"
          }</p>

          <hr style="border: 0; border-top: 1px solid #e5e7eb;" />

          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(mensaje).replaceAll("\n", "<br />")}</p>
        </div>
      `,
      text: `
Nuevo formulario de contacto

Nombre: ${nombre}
Empresa: ${empresa}
Email: ${email}
Teléfono: ${telefono}
Página web: ${web || "No indicada"}

Mensaje:
${mensaje}
      `.trim(),
    });

    if (error) {
      console.error("Error de Resend:", error);

      return NextResponse.json(
        { error: "No se ha podido enviar el correo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Error en /api/contacto:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
