// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { default: Stripe } = await import("stripe");

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const PRICE_ID = process.env.STRIPE_PRICE_MONTHLY_1EUR_ID;

    if (!STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    if (!PRICE_ID) {
      console.error("Missing STRIPE_PRICE_MONTHLY_1EUR_ID");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    // ❌ sin apiVersion para evitar choque de tipos
    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const body = await req.json().catch(() => ({}));
    const email: string | undefined = body?.email;
    const originFromBody: string | undefined = body?.origin;

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const originHeader = req.headers.get("origin") ?? undefined;
    const fallbackPublicUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const origin = originFromBody || originHeader || fallbackPublicUrl || "";

    if (!origin) {
      console.error("No se pudo determinar el origin para las URLs de retorno");
      return NextResponse.json(
        { error: "No se pudo determinar el dominio de retorno" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      subscription_data: { trial_period_days: 3 },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=1`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message =
      typeof err === "object" && err && "message" in err
        ? String((err as any).message)
        : "Error creando Checkout";
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
