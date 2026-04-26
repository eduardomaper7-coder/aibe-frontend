"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PlansModal from "../solicitar-resenas/components/PlansModal";

import FichaGoogleHero from "./FichaGoogleHero";
import FichaGoogleFotos from "./FichaGoogleFotos";
import FichaGoogleWeb from "./FichaGoogleWeb";
import FichaGoogleTrafico from "./FichaGoogleTrafico";

export default function FichaGoogleWebPageClient() {
  const [plansOpen, setPlansOpen] = useState(false);
  const searchParams = useSearchParams();

  const jobId = Number(searchParams.get("job_id") ?? 0);

  return (
    <>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
        <div className="mx-auto w-full max-w-[1500px] space-y-16">
          <FichaGoogleHero onOpenPlans={() => setPlansOpen(true)} />
          <FichaGoogleFotos />
          <FichaGoogleWeb />
          <FichaGoogleTrafico />
        </div>
      </main>

      <PlansModal
        open={plansOpen}
        onClose={() => setPlansOpen(false)}
        jobId={jobId}
      />
    </>
  );
}