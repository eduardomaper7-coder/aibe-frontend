import PosicionamientoClient from "./PosicionamientoClient";

type SubscriptionResponse = {
  plan: string | null;
  status:
    | "none"
    | "trialing"
    | "prepaid"
    | "pending_activation"
    | "active"
    | null;
};

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ job_id?: string }>;
};

function normalizePlanName(plan: string | null) {
  return (plan ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

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

    const hasActiveStatus =
      data?.status === "prepaid" ||
      data?.status === "pending_activation" ||
      data?.status === "active";

    const planName = normalizePlanName(data?.plan);

    const isCaptacionLocalPlan =
      planName.includes("captacion local") ||
      planName.includes("captacion_local");

    return hasActiveStatus && isCaptacionLocalPlan;
  } catch (error) {
    console.error("Error comprobando suscripción de Posicionamiento:", error);
    return false;
  }
}

export default async function PosicionamientoPage({
  params,
  searchParams,
}: PageProps) {
  await params;
  const { job_id } = await searchParams;

  const hasSubscription = await getClinicSubscriptionStatus(job_id);

  return (
    <PosicionamientoClient
      jobId={job_id ?? null}
      hasSubscription={hasSubscription}
    />
  );
}