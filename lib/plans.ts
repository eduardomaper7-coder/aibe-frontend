// lib/plans.ts
export type PlanSlug = 'basic' | 'pro' | 'x'

export const PLANS: Record<PlanSlug, { name: string; monthlyEUR: number; priceId: string }> = {
  basic: { name: 'AIBE Basic', monthlyEUR: 9,  priceId: 'price_basic_xxx' },
  pro:   { name: 'AIBE Pro',   monthlyEUR: 19, priceId: 'price_pro_xxx'   },
  x:     { name: 'AIBE X',     monthlyEUR: 39, priceId: 'price_x_xxx'     },
}
