// proxy.ts
import createMiddleware from "next-intl/middleware";
import {locales, defaultLocale} from "./src/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false
});

export const config = {
  // ✅ Solo aplica el middleware cuando la URL ya tiene /es o /en
  matcher: ["/(es|en)/:path*"]
};
