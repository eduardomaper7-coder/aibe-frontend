"use client";

import { usePathname } from "next/navigation";
import GlobalTopbar from "@/app/[locale]/GlobalTopbar";

export default function TopbarGate() {
  const pathname = usePathname();

  // Ocultar el topbar negro en cualquier ruta del panel
  const isPanel = pathname.includes("/panel");
  if (isPanel) return null;

  // Mostrarlo en el resto (landing, login, legales, etc.)
  return <GlobalTopbar />;
}


