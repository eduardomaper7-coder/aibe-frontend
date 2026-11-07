import type { Metadata } from "next";

import SeoMadridClient from "./SeoMadridClient";

export const metadata: Metadata = {
  title: "SEO en Madrid | Agencia de Posicionamiento Web | AIBE",
  description:
    "Agencia SEO en Madrid especializada en posicionamiento web, SEO local, auditorías técnicas y estrategias para conseguir más clientes desde Google.",
  alternates: {
    canonical: "/es/seo-madrid",
  },
  openGraph: {
    title: "SEO en Madrid | Agencia de Posicionamiento Web",
    description:
      "Mejora la visibilidad de tu negocio en Google con una estrategia SEO adaptada a tu empresa y a tus clientes en Madrid.",
    type: "website",
    locale: "es_ES",
  },
};

export default function SeoMadridPage() {
  return <SeoMadridClient />;
}