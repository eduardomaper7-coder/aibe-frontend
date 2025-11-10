import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs"; // asegúrate de no ejecutar en Edge

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin(); // ← crea/recupera el cliente en runtime

    // Crea el usuario ya confirmado (ignora confirmación por email)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      // Si ya existe, devolvemos 200 para que el flujo continue con signIn
      if (error.message?.toLowerCase().includes("already registered")) {
        return NextResponse.json({ ok: true, alreadyExists: true });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, userId: data.user?.id });
  } catch (e: any) {
    // También captura el caso de env vars ausentes en runtime
    return NextResponse.json(
      { error: e?.message ?? "Error creando usuario" },
      { status: 500 }
    );
  }
}

