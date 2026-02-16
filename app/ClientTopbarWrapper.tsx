"use client";

import { usePathname } from "next/navigation";
import GlobalTopbar from "./[locale]/GlobalTopbar";

export default function ClientTopbarWrapper() {
  const pathname = usePathname();

  // Oculta la topbar de marketing dentro del panel
  // Ej: /es/panel, /en/panel/solicitar-resenas, etc.
  const isPanel = pathname.includes("/panel");

  if (isPanel) return null;

  return <GlobalTopbar />;
}
