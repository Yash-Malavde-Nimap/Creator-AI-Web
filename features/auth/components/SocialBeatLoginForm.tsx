"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { GradientButton } from "@/components/onboarding/OnboardingButtons";
import { OnboardingInput } from "@/components/onboarding/OnboardingInput";
import { SocialBeatLogo } from "@/components/onboarding/SocialBeatLogo";
import { loginFormConfig } from "@/config/forms.config";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth.service";
import { toast } from "@/lib/toast";
import type { LoginFormValues } from "@/types/forms.types";
import { EyeIcon } from "@/components/common/svgs/EyeIcon";

export function SocialBeatLoginForm() {
  const [showPw, setShowPw] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: loginFormConfig.defaultValues,
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsPending(true);
    try {
      const res = await authService.login(data);
      authService.saveTokens(res.data.tokens);
      authService.saveUser(res.data.user);
      router.push(ROUTES.HOME);
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ?? "Invalid email or password.";
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <SocialBeatLogo />

      <h1 className="mt-8 text-center text-[26px] font-extrabold leading-tight text-white">
        Welcome Back
      </h1>
      <p className="mt-2 text-center text-sm leading-relaxed text-white/60">
        Sign in to continue automating your
        <br />
        social growth with AI
      </p>

      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 flex w-full flex-col gap-5"
      >
        <div>
          <OnboardingInput
            label="Enter your email"
            type="email"
            placeholder="Email id"
            autoComplete="email"
            inputMode="email"
            error={errors.email?.message}
            {...register("email", loginFormConfig.rules.email)}
          />
        </div>

        <div>
          <OnboardingInput
            label="Enter your password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            rightSlot={
              <button
                type="button"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((p) => !p)}
                className="cursor-pointer"
              >
                <EyeIcon open={showPw} />
              </button>
            }
            {...register("password", loginFormConfig.rules.password)}
          />
        </div>

        <div className="flex justify-end">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm font-medium text-[#4a9fd5] hover:text-[#6db8e8]"
          >
            Forgot password?
          </Link>
        </div>

        <GradientButton type="submit" loading={isPending} className="">
          Sign in
        </GradientButton>
      </form>

      <p className="mt-6 text-center text-sm text-white/45">
        Don't have an account?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-[#f5a623] hover:text-[#f7bb52]"
        >
          Create one
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-white/35">
        By joining, you agree to our{" "}
        <a
          href="#"
          className="text-[#f5a623] underline-offset-2 hover:underline"
        >
          Terms of Service
        </a>
        .
      </p>
    </div>
  );
}
