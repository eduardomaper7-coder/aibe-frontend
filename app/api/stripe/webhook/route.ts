// /app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const config = { api: { bodyParser: false } }; // (Next <13) – en App Router no hace falta

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sig = req.headers.get("stripe-signature");
  const buf = await req.arrayBuffer();
  const textBody = Buffer.from(buf);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      textBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: guarda en tu DB que el usuario (session.customer_email) ha empezado trial/plan
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        // TODO: upsert del estado de la suscripción (active, trialing, past_due, canceled, etc.)
        break;
      }
      case "invoice.paid":
      case "invoice.payment_failed": {
        // Opcional: manejar pagos
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

