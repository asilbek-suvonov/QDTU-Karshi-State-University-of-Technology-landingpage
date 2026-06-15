import type { NextConfig } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://5.189.158.5:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api-proxy/:path*",
          destination: `${API_BASE_URL}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
