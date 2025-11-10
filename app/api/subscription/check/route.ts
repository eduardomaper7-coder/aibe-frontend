// app/api/subscription/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Status = "trialing" | "active" | "past_due" | "canceled" | "unpaid" | string;

function ok(status?: Status | null, endIso?: string | null) {
  const good = status === "active" || status === "trialing";
  const notExpired = !endIso || new Date(endIso) > new Date();
  return !!good && notExpired;
}

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return NextResponse.json({ allowed: false, reason: "no-token" });

    // Cliente "usuario" para leer identidad y su propio perfil
    const userSb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user } } = await userSb.auth.getUser();
    if (!user) return NextResponse.json({ allowed: false, reason: "no-user" });

    // 1) Intento DB
    const { data: profile, error: perr } = await userSb
      .from("profiles")
      .select("stripe_customer_id, subscription_status, current_period_end, email")
      .eq("id", user.id)
      .maybeSingle();

    if (perr) {
      // Si RLS bloquea, devuelve info para que podamos depurar
      return NextResponse.json({ allowed: false, reason: "rls-or-profile-error", diag: { perr } });
    }

    if (profile && ok(profile.subscription_status as Status, profile.current_period_end as string | null)) {
      return NextResponse.json({
        allowed: true,
        source: "db",
        status: profile.subscription_status,
        end: profile.current_period_end ?? null,
      });
    }

    // 2) Fallback a Stripe (solo si hay SECRET)
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ allowed: false, reason: "no-stripe-secret" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

    // Determinar customer
    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      // Buscar por email
      const email = user.email ?? profile?.email ?? undefined;
      if (email) {
        const found = await stripe.customers.list({ email, limit: 1 });
        customerId = found.data[0]?.id ?? null;
      }
    }

    if (!customerId) {
      // No podemos verificar en Stripe sin customer; no bloquees con razón genérica
      return NextResponse.json({ allowed: false, reason: "no-customer" });
    }

    // Leer suscripciones del customer
    const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
    const pick = subs.data.find(s => ok(s.status as Status, s.current_period_end ? new Date(s.current_period_end * 1000).toISOString() : null));

    if (!pick) {
      return NextResponse.json({ allowed: false, reason: "no-active-sub" });
    }

    // 3) Auto-corrección en DB (service role) — no bloquea si falla
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        await admin
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: pick.id,
            subscription_status: pick.status,
            current_period_end: pick.current_period_end
              ? new Date(pick.current_period_end * 1000).toISOString()
              : null,
          })
          .eq("id", user.id);
      } catch { /* no-op */ }
    }

    return NextResponse.json({
      allowed: true,
      source: "stripe-fallback",
      status: pick.status,
      end: pick.current_period_end ? new Date(pick.current_period_end * 1000).toISOString() : null,
    });
  } catch (e: any) {
    return NextResponse.json({ allowed: false, reason: "fatal", message: e?.message ?? String(e) }, { status: 500 });
  }
}
