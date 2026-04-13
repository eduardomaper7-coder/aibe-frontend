"use client";

// app/[locale]/panel/solicitar-resenas/components/ReviewRequestsTable.tsx
import { useEffect, useMemo, useState } from "react";
import { ReviewRequest, cancelReviewRequest, listReviewRequests } from "../api";

function fmt(dtIso: string) {
  try {
    const d = new Date(dtIso);
    return d.toLocaleString();
  } catch {
    return dtIso;
  }
}

function StatusBadge({ item }: { item: ReviewRequest }) {
  if (item.status === "scheduled") {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
        Programado
      </span>
    );
  }

  if (item.status === "sent") {
    return (
      <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-800">
        Mensaje enviado
      </span>
    );
  }

  if (item.status === "cancelled") {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
        {item.error_message === "ALREADY_SENT"
          ? "Enviado anteriormente"
          : "Cancelado"}
      </span>
    );
  }

  if (item.status === "failed") {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
        Falló
      </span>
    );
  }

  return null;
}

export default function ReviewRequestsTable({ jobId }: { jobId: number }) {
  const [items, setItems] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const res = await listReviewRequests(jobId);
      setItems(res.items);
    } catch (e: any) {
      setErr(e?.message || "No se pudo cargar la tabla.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // refresco suave cada 20s para ver cuando pasan a "sent"
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const hasData = items.length > 0;
  const rows = useMemo(() => items, [items]);

  async function onCancel(id: number) {
    try {
      setBusyId(id);
      await cancelReviewRequest(id);
      await load();
    } catch (e: any) {
      alert(e?.message || "No se pudo cancelar.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="w-full min-w-0 rounded-2xl border bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">
            Mensajes programados
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Estado en tiempo real (se refresca automáticamente).
          </p>
        </div>

        <button
          onClick={load}
          className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>

      {err && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {!hasData && !loading && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          No hay citas aún.
        </div>
      )}

      {/* MÓVIL: tarjetas */}
      {hasData && (
        <div className="mt-4 grid gap-3 sm:hidden">
          {rows.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-slate-900">
                    {r.customer_name}
                  </div>
                  <div className="mt-1 break-all font-mono text-xs text-slate-600">
                    {r.phone_e164}
                  </div>
                </div>

                <div className="shrink-0">
                  <StatusBadge item={r} />
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Día y hora cita
                  </div>
                  <div className="mt-1 text-slate-800">{fmt(r.appointment_at)}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Envío estimado
                  </div>
                  <div className="mt-1 text-slate-800">{fmt(r.send_at)}</div>
                </div>

                {r.status === "failed" && r.error_message ? (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Error
                    </div>
                    <div className="mt-1 text-sm text-red-700">
                      {r.error_message}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                {r.status === "scheduled" ? (
                  <button
                    onClick={() => onCancel(r.id)}
                    disabled={busyId === r.id}
                    className="w-full rounded-xl border border-red-200 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    {busyId === r.id ? "Cancelando..." : "Cancelar envío"}
                  </button>
                ) : r.status === "cancelled" &&
                  r.error_message === "ALREADY_SENT" ? (
                  <span className="text-xs text-slate-500">
                    Mensaje enviado anteriormente
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ESCRITORIO: tabla original */}
      <div className="mt-4 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="border-b p-3">Nombre</th>
              <th className="border-b p-3">Teléfono</th>
              <th className="border-b p-3">Día y hora cita</th>
              <th className="border-b p-3">Envío estimado</th>
              <th className="border-b p-3">Estado</th>
              <th className="border-b p-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {!hasData && !loading && (
              <tr>
                <td colSpan={6} className="p-4 text-sm text-slate-600">
                  No hay citas aún.
                </td>
              </tr>
            )}

            {rows.map((r) => (
              <tr key={r.id} className="text-sm text-slate-800">
                <td className="border-b p-3 font-medium">{r.customer_name}</td>
                <td className="border-b p-3 font-mono text-xs">{r.phone_e164}</td>
                <td className="border-b p-3">{fmt(r.appointment_at)}</td>
                <td className="border-b p-3">{fmt(r.send_at)}</td>
                <td className="border-b p-3">
                  {r.status === "scheduled" && (
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-800">
                      Programado
                    </span>
                  )}
                  {r.status === "sent" && (
                    <span className="rounded-full bg-green-50 px-2 py-1 text-green-800">
                      Mensaje enviado
                    </span>
                  )}
                  {r.status === "cancelled" && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                      {r.error_message === "ALREADY_SENT"
                        ? "Enviado anteriormente"
                        : "Cancelado"}
                    </span>
                  )}
                  {r.status === "failed" && (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-red-700">
                      Falló
                    </span>
                  )}
                  {r.status === "failed" && r.error_message ? (
                    <div className="mt-1 text-xs text-red-700/80">
                      {r.error_message}
                    </div>
                  ) : null}
                </td>
                <td className="border-b p-3 text-right">
                  {r.status === "scheduled" ? (
                    <button
                      onClick={() => onCancel(r.id)}
                      disabled={busyId === r.id}
                      className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {busyId === r.id ? "Cancelando..." : "Cancelar envío"}
                    </button>
                  ) : r.status === "cancelled" &&
                    r.error_message === "ALREADY_SENT" ? (
                    <span className="text-xs text-slate-500">
                      Mensaje enviado anteriormente
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}