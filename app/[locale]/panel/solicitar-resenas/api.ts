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
  prevent_duplicate_whatsapp?: boolean;
};

export type StatsOut = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number;
};

export type ImportItemStatus =
  | "patient_saved"
  | "incomplete"
  | "ready"
  | "scheduled"
  | "duplicate"
  | "too_old"
  | "conflict";

export type ImportItem = {
  kind: "patient" | "appointment";
  patient_id: number | null;
  appointment_id: number | null;
  review_request_id: number | null;
  customer_name: string | null;
  phone_e164: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  status: ImportItemStatus;
  missing_fields: string[];
  issues: string[];
};

export type ImportSummary = {
  files_received: number;
  rows_extracted: number;
  patients_created: number;
  patients_updated: number;
  appointments_created: number;
  appointments_updated: number;
  patient_only_saved: number;
  scheduled_now: number;
  incomplete: number;
  duplicates: number;
  too_old: number;
  conflicts: number;
};

export type ImportAppointmentsResponse = {
  batch_id: number;
  summary: ImportSummary;
  items: ImportItem[];
  manual_review_required?: boolean;
  manual_review_reason?: string | null;
  user_message?: string | null;
};

function apiBase() {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
}

function url(path: string) {
  const base = apiBase();
  if (!base) throw new Error("NEXT_PUBLIC_API_URL no está configurado");

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
  appointment_at: string;
}) {
  return http<ReviewRequest>(url(`/review-requests`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function cancelReviewRequest(requestId: number) {
  return http<{ ok: boolean; status: ReviewRequestStatus }>(
    url(`/review-requests/${requestId}/cancel`),
    { method: "PATCH" }
  );
}

export function getBusinessSettings(jobId: number) {
  return http<BusinessSettingsOut>(url(`/business-settings?job_id=${jobId}`));
}

export function patchBusinessSettings(payload: {
  job_id: number;
  business_name?: string | null;
  google_review_url?: string | null;
  prevent_duplicate_whatsapp?: boolean | null;
}) {
  return http<BusinessSettingsOut>(url(`/business-settings`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateBusinessName(jobId: number, businessName: string | null) {
  return patchBusinessSettings({
    job_id: jobId,
    business_name: businessName,
  });
}

export function getStats(jobId: number) {
  return http<StatsOut>(url(`/review-requests/stats?job_id=${jobId}`));
}

export async function importAppointments(payload: {
  job_id: number;
  files: File[];
}) {
  const form = new FormData();
  form.append("job_id", String(payload.job_id));
  for (const file of payload.files) {
    form.append("files", file);
  }

  const finalUrl = url(`/reviews/import-appointments`);
  console.log("IMPORT URL:", finalUrl);

  const res = await fetch(finalUrl, {
    method: "POST",
    body: form,
    cache: "no-store",
  });

  if (!res.ok) {
    const j: any = await safeJson(res);
    throw new Error(
      typeof j?.detail === "string"
        ? j.detail
        : JSON.stringify(j?.detail ?? j)
    );
  }

  return (await res.json()) as ImportAppointmentsResponse;
}

export function sendReviewRequestNow(payload: {
  job_id: number;
  customer_name: string;
  phone_e164: string;
}) {
  return http<ReviewRequest>(url(`/review-requests/send-now`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}