// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import TopbarGate from './TopbarGate';

export const metadata: Metadata = {
  title: 'AIBE Technologies — Artificial Intelligence for Business Efficiency',
  description: 'Hero con video y títulos rotativos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* Server Component por defecto, NO pongas 'use client' aquí */}
      <body className="bg-black text-white">
        {/* Menú solo cuando TopbarGate lo muestre (tu lógica interna) */}
        <TopbarGate />
        {children}
      </body>
    </html>
  );
}



