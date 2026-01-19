import { Suspense } from "react";
import SignupClient from "./SignupClient";

export default function RegistroPage() {
  return (
    <Suspense fallback={<div>Cargando registro…</div>}>
      <SignupClient />
    </Suspense>
  );
}
