import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // ajusta esta ruta si difiere

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ ok: true, isPro: false }, { status: 200 });
  }

  // 1) Encontrar customer por email
  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];

  if (!customer) {
    return NextResponse.json({ ok: true, isPro: false }, { status: 200 });
  }

  // 2) Ver suscripciones activas o en trial
  const subs = await stripe.subscriptions.list({
    customer: customer.id,
    status: "all",
    limit: 10,
  });

  const isPro = subs.data.some((s) => s.status === "trialing" || s.status === "active");

  return NextResponse.json({
    ok: true,
    isPro,
    stripe: {
      customerId: customer.id,
      statuses: subs.data.map((s) => s.status),
    },
  });
}
