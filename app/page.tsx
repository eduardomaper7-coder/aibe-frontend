// app/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function pickFromAcceptLanguage(accept: string) {
  const first = accept.split(",")[0]?.trim().toLowerCase();
  if (first?.startsWith("en")) return "en";
  return "es";
}

export default async function Root() {
  const h = await headers();

  const country =
    h.get("x-vercel-ip-country") ||
    h.get("x-vercel-geo-country") ||
    "";

  const accept = h.get("accept-language") || "";

  console.log("COUNTRY:", country, "ACCEPT:", accept);

  if (country === "US") redirect("/en");
  if (country === "ES") redirect("/es");

  redirect(`/${pickFromAcceptLanguage(accept)}`);
}
