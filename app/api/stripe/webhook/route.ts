import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_CONFIG: Record<string, { credit_eur: number; included_reviews: number }> = {
  starter: { credit_eur: 9, included_reviews: 45 },
  growth: { credit_eur: 29, included_reviews: 145 },
  pro: { credit_eur: 79, included_reviews: 395 },
};

async function postToBackend(path: string, payload: any) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  if (!API_BASE) {
    console.error("NEXT_PUBLIC_API_URL missing");
    return;
  }

  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    const txt = await r.text();
    console.error(`Backend sync failed ${path}:`, r.status, txt);
  }
}

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

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const jobId = session.metadata?.job_id;
      const userId = session.metadata?.user_id;
      const plan = (session.metadata?.plan || "").toLowerCase();
      const subId = session.subscription;
      const customerId = session.customer;

      if (jobId && userId && subId && customerId && PLAN_CONFIG[plan]) {
        await postToBackend("/stripe/webhook/checkout-completed", {
          job_id: Number(jobId),
          user_id: String(userId),
          subscription_id: String(subId),
          customer_id: String(customerId),
          plan,
        });
      } else {
        console.warn("checkout.session.completed incompleto", {
          jobId,
          userId,
          plan,
          subId,
          customerId,
        });
      }
    }

    if (event.type === "customer.subscription.created") {
      const sub = event.data.object as Stripe.Subscription;

      const jobId = sub.metadata?.job_id;
      const userId = sub.metadata?.user_id;
      const plan = (sub.metadata?.plan || "").toLowerCase();
      const customerId = sub.customer;

      if (jobId && userId && sub.id && customerId && PLAN_CONFIG[plan]) {
        await postToBackend("/stripe/webhook/checkout-completed", {
          job_id: Number(jobId),
          user_id: String(userId),
          subscription_id: String(sub.id),
          customer_id: String(customerId),
          plan,
        });
      } else {
        console.warn("customer.subscription.created incompleto", {
          jobId,
          userId,
          plan,
          subscriptionId: sub.id,
          customerId,
        });
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as any;

const subscriptionId =
  typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription?.id;

      if (subscriptionId) {
        await postToBackend("/stripe/webhook/invoice-paid", {
          subscription_id: subscriptionId,
          status: "active",
        });
      }
    }
  } catch (e) {
    console.error("Stripe webhook handler error:", e);
  }

  return NextResponse.json({ received: true });
}