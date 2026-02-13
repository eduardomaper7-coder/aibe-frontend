"use client";

import { useEffect, useState } from "react";
import { getBusinessSettings, upsertBusinessSettings } from "../api";

type Stats = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number; // 0..1
};

async function fetchStats(jobId: number): Promise<Stats> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const res = await fetch(`${base}/api/review-requests/stats?job_id=${jobId}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function ReviewRequestStatsCard({ jobId, defaultBusinessName }: { jobId: number; defaultBusinessName: string | null }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [s, bs] = await Promise.all([fetchStats(jobId), getBusinessSettings(jobId)]);
        if (!mounted) return;
        setStats(s);

        // nombre: preferimos business_settings.business_name, si no existe usamos el default (place_name)
        setName(bs.business_name || defaultBusinessName || "");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [jobId, defaultBusinessName]);

  async function onSave() {
    try {
      setSaving(true);
      await upsertBusinessSettings({ job_id: jobId, business_name: name || null });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  const convPct = stats ? Math.round(stats.conversion_rate * 100) : 0;

  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Resumen</h2>
          <p className="mt-1 text-sm text-slate-600">Resultados y configuración del mensaje.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-500">Mensajes enviados</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{stats?.messages_sent ?? (loading ? "…" : 0)}</div>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-500">Reseñas conseguidas</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{stats?.reviews_gained ?? (loading ? "…" : 0)}</div>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-500">Tasa de conversión</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{loading ? "…" : `${convPct}%`}</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-900">Nombre del negocio</div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Cambiar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                disabled={saving}
                onClick={onSave}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="mt-2 text-slate-800">{name || <span className="text-slate-500">—</span>}</div>
        ) : (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Restaurante Euro Pekín"
          />
        )}

        <div className="mt-2 text-xs text-slate-500">Lo usaremos en los mensajes de WhatsApp.</div>
      </div>
    </div>
  );
}
