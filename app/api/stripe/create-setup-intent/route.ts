// app/api/stripe/create-setup-intent/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "").trim();

    if (!token) {
      return Response.json({ error: "Missing token" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // -------------------------------------------------------------
    // 3) OBTENER O CREAR STRIPE CUSTOMER
    // -------------------------------------------------------------
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-09-30.clover"
,
    });

    let customerId =
      user.app_metadata?.stripe_customer_id ||
      user.user_metadata?.stripe_customer_id;

    // Si NO existe → crear en Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_id: user.id },
      });

      customerId = customer.id;

      // Guardar en Supabase
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: { stripe_customer_id: customerId },
      });
    }

    // -------------------------------------------------------------
    // 4) CREAR SETUP INTENT
    // -------------------------------------------------------------
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    return Response.json({ clientSecret: setupIntent.client_secret });
  } catch (e: any) {
    console.error("create-setup-intent error", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
