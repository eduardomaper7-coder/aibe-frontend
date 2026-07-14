import { NextRequest, NextResponse } from 'next/server';
import { backfillLocationReviews } from '@/lib/syncReviews';

// Authentica a tu manera (session, JWT, etc.)
export async function POST(req: NextRequest) {
  const { userId, locationName } = await req.json();
  if (!userId || !locationName) return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });

  await backfillLocationReviews({ userId, locationName });
  return NextResponse.json({ ok: true });
}
