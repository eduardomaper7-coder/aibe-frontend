// lib/prices.ts
export type PlanKey = "basic" | "plus" | "business";

export const PLAN_TO_PRICE: Record<PlanKey, string> = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  plus: process.env.STRIPE_PRICE_PLUS!,
  business: process.env.STRIPE_PRICE_BUSINESS!,
};

export function getSiteUrl() {
  // usa el NEXT_PUBLIC_SITE_URL del .env para componer las URLs de retorno
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}
