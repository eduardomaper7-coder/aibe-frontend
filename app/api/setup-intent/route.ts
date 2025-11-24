import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { default: Stripe } = await import("stripe");
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const body = await req.json().catch(() => ({}));
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Crear SetupIntent para guardar tarjeta
    const setupIntent = await stripe.setupIntents.create({
      customer: undefined,
      usage: "off_session",
      metadata: { email },
    });

    return NextResponse.json({ clientSecret: setupIntent.client_secret });
  } catch (err: any) {
    console.error("SetupIntent error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
