// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        async set(name: string, value: string, options?: any) {
          const cookieStore = await cookies();
          cookieStore.set(name, value, options);
        },
        async remove(name: string, options?: any) {
          const cookieStore = await cookies();
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
}
