import type { Metadata } from "next";
import AgentesIA from "../../../components/agentes/AgentesIA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en ? "AI agents for your business | aibe" : "Agentes IA para tu negocio | aibe",
    description: en
      ? "AI assistants that answer customers, manage bookings and follow up 24/7 on WhatsApp, phone and your website."
      : "Asistentes con inteligencia artificial que atienden a tus clientes, gestionan citas y hacen el seguimiento 24/7 por WhatsApp, teléfono y tu web.",
    alternates: { canonical: `/${locale}/agentes-ia` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AgentesIA locale={locale} />;
}
