// app/api/stripe/create-subscription/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_IDS: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_BASIC || "",
  business: process.env.STRIPE_PRICE_BUSINESS || "",
  plus: process.env.STRIPE_PRICE_PLUS || "",
};

export async function POST(req: Request) {
  try {
    const { plan = "basic", customerEmail } = await req.json();

    if (!customerEmail) {
      return NextResponse.json({ error: "Falta customerEmail" }, { status: 400 });
    }

    const priceId = PRICE_IDS[plan] || PRICE_IDS.basic;
    if (!priceId) {
      return NextResponse.json(
        { error: `No hay Price ID para el plan "${plan}". Define STRIPE_PRICE_BASIC / STRIPE_PRICE_BUSINESS / STRIPE_PRICE_PLUS en .env.local` },
        { status: 500 }
      );
    }

    // 1) Buscar o crear el cliente por email
    const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
    const customer = existing.data[0] ?? await stripe.customers.create({ email: customerEmail });

    // 2) Crear sesión de Checkout para SUSCRIPCIÓN con 3 días de prueba
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      // 3 días gratis y después cobra de forma recurrente
      subscription_data: {
        trial_period_days: 3,
      },
      // redirecciones post-checkout
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/exito`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pago?plan=${plan}`,
      // obliga a recoger método de pago
      payment_method_collection: "always",
      // opcional: cupones en Checkout
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Error creando sesión de Checkout" }, { status: 500 });
  }
}
