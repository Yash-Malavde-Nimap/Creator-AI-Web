import type { NextConfig } from 'next';

const BACKEND_URL = process.env.NEXT_API_BASE_URL ?? 'http://localhost:8000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
    ],
  },
  // Proxy all /api/backend/* calls to the real backend server.
  // The browser calls the same origin (no CORS); Next.js forwards server-to-server.
  async rewrites() {
    return [
      {
        source:      '/api/backend/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
  experimental: {},
  output: undefined,
};

export default nextConfig;
