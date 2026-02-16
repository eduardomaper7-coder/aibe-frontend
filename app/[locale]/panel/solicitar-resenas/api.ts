// app/[locale]/panel/solicitar-resenas/api.ts

export type ReviewRequestStatus = "scheduled" | "sent" | "cancelled" | "failed";

export type ReviewRequest = {
  id: number;
  job_id: number;
  customer_name: string;
  phone_e164: string;
  appointment_at: string;
  send_at: string;
  status: ReviewRequestStatus;
  error_message?: string | null;
  created_at?: string;
  cancelled_at?: string | null;
  sent_at?: string | null;
};

export type ReviewRequestListOut = {
  items: ReviewRequest[];
};

export type BusinessSettingsOut = {
  job_id: number;
  google_review_url: string | null;
  business_name: string | null;
};

export type StatsOut = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number; // 0..1
};

function apiBase() {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
}

/**
 * Construye la URL final del backend.
 * Tu backend tiene prefix="/api", PERO a veces NEXT_PUBLIC_API_URL ya puede incluir "/api".
 * Esta función evita accidentalmente terminar con "/api/api".
 */
function url(path: string) {
  const base = apiBase();
  if (!base) throw new Error("NEXT_PUBLIC_API_URL no está configurado");

  // Si el usuario ya puso .../api en el env, no lo duplicamos.
  const hasApiSuffix = base.endsWith("/api");
  const prefix = hasApiSuffix ? "" : "/api";

  return `${base}${prefix}${path}`;
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { detail: text };
  }
}

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { ...init, cache: "no-store" });

  if (!res.ok) {
    const j: any = await safeJson(res);
    throw new Error(
      typeof j?.detail === "string"
        ? j.detail
        : JSON.stringify(j?.detail ?? j)
    );
  }

  return (await res.json()) as T;
}

export function listReviewRequests(jobId: number, limit = 200) {
  return http<ReviewRequestListOut>(
    url(`/review-requests?job_id=${jobId}&limit=${limit}`)
  );
}

export function createReviewRequest(payload: {
  job_id: number;
  customer_name: string;
  phone_e164: string;
  appointment_at: string; // ISO
}) {
  return http<ReviewRequest>(url(`/review-requests`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), // ✅ incluye job_id en el body
  });
}

export function cancelReviewRequest(requestId: number) {
  return http<{ ok: boolean; status: ReviewRequestStatus }>(
    url(`/review-requests/${requestId}/cancel`),
    { method: "PATCH" }
  );
}

/**
 * ✅ Aquí es de donde vamos a sacar el nombre del negocio por defecto:
 * business_name viene del backend en este endpoint.
 */
export function getBusinessSettings(jobId: number) {
  return http<BusinessSettingsOut>(url(`/business-settings?job_id=${jobId}`));
}

/**
 * ✅ Aquí es donde guardamos cambios del nombre del negocio (y/o URL de reseñas).
 */
export function patchBusinessSettings(payload: {
  job_id: number;
  business_name?: string | null;
  google_review_url?: string | null;
}) {
  return http<BusinessSettingsOut>(url(`/business-settings`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/**
 * Helper opcional: actualizar solo el nombre (por comodidad).
 * No es obligatorio usarlo.
 */
export function updateBusinessName(jobId: number, businessName: string | null) {
  return patchBusinessSettings({
    job_id: jobId,
    business_name: businessName,
  });
}

export function getStats(jobId: number) {
  return http<StatsOut>(url(`/review-requests/stats?job_id=${jobId}`));
}
