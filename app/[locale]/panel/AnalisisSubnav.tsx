"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type Item = { id: string; label: string };

const ITEMS: Item[] = [
  { id: "temas", label: "Temas" },
  { id: "sentimiento", label: "Sentimiento" },
  { id: "volumen", label: "Volumen" },
  { id: "oportunidades", label: "Oportunidades" },
  { id: "respuestas", label: "Respuestas" },
];

export default function AnalisisSubnav() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "es";
  const search = useSearchParams();
  const jobId = search.get("job_id");

  const base = `/${locale}/panel${jobId ? `?job_id=${jobId}` : ""}`;

  return (
  <div className="sticky top-[64px] z-20 border-b bg-white/90 backdrop-blur">
    <div className="mx-auto w-full px-4 py-2">
      <nav
        className="flex justify-center"
        aria-label="Secciones del análisis"
      >
        <div className="inline-flex flex-wrap items-center gap-1 rounded-full border bg-slate-50 p-1">
          {ITEMS.map((it) => (
            <Link
              key={it.id}
              href={`${base}#${it.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-slate-900 transition"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  </div>
);

}

// (Opcional pero recomendado para evitar “is not a module” raros)
export {};
