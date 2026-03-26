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

type PanelUI = {
  title: string;
  reviewsText: string;
  usageText: string;
  showStartFree: boolean;
  showIncreaseBalance: boolean;
  showNextPlan: boolean;
  nextPlanText?: string | null;
};

function planLabel(plan: string | null) {
  if (plan === "starter") return "Starter";
  if (plan === "growth") return "Growth";
  if (plan === "pro") return "Pro";
  return null;
}

function planBenefits(plan: string | null) {
  if (plan === "starter") return { reviews: 45, credit: 9 };
  if (plan === "growth") return { reviews: 145, credit: 29 };
  if (plan === "pro") return { reviews: 395, credit: 79 };
  return null;
}

export default function CreditsPanel({ jobId }: { jobId: number }) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);

  const [refunding, setRefunding] = useState(false);
  const [refundMessage, setRefundMessage] = useState<string | null>(null);

  const [stats, setStats] = useState<Stats>({
    messages_sent: 0,
    reviews_gained: 0,
    conversion_rate: 0,
  });

  const [sub, setSub] = useState<Sub>({
    plan: null,
    status: null,
    credit_eur: null,
    included_reviews: null,
    trial_reviews: null,
    trial_credit_eur: null,
    billing_flow: null,
    prepaid_amount_eur: null,
    prepaid_at: null,
    free_reviews_used: 0,
    plan_credits_unlocked: false,
    refund_requested: false,
    refund_requested_amount_eur: 0,
  });

  const loadStats = async () => {
    if (!API_BASE) return;
    const r = await fetch(
      `${API_BASE}/api/review-requests/stats?job_id=${jobId}`,
      {
        cache: "no-store",
      }
    );
    if (!r.ok) throw new Error("No se pudieron cargar stats");
    setStats(await r.json());
  };

  const loadSubscription = async () => {
    if (!API_BASE) return;
    const r = await fetch(
      `${API_BASE}/stripe/subscription-by-job?job_id=${jobId}`,
      {
        cache: "no-store",
      }
    );
    if (!r.ok) throw new Error("No se pudo cargar suscripción");
    setSub(await r.json());
  };

  useEffect(() => {
    loadStats().catch(() => {});
    loadSubscription().catch(() => {});
  }, [API_BASE, jobId]);

  const handleCheckReviews = async () => {
    if (!API_BASE || checking) return;

    setChecking(true);
    setCheckMessage(null);

    try {
      const r = await fetch(
        `${API_BASE}/api/review-requests/check-new-reviews?job_id=${jobId}`,
        { method: "POST" }
      );

      const data = await r.json();

      if (!r.ok) {
        throw new Error(data?.detail || "No se pudieron comprobar las reseñas");
      }

      const inserted = Number(data?.new_reviews_inserted || 0);
      const checked = Number(data?.checked_count || 0);
      const activation = data?.subscription_activation;

      if (activation?.activated && activation?.charged_now === false) {
        setCheckMessage(
          "Has alcanzado las 25 reseñas gratuitas. Tu plan ya pagado se ha activado correctamente."
        );
      } else if (activation?.activated && activation?.charged_now === true) {
        setCheckMessage(
          "Has alcanzado las 25 reseñas gratuitas. Estamos activando tu plan y procesando el cobro."
        );
      } else if (inserted > 0) {
        setCheckMessage(
          `Se comprobaron ${checked} reseñas y se añadieron ${inserted} nuevas.`
        );
      } else {
        setCheckMessage(
          `Se comprobaron ${checked} reseñas y no había reseñas nuevas.`
        );
      }

      await loadStats();
      await loadSubscription();
    } catch (e: any) {
      setCheckMessage(e?.message || "Error al comprobar reseñas");
    } finally {
      setChecking(false);
    }
  };

  const handleRefundRequest = async () => {
    if (!API_BASE || refunding) return;

    const firstConfirm = window.confirm(
      "¿Seguro que quieres solicitar el reembolso?"
    );
    if (!firstConfirm) return;

    const secondConfirm = window.confirm(
      "Confirmación final: se solicitará el reembolso del saldo pagado no consumido. ¿Deseas continuar?"
    );
    if (!secondConfirm) return;

    setRefunding(true);
    setRefundMessage(null);

    try {
      const r = await fetch(
        `${API_BASE}/api/review-requests/refund-request?job_id=${jobId}`,
        { method: "POST" }
      );

      const data = await r.json();

      if (!r.ok) {
        throw new Error(data?.detail || "No se pudo solicitar el reembolso");
      }

      setRefundMessage(
        data?.message ||
          "Reembolso confirmado, se procesará en menos de 72 horas."
      );

      await loadSubscription();
    } catch (e: any) {
      setRefundMessage(e?.message || "Error al solicitar el reembolso");
    } finally {
      setRefunding(false);
    }
  };

  const reviewsGained = Number(stats.reviews_gained || 0);
  const currentPlanLabel = planLabel(sub.plan);
  const nextPlanBenefits = planBenefits(sub.plan);

  const ui = useMemo<PanelUI>(() => {
    const status = sub.status ?? "none";

    if (status === "trialing") {
      const totalReviews = sub.trial_reviews ?? 25;
      const totalCredit = sub.trial_credit_eur ?? 5;
      const usedEur = Number((reviewsGained * 0.2).toFixed(2));

      return {
        title: "Tienes 25 reseñas gratis",
        reviewsText: `Reseñas conseguidas ${Math.min(reviewsGained, totalReviews)}/${totalReviews} reseñas`,
        usageText: `Uso ${usedEur.toFixed(2)}€/${totalCredit.toFixed(2)}€`,
        showStartFree: false,
        showIncreaseBalance: false,
        showNextPlan: true,
        nextPlanText: null,
      };
    }

    if (status === "prepaid") {
      const totalReviews = sub.trial_reviews ?? 25;
      const totalCredit = sub.trial_credit_eur ?? 5;
      const usedEur = Number(
        (Math.min(reviewsGained, totalReviews) * 0.2).toFixed(2)
      );

      return {
        title: "Tienes 25 reseñas gratis",
        reviewsText: `Reseñas conseguidas ${Math.min(reviewsGained, totalReviews)}/${totalReviews} reseñas`,
        usageText: `Uso ${usedEur.toFixed(2)}€/${totalCredit.toFixed(2)}€`,
        showStartFree: false,
        showIncreaseBalance: false,
        showNextPlan: true,
        nextPlanText: currentPlanLabel
          ? `Tu Plan ${currentPlanLabel} ya está pagado y se activará automáticamente cuando se agoten las 25 reseñas gratis.`
          : null,
      };
    }

    if (status === "pending_activation" || status === "active") {
      const totalCredit = sub.credit_eur ?? 0;
      const totalReviews =
        sub.included_reviews ?? Math.floor(totalCredit / 0.2);
      const freeReviews = sub.trial_reviews ?? 25;
      const paidReviewsUsed = Math.max(0, reviewsGained - freeReviews);
      const usedEur = Number((paidReviewsUsed * 0.2).toFixed(2));

      return {
        title: currentPlanLabel ? `Plan ${currentPlanLabel}` : "Plan activo",
        reviewsText: `Reseñas del plan utilizadas ${Math.min(
          paidReviewsUsed,
          totalReviews
        )}/${totalReviews} reseñas`,
        usageText: `Uso ${usedEur.toFixed(2)}€/${totalCredit.toFixed(2)}€`,
        showStartFree: false,
        showIncreaseBalance: true,
        showNextPlan: false,
        nextPlanText: null,
      };
    }

    const totalReviews = 25;
    const totalCredit = 5;
    const usedEur = Number((reviewsGained * 0.2).toFixed(2));

    return {
      title: "Consigue 25 reseñas gratis",
      reviewsText: `Reseñas conseguidas ${Math.min(reviewsGained, totalReviews)}/${totalReviews} reseñas`,
      usageText: `Uso ${usedEur.toFixed(2)}€/${totalCredit.toFixed(2)}€`,
      showStartFree: true,
      showIncreaseBalance: false,
      showNextPlan: false,
      nextPlanText: null,
    };
  }, [
    sub.status,
    sub.credit_eur,
    sub.included_reviews,
    sub.trial_reviews,
    sub.trial_credit_eur,
    reviewsGained,
    currentPlanLabel,
  ]);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{ui.title}</h3>

      <div className="mt-2 text-slate-700">
        <div>{ui.reviewsText}</div>
        <div className="mt-1">{ui.usageText}</div>
      </div>

      {ui.showNextPlan && sub.plan && nextPlanBenefits && (
        <div className="mt-4 rounded-xl border bg-slate-50 px-4 py-3">
          <div className="text-sm text-slate-600">Luego, se activará:</div>
          <div className="mt-1 font-semibold text-slate-900">
            Plan {currentPlanLabel}
          </div>
          <div className="mt-1 text-sm text-slate-700">
            +{nextPlanBenefits.reviews} reseñas
          </div>
          <div className="text-sm text-slate-700">
            +{nextPlanBenefits.credit.toFixed(2)}€
          </div>
        </div>
      )}

      {ui.nextPlanText && (
        <div className="mt-3 text-sm text-slate-600">{ui.nextPlanText}</div>
      )}

      {checkMessage && (
        <div className="mt-3 rounded-xl border bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {checkMessage}
        </div>
      )}

      {refundMessage && (
        <div className="mt-3 rounded-xl border bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {refundMessage}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCheckReviews}
          disabled={checking}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-50"
        >
          {checking ? "Comprobando..." : "Comprobar reseñas"}
        </button>

        {sub.plan &&
          (sub.status === "prepaid" ||
            sub.status === "pending_activation" ||
            sub.status === "active") &&
          !sub.refund_requested && (
            <button
              type="button"
              onClick={handleRefundRequest}
              disabled={refunding}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-50"
            >
              {refunding ? "Solicitando..." : "Solicitar reembolso"}
            </button>
          )}

        {ui.showStartFree && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Empezar gratis
          </button>
        )}

        {ui.showIncreaseBalance && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Aumentar saldo
          </button>
        )}
      </div>

      <PlansModal open={open} onClose={() => setOpen(false)} jobId={jobId} />
    </div>
  );
}