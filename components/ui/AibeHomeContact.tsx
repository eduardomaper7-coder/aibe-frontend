"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";

type Locale = "es" | "en";

const T: Record<Locale, {
  eyebrow: string; title: string; lead: string; points: string[];
  name: string; company: string; email: string; phone: string; web: string; message: string;
  accept: [string, string, string]; send: string; sending: string;
  okTitle: string; okBody: string; error: string; slogan: string;
}> = {
  es: {
    eyebrow: "Hablemos",
    title: "Cuéntanos tu negocio. Te proponemos el camino.",
    lead: "Analizamos tu caso sin compromiso y te decimos qué automatizar y cómo atraer más clientes.",
    points: ["Respuesta en menos de 24 h", "Propuesta adaptada a tu negocio", "Sin permanencias ni letra pequeña"],
    name: "Nombre", company: "Empresa", email: "Email", phone: "Teléfono",
    web: "Tu página web (opcional)", message: "¿En qué podemos ayudarte?",
    accept: ["Acepto el ", "Aviso legal", "Política de privacidad"],
    send: "Enviar mensaje", sending: "Enviando…",
    okTitle: "¡Mensaje enviado!", okBody: "Gracias por escribirnos. Te responderemos en menos de 24 horas.",
    error: "No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.",
    slogan: "Tecnología con sentido humano.",
  },
  en: {
    eyebrow: "Let's talk",
    title: "Tell us about your business. We'll map the way.",
    lead: "We review your case with no commitment and tell you what to automate and how to attract more customers.",
    points: ["Reply in under 24 h", "A proposal built for your business", "No lock-ins, no small print"],
    name: "Name", company: "Company", email: "Email", phone: "Phone",
    web: "Your website (optional)", message: "How can we help?",
    accept: ["I accept the ", "Legal notice", "Privacy policy"],
    send: "Send message", sending: "Sending…",
    okTitle: "Message sent!", okBody: "Thanks for reaching out. We'll get back to you within 24 hours.",
    error: "We couldn't send your message. Please try again or message us on WhatsApp.",
    slogan: "Technology with a human touch.",
  },
};

