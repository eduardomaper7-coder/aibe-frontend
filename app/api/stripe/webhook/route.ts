import Stripe from "stripe";
import { NextResponse } from "next/server";

// IMPORTANTE: en webhooks necesitamos el body "raw"
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new NextResponse("Missing stripe-signature or webhook secret", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err?.message ?? "unknown"}`, { status: 400 });
  }

  // ✅ Aquí guardamos en tu sistema el estado de suscripción ligado al email del usuario
  // Para empezar rápido, vamos a guardar en tu backend (recomendado) o en DB.
  // Si todavía no tienes DB lista para billing, al menos registra/consolea.

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email;

      // En suscripciones, el ID de la suscripción suele venir aquí:
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      // TODO: enviar esto a tu backend para guardarlo:
      // email, subscriptionId, customerId, status
      // Ejemplo (si tienes API en aibe-backend):
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/billing/stripe-webhook`, { ... })

      console.log("[stripe] checkout.session.completed", { email, subscriptionId });
    }

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;

      // Necesitamos el email: lo sacamos del customer
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const customer = await stripe.customers.retrieve(customerId);

      const email =
        (customer as Stripe.Customer).email ||
        (customer as any).customer_details?.email ||
        null;

      console.log("[stripe] subscription change", {
        email,
        status: sub.status,
        subId: sub.id,
      });

      // TODO: persistir en tu sistema (DB) -> email => status
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error(e);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
