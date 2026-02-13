"use client";

import { useEffect, useState } from "react";
import { BusinessSettings, getBusinessSettings, upsertBusinessSettings } from "../api";

export default function BusinessSettingsCard({ jobId, defaultBusinessName }: { jobId: number; defaultBusinessName: string | null }) {
  const [data, setData] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await getBusinessSettings(jobId);
        if (!mounted) return;

        setData(res);

        // nombre: primero settings, si no, el place_name de tu DB
        setBusinessName(res.business_name ?? defaultBusinessName ?? "");
      } catch (e: any) {
        if (!mounted) return;
        setErr(e?.message || "Error cargando configuración");
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
      setErr(null);
      const res = await upsertBusinessSettings({
        job_id: jobId,
        business_name: businessName || null,
        // google_review_url NO lo toca el usuario
      });
      setData(res);
    } catch (e: any) {
      setErr(e?.message || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Configuración</h2>
          <p className="mt-1 text-sm text-slate-600">Nombre usado en WhatsApp + enlace de reseña generado por nosotros.</p>
        </div>
        <button
          disabled={loading || saving}
          onClick={onSave}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {err && <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Nombre del negocio</div>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Ej: Restaurante Euro Pekín"
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-1 text-xs text-slate-500">Lo usaremos en los mensajes de WhatsApp.</div>
        </label>

        <div>
          <div className="mb-1 text-sm font-medium text-slate-700">Link de reseña (lo damos nosotros)</div>
          <div className="rounded-xl border bg-slate-50 px-3 py-2 text-sm text-slate-900 break-all">
            {data?.google_review_url ? data.google_review_url : <span className="text-slate-500">Aún no disponible</span>}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Formato: <span className="font-mono">https://search.google.com/local/writereview?placeid=...</span>
          </div>
        </div>
      </div>

      {loading && <div className="mt-3 text-sm text-slate-500">Cargando...</div>}
    </div>
  );
}
