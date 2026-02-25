import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ job_id?: string }>;
}) {
  const { locale } = await params;
  const { job_id } = await searchParams;

  const jobId = job_id ?? "";

  if (!jobId) {
    return (
      <div className="p-8 text-white">
        Falta <b>job_id</b> (ej: /{locale}/checkout?job_id=123)
      </div>
    );
  }

  redirect(`/api/stripe/checkout-session?job_id=${encodeURIComponent(jobId)}`);
}