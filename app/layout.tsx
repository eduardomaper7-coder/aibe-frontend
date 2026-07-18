import "./globals.css";
import Loader from "@/components/Loader";
import Script from "next/script";

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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18263984994"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-18263984994');
          `}
        </Script>
      </body>
    </html>
  );
}