// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Crea el usuario ya confirmado (ignora la política de confirmación del proyecto)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      // Si ya existe, devolvemos 200 para que el flujo continúe con el signIn
      if (error.message?.toLowerCase().includes("already registered")) {
        return NextResponse.json({ ok: true, alreadyExists: true });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, userId: data.user?.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Error creando usuario" },
      { status: 500 }
    );
  }
}
