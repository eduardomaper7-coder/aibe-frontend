import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validación mínima
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
    }

    // Transporter de Gmail (App Password recomendado)
    const user = process.env.GMAIL_USER!;
    const pass = process.env.GMAIL_PASS!;
    const to = process.env.CONTACT_TO || process.env.GMAIL_USER!; // Destino interno

    if (!user || !pass) {
      return NextResponse.json({ error: 'Email no configurado en el servidor.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    // 1) Correo interno (a tu buzón)
    const internal = await transporter.sendMail({
      from: `"AIBE Contacto" <${user}>`,
      to: to,
      replyTo: email,
      subject: `Contacto: ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Inter, system-ui, -apple-system, sans-serif; line-height:1.6; color:#0f172a">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
          <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    });

    // 2) Correo de confirmación para el usuario
    const confirmation = await transporter.sendMail({
      from: `"AIBE Technologies" <${user}>`,
      to: email,
      subject: `Hemos recibido tu mensaje: ${subject}`,
      text:
        `Hola ${name},\n\n` +
        `Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos lo antes posible.\n\n` +
        `Copia de tu mensaje:\n` +
        `--------------------------------\n` +
        `${message}\n` +
        `--------------------------------\n\n` +
        `Un saludo,\nAIBE Technologies`,
      html: `
        <div style="font-family: Inter, system-ui, -apple-system, sans-serif; line-height:1.6; color:#0f172a">
          <h2 style="margin:0 0 12px 0;">Hemos recibido tu mensaje</h2>
          <p>Hola ${escapeHtml(name)},</p>
          <p>Gracias por escribirnos. Te responderemos lo antes posible.</p>
          <div style="margin:16px 0; padding:12px; border:1px solid #e5e7eb; border-radius:12px; background:#f8fafc;">
            <p style="margin:0 0 8px 0;"><strong>Tu mensaje:</strong></p>
            <p style="margin:0;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="color:#475569">Un saludo,<br/>AIBE Technologies</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('CONTACT ERROR', err);
    return NextResponse.json({ error: 'Error enviando el correo.' }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
