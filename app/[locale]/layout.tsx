import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import CookieConsent from "@/components/CookieConsent";
import ConsentAwareAnalytics from "@/components/ConsentAwareAnalytics";
import Providers from "../providers";
import PwaRegister from "../PwaRegister";

const SITE_URL = "https://aibetech.es";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    metadataBase: new URL(SITE_URL),
    title: isEn
      ? "Digital Marketing Agency | Aibe Technologies"
      : "Agencia de Marketing Digital | Aibe Technologies",
    description: isEn
      ? "Digital marketing, web design, social media and AI automation services for businesses."
      : "Agencia de marketing digital especializada en redes sociales, diseño web, posicionamiento, campañas y automatización con IA.",
    applicationName: "AIBE",
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div className="relative">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PwaRegister />
        <Providers>{children}</Providers>
        <CookieConsent locale={locale} />
        <ConsentAwareAnalytics />
      </NextIntlClientProvider>
    </div>
  );
}
