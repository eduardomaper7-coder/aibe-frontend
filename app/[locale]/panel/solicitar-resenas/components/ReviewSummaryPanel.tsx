"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Stats = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number;
};

export default function ReviewSummaryPanel({ jobId }: { jobId: number }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`/api/review-requests/stats?job_id=${jobId}`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, [jobId]);

  useEffect(() => {
    fetch(`/api/business-settings?job_id=${jobId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.business_name) setName(d.business_name);
      });
  }, [jobId]);

  async function saveName() {
    await fetch("/api/business-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: jobId,
        business_name: name,
      }),
    });

    setEditing(false);
  }

  return (
    <div className="rounded-2xl border bg-white p-5 space-y-5">

      <h2 className="text-lg font-semibold text-slate-900">
        Resumen
      </h2>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">
            {stats?.messages_sent ?? 0}
          </div>
          <div className="text-sm text-slate-600">
            Mensajes enviados
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold">
            {stats?.reviews_gained ?? 0}
          </div>
          <div className="text-sm text-slate-600">
            Reseñas conseguidas
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold">
            {stats
              ? Math.round(stats.conversion_rate * 100)
              : 0}
            %
          </div>
          <div className="text-sm text-slate-600">
            Tasa conversión
          </div>
        </div>
      </div>

      {/* Nombre negocio */}
      <div className="pt-3 border-t space-y-2">

        <div className="text-sm font-medium text-slate-700">
          Nombre del negocio
        </div>

        {!editing ? (
          <div className="flex items-center justify-between gap-3">
            <div className="font-medium">
              {name || "—"}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
            >
              Cambiar
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-lg border px-3 py-2 text-black"
            />

            <Button size="sm" onClick={saveName}>
              Guardar
            </Button>
          </div>
        )}

        <p className="text-xs text-slate-500">
          Lo usaremos en los mensajes de WhatsApp.
        </p>

      </div>
    </div>
  );
}
