import "./globals.css";
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Loader>
          {children}
        </Loader>
      </body>
    </html>
  );
}