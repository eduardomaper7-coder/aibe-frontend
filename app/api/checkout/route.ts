import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // ✅ sin apiVersion

export async function POST(req: NextRequest) {
  try {
    const { email, origin } = await req.json();
    if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_MONTHLY_1EUR_ID!, // 1 €/mes
          quantity: 1,
        },
      ],
      // 3 días gratis de prueba
      subscription_data: {
        trial_period_days: 3,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=1`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error creando Checkout" }, { status: 500 });
  }
}

