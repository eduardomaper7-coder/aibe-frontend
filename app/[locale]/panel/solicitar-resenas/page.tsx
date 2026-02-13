"use client";

import { useEffect, useState } from "react";
import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";
import ReviewSummaryPanel from "./components/ReviewSummaryPanel";

export default function SolicitarResenasPage() {
  const [jobId, setJobId] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = Number(params.get("job_id") ?? 0);
    const jid = Number.isFinite(v) ? v : 0;
    setJobId(jid);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Solicitar reseñas</h1>
        <p className="mt-1 text-slate-600">Programa mensajes de WhatsApp para enviar 60 min después de la cita.</p>
      </div>

      {!jobId ? (
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          Falta <span className="font-mono">job_id</span> en la URL. Ej:{" "}
          <span className="font-mono">?job_id=3</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Izquierda: formulario */}
            <CreateReviewRequestForm jobId={jobId} />

            {/* Derecha: resumen (métricas + nombre negocio editable) */}
            <ReviewSummaryPanel jobId={jobId} />
          </div>

          {/* Abajo: tabla */}
          <ReviewRequestsTable jobId={jobId} />
        </div>
      )}
    </div>
  );
}
