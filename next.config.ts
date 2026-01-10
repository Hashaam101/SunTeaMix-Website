import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'sun-tea-mix.vercel.app',
      }
    ],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
