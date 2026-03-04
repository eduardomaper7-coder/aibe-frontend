import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function planToCredit(plan: string): number {
  if (plan === "starter") return 9;
  if (plan === "growth") return 29;
  if (plan === "pro") return 79;
  return 5; // free (no debería pasar por Stripe)
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("job_id");
    const plan = (searchParams.get("plan") || "starter").toLowerCase();

    if (!jobId) return NextResponse.json({ error: "missing job_id" }, { status: 400 });

    const session = await getServerSession(authOptions);
    if (!session || !(session as any).userId || !session.user?.email) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }

    const PRICE_MAP: Record<string, string | undefined> = {
      starter: process.env.STRIPE_PRICE_ID_STARTER,
      growth: process.env.STRIPE_PRICE_ID_GROWTH,
      pro: process.env.STRIPE_PRICE_ID_PRO,
    };

    const price = PRICE_MAP[plan];
    if (!price) return NextResponse.json({ error: "invalid plan" }, { status: 400 });

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
    if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL invalid" }, { status: 500 });
    }

    const successUrl = new URL(`/es/panel?job_id=${encodeURIComponent(jobId)}`, siteUrl).toString();
    const cancelUrl = new URL(`/es/panel/solicitar-resenas?job_id=${encodeURIComponent(jobId)}`, siteUrl).toString();

    const credit_eur = planToCredit(plan);

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email,
      // opcional recomendado:
      client_reference_id: String((session as any).userId),

      line_items: [{ price, quantity: 1 }],

      // si quieres seguir con trial:
      subscription_data: { trial_period_days: 7 },

      success_url: successUrl,
      cancel_url: cancelUrl,

      metadata: {
        job_id: jobId,
        user_id: String((session as any).userId),
        email: session.user.email,
        plan,
        credit_eur: String(credit_eur),
      },
    });

    return NextResponse.redirect(stripeSession.url!);
  } catch (e) {
    console.error("CHECKOUT ERROR:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}