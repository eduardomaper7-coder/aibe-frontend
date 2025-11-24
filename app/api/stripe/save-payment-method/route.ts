import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { access_token, payment_method } = await req.json();

    const {
      data: { user },
    } = await supabase.auth.getUser(access_token);

    if (!user) return NextResponse.json({ error: "No auth" }, { status: 401 });

    const customerId = user.user_metadata.stripe_customer_id;

    if (!customerId)
      return NextResponse.json({ error: "No Stripe customer" }, { status: 400 });

    // Asociar tarjeta al customer
    await stripe.paymentMethods.attach(payment_method, {
      customer: customerId,
    });

    // Establecer como método por defecto
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    // Guardar en Supabase
    await supabase
      .from("profiles")
      .update({ has_payment_method: true })
      .eq("id", user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
