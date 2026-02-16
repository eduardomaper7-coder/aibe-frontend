import { Suspense } from "react";
import SolicitarResenasClient from "./SolicitarResenasClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">Cargando…</div>}>
      <SolicitarResenasClient />
    </Suspense>
  );
}
