"use client";

import Link from "next/link";

export default function ContinueButton({
  href,
  jobId,
}: {
  href: string;
  jobId: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (jobId) localStorage.setItem("job_id", jobId);
      }}
      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
    >
      Continuar
    </Link>
  );
}