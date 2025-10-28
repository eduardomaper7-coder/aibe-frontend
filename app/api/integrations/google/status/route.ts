import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ connected: false }, { status: 200 })

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('google_connections')
      .select('refresh_token')
      .eq('user_email', String(email).toLowerCase())
      .maybeSingle()

    if (error) return NextResponse.json({ connected: false }, { status: 200 })

    return NextResponse.json({ connected: !!data?.refresh_token }, { status: 200 })
  } catch {
    return NextResponse.json({ connected: false }, { status: 200 })
  }
}
