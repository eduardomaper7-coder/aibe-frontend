import { Suspense } from "react";
import ExitoClient from "./ExitoClient";

export const dynamic = "force-dynamic"; // evita errores de prerender

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Cargando...</div>}>
      <ExitoClient />
    </Suspense>
  );
}

