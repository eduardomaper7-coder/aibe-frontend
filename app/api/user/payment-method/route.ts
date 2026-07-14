// app/api/user/payment-method/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return Response.json({ error: "Missing token" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error("Supabase user error:", userError);
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ has_payment_method: true })
      .eq("id", user.id);

    if (error) {
      console.error("DB update error:", error);
      return Response.json({ error: "DB update failed" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("payment-method endpoint error", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
