'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { BottomNextButton } from '@/components/onboarding/OnboardingButtons';
import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { resetPasswordConfig } from '@/config/forms.config';
import { useResetPassword } from '@/features/auth/hooks/useResetPassword';
import type { ResetPasswordFormValues } from '@/types/forms.types';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: reset, isPending, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({ defaultValues: resetPasswordConfig.defaultValues, mode: 'onChange' });

  const onSubmit = (data: ResetPasswordFormValues) => reset({ token, ...data });
  const apiError = error as { message?: string } | null;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6 pb-28 pt-14">
        <div className="flex w-full max-w-sm flex-col items-center">
          <SocialBeatLogo />

          <h1 className="mt-10 text-center text-[26px] font-extrabold leading-tight text-white">
            You&apos;re Verified!
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-white/60">
            Your account is now secure,
            <br />
            you can set your new password.
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
            id="reset-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 flex w-full flex-col gap-5"
          >
            <div>
              <OnboardingInput
                label="Enter new password"
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="new-password"
                error={errors.password?.message}
                rightSlot={
                  <button
                    type="button"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPw((p) => !p)}
                    className="cursor-pointer"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                }
                {...register('password', resetPasswordConfig.rules.password)}
              />
            </div>

            <div>
              <OnboardingInput
                label="Confirm new password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                rightSlot={
                  <button
                    type="button"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    onClick={() => setShowConfirm((p) => !p)}
                    className="cursor-pointer"
                  >
                    <EyeIcon open={showConfirm} />
                  </button>
                }
                {...register('confirmPassword', resetPasswordConfig.rules.confirmPassword)}
              />
            </div>
          </form>
        </div>
      </div>

      <BottomNextButton
        loading={isPending}
        active={isValid}
        onClick={() => {
          const form = document.getElementById('reset-form') as HTMLFormElement | null;
          form?.requestSubmit();
        }}
      >
        Next
      </BottomNextButton>
    </>
  );
}
