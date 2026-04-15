"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
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
  const [preventDup, setPreventDup] = useState(false);
  const [savingPreventDup, setSavingPreventDup] = useState(false);

  const [whatsProvider, setWhatsProvider] = useState<"twilio" | "personal_number">("twilio");
  const [personalNumber, setPersonalNumber] = useState("");
  const [savingWhatsApp, setSavingWhatsApp] = useState(false);

  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [sessionQr, setSessionQr] = useState<string | null>(null);
  const [connectingWhatsApp, setConnectingWhatsApp] = useState(false);
  const [pollingStatus, setPollingStatus] = useState(false);

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
        setName(String(businessName ?? fallback));

        setPreventDup(Boolean(d?.prevent_duplicate_whatsapp));

        setWhatsProvider(
          d?.whatsapp_provider === "personal_number" ? "personal_number" : "twilio"
        );
        setPersonalNumber(String(d?.whatsapp_personal_number ?? ""));
        setSessionStatus(d?.whatsapp_session_status ?? null);
        setSessionError(d?.whatsapp_last_error ?? null);
      })
      .catch(() => {
        // si falla, usa fallback
        setName(String(defaultBusinessName ?? ""));
      });
  }, [jobId, API_BASE, defaultBusinessName]);

  useEffect(() => {
    if (!API_BASE) return;
    if (whatsProvider !== "personal_number") return;

    const activeStatuses = new Set(["initializing", "qr_pending", "authenticated"]);

    if (!sessionStatus || !activeStatuses.has(sessionStatus)) return;

    setPollingStatus(true);

    const id = window.setInterval(() => {
      refreshWhatsAppStatus();
    }, 4000);

    return () => {
      window.clearInterval(id);
      setPollingStatus(false);
    };
  }, [API_BASE, jobId, whatsProvider, sessionStatus]);

  useEffect(() => {
  if (!sessionQr || sessionStatus !== "qr_pending") return;

  const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  QRCode.toCanvas(canvas, sessionQr, { width: 256 }, (error) => {
    if (error) console.error(error);
  });
}, [sessionQr, sessionStatus]);

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

  async function savePreventDup(next: boolean) {
    try {
      if (!API_BASE) return;

      setSavingPreventDup(true);
      setPreventDup(next);

      const res = await fetch(`${API_BASE}/api/business-settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          prevent_duplicate_whatsapp: next,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar el ajuste");
      }
    } catch {
      setPreventDup((prev) => !prev);
    } finally {
      setSavingPreventDup(false);
    }
  }

  async function saveWhatsAppSettings() {
    try {
      if (!API_BASE) return;

      setSavingWhatsApp(true);
      setSessionError(null);

      const res = await fetch(`${API_BASE}/api/business-settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          whatsapp_provider: whatsProvider,
          whatsapp_personal_number:
            whatsProvider === "personal_number" ? (personalNumber || null) : null,
          whatsapp_personal_enabled: whatsProvider === "personal_number",
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "No se pudo guardar la configuración de WhatsApp");
      }
    } catch (e: any) {
      setSessionError(e?.message || "No se pudo guardar la configuración");
    } finally {
      setSavingWhatsApp(false);
    }
  }

  async function connectWhatsApp() {
    try {
      if (!API_BASE) return;

      setConnectingWhatsApp(true);
      setSessionError(null);
      setSessionQr(null);

      const res = await fetch(`${API_BASE}/api/business-settings/whatsapp/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : data?.error || "No se pudo iniciar la conexión de WhatsApp"
        );
      }

      setSessionStatus(data?.status ?? null);
      setSessionQr(data?.qr ?? null);
      setSessionError(data?.last_error ?? null);
    } catch (e: any) {
      setSessionError(e?.message || "No se pudo conectar WhatsApp");
    } finally {
      setConnectingWhatsApp(false);
    }
  }

  async function refreshWhatsAppStatus() {
    try {
      if (!API_BASE) return;

      const res = await fetch(
        `${API_BASE}/api/business-settings/whatsapp/status?job_id=${jobId}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : data?.error || "No se pudo consultar el estado de WhatsApp"
        );
      }

      setSessionStatus(data?.status ?? null);
      setSessionQr(data?.qr ?? null);
      setSessionError(data?.last_error ?? null);
    } catch (e: any) {
      setSessionError(e?.message || "No se pudo consultar el estado");
    }
  }

  function sessionStatusLabel(status: string | null) {
    switch (status) {
      case "ready":
        return "Conectado";
      case "qr_pending":
        return "Esperando escaneo";
      case "authenticated":
        return "Autenticado";
      case "initializing":
        return "Iniciando";
      case "disconnected":
        return "Desconectado";
      case "auth_failure":
        return "Error de autenticación";
      case "error":
        return "Error";
      default:
        return "No conectado";
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

      {/* Evitar duplicados */}
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              No repetir envíos
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Si está activado, nunca se enviará WhatsApp a un número al que ya se le envió antes.
            </p>
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={preventDup}
              disabled={savingPreventDup}
              onChange={(e) => savePreventDup(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-slate-700">
              {preventDup ? "Activado" : "Desactivado"}
            </span>
          </label>
        </div>
      </div>

      {/* Canal de WhatsApp */}
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Canal de WhatsApp
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Puedes usar Twilio o conectar tu propio número de WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name={`whatsapp-provider-${jobId}`}
              checked={whatsProvider === "twilio"}
              onChange={() => setWhatsProvider("twilio")}
            />
            Usar Twilio
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name={`whatsapp-provider-${jobId}`}
              checked={whatsProvider === "personal_number"}
              onChange={() => setWhatsProvider("personal_number")}
            />
            Usar mi propio número
          </label>

          {whatsProvider === "personal_number" && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Mi número de WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={personalNumber}
                    onChange={(e) => setPersonalNumber(e.target.value)}
                    placeholder="+34600111222"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={saveWhatsAppSettings}
                    disabled={savingWhatsApp}
                    className="bg-slate-900 text-white hover:bg-slate-800"
                  >
                    {savingWhatsApp ? "Guardando..." : "Guardar configuración"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={connectWhatsApp}
                    disabled={connectingWhatsApp || !personalNumber.trim()}
                    className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                  >
                    {connectingWhatsApp ? "Conectando..." : "Conectar WhatsApp"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={refreshWhatsAppStatus}
                    className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                  >
                    Actualizar estado
                  </Button>
                </div>

                <div className="text-sm text-slate-700">
                  Estado:{" "}
                  <span className="font-medium">
                    {sessionStatusLabel(sessionStatus)}
                  </span>
                  {pollingStatus && sessionStatus !== "ready" ? "..." : ""}
                </div>

                {sessionError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {sessionError}
                  </div>
                )}

                {sessionQr && sessionStatus === "qr_pending" && (
  <div className="rounded-lg border border-slate-200 bg-white p-3">
    <div className="mb-2 text-sm font-medium text-slate-800">
      Escanea este QR con tu WhatsApp
    </div>

    <div className="flex justify-center rounded bg-slate-50 p-4">
      <canvas id="qr-canvas" className="h-64 w-64" />
    </div>
  </div>
)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}