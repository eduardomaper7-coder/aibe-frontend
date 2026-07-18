import type { Metadata } from "next";

import SeoAlicanteClient from "./SeoAlicanteClient";

export const metadata: Metadata = {
  title: "SEO en Alicante | Agencia de Posicionamiento Web | AIBE",
  description:
    "Agencia SEO en Alicante especializada en posicionamiento web, SEO local, auditorías técnicas y estrategias para conseguir más clientes desde Google.",
  alternates: {
    canonical: "/es/seo-alicante",
  },
  openGraph: {
    title: "SEO en Alicante | Agencia de Posicionamiento Web",
    description:
      "Mejora la visibilidad de tu negocio en Google con una estrategia SEO adaptada a tu empresa y a tus clientes en Alicante.",
    type: "website",
    locale: "es_ES",
  },
};

export default function SeoAlicantePage() {
  return <SeoAlicanteClient />;
}