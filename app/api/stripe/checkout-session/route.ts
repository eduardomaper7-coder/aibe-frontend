import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("job_id");
    if (!jobId) {
      return NextResponse.json({ error: "missing job_id" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !(session as any).userId || !session.user?.email) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `https://www.aibetech.es/es/panel?job_id=${jobId}`,
      cancel_url: `https://www.aibetech.es/es/plan?job_id=${jobId}`,
      metadata: {
        job_id: jobId,
        user_id: String((session as any).userId),
        email: session.user.email,
      },
    });

    return NextResponse.redirect(stripeSession.url!);
  } catch (e) {
    console.error("CHECKOUT ERROR:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}