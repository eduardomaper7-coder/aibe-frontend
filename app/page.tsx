// app/page.tsx
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function Root() {
  const h = await headers();
  const accept = h.get("accept-language") || "";

  const wantsEn = accept.toLowerCase().includes("en");
  redirect(wantsEn ? "/en" : "/es");
}
