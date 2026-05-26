'use client';

import { useRouter } from 'next/navigation';

import { BottomNextButton } from '@/components/onboarding/OnboardingButtons';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { ROUTES } from '@/constants/routes';
import { EmailStep } from '@/features/auth/components/register/EmailStep';
import { NameStep } from '@/features/auth/components/register/NameStep';
import { PasswordStep } from '@/features/auth/components/register/PasswordStep';
import { PhoneStep } from '@/features/auth/components/register/PhoneStep';
import { useRegistrationStore } from '@/store/registration.store';

export default function RegisterPage() {
  const router = useRouter();
  const { step, nextStep } = useRegistrationStore();

  const handleNext = () => {
    if (step < 4) {
      nextStep();
    } else {
      // After final step, navigate to plan selection
      router.push(ROUTES.PLANS);
    }
  };

  // const stepLabels: Record<number, string> = {
  //   1: 'Enter your full name',
  //   2: 'Enter your mobile number',
  //   3: 'Enter your email id',
  //   4: 'Create your password',
  // };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6 pb-28 pt-14">
        <div className="flex w-full max-w-sm flex-col items-center">
          {/* Logo */}
          <SocialBeatLogo />

          {/* Headline */}
          <h1 className="mt-8 text-center text-[26px] font-extrabold leading-tight text-white">
            Join the Future
            <br />
            of Social Growth
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-white/62">
            Sign up to generate AI content and automate
            <br />
            your Instagram and LinkedIn presence
          </p>

          {/* Step indicator dots */}
          <div className="mt-8 flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: s === step ? 24 : 6,
                  background:
                    s === step
                      ? 'linear-gradient(90deg, #4a9fd5, #e8a020)'
                      : s < step
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* Current step label */}
          {/* <p className="mt-6 self-start text-base font-semibold text-white">
            {stepLabels[step]}
          </p> */}

          {/* Step form */}
          <div className="mt-2 w-full">
            {step === 1 && <NameStep onNext={handleNext} />}
            {step === 2 && <PhoneStep onNext={handleNext} />}
            {step === 3 && <EmailStep onNext={handleNext} />}
            {step === 4 && <PasswordStep onNext={handleNext} />}
          </div>
        </div>
      </div>

      {/* Fixed bottom Next button — triggers the active form submission */}
      <BottomNextButton
        onClick={() => {
          const form = document.getElementById('register-form') as HTMLFormElement | null;
          form?.requestSubmit();
        }}
      />
    </>
  );
}
