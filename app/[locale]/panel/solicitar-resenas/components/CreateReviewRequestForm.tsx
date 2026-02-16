"use client";

import { useState } from "react";
import { createReviewRequest } from "../api";

export default function CreateReviewRequestForm({ jobId }: { jobId: number }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [time, setTime] = useState(""); // hh:mm

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

function normalizePhone(input: string) {
  let v = (input || "").trim().replace(/\s+/g, "");

  // Si el usuario escribe 699301819 (España) => +34699301819
  if (/^[6789]\d{8}$/.test(v)) return `+34${v}`;

  // Si escribe 34699301819 (sin +) => +34699301819
  if (/^34\d{9}$/.test(v)) return `+${v}`;

  return v;
}

function isValidE164(v: string) {
  return /^\+\d{9,15}$/.test(v);
}

  function toISO(dateStr: string, timeStr: string) {
    // interpreta como local y lo convierte a ISO UTC
    const d = new Date(`${dateStr}T${timeStr}:00`);
    return d.toISOString();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!name.trim()) return setErr("Falta el nombre.");
    const phoneNorm = normalizePhone(phone);

if (!phoneNorm) return setErr("Falta el teléfono.");
if (!phoneNorm.startsWith("+")) return setErr("El teléfono debe empezar por +34.");
if (!isValidE164(phoneNorm)) return setErr("Formato inválido. Ej: +34699111222");

    if (!date || !time) return setErr("Falta fecha y hora de la cita.");

    try {
      setLoading(true);
      console.log("SUBMIT jobId:", jobId);
      await createReviewRequest({
        job_id: jobId,
        customer_name: name.trim(),
        phone_e164: phoneNorm,
        appointment_at: toISO(date, time),
      });
      setMsg("Cita añadida. El mensaje se enviará 60 min después.");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
    } catch (e: any) {
      setErr(e?.message || "No se pudo crear la solicitud.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Añadir cita</h2>
      <p className="mt-1 text-sm text-slate-600">El mensaje se enviará automáticamente 60 min después.</p>

      {msg && <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{msg}</div>}
      {err && <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      <form onSubmit={onSubmit} className="mt-4 grid gap-4">
        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Nombre</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Marta"
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Teléfono (E.164)</div>
          <input
            value={phone}
            onChange={(e) => setPhone(normalizePhone(e.target.value))}
            placeholder="Ej: +34699111222"
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700">Fecha</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700">Hora</div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

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
