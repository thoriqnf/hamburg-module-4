import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "image.google.com"],
    remotePatterns: [],
  },
};

export default nextConfig;
