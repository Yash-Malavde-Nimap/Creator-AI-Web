import type { Metadata } from 'next';

import { SocialBeatLoginForm } from '@/features/auth/components/SocialBeatLoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your SocialBeat account.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 pb-10 pt-14">
      <SocialBeatLoginForm />
    </div>
  );
}
