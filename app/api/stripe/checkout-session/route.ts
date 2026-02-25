import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  if (!paymentLink) {
    return new NextResponse("Falta NEXT_PUBLIC_STRIPE_PAYMENT_LINK", { status: 500 });
  }

  const url = new URL(paymentLink);

  const incoming = new URL(request.url);
  const jobId = incoming.searchParams.get("job_id");
  if (jobId) url.searchParams.set("job_id", jobId);

  return NextResponse.redirect(url.toString(), { status: 302 });
}