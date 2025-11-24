import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // 1️⃣ Buscar si ya existe un cliente con ese email
    const existing = await stripe.customers.list({
      email,
      limit: 1,
    });

    let customerId;

    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({ email });
      customerId = newCustomer.id;
    }

    const origin = req.headers.get("origin");

    // 2️⃣ Crear sesión usando customer ID (NO customer_email)
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customerId,
      payment_method_types: ["card"],
      success_url: `${origin}/panel?setup=success`,
      cancel_url: `${origin}/panel?setup=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

