// app/page.tsx
import {headers} from "next/headers";
import {redirect} from "next/navigation";

function pickLocale(acceptLanguage: string) {
  const first = acceptLanguage
    .split(",")[0]
    ?.trim()
    .toLowerCase(); // ej: "es-es" o "en-us"

  if (!first) return "es";
  if (first.startsWith("en")) return "en";
  return "es";
}

export default async function Root() {
  const h = await headers();
  const accept = h.get("accept-language") || "";

  const locale = pickLocale(accept);
  redirect(`/${locale}`);
}
