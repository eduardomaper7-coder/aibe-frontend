// app/page.tsx
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default function Root() {
  const accept = headers().get("accept-language") || "";

  // Súper simple: si el navegador tiene inglés, manda a /en
  // Si no, a /es
  const wantsEn = accept.toLowerCase().includes("en");

  redirect(wantsEn ? "/en" : "/es");
}
