// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientTopbarWrapper from "./ClientTopbarWrapper"; // <-- wrapper seguro (client)

export const metadata: Metadata = {
  title: "AIBE Technologies — Artificial Intelligence for Business Efficiency",
  description: "Hero con video y títulos rotativos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white relative">

        {/* 🔥 Componente client pero a través de un wrapper */}
        <ClientTopbarWrapper />

        {/* Contenido de páginas */}
        {children}

      </body>
    </html>
  );
}


