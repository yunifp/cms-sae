// next.config.ts atau next.config.mjs

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tambahkan blok images ini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;