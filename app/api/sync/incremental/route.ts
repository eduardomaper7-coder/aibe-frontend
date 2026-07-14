import { NextRequest, NextResponse } from "next/server";
import { syncIncrementalLocation } from "@/lib/syncReviews"; // tu función de sync

export async function POST(req: NextRequest) {
  const { userId, locationName } = await req.json();
  if (!userId || !locationName) {
    return NextResponse.json({ error: "Faltan userId o locationName" }, { status: 400 });
  }
  await syncIncrementalLocation({ userId, locationName });
  return NextResponse.json({ ok: true });
}
