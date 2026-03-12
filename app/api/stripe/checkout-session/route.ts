import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  pro: process.env.STRIPE_PRICE_PRO,
};

const TRIAL_DAYS = 365; // trial largo; lo terminamos manualmente al llegar a 25 reseñas

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId =
      (session as any)?.userId ?? (session as any)?.user?.id ?? null;
    const email = (session as any)?.user?.email ?? null;

    if (!session || !userId) {
      return NextResponse.json(
        { error: "unauthorized (missing session/userId)" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("job_id");
    const plan = (searchParams.get("plan") || "").toLowerCase();

    if (!jobId) {
      return NextResponse.json({ error: "missing job_id" }, { status: 400 });
    }

    if (!plan || !(plan in PRICE_MAP)) {
      return NextResponse.json({ error: "invalid plan" }, { status: 400 });
    }

    const price = PRICE_MAP[plan];
    if (!price) {
      return NextResponse.json(
        { error: `missing STRIPE_PRICE for plan=${plan}` },
        { status: 500 }
      );
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "")
      .trim()
      .replace(/\/+$/, "");

    if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_SITE_URL missing/invalid" },
        { status: 500 }
      );
    }

    const successUrl = new URL(
      `/es/panel/solicitar-resenas?job_id=${encodeURIComponent(jobId)}&success=1`,
      siteUrl
    ).toString();

    const cancelUrl = new URL(
      `/es/panel/solicitar-resenas?job_id=${encodeURIComponent(jobId)}&canceled=1`,
      siteUrl
    ).toString();

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: String(userId),
      customer_email: email ?? undefined,

      metadata: {
        job_id: String(jobId),
        plan: String(plan),
        user_id: String(userId),
        email: String(email ?? ""),
      },

      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        metadata: {
          job_id: String(jobId),
          plan: String(plan),
          user_id: String(userId),
          email: String(email ?? ""),
          trial_reviews: "25",
          trial_credit_eur: "5",
        },
      },
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