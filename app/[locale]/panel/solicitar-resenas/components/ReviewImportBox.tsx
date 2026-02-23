"use client";

import { useState } from "react";
import { createReviewRequest } from "../api";

type Appointment = {
  name: string | null;
  phone: string | null; // E.164
  date: string | null;  // YYYY-MM-DD
  time: string | null;  // HH:MM
  issues?: string[];
  confidence?: number;
};

function toISO(dateStr: string, timeStr: string) {
  const d = new Date(`${dateStr}T${timeStr}:00`);
  return d.toISOString();
}

export default function ReviewImportBox({
  jobId,
  onDone,
}: {
  jobId: number;
  onDone: () => void;
}) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleImport() {
    setMsg(null);
    setErr(null);

    if (!file) return setErr("Sube un archivo primero.");
    if (!API_BASE) return setErr("Falta NEXT_PUBLIC_API_URL.");

    setLoading(true);
    try {
      // 1) Subir archivo al backend para extraer citas
      const form = new FormData();
      form.append("file", file);

      const r = await fetch(`${API_BASE}/api/reviews/import-appointments`, {
        method: "POST",
        body: form,
      });

      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();

      const appointments: Appointment[] = data.appointments || [];
      if (!appointments.length) {
        setErr("No se detectaron citas en el archivo.");
        return;
      }

      // 2) Filtrar solo las citas que tienen lo mínimo para programar
      const ready = appointments.filter(
        (a) => a?.name && a?.phone && a?.date && a?.time
      );

      if (!ready.length) {
        setErr("Se detectaron citas, pero faltan datos (nombre/teléfono/fecha/hora).");
        return;
      }

      // 3) Crear solicitudes igual que el formulario manual (una por cita)
      const results = await Promise.allSettled(
        ready.map((a) =>
          createReviewRequest({
            job_id: jobId,
            customer_name: String(a.name),
            phone_e164: String(a.phone),
            appointment_at: toISO(String(a.date), String(a.time)),
          })
        )
      );

      const ok = results.filter((x) => x.status === "fulfilled").length;
      const fail = results.length - ok;

      setMsg(`Importadas ${ok} citas. Fallaron ${fail}.`);
      onDone();
    } catch (e: any) {
      setErr(e?.message || "No se pudo importar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Importar citas desde archivo</h2>
      <p className="mt-1 text-sm text-slate-600">
        Sube CSV/Excel/PDF o una captura. Extraemos nombre, teléfono, fecha y hora y programamos los mensajes.
      </p>

      {msg && (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          {msg}
        </div>
      )}
      {err && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.pdf,.png,.jpg,.jpeg,.webp,.heic"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />
        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Procesando..." : "Importar y programar"}
        </button>
      </div>
    </div>
  );
}