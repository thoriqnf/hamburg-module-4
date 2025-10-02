import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO 21-22: Configure Next.js Image optimization
  // Allow external images from DummyJSON for Next.js Image component
  images: {
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com', 'dummyjson.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
