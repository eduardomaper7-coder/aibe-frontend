"use client";

// app/[locale]/panel/solicitar-resenas/components/BusinessSettingsCard.tsx
import { useEffect, useMemo, useState } from "react";
import { BusinessSettings, getBusinessSettings, upsertBusinessSettings } from "../api";

export default function BusinessSettingsCard({ jobId }: { jobId: number }) {
  const [data, setData] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await getBusinessSettings(jobId);
        if (!mounted) return;
        setData(res);
        setBusinessName(res.business_name ?? "");
        setGoogleReviewUrl(res.google_review_url ?? "");
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
  }, [jobId]);

  const canSave = useMemo(() => {
    if (!data) return true;
    return (
      (businessName ?? "") !== (data.business_name ?? "") ||
      (googleReviewUrl ?? "") !== (data.google_review_url ?? "")
    );
  }, [data, businessName, googleReviewUrl]);

  async function onSave() {
    try {
      setSaving(true);
      setErr(null);
      const res = await upsertBusinessSettings({
        job_id: jobId,
        business_name: businessName || null,
        google_review_url: googleReviewUrl || null,
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
          <h2 className="text-lg font-semibold text-slate-900">Configuración del negocio</h2>
          <p className="mt-1 text-sm text-slate-600">
            Guarda el nombre y el enlace “bonito” para reseñas.
          </p>
        </div>
        <button
          disabled={loading || saving || !canSave}
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
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700">Link reseña Google (bonito)</div>
          <input
            value={googleReviewUrl}
            onChange={(e) => setGoogleReviewUrl(e.target.value)}
            placeholder="Ej: https://g.page/r/XXXX/review"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-1 text-xs text-slate-500">
            Recomendado: enlace tipo <span className="font-mono">g.page/.../review</span>
          </div>
        </label>
      </div>

      {loading && <div className="mt-3 text-sm text-slate-500">Cargando...</div>}
    </div>
  );
}
