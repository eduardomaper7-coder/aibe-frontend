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
  if (!plan) return { plan: "free", creditEur: 5 };
  if (plan === "starter") return { plan: "starter", creditEur: 9 };
  if (plan === "growth") return { plan: "growth", creditEur: 29 };
  if (plan === "pro") return { plan: "pro", creditEur: 79 };
  return { plan, creditEur: 5 };
}

export default function CreditsPanel({ jobId }: { jobId: number }) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);

  const [stats, setStats] = useState<Stats>({
    messages_sent: 0,
    reviews_gained: 0,
    conversion_rate: 0,
  });

  const [sub, setSub] = useState<Sub>({ plan: null, credit_eur: null, status: null });

  const loadStats = async () => {
    if (!API_BASE) return;
    const r = await fetch(`${API_BASE}/api/review-requests/stats?job_id=${jobId}`, {
      cache: "no-store",
    });
    if (!r.ok) throw new Error("No se pudieron cargar stats");
    const d = await r.json();
    setStats(d);
  };

  const loadSubscription = async () => {
    if (!API_BASE) return;
    const r = await fetch(`${API_BASE}/stripe/subscription-by-job?job_id=${jobId}`, {
      cache: "no-store",
    });
    if (!r.ok) throw new Error("No se pudo cargar suscripción");
    const d = await r.json();
    setSub(d);
  };

  useEffect(() => {
    loadStats().catch(() => {});
  }, [API_BASE, jobId]);

  useEffect(() => {
    loadSubscription().catch(() => {});
  }, [API_BASE, jobId]);

  const handleCheckReviews = async () => {
    if (!API_BASE || checking) return;

    setChecking(true);
    setCheckMessage(null);

    try {
      const r = await fetch(
        `${API_BASE}/api/review-requests/check-new-reviews?job_id=${jobId}`,
        {
          method: "POST",
        }
      );

      const data = await r.json();

      if (!r.ok) {
        throw new Error(data?.detail || "No se pudieron comprobar las reseñas");
      }

      const inserted = Number(data?.new_reviews_inserted || 0);
      const checked = Number(data?.checked_count || 0);

      if (inserted > 0) {
        setCheckMessage(`Se comprobaron ${checked} reseñas y se añadieron ${inserted} nuevas.`);
      } else {
        setCheckMessage(`Se comprobaron ${checked} reseñas y no había reseñas nuevas.`);
      }

      await loadStats();
    } catch (e: any) {
      setCheckMessage(e?.message || "Error al comprobar reseñas");
    } finally {
      setChecking(false);
    }
  };

  const { plan, creditEur } = useMemo(() => {
    const base = planDefaults(sub.plan);
    return {
      plan: base.plan,
      creditEur: sub.credit_eur ?? base.creditEur,
    };
  }, [sub.plan, sub.credit_eur]);

  const reviewsGained = Number(stats.reviews_gained || 0);
  const usedEur = Number((reviewsGained * 0.2).toFixed(2));
  const maxReviews = Math.floor((creditEur / 0.2) + 1e-9);
  const usedReviews = Math.min(reviewsGained, maxReviews);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Consigue {maxReviews} reseñas gratis
      </h3>

      <div className="mt-2 text-slate-700">
        <div>Reseñas conseguidas {usedReviews}/{maxReviews} reseñas</div>
        <div className="mt-1">Uso {usedEur.toFixed(2)}€/{creditEur.toFixed(2)}€</div>
        <div className="mt-1 text-sm text-slate-500">
          Plan actual: <span className="font-medium">{plan}</span>
        </div>
      </div>

      {checkMessage && (
        <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700 border">
          {checkMessage}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCheckReviews}
          disabled={checking}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 font-semibold hover:bg-slate-50 disabled:opacity-50"
        >
          {checking ? "Comprobando..." : "Comprobar reseñas"}
        </button>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
        >
          Aumentar saldo
        </button>
      </div>

      <PlansModal open={open} onClose={() => setOpen(false)} jobId={jobId} />
    </div>
  );
}