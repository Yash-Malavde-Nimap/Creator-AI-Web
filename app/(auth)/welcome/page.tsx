import type { Metadata } from 'next';
import Link from 'next/link';

import { GetStartedButton } from '@/components/onboarding/GetStartedButton';
import { DarkButton } from '@/components/onboarding/OnboardingButtons';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Automate your Social Growth with AI',
  description: 'Built for agencies. Automate LinkedIn & Instagram with AI content.',
};

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 pb-10 pt-14">
      <div className="flex w-full max-w-sm flex-col items-center">
        {/* Logo */}
        <SocialBeatLogo />

        {/* AI Blob illustration */}
        {/* <div className="my-6">
          <AiBlob />
        </div> */}

        {/* Headline */}
        <h1 className="mt-16 text-center text-[28px] font-extrabold leading-tight text-white">
          Automate your
          <br />
          Social Growth with AI
        </h1>

        {/* Sub-headline */}
        <p className="mt-3 text-center text-sm leading-relaxed text-white/65">
          Built for agencies. Automate LinkedIn &amp; Instagram with hyper-personalized, real-time
          content authentic to your voice.
        </p>

        {/* Feature pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <FeaturePill
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            label="24/7 Automation"
          />
          <FeaturePill
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            label="Smart insights"
          />
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex w-full flex-col gap-3">
          <GetStartedButton />

          <Link href={ROUTES.LOGIN} className="w-full">
            <DarkButton>Sign in</DarkButton>
          </Link>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-white/45">
          By joining, you agree to our{' '}
          <a href="#" className="text-[#f5a623] underline-offset-2 hover:underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1.5px solid rgba(255,255,255,0.15)',
      }}
    >
      <span className="text-white/60">{icon}</span>
      {label}
    </div>
  );
}
