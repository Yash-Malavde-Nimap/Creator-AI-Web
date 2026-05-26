import type { Metadata, Viewport } from 'next';

import { Providers } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Creator AI',
    default: 'Creator AI — AI-powered creator management',
  },
  description: 'AI-powered platform for managing creators, campaigns, and content at scale.',
  keywords: ['creator management', 'influencer marketing', 'campaign analytics', 'AI platform'],
  authors: [{ name: 'Creator AI' }],
  creator: 'Creator AI',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Creator AI',
    title: 'Creator AI',
    description: 'AI-powered creator management platform',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
