'use client';

import { useForm } from 'react-hook-form';

import { BottomNextButton } from '@/components/onboarding/OnboardingButtons';
import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { forgotPasswordConfig } from '@/config/forms.config';
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassword';
import type { ForgotPasswordFormValues } from '@/types/forms.types';

export default function ForgotPasswordPage() {
  const { mutate: sendReset, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({ defaultValues: forgotPasswordConfig.defaultValues, mode: 'onChange' });

  const onSubmit = (data: ForgotPasswordFormValues) => sendReset(data);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6 pb-28 pt-14">
        <div className="flex w-full max-w-sm flex-col items-center">
          <SocialBeatLogo />

          <h1 className="mt-10 text-center text-[26px] font-extrabold leading-tight text-white">
            Forgot Password?
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-white/60">
            Don&apos;t worry, enter your email id
            <br />
            to reset your password.
          </p>

          <form
            id="forgot-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 w-full"
          >
            <OnboardingInput
              label="Enter your email id"
              type="email"
              placeholder="Email id"
              autoComplete="email"
              inputMode="email"
              error={errors.email?.message}
              {...register('email', forgotPasswordConfig.rules.email)}
            />
          </form>
        </div>
      </div>

      <BottomNextButton
        loading={isPending}
        active={isValid}
        onClick={() => {
          const form = document.getElementById('forgot-form') as HTMLFormElement | null;
          form?.requestSubmit();
        }}
      >
        Next
      </BottomNextButton>
    </>
  );
}
