// app/TopbarGate.tsx
"use client";


import { usePathname } from 'next/navigation';
import GlobalTopbar from '@/app/[locale]/GlobalTopbar';


export default function TopbarGate() {
  const pathname = usePathname();
  const isMarketingHome = pathname === '/'; // ajusta si tu landing es otra ruta
  if (!isMarketingHome) return null;
  return <GlobalTopbar />;
}


