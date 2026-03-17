"use client";

import { useMemo, useState } from "react";
import { importAppointments, type ImportAppointmentsResponse } from "../api";

function statusLabel(status: string) {
  switch (status) {
    case "patient_saved":
      return "Paciente guardado";
    case "scheduled":
      return "Programada";
    case "incomplete":
      return "Incompleta";
    case "duplicate":
      return "Duplicada";
    case "too_old":
      return "Demasiado antigua";
    case "conflict":
      return "Conflicto";
    case "ready":
      return "Lista";
    default:
      return status;
  }
}

function missingLabel(key: string) {
  switch (key) {
    case "name":
      return "nombre";
    case "phone":
      return "teléfono";
    case "date":
      return "fecha";
    case "time":
      return "hora";
    default:
      return key;
  }
}

export default function ReviewImportBox({
  jobId,
  onDone,
}: {
  jobId: number;
  onDone: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<ImportAppointmentsResponse | null>(null);

  const fileNames = useMemo(() => files.map((f) => f.name).join(", "), [files]);

  async function handleImport() {
    setMsg(null);
    setErr(null);
    setResult(null);

    if (!files.length) {
      setErr("Sube al menos un archivo.");
      return;
    }

    setLoading(true);
    try {
      const data = await importAppointments({
        job_id: jobId,
        files,
      });

      setResult(data);

      const s = data.summary;
      setMsg(
        `Importación completada. Programadas: ${s.scheduled_now}. Incompletas: ${s.incomplete}. Duplicadas: ${s.duplicates}. Antiguas: ${s.too_old}.`
      );

      onDone();
    } catch (e: any) {
      setErr(e?.message || "No se pudo importar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Importar citas desde archivo
      </h2>

      <p className="mt-1 text-sm text-slate-600">
        Sube uno o varios CSV/Excel/PDF o capturas. El sistema detecta nombre,
        teléfono, fecha y hora, guarda pacientes y citas parciales, une datos
        entre archivos y programa solo las citas válidas.
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

      <div className="mt-4 flex flex-col gap-3">
        <input
  type="file"
  multiple
  onChange={(e) => {
    const selected = Array.from(e.target.files || [])
    console.log(selected.map(f => f.name))
    setFiles(selected)
  }}
/>

        {!!files.length && (
          <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-700">
            <div className="font-medium">Archivos seleccionados:</div>
            <div className="mt-1 break-all">{fileNames}</div>
          </div>
        )}

        <div>
          <button
            onClick={handleImport}
            disabled={!files.length || loading}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Procesando..." : "Importar y programar"}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">Resumen</h3>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Archivos</div>
                <div className="text-lg font-semibold">{result.summary.files_received}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Filas detectadas</div>
                <div className="text-lg font-semibold">{result.summary.rows_extracted}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Pacientes creados</div>
                <div className="text-lg font-semibold">{result.summary.patients_created}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Pacientes actualizados</div>
                <div className="text-lg font-semibold">{result.summary.patients_updated}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Citas creadas</div>
                <div className="text-lg font-semibold">{result.summary.appointments_created}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Citas actualizadas</div>
                <div className="text-lg font-semibold">{result.summary.appointments_updated}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Solo paciente guardado</div>
                <div className="text-lg font-semibold">{result.summary.patient_only_saved}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Programadas ahora</div>
                <div className="text-lg font-semibold">{result.summary.scheduled_now}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Incompletas</div>
                <div className="text-lg font-semibold">{result.summary.incomplete}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Duplicadas</div>
                <div className="text-lg font-semibold">{result.summary.duplicates}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Antiguas (&gt;24h)</div>
                <div className="text-lg font-semibold">{result.summary.too_old}</div>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <div className="text-slate-500">Conflictos</div>
                <div className="text-lg font-semibold">{result.summary.conflicts}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Detectado y faltante
            </h3>

            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="px-2 py-2">Tipo</th>
                    <th className="px-2 py-2">Nombre</th>
                    <th className="px-2 py-2">Teléfono</th>
                    <th className="px-2 py-2">Fecha</th>
                    <th className="px-2 py-2">Hora</th>
                    <th className="px-2 py-2">Estado</th>
                    <th className="px-2 py-2">Falta</th>
                    <th className="px-2 py-2">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {result.items.map((item, idx) => (
                    <tr key={`${item.kind}-${item.patient_id}-${item.appointment_id}-${idx}`} className="border-b align-top">
                      <td className="px-2 py-2">
                        {item.kind === "patient" ? "Paciente" : "Cita"}
                      </td>
                      <td className="px-2 py-2">{item.customer_name || "—"}</td>
                      <td className="px-2 py-2">{item.phone_e164 || "—"}</td>
                      <td className="px-2 py-2">{item.appointment_date || "—"}</td>
                      <td className="px-2 py-2">{item.appointment_time || "—"}</td>
                      <td className="px-2 py-2">{statusLabel(item.status)}</td>
                      <td className="px-2 py-2">
                        {item.missing_fields?.length
                          ? item.missing_fields.map(missingLabel).join(", ")
                          : "—"}
                      </td>
                      <td className="px-2 py-2">
                        {item.issues?.length ? item.issues.join(", ") : "—"}
                      </td>
                    </tr>
                  ))}
                  {!result.items.length && (
                    <tr>
                      <td colSpan={8} className="px-2 py-4 text-center text-slate-500">
                        No se detectaron registros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}