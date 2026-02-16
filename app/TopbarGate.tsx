"use client";

import { usePathname } from "next/navigation";
import ClientTopbarWrapper from "./ClientTopbarWrapper";

export default function TopbarGate() {
  const pathname = usePathname();
  const isPanel = pathname.includes("/panel");

  if (isPanel) return null;

  return (
    <>
      <ClientTopbarWrapper />
      <div className="topbar-spacer" />
    </>
  );
}
