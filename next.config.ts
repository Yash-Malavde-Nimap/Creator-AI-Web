import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  experimental: {},
  output: undefined,
};

export default nextConfig;
