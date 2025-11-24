// next.config.ts
import type { NextConfig } from "next";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const isDev = process.env.NODE_ENV !== "production";
const isLocalLoop =
  API?.includes("localhost") || API?.includes("127.0.0.1");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    // ❗ En desarrollo NO ponemos CSP porque rompe Stripe, React Refresh y Kaspersky
    if (isDev) {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
          ],
        },
      ];
    }

    // ✅ En producción sí ponemos CSP completa
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' https://js.stripe.com 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "img-src 'self' blob: data: https:;",
              "connect-src 'self' https://api.stripe.com https://r.stripe.com https://q.stripe.com;",
              "frame-src https://js.stripe.com;",
            ].join(" "),
          },
        ],
      },
    ];
  },

  async rewrites() {
    if (!API || isLocalLoop) return [];
    return [{ source: "/api/:path*", destination: `${API}/:path*` }];
  },
};

export default nextConfig;



