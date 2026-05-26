import type { Metadata } from 'next';

import { ParticleBackground } from '@/components/onboarding/ParticleBackground';

export const metadata: Metadata = {
  title: { template: '%s | SocialBeat', default: 'SocialBeat' },
};

/**
 * Shared layout for all (auth) routes.
 * Provides the full-screen dark particle background.
 * Each page is responsible for its own centred content.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ParticleBackground>{children}</ParticleBackground>;
}
