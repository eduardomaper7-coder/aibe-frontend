"use client";

import { useParams } from "next/navigation";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

export default function TermsPage() {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const dict: any = locale === "en" ? en : es;
  const t = dict.legal.terms;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>{t.title}</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>{t.lastUpdated}</p>

      <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
        {t.sections.map((s: any) => (
          <section key={s.h}>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>{s.h}</h2>
            {s.p.map((line: string, idx: number) => (
              <p key={idx} style={{ margin: "8px 0", lineHeight: 1.6 }}>
                {line}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
