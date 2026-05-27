'use client';

import { useRouter } from 'next/navigation';

import { GradientButton } from '@/components/onboarding/OnboardingButtons';
import { ROUTES } from '@/constants/routes';
import { useRegistrationStore } from '@/store/registration.store';

export function GetStartedButton() {
  const router = useRouter();
  const { reset } = useRegistrationStore();

  const handleClick = () => {
    reset();
    router.push(ROUTES.REGISTER);
  };

  return <GradientButton onClick={handleClick}>Get started</GradientButton>;
}
