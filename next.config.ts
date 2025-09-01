import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
