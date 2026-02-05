// proxy.ts
import createMiddleware from "next-intl/middleware";
import {locales, defaultLocale} from "./src/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false // 👈 importante: respeta /en y /es
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
