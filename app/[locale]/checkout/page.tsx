"use client";

import { useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function CheckoutPage() {
  const sp = useSearchParams();
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");
  const jobId = sp.get("job_id") ?? "";

  useEffect(() => {
    const qs = jobId ? `?job_id=${encodeURIComponent(jobId)}` : "";
    // ✅ IMPORTANTE: esta ruta es del API de Next (GET) y ella redirige a Stripe
    window.location.assign(`/api/stripe/checkout-session${qs}`);
  }, [jobId]);

  return <div className="p-8 text-white">Redirigiendo a Stripe…</div>;
}