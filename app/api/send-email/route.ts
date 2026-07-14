import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // 🔹 Ahora usamos las credenciales de Gmail (Workspace)
    const user = process.env.GMAIL_USER;      // ayuda@aibetech.es
    const pass = process.env.GMAIL_PASS;      // contraseña de aplicación
    const to   = process.env.CONTACT_TO || user; // destino interno

    console.log("[ENV CHECK] GMAIL_USER set?", !!user);
    console.log("[ENV CHECK] GMAIL_PASS set?", !!pass);

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Servidor no configurado: faltan credenciales." },
        { status: 500 }
      );
    }

    // 🔹 Transporter usando Gmail, NO Hostinger
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: { user, pass },
    });

    try {
      await transporter.verify();
      console.log("[SMTP] verify OK");
    } catch (e: any) {
      console.error("[SMTP VERIFY ERROR]", e);
      return NextResponse.json(
        {
          error:
            `No se pudo verificar SMTP: ${e?.code || ""} ${e?.message || e}`.trim(),
        },
        { status: 500 }
      );
    }

    try {
      const info = await transporter.sendMail({
        from: `"Formulario AIBE" <${user}>`, // mismo buzón autenticado
        to: to,                              // te lo envías a ti
        replyTo: email,                      // para poder responder al usuario
        subject: `Nuevo mensaje de ${nombre}`,
        text: `Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`,
      });
      console.log("[MAIL OK] id:", info.messageId);
    } catch (e: any) {
      console.error("[SENDMAIL ERROR]", e);
      return NextResponse.json(
        {
          error:
            `Fallo al enviar: ${e?.code || ""} ${e?.response || e?.message || e}`.trim(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[CONTACT ERROR]", err);
    return NextResponse.json(
      { error: err?.message || "Error enviando el correo" },
      { status: 500 }
    );
  }
}

