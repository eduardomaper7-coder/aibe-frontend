"use client";

// app/[locale]/panel/solicitar-resenas/components/CreateReviewRequestForm.tsx
import { useState } from "react";
import { createReviewRequest } from "../api";

export default function CreateReviewRequestForm({ jobId }: { jobId: number }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // E.164
  const [appointmentLocal, setAppointmentLocal] = useState(""); // datetime-local
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function toISOFromDatetimeLocal(v: string) {
    // v: "2026-02-12T16:30" (local time)
    const d = new Date(v);
    return d.toISOString();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!name.trim()) return setErr("Falta el nombre.");
    if (!phone.trim()) return setErr("Falta el teléfono en formato +34...");
    if (!appointmentLocal) return setErr("Falta la fecha y hora de la cita.");

    try {
      setLoading(true);
      await createReviewRequest({
        job_id: jobId,
        customer_name: name.trim(),
        phone_e164: phone.trim(),
        appointment_at: toISOFromDatetimeLocal(appointmentLocal),
      });
      setMsg("Cita añadida y envío programado.");
      setName("");
      setPhone("");
      setAppointmentLocal("");
      // Nota: la tabla se refresca sola si recargas; si quieres refresh automático, lo añadimos luego.
    } catch (e: any) {
      setErr(e?.message || "No se pudo crear la solicitud.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Añadir cita</h2>
      <p className="mt-1 text-sm text-slate-600">El mensaje se enviará automáticamente 15–30 min después.</p>

      {msg && <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{msg}</div>}
      {err && <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      <form onSubmit={onSubmit} className="mt-4 grid gap-4">
        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Nombre</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Marta"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Teléfono (E.164)</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej: +34699111222"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-1 text-xs text-slate-500">
            Formato obligatorio: <span className="font-mono">+34...</span>
          </div>
        </label>

        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Día y hora de la cita</div>
          <input
            type="datetime-local"
            value={appointmentLocal}
            onChange={(e) => setAppointmentLocal(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          type="submit"
        >
          {loading ? "Guardando..." : "Programar mensaje"}
        </button>
      </form>
    </div>
  );
}
