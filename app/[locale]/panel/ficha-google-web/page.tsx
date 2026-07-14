import { Suspense } from "react";
import FichaGoogleWebPageClient from "./FichaGoogleWebPageClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FichaGoogleWebPageClient />
    </Suspense>
  );
}