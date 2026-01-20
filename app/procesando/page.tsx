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

export default function ProcesandoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("job_id");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [status, setStatus] = useState<string>("running");
  const [error, setError] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);

  // 🔁 Rotación de mensajes
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // 🔁 Polling del backend
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
      } catch (e) {
        console.error(e);
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

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white" />
        </div>

        {/* Mensaje rotativo */}
        <p className="text-sm text-gray-300 mb-6 transition-opacity duration-500">
          {MESSAGES[msgIndex]}
        </p>

        {/* Estado técnico (debug suave) */}
        {!error && (
          <p className="text-xs text-gray-500">
            Estado: {status}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
