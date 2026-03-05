import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  pro: process.env.STRIPE_PRICE_PRO,
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("job_id");
    const plan = (searchParams.get("plan") || "").toLowerCase();

    if (!jobId) return NextResponse.json({ error: "missing job_id" }, { status: 400 });
    if (!plan || !(plan in PRICE_MAP)) return NextResponse.json({ error: "invalid plan" }, { status: 400 });

    const price = PRICE_MAP[plan];
    if (!price) return NextResponse.json({ error: `missing STRIPE_PRICE for plan=${plan}` }, { status: 500 });

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
    if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL missing/invalid" }, { status: 500 });
    }

    const successUrl = new URL(
      `/es/panel/solicitar-resenas?job_id=${encodeURIComponent(jobId)}`,
      siteUrl
    ).toString();

    const cancelUrl = new URL(
      `/es/plan?job_id=${encodeURIComponent(jobId)}`,
      siteUrl
    ).toString();

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { job_id: String(jobId), plan },
    });

    return NextResponse.redirect(stripeSession.url!);
  } catch (e: any) {
    console.error("checkout-session error:", e);
    return NextResponse.json(
      { error: "server error", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}