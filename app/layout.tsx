// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientTopbarWrapper from "./ClientTopbarWrapper";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers";
import PwaRegister from "./PwaRegister";

export const metadata: Metadata = {
  title: "AIBE Technologies — Artificial Intelligence for Business Efficiency",
  description: "Hero con video y títulos rotativos",

  applicationName: "AIBE",
  themeColor: "#000000",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIBE",
  },

  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white relative">
        <PwaRegister />

        <ClientTopbarWrapper />

        <Providers>{children}</Providers>

        <Analytics />
      </body>
    </html>
  );
}
