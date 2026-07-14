import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceLanding from "@/components/landing/ServiceLanding";
import { serviceLandings } from "@/lib/service-landings";

type ServicePageProps = {
  params: Promise<{
    locale: string;
    serviceSlug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(serviceLandings).map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, serviceSlug } = await params;
  const config = serviceLandings[serviceSlug];

  if (!config) {
    return {};
  }

  return {
    title: config.metadataTitle,
    description: config.metadataDescription,
    alternates: {
      canonical: `/${locale}/${config.slug}`,
      languages: {
        es: `/es/${config.slug}`,
        en: `/en/${config.slug}`,
      },
    },
    openGraph: {
      title: config.metadataTitle,
      description: config.metadataDescription,
      type: "website",
      locale: locale === "en" ? "en_GB" : "es_ES",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const config = serviceLandings[serviceSlug];

  if (!config) {
    notFound();
  }

  return <ServiceLanding config={config} />;
}
