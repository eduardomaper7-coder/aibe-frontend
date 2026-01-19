import { Suspense } from "react";
import SignupClient from "./SignupClient";
export const dynamic = "force-dynamic";

export default function RegistroPage() {
  return (
    <Suspense fallback={<div>Cargando registro…</div>}>
      <SignupClient />
    </Suspense>
  );
}
