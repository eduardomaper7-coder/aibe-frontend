import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});
const supabaseAdmin = getSupabaseAdmin();

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Error de firma del webhook:", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  console.log(`➡️ Stripe Webhook recibido: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const customerId = session.customer;
    const setupIntentId = session.setup_intent;

    console.log("🔵 customerId =", customerId);
    console.log("🔵 setupIntentId =", setupIntentId);

    if (customerId && setupIntentId) {
      // 1) Recuperar el setup intent
      const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
      const paymentMethodId = setupIntent.payment_method as string;

      // 2) asociar PM al customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      console.log("💳 Tarjeta guardada correctamente");

      // 3) Actualizar Supabase
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ has_payment_method: true })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.error("❌ Error guardando en Supabase:", error);
      } else {
        console.log("✔️ Supabase actualizado: has_payment_method = true");
      }
    }
  }

  return NextResponse.json({ received: true });
}

