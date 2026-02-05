// app/[locale]/layout.tsx
import "../globals.css";
import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import ClientTopbarWrapper from "../ClientTopbarWrapper";
import Providers from "../providers";
import PwaRegister from "../PwaRegister";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "AIBE Technologies — Artificial Intelligence for Business Efficiency",
  description:
    "Analiza tus reseñas de Google con inteligencia artificial y mejora tu reputación online.",
  applicationName: "AIBE"
};

// ✅ Next 16: themeColor ahora va en viewport, no en metadata
export const viewport: Viewport = {
  themeColor: "#000000"
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ params es Promise en Next 16
}) {
  const { locale } = await params; // ✅ hay que hacer await

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-black text-white relative">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PwaRegister />
          <ClientTopbarWrapper />
          <div className="topbar-spacer" />
          <Providers>{children}</Providers>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
