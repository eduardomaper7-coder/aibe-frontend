"use client";

import { useEffect, useMemo, useState } from "react";
import PlansModal from "./PlansModal";

type Stats = {
  messages_sent: number;
  reviews_gained: number;
  conversion_rate: number;
};

type Sub = {
  plan: string | null;
  credit_eur: number | null;
  status: string | null;
};

function planDefaults(plan: string | null) {
  // Free por defecto si no hay suscripción
  if (!plan) return { plan: "free", creditEur: 5 };

  if (plan === "starter") return { plan: "starter", creditEur: 9 };
  if (plan === "growth") return { plan: "growth", creditEur: 29 };
  if (plan === "pro") return { plan: "pro", creditEur: 79 };

  return { plan, creditEur: 5 };
}

export default function CreditsPanel({ jobId }: { jobId: number }) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<Stats>({
    messages_sent: 0,
    reviews_gained: 0,
    conversion_rate: 0,
  });

  const [sub, setSub] = useState<Sub>({ plan: null, credit_eur: null, status: null });

  // 1) stats (ya existe)
  useEffect(() => {
    if (!API_BASE) return;
    fetch(`${API_BASE}/api/review-requests/stats?job_id=${jobId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setStats(d))
      .catch(() => {});
  }, [API_BASE, jobId]);

  // 2) plan/credit desde backend
  useEffect(() => {
    if (!API_BASE) return;
    fetch(`${API_BASE}/stripe/subscription-by-job?job_id=${jobId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setSub(d))
      .catch(() => {});
  }, [API_BASE, jobId]);

  const { plan, creditEur } = useMemo(() => {
    const base = planDefaults(sub.plan);
    return {
      plan: base.plan,
      creditEur: sub.credit_eur ?? base.creditEur,
    };
  }, [sub.plan, sub.credit_eur]);

  const reviewsGained = Number(stats.reviews_gained || 0);
  const usedEur = Number((reviewsGained * 0.2).toFixed(2));
  const maxReviews = Math.floor((creditEur / 0.2) + 1e-9); // evita flotantes raros
  const usedReviews = Math.min(reviewsGained, maxReviews);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Consigue {maxReviews} reseñas gratis</h3>

      <div className="mt-2 text-slate-700">
        <div>Reseñas conseguidas {usedReviews}/{maxReviews} reseñas</div>
        <div className="mt-1">Uso {usedEur.toFixed(2)}€/{creditEur.toFixed(2)}€</div>
        <div className="mt-1 text-sm text-slate-500">
          Plan actual: <span className="font-medium">{plan}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
      >
        Aumentar saldo
      </button>

      <PlansModal open={open} onClose={() => setOpen(false)} jobId={jobId} />
    </div>
  );
}