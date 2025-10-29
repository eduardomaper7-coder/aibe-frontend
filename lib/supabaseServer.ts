// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,              // pública
  process.env.SUPABASE_SERVICE_ROLE!,                 // ⚠️ privada (NO NEXT_PUBLIC)
  { auth: { persistSession: false } }
);
