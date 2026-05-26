import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  experimental: {
    // Enable when server-side logging is needed
    // serverActions: { bodySizeLimit: '2mb' },
  },
  // Strip unused Tailwind CSS in production
  output: undefined,
};

export default nextConfig;
