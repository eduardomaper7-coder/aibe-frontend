"use client";

import { useState } from "react";
import { createReviewRequest } from "../api";

function todayISODate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeSpainDigits(input: string) {
  // deja solo números
  return (input || "").replace(/\D/g, "");
}

function isValidSpainMobile(digits: string) {
  // 9 dígitos empezando por 6/7/8/9 (ajusta si quieres solo móviles 6/7)
  return /^[6789]\d{8}$/.test(digits);
}

export default function CreateReviewRequestForm({ jobId }: { jobId: number }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // SOLO dígitos (sin +34)

  const [date, setDate] = useState(todayISODate()); // yyyy-mm-dd (hoy por defecto)
  const [time, setTime] = useState(""); // hh:mm

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

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

    const phoneDigits = normalizeSpainDigits(phone);
    if (!phoneDigits) return setErr("Falta el teléfono.");
    if (!isValidSpainMobile(phoneDigits)) return setErr("Formato inválido. Ej: 699111222");

    if (!date || !time) return setErr("Falta fecha y hora de la cita.");

    const phoneNorm = `+34${phoneDigits}`;

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
      setDate(todayISODate());
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
          <div className="mb-1 text-sm font-medium text-slate-700">Teléfono</div>

          <div className="flex">
            <div className="flex items-center rounded-l-xl border border-r-0 bg-slate-50 px-3 text-sm text-slate-700">
              +34
            </div>

            <input
              value={phone}
              onChange={(e) => setPhone(normalizeSpainDigits(e.target.value))}
              placeholder="Ej: 699111222"
              inputMode="numeric"
              className="w-full rounded-r-xl rounded-l-none border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="mt-1 text-xs text-slate-500">Escribe el número sin el prefijo.</p>
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
