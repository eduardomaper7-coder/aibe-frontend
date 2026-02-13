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
  sent_at?: string | null;
  cancelled_at?: string | null;
  error_message?: string | null;
};

export type BusinessSettings = {
  job_id: number;
  google_review_url: string | null;
  business_name: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? ""; 
// Si backend está en otro dominio, pon NEXT_PUBLIC_BACKEND_URL=https://tu-backend...

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export function listReviewRequests(jobId: number, limit = 200) {
  return apiFetch<{ items: ReviewRequest[] }>(`/api/review-requests?job_id=${jobId}&limit=${limit}`);
}

export function createReviewRequest(payload: {
  job_id: number;
  customer_name: string;
  phone_e164: string;
  appointment_at: string; // ISO
}) {
  return apiFetch<ReviewRequest>(`/api/review-requests`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function cancelReviewRequest(id: number) {
  return apiFetch<{ ok: boolean; status: ReviewRequestStatus }>(`/api/review-requests/${id}/cancel`, {
    method: "PATCH",
  });
}

export function getBusinessSettings(jobId: number) {
  return apiFetch<BusinessSettings>(`/api/business-settings?job_id=${jobId}`);
}

export function upsertBusinessSettings(payload: {
  job_id: number;
  google_review_url?: string | null;
  business_name?: string | null;
}) {
  return apiFetch<BusinessSettings>(`/api/business-settings`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
