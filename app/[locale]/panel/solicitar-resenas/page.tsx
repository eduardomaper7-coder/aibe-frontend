"use client";

import { useSearchParams } from "next/navigation";
import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";
import ReviewSummaryPanel from "./components/ReviewSummaryPanel";

export default function SolicitarResenasPage() {
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get("job_id");

  const jobId = jobIdParam ? Number(jobIdParam) : 0;

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
          <div className="grid gap-6 lg:grid-cols-2">
            <CreateReviewRequestForm jobId={jobId} />
            <ReviewSummaryPanel jobId={jobId} />
          </div>

          <ReviewRequestsTable jobId={jobId} />
        </div>
      )}
    </div>
  );
}
