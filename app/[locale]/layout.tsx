// app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import TopbarGate from "../TopbarGate";
import Providers from "../providers";
import PwaRegister from "../PwaRegister";
import { Analytics } from "@vercel/analytics/react";

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
    title: "AIBE Technologies — Artificial Intelligence for Business Efficiency",
    description: isEn
      ? "Analyze your Google reviews with AI and improve your online reputation."
      : "Analiza tus reseñas de Google con inteligencia artificial y mejora tu reputación online.",
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
    <div className="bg-black text-white relative">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PwaRegister />
        <TopbarGate />
        <div className="topbar-spacer" />
        <Providers>{children}</Providers>
        <Analytics />
      </NextIntlClientProvider>
    </div>
  );
}
