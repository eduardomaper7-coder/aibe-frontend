"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";
import ReviewSummaryPanel from "./components/ReviewSummaryPanel";

export default function SolicitarResenasClient() {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("job_id");
  const jobId = jobIdParam ? Number(jobIdParam) : 0;

  const planHref = jobId
    ? `/${locale}/plan?job_id=${encodeURIComponent(String(jobId))}`
    : `/${locale}/plan`;

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  const [placeName, setPlaceName] = useState<string | null>(null);

  // ✅ Cargar nombre del negocio (de la cuenta/job) como fallback por defecto
  useEffect(() => {
    if (!jobId) return;
    if (!API_BASE) return;

    fetch(`${API_BASE}/jobs/${jobId}/meta`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => {
        if (d?.place_name) setPlaceName(String(d.place_name));
      })
      .catch(() => {});
  }, [jobId, API_BASE]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Solicitar reseñas
        </h1>
        <p className="mt-1 text-slate-600">
          Programa mensajes de WhatsApp para enviar 60 min después de la cita.
        </p>
      </div>

      {!jobId ? (
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          Falta <span className="font-mono">job_id</span> en la URL.
        </div>
      ) : (
        <div className="grid gap-6">
          {/* ✅ CTA arriba */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Activa tu WhatsApp profesional
              </h3>
              <p className="mt-1 text-slate-600">
                Comienza a ganar reseñas Google rápidamente
              </p>
              {placeName ? (
                <p className="mt-1 text-sm text-slate-500">
                  Negocio: <span className="font-medium">{placeName}</span>
                </p>
              ) : null}
            </div>

            <Link
              href={planHref}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
            >
              Activar ahora
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <CreateReviewRequestForm jobId={jobId} />

            {/* ✅ aquí va el fallback */}
            <ReviewSummaryPanel jobId={jobId} defaultBusinessName={placeName} />
          </div>

          <ReviewRequestsTable jobId={jobId} />
        </div>
      )}
    </div>
  );
}