export default function AibeHomeContact({ locale }: { locale: string }) {
  const loc: Locale = locale === "en" ? "en" : "es";
  const t = T[loc];
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: get("nombre"), empresa: get("empresa"), email: get("email"),
          telefono: get("telefono"), web: get("web"), mensaje: get("mensaje"),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setState("ok");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="ahc" id="contacto">
      <div className="ahc__glow ahc__glow--a" aria-hidden />
      <div className="ahc__glow ahc__glow--b" aria-hidden />

      <div className="ahc__inner">
        <div className="ahc__intro">
          <span className="ahc__eyebrow">{t.eyebrow}</span>
          <h2 className="ahc__title">{t.title}</h2>
          <p className="ahc__lead">{t.lead}</p>

          <ul className="ahc__points">
            {t.points.map((p) => (
              <li key={p}><span className="ahc__tick"><Check size={14} strokeWidth={3} /></span>{p}</li>
            ))}
          </ul>

          <div className="ahc__channels">
            <a href="mailto:info@aibetech.es"><Mail size={18} />info@aibetech.es</a>
            <a href="tel:+34699301819"><Phone size={18} />699 301 819</a>
            <a href="https://wa.me/34699301819" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a>
          </div>
        </div>

        <div className="ahc__card" id="contact-formulario">
          {state === "ok" ? (
            <div className="ahc__ok" role="status" aria-live="polite">
              <span className="ahc__okIcon"><Check size={28} strokeWidth={3} /></span>
              <h3>{t.okTitle}</h3>
              <p>{t.okBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="ahc__form">
              <div className="ahc__row">
                <label className="ahc__field"><span>{t.name}</span><input name="nombre" autoComplete="name" required /></label>
                <label className="ahc__field"><span>{t.company}</span><input name="empresa" autoComplete="organization" required /></label>
              </div>
              <div className="ahc__row">
                <label className="ahc__field"><span>{t.email}</span><input name="email" type="email" autoComplete="email" required /></label>
                <label className="ahc__field"><span>{t.phone}</span><input name="telefono" type="tel" autoComplete="tel" required /></label>
              </div>
              <label className="ahc__field"><span>{t.web}</span><input name="web" type="text" inputMode="url" autoComplete="url" /></label>
              <label className="ahc__field"><span>{t.message}</span><textarea name="mensaje" rows={4} required /></label>

              <label className="ahc__legal">
                <input type="checkbox" required />
                <span>
                  {t.accept[0]}
                  <Link href={`/${loc}/aviso-legal`} target="_blank" rel="noopener noreferrer">{t.accept[1]}</Link>
                  {loc === "es" ? " y la " : " and the "}
                  <Link href={`/${loc}/politica-privacidad`} target="_blank" rel="noopener noreferrer">{t.accept[2]}</Link>
                </span>
              </label>

              <button type="submit" className="ahc__submit" disabled={state === "sending"}>
                {state === "sending" ? t.sending : t.send}
                {state !== "sending" && <ArrowRight size={18} />}
              </button>
              {state === "error" && <p className="ahc__error" role="alert">{t.error}</p>}
            </form>
          )}
        </div>
      </div>

      <style>{`
        .ahc{position:relative;overflow:hidden;scroll-margin-top:80px;background:#001E4B;color:#fff;
          padding:clamp(80px,11vw,140px) clamp(18px,5vw,64px);}
        .ahc__glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        .ahc__glow--a{width:720px;height:720px;right:-220px;top:-260px;background:radial-gradient(circle,rgba(0,119,255,.55),transparent 65%);}
        .ahc__glow--b{width:560px;height:560px;left:-240px;bottom:-280px;background:radial-gradient(circle,rgba(25,211,255,.28),transparent 65%);}
        .ahc__inner{position:relative;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(40px,6vw,88px);align-items:center;}
        .ahc__eyebrow{display:inline-block;font-weight:600;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:#19D3FF;}
        .ahc__title{font-weight:700;font-size:clamp(2rem,4vw,3.2rem);line-height:1.06;letter-spacing:-.02em;margin:14px 0 0;color:#fff;}
        .ahc__lead{margin:20px 0 0;max-width:480px;font-size:1.08rem;line-height:1.6;color:rgba(255,255,255,.74);}
        .ahc__points{list-style:none;padding:0;margin:32px 0 0;display:grid;gap:14px;}
        .ahc__points li{display:flex;align-items:center;gap:12px;font-size:1rem;color:rgba(255,255,255,.92);}
        .ahc__tick{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;flex:none;
          background:linear-gradient(135deg,#0077FF,#19D3FF);color:#fff;}
        .ahc__channels{display:flex;flex-wrap:wrap;gap:10px;margin-top:40px;}
        .ahc__channels a{display:inline-flex;align-items:center;gap:9px;padding:11px 18px;border-radius:999px;font-weight:500;font-size:.95rem;
          color:#fff;text-decoration:none;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);transition:background .2s,border-color .2s;}
        .ahc__channels a:hover{background:rgba(255,255,255,.13);border-color:rgba(25,211,255,.5);}
        .ahc__card{background:#fff;color:#001E4B;border-radius:28px;padding:clamp(24px,3.4vw,44px);
          box-shadow:0 40px 90px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.06);}
        .ahc__form{display:grid;gap:16px;}
        .ahc__row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .ahc__field{display:grid;gap:7px;}
        .ahc__field span{font-size:.82rem;font-weight:600;color:#3A4F72;}
        .ahc__field input,.ahc__field textarea{width:100%;font:inherit;font-size:1rem;color:#001E4B;background:#F4F8FD;
          border:1.5px solid #E1EAF5;border-radius:14px;padding:13px 15px;outline:none;transition:border-color .2s,box-shadow .2s,background .2s;}
        .ahc__field textarea{resize:vertical;min-height:112px;}
        .ahc__field input:focus,.ahc__field textarea:focus{border-color:#0077FF;background:#fff;box-shadow:0 0 0 4px rgba(0,119,255,.12);}
        .ahc__legal{display:flex;align-items:flex-start;gap:10px;font-size:.86rem;line-height:1.5;color:#3A4F72;}
        .ahc__legal input{width:18px;height:18px;margin-top:2px;flex:none;accent-color:#0077FF;}
        .ahc__legal a{color:#0077FF;font-weight:600;text-decoration:none;}
        .ahc__legal a:hover{text-decoration:underline;}
        .ahc__submit{display:inline-flex;align-items:center;justify-content:center;gap:10px;width:100%;border:0;cursor:pointer;
          font:inherit;font-weight:600;font-size:1.02rem;color:#fff;padding:16px 26px;border-radius:999px;
          background:linear-gradient(135deg,#0077FF 0%,#0A8DFF 55%,#19D3FF 120%);box-shadow:0 14px 32px rgba(0,119,255,.35);
          transition:transform .2s,box-shadow .2s,opacity .2s;}
        .ahc__submit:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(0,119,255,.45);}
        .ahc__submit:disabled{opacity:.7;cursor:wait;transform:none;}
        .ahc__error{margin:0;font-size:.9rem;color:#C2410C;}
        .ahc__ok{display:grid;justify-items:center;text-align:center;gap:12px;padding:40px 8px;}
        .ahc__okIcon{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;color:#fff;background:linear-gradient(135deg,#0077FF,#19D3FF);}
        .ahc__ok h3{margin:6px 0 0;font-size:1.6rem;font-weight:700;}
        .ahc__ok p{margin:0;max-width:340px;color:#3A4F72;line-height:1.6;}
        @media (max-width:900px){
          .ahc__inner{grid-template-columns:1fr;}
          .ahc__row{grid-template-columns:1fr;}
        }
      `}</style>
    </section>
  );
}
