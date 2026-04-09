import PresenciaOnlineClient from "./PresenciaOnlineClient";
import {
  demoPresenceData,
  subscribedPresenceData,
} from "./presencia-online.data";

type SubscriptionResponse = {
  plan: string | null;
  status:
    | "none"
    | "trialing"
    | "prepaid"
    | "pending_activation"
    | "active"
    | null;
  credit_eur: number | null;
  included_reviews: number | null;
  trial_reviews: number | null;
  trial_credit_eur: number | null;
  billing_flow?: "prepaid" | "legacy_deferred" | null;
  prepaid_amount_eur?: number | null;
  prepaid_at?: string | null;
  free_reviews_used?: number | null;
  plan_credits_unlocked?: boolean | null;
  refund_requested?: boolean | null;
  refund_requested_amount_eur?: number | null;
};

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ job_id?: string }>;
};

async function getClinicSubscriptionStatus(jobId?: string): Promise<boolean> {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  if (!API_BASE || !jobId) return false;

  try {
    const res = await fetch(
      `${API_BASE}/stripe/subscription-by-job?job_id=${jobId}`,
      { cache: "no-store" }
    );

    if (!res.ok) return false;

    const data: SubscriptionResponse = await res.json();

    return (
      data?.status === "prepaid" ||
      data?.status === "pending_activation" ||
      data?.status === "active"
    );
  } catch (error) {
    console.error("Error comprobando suscripción de Presencia Online:", error);
    return false;
  }
}

export default async function PresenciaOnlinePage({
  params,
  searchParams,
}: PageProps) {
  await params;
  const { job_id } = await searchParams;

  const hasSubscription = await getClinicSubscriptionStatus(job_id);

  const data = hasSubscription ? subscribedPresenceData : demoPresenceData;

  return (
    <PresenciaOnlineClient
      initialData={data}
      jobId={job_id ?? null}
      hasSubscription={hasSubscription}
    />
  );
}