import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  if (!paymentLink) {
    return new NextResponse("Falta NEXT_PUBLIC_STRIPE_PAYMENT_LINK", {
      status: 500,
    });
  }

  // (Opcional) mantenemos job_id en la URL de vuelta a tu web si lo necesitas en /plan
  // Aquí no podemos meter metadata en Payment Links, solo redirigir.
  const url = new URL(paymentLink);

  // Si quieres pasar job_id como query al payment link (no lo usa Stripe para metadata,
  // pero lo podrías leer si tienes landing propia de Stripe NO; normalmente no hace falta).
  const incoming = new URL(request.url);
  const jobId = incoming.searchParams.get("job_id");
  if (jobId) url.searchParams.set("job_id", jobId);

  return NextResponse.redirect(url.toString(), { status: 302 });
}
