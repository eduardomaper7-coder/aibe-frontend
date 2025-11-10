import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cancela la suscripción del usuario autenticado.
 * Por defecto, cancela al final del periodo (cancel_at_period_end = true).
 * Si pasas ?immediate=1 -> cancela inmediata (prorratea según config de Stripe).
 */
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return NextResponse.json({ ok: false, error: "no-token" }, { status: 401 });

    const userSb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user } } = await userSb.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "no-user" }, { status: 401 });

    // Lee el perfil del usuario (RLS: id=auth.uid())
    const { data: profile, error: perr } = await userSb
      .from("profiles")
      .select("stripe_subscription_id, stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    if (perr) return NextResponse.json({ ok: false, error: "profile-read-error", detail: perr.message }, { status: 400 });
    if (!profile) return NextResponse.json({ ok: false, error: "no-profile" }, { status: 404 });

    const subsId = profile.stripe_subscription_id || null;
    const custId = profile.stripe_customer_id || null;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ ok: false, error: "no-stripe-secret" }, { status: 500 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


    // Si no tenemos subscription_id guardado, intentamos localizarlo por customer
    let subscription: Stripe.Subscription | null = null;

    if (subsId) {
      subscription = await stripe.subscriptions.retrieve(subsId);
    } else if (custId) {
      const list = await stripe.subscriptions.list({ customer: custId, status: "all", limit: 10 });
      // coge la activa/trial o la más reciente
      subscription =
        list.data.find(s => ["active", "trialing", "past_due"].includes(s.status)) ||
        list.data[0] ||
        null;
    } else {
      // Último recurso: buscar por email del usuario
      if (user.email) {
        const customers = await stripe.customers.list({ email: user.email, limit: 1 });
        const c = customers.data[0];
        if (c) {
          const list = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
          subscription =
            list.data.find(s => ["active", "trialing", "past_due"].includes(s.status)) ||
            list.data[0] ||
            null;
        }
      }
    }

    if (!subscription) {
      return NextResponse.json({ ok: false, error: "no-subscription-found" }, { status: 404 });
    }

    const immediate = req.nextUrl.searchParams.get("immediate") === "1";

    let canceled: Stripe.Subscription;

    if (immediate) {
      // Cancela ahora
      canceled = await stripe.subscriptions.cancel(subscription.id);
    } else {
      // Cancela al final del periodo (no cobra más)
      canceled = await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: true });
    }

    // Actualiza el perfil para que tu guard bloquee el acceso
    // (usa service_role para evitar RLS en update si lo prefieres)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

      const patch = {
        stripe_subscription_id: canceled.id,
        subscription_status: canceled.status, // 'active' | 'trialing' | 'canceled' | 'past_due' | ...
        // @ts-ignore
        current_period_end: (canceled as any).current_period_end
        ? new Date((canceled as any).current_period_end * 1000).toISOString()
        : null,

      };

      await admin.from("profiles").update(patch).eq("id", user.id);
    }

    return NextResponse.json({
      ok: true,
      status: canceled.status,
      cancel_at_period_end: canceled.cancel_at_period_end ?? null,
      current_period_end: canceled.current_period_end
        ? new Date(canceled.current_period_end * 1000).toISOString()
        : null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? String(e) }, { status: 500 });
  }
}
