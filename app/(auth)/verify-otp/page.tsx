'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { BottomNextButton } from '@/components/onboarding/OnboardingButtons';
import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { useVerifyOtp } from '@/features/auth/hooks/useVerifyOtp';
import { otpSchema, OtpFormValues } from '@/validations/auth.validation';

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const { mutate: verify, isPending, error } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = (data: OtpFormValues) => verify({ email, code: data.code });
  const apiError = error as { message?: string } | null;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6 pb-28 pt-14">
        <div className="flex w-full max-w-sm flex-col items-center">
          <SocialBeatLogo />

          <h1 className="mt-10 text-center text-[26px] font-extrabold leading-tight text-white">
            Verify Your Account
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-white/60">
            We&apos;ve sent a secure verification
            <br />
            code to your email.
          </p>

          {apiError?.message && (
            <div
              className="mt-6 w-full rounded-2xl px-4 py-3 text-sm text-red-300"
              style={{ background: 'rgba(200,50,50,0.15)', border: '1px solid rgba(200,50,50,0.3)' }}
            >
              {apiError.message}
            </div>
          )}

          <form
            id="otp-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 w-full"
          >
            <p className="mb-2 text-base font-semibold text-white">Enter the 6-digit code</p>
            <OnboardingInput
              type="text"
              placeholder="6-digit code"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              error={errors.code?.message}
              {...register('code')}
            />
          </form>
        </div>
      </div>

      <BottomNextButton
        loading={isPending}
        onClick={() => {
          const form = document.getElementById('otp-form') as HTMLFormElement | null;
          form?.requestSubmit();
        }}
      >
        Next
      </BottomNextButton>
    </>
  );
}
