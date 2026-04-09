import { Suspense } from "react";
import PosicionamientoClient from "./PosicionamientoClient";

function PosicionamientoFallback() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Cargando posicionamiento...</p>
      </section>
    </div>
  );
}

export default function PosicionamientoPage() {
  return (
    <Suspense fallback={<PosicionamientoFallback />}>
      <PosicionamientoClient />
    </Suspense>
  );
}