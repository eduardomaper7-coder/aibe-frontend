"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ReviewImportBox from "./components/ReviewImportBox";
import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";
import ReviewSummaryPanel from "./components/ReviewSummaryPanel";
import CreditsPanel from "./components/CreditsPanel";

export default function SolicitarResenasClient() {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es"); // (se mantiene aunque no lo uses ahora)

  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("job_id");
  const jobId = jobIdParam ? Number(jobIdParam) : 0;

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
    <div className="mx-auto w-full min-w-0 max-w-6xl overflow-x-hidden px-4 py-6 sm:px-4">
      <div className="mb-6 min-w-0">
        <h1 className="text-2xl font-semibold text-slate-900">
          Solicitar reseñas
        </h1>
        <p className="mt-1 text-slate-600">
          Programa mensajes de WhatsApp para enviar 60 min después de la cita.
        </p>
      </div>

      {!jobId ? (
        <div className="min-w-0 rounded-2xl border bg-white p-5 text-slate-700">
          Falta <span className="font-mono">job_id</span> en la URL.
        </div>
      ) : (
        <div className="grid min-w-0 gap-6">
          <div className="min-w-0">
            <CreditsPanel jobId={jobId} />
          </div>

          <div className="min-w-0">
            <ReviewImportBox
              jobId={jobId}
              onDone={() => window.location.reload()}
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <CreateReviewRequestForm jobId={jobId} />
            </div>

            <div className="min-w-0">
              <ReviewSummaryPanel
                jobId={jobId}
                defaultBusinessName={placeName}
              />
            </div>
          </div>

          <div className="min-w-0">
            <ReviewRequestsTable jobId={jobId} />
          </div>
        </div>
      )}
    </div>
  );
}