import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("job_id");

  if (!jobId) return NextResponse.json({ error: "missing job_id" }, { status: 400 });

  const sessionAuth = await getServerSession(authOptions);
  const email = sessionAuth?.user?.email ?? (sessionAuth as any)?.email;
  const userId = (sessionAuth as any)?.userId ?? (sessionAuth as any)?.user?.id;

  if (!email || !userId) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/panel?job_id=${encodeURIComponent(jobId)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/plan?job_id=${encodeURIComponent(jobId)}`,
    metadata: { job_id: jobId, user_id: String(userId), email },
  });

  return NextResponse.redirect(session.url!);
}