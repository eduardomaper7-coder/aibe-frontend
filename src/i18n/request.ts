// src/i18n/request.ts
import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {locales} from "./config";

export default getRequestConfig(async ({requestLocale}) => {
  // ✅ Next 16: requestLocale es Promise
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
