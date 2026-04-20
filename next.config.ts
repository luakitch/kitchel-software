import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/support.html", destination: "/support", permanent: true },
    ];
  },
};

export default nextConfig;
