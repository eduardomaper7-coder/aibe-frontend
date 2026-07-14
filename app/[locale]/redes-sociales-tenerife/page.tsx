import type { Metadata } from "next";

import ServiceLanding from "@/components/landing/ServiceLanding";
import { serviceLandings } from "@/lib/service-landings";

type RedesSocialesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const config = serviceLandings["redes-sociales-tenerife"];

export async function generateMetadata({
  params,
}: RedesSocialesPageProps): Promise<Metadata> {
  const { locale } = await params;

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

export default function RedesSocialesTenerifePage() {
  return <ServiceLanding config={config} />;
}
