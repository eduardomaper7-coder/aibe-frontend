// app/page.tsx
import {headers} from "next/headers";
import {redirect} from "next/navigation";

function pickFromAcceptLanguage(accept: string) {
  const first = accept.split(",")[0]?.trim().toLowerCase();
  if (first?.startsWith("en")) return "en";
  return "es";
}

export default async function Root() {
  const h = await headers();

  // ✅ Vercel GeoIP (si está disponible)
  const country =
    h.get("x-vercel-ip-country") ||
    h.get("x-vercel-geo-country") ||
    "";

  if (country === "US") redirect("/en");
  if (country === "ES") redirect("/es");

  // fallback
  const accept = h.get("accept-language") || "";
  redirect(`/${pickFromAcceptLanguage(accept)}`);
}
