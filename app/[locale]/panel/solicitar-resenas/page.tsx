"use client";

// app/[locale]/panel/solicitar-resenas/page.tsx
import { useEffect, useState } from "react";
import BusinessSettingsCard from "./components/BusinessSettingsCard";
import CreateReviewRequestForm from "./components/CreateReviewRequestForm";
import ReviewRequestsTable from "./components/ReviewRequestsTable";

export default function SolicitarResenasPage() {
  const [jobId, setJobId] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = Number(params.get("job_id") ?? 0);
    setJobId(Number.isFinite(v) ? v : 0);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Solicitar reseñas</h1>
        <p className="mt-1 text-slate-600">
          Programa mensajes de WhatsApp para enviar 15–30 min después de la cita.
        </p>
      </div>

      {!jobId ? (
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          Falta <span className="font-mono">job_id</span> en la URL. Ej:{" "}
          <span className="font-mono">?job_id=3</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <BusinessSettingsCard jobId={jobId} />

          <div className="grid gap-6 lg:grid-cols-2">
            <CreateReviewRequestForm jobId={jobId} />
            <div className="rounded-2xl border bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Cómo funciona</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Creas una cita con nombre, teléfono y fecha/hora.</li>
                <li>El backend calcula automáticamente el envío entre 15 y 30 min después.</li>
                <li>Cuando se envía, el estado cambia a “Mensaje enviado”.</li>
                <li>Puedes cancelar mientras esté “Programado”.</li>
              </ul>
            </div>
          </div>

          <ReviewRequestsTable jobId={jobId} />
        </div>
      )}
    </div>
  );
}
