"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Stats = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number; // 0..1
};

export default function ReviewSummaryPanel({
  jobId,
  defaultBusinessName,
}: {
  jobId: number;
  defaultBusinessName?: string | null;
}) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [stats, setStats] = useState<Stats>({
    messages_sent: 0,
    reviews_gained: 0,
    conversion_rate: 0,
  });

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ stats
  useEffect(() => {
    if (!API_BASE) return;

    fetch(`${API_BASE}/api/review-requests/stats?job_id=${jobId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setStats(d))
      .catch(() => {});
  }, [jobId, API_BASE]);

  // ✅ nombre negocio (business_settings con fallback a placeName)
  useEffect(() => {
    if (!API_BASE) {
      // si no hay API base, al menos pinta el fallback
      setName(String(defaultBusinessName ?? ""));
      return;
    }

    fetch(`${API_BASE}/api/business-settings?job_id=${jobId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => {
        const businessName = d?.business_name;
        const fallback = defaultBusinessName ?? "";
        // si business_name es null/"" usa el fallback (placeName)
        setName(String(businessName ?? fallback));
      })
      .catch(() => {
        // si falla, usa fallback
        setName(String(defaultBusinessName ?? ""));
      });
  }, [jobId, API_BASE, defaultBusinessName]);

  async function saveName() {
    try {
      if (!API_BASE) return;

      setSaving(true);

      const res = await fetch(`${API_BASE}/api/business-settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          business_name: name || null,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "No se pudo guardar el nombre del negocio");
      }

      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  const convPct = Math.round((stats?.conversion_rate ?? 0) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Resumen</h2>

      {/* Métricas */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="text-2xl font-semibold text-slate-900">{stats.messages_sent}</div>
          <div className="mt-1 text-sm text-slate-600">Mensajes enviados</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="text-2xl font-semibold text-slate-900">{stats.reviews_gained}</div>
          <div className="mt-1 text-sm text-slate-600">Reseñas conseguidas</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="text-2xl font-semibold text-slate-900">{convPct}%</div>
          <div className="mt-1 text-sm text-slate-600">Tasa conversión</div>
        </div>
      </div>

      {/* Nombre negocio */}
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-900">Nombre del negocio</div>

          {!editing ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              onClick={() => setEditing(true)}
            >
              Cambiar
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={saving}
                onClick={saveName}
              >
                {saving ? "Guardando..." : "Guardar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="mt-2 text-slate-900">
            {name || <span className="text-slate-500">—</span>}
          </div>
        ) : (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Restaurante Euro Pekín"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <p className="mt-2 text-xs text-slate-500">Lo usaremos en los mensajes de WhatsApp.</p>
      </div>
    </div>
  );
}
