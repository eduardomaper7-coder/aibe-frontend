"use client";

import { useEffect, useState } from "react";
import BusinessSettingsCard from "./components/BusinessSettingsCard";
import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";
import ReviewRequestStatsCard from "./components/ReviewRequestStatsCard";

export default function SolicitarResenasPage() {
  const [jobId, setJobId] = useState<number>(0);
  const [defaultBusinessName, setDefaultBusinessName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = Number(params.get("job_id") ?? 0);
    const jid = Number.isFinite(v) ? v : 0;
    setJobId(jid);

    // cargar place_name del backend (tu DB Railway)
    const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
    if (jid && API_BASE) {
      fetch(`${API_BASE}/jobs/${jid}/meta`, { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => setDefaultBusinessName(d?.place_name ?? null))
        .catch(() => {});
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Solicitar reseñas</h1>
        <p className="mt-1 text-slate-600">Programa mensajes de WhatsApp para enviar 60 min después de la cita.</p>
      </div>

      {!jobId ? (
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          Falta <span className="font-mono">job_id</span> en la URL. Ej: <span className="font-mono">?job_id=3</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* NUEVO: métricas + nombre editable */}
          <ReviewRequestStatsCard jobId={jobId} defaultBusinessName={defaultBusinessName} />

          {/* Ajustamos settings: el usuario ya NO edita el link (lo damos nosotros) */}
          <BusinessSettingsCard jobId={jobId} defaultBusinessName={defaultBusinessName} />

          <div className="grid gap-6 lg:grid-cols-2">
            <CreateReviewRequestForm jobId={jobId} />
            <div className="rounded-2xl border bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Mensaje</h2>
              <p className="mt-2 text-sm text-slate-700">
                Se enviará automáticamente <span className="font-semibold">60 minutos</span> después de la cita.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Incluye un enlace directo para dejar la reseña en Google.
              </p>
            </div>
          </div>

          <ReviewRequestsTable jobId={jobId} />
        </div>
      )}
    </div>
  );
}
