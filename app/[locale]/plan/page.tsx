// app/[locale]/plan/page.tsx
import Link from "next/link";
import JobIdPersistor from "./JobIdPersistor";

export default async function PlanPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};
  const jobId = typeof sp.job_id === "string" ? sp.job_id : "";

  const registerHref = `/${locale}/registro${
    jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""
  }`;

  const checkoutHref = `/${locale}/checkout${
    jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""
  }`;

  // ✅ mientras NextAuth esté roto (500), mandamos siempre a registro primero
  const primaryHref = registerHref;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ✅ guarda job_id en localStorage (client) para que /registro lo recupere */}
      <JobIdPersistor jobId={jobId} />

      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src="/videos/videoreseñas.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="fixed inset-0 -z-10 bg-black/50" />

      <div className="relative mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Plan Reputación Automática
          </h1>

          <div className="mt-8 rounded-2xl border bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">💳 Plan único</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">12€ / mes</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
              >
                Continuar
              </Link>

              <Link
                href={`/${locale}/panel${jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""}`}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50"
              >
                Volver
              </Link>
            </div>

            {/* opcional: botón directo a checkout (si ya está logueado) */}
            <div className="mt-3 text-xs text-slate-600">
              (Checkout: <Link className="underline" href={checkoutHref}>abrir</Link>)
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}