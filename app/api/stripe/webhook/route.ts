import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs"; // importante para raw body

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!sig) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Cuando se completa el checkout (suscripción creada)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const jobId = session.metadata?.job_id;
    const userId = session.metadata?.user_id;

    const plan = session.metadata?.plan ?? null;
    const credit_eur = session.metadata?.credit_eur
      ? Number(session.metadata.credit_eur)
      : null;

    const subId = session.subscription;
    const customerId = session.customer; // no lo usamos en backend, pero lo validamos si quieres

    if (!jobId || !userId || !subId || !customerId) {
      console.warn("Webhook incompleto:", session.metadata);
      return NextResponse.json({ received: true });
    }

    const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
    if (!API_BASE) console.error("NEXT_PUBLIC_API_URL missing");

    if (API_BASE) {
      try {
        await fetch(`${API_BASE}/stripe/webhook/checkout-completed`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_id: Number(jobId),
            user_id: String(userId),
            subscription_id: String(subId),
            plan,
            credit_eur,
          }),
        });
      } catch (e) {
        console.error("Error syncing Stripe → backend:", e);
      }
    }
  }

  return NextResponse.json({ received: true });
}