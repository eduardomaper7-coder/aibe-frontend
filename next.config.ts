import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [];
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