import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow local IPs or other origins
    allowedDevOrigins: [
      "http://10.1.29.98:3000", // replace with your LAN IP + port
      "http://localhost:3000",
      "http://10.1.29.98:3000",  // keep localhost too
    ],
  },
};

export default nextConfig;
