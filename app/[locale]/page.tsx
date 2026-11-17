import type { Viewport } from "next";
import AibeScrollWorld from "../../components/ui/AibeScrollWorld";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#EEF4FB",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AibeScrollWorld locale={locale} />;
}
