// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

//  🔑  Variables de entorno que debes tener en tu .env.local:
//
//  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
//  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
//
//  (Cópialas desde tu proyecto en Supabase → Settings → API)

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,         // mantiene sesión en localStorage
      autoRefreshToken: true,       // refresca el token automáticamente
      detectSessionInUrl: true, // 👈 añade esto
    },
  }
)
