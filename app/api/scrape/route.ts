import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "BACKEND_URL no configurada" },
        { status: 500 }
      );
    }

    const res = await fetch(`${backendUrl}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Error en proxy /api/scrape:", error);
    return NextResponse.json(
      { error: "Error conectando con backend" },
      { status: 502 }
    );
  }
}
