import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      // Home animation clips + engine are versioned by ?v= (CLIP_VERSION / ENGINE_VERSION in
      // AibeScrollWorld.tsx), so browsers can keep them for a year: repeat visits load instantly.
      {
        source: "/world/vid/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/world/scrub-engine.js",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    const madridPages = [
      "agencia-marketing",
      "marketing-digital",
      "seo",
      "diseno-web",
      "google-ads",
      "gestion-redes-sociales",
    ];
    const tenerifePages = [
      "redes-sociales-tenerife",
      "marketing-digital-tenerife",
      "diseno-web-branding-tenerife",
      "desarrollo-web-tenerife",
      "automatizacion-ia-tenerife",
    ];

    return [
      ...madridPages.map((page) => ({
        source: `/:locale(es|en)/${page}-alicante`,
        destination: `/:locale/${page}-madrid`,
        permanent: true,
      })),
      ...tenerifePages.map((page) => ({
        source: `/:locale(es|en)/${page}`,
        destination: "/:locale",
        permanent: true,
      })),
    ];
  },

  async rewrites() {
    return [];
  },
};

export default withNextIntl(nextConfig);