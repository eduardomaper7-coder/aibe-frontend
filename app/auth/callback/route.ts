import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    // 👇 esto crea/actualiza las COOKIES de sesión en el servidor
    await supabase.auth.exchangeCodeForSession(code);
  }

  // a donde quieres llevar al usuario tras login
  return NextResponse.redirect(new URL("/panel", req.url));
}
