// next.config.ts
import type { NextConfig } from "next";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const isLocalLoop =
  API?.includes("localhost:3010") ||
  API?.includes("127.0.0.1:3010") ||
  API?.includes("localhost:3000") ||
  API?.includes("127.0.0.1:3000");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ evita que ESLint corte el build
  },
  async rewrites() {
    if (!API || isLocalLoop) return [];
    return [{ source: "/api/:path*", destination: `${API}/:path*` }];
  },
};

export default nextConfig;


