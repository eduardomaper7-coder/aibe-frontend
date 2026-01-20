"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const MESSAGES = [
  "Analizando reseñas recientes…",
  "Detectando temas más mencionados…",
  "Evaluando sentimiento de los clientes…",
  "Generando insights accionables…",
  "Preparando tu panel de resultados…",
];

export default function ProcesandoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("job_id");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [status, setStatus] = useState("running");
  const [error, setError] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!jobId) {
      setError("No se encontró el análisis");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/jobs/${jobId}`);
        if (!res.ok) throw new Error("Error consultando estado");

        const data = await res.json();
        setStatus(data.status);

        if (data.status === "succeeded") {
          clearInterval(interval);
          router.replace(`/panel?job_id=${jobId}`);
        }

        if (data.status === "failed") {
          clearInterval(interval);
          setError("El análisis ha fallado");
        }
      } catch {
        setError("Error conectando con el servidor");
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, API_BASE, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6">
          Analizando tu negocio
        </h1>

        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white" />
        </div>

        <p className="text-sm text-gray-300 mb-6">
          {MESSAGES[msgIndex]}
        </p>

        {!error && (
          <p className="text-xs text-gray-500">
            Estado: {status}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400 mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
