import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const supabaseAdmin = getSupabaseAdmin();

export async function POST(req: NextRequest) {
  console.log("▶️ POST /api/payment-method-status");

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("❌ Error parseando JSON:", err);
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const userId = body?.userId;

  console.log("• userId recibido:", userId);

  if (!userId) {
    console.error("❌ userId no recibido");
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  // 🔥 Leer perfil con service-role
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("has_payment_method")
    .eq("id", userId)
    .single();

  console.log("• Resultado Supabase profile:", profile);
  if (error) {
    console.error("❌ Error leyendo profile:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasPaymentMethod = profile?.has_payment_method ?? false;

  console.log("• has_payment_method devuelto:", hasPaymentMethod);

  return NextResponse.json({
    hasPaymentMethod,
  });
}


