'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { BottomNextButton, GradientButton } from '@/components/onboarding/OnboardingButtons';
import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { SocialBeatLogo } from '@/components/onboarding/SocialBeatLogo';
import { ROUTES } from '@/constants/routes';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginSchema, LoginFormValues } from '@/validations/auth.validation';

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

export function SocialBeatLoginForm() {
  const [showPw, setShowPw] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormValues) => login(data);
  const apiError = error as { message?: string } | null;

  return (
    <>
      <div className="flex w-full max-w-sm flex-col items-center pb-28">
        {/* Logo */}
        <SocialBeatLogo />

        {/* Heading */}
        <h1 className="mt-8 text-center text-[26px] font-extrabold leading-tight text-white">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-white/60">
          Sign in to continue automating your
          <br />
          social growth with AI
        </p>

        {/* API error */}
        {apiError?.message && (
          <div
            className="mt-6 w-full rounded-2xl px-4 py-3 text-sm text-red-300"
            style={{ background: 'rgba(200,50,50,0.15)', border: '1px solid rgba(200,50,50,0.3)' }}
          >
            {apiError.message}
          </div>
        )}

        {/* Form */}
        <form
          id="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 flex w-full flex-col gap-5"
        >
          {/* Email */}
          <div>
            <p className="mb-2 text-base font-semibold text-white">Enter your email</p>
            <OnboardingInput
              type="email"
              placeholder="email id"
              autoComplete="email"
              inputMode="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Password */}
          <div>
            <p className="mb-2 text-base font-semibold text-white">Enter your password</p>
            <OnboardingInput
              type={showPw ? 'text' : 'password'}
              placeholder="password"
              autoComplete="current-password"
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
              {...register('password')}
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-sm font-medium text-[#4a9fd5] hover:text-[#6db8e8]"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit — visible on larger screens, hidden behind BottomNextButton on mobile */}
          <GradientButton type="submit" loading={isPending} className="hidden sm:flex">
            Sign in
          </GradientButton>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-white/45">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="font-medium text-[#f5a623] hover:text-[#f7bb52]"
          >
            Create one
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-white/35">
          By joining, you agree to our{' '}
          <a href="#" className="text-[#f5a623] underline-offset-2 hover:underline">
            Terms of Service
          </a>
          .
        </p>
      </div>

      {/* Fixed bottom Sign in button (mobile) */}
      <BottomNextButton
        loading={isPending}
        onClick={() => {
          const form = document.getElementById('login-form') as HTMLFormElement | null;
          form?.requestSubmit();
        }}
      >
        Sign in
      </BottomNextButton>
    </>
  );
}
