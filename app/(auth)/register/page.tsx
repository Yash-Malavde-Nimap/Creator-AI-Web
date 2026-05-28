"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { BottomNextButton } from "@/components/onboarding/OnboardingButtons";
import { OnboardingInput } from "@/components/onboarding/OnboardingInput";
import { SocialBeatLogo } from "@/components/onboarding/SocialBeatLogo";
import { EyeIcon } from "@/components/common/svgs/EyeIcon";
import { registerFormConfig } from "@/config/forms.config";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useRegistrationStore } from "@/store/registration.store";
import { authService } from "@/services/auth.service";
import type { RegisterFormValues } from "@/types/forms.types";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+65", flag: "🇸🇬", name: "SG" },
];

const STEP_FIELDS: Record<1 | 2 | 3 | 4, (keyof RegisterFormValues)[]> = {
  1: ["name"],
  2: ["phone", "countryCode"],
  3: ["email"],
  4: ["password", "confirmPassword"],
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const raw = Number(searchParams.get("step"));
  const step = raw >= 1 && raw <= 4 ? (raw as 1 | 2 | 3 | 4) : 1;

  const { setRegistrationData } = useRegistrationStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(
    registerFormConfig.defaultValues.countryCode,
  );
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: registerFormConfig.defaultValues,
    mode: "onChange",
  });

  const values = watch();
  const isStepValid = STEP_FIELDS[step].every((f) => !!values[f] && !errors[f]);

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    if (step < 4) {
      router.push(`${ROUTES.REGISTER}?step=${step + 1}`);
    } else {
      setRegistrationData({
        name: values.name,
        phone: values.phone,
        countryCode: values.countryCode,
        email: values.email,
        password: values.password,
      });
      authService.saveTokens({
        accessToken: "dummy_access_token",
        refreshToken: "dummy_refresh_token",
        expiresIn: 3600,
      });
      authService.saveUser({
        id: "dummy_user_id",
        name: values.name,
        email: values.email,
        role: "viewer",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      router.push(ROUTES.HOME);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6 pb-28 pt-14">
        <div className="flex w-full max-w-sm flex-col items-center">
          <SocialBeatLogo />

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
            {([1, 2, 3, 4] as const).map((s) => (
              <div
                key={s}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: s === step ? 24 : 6,
                  background:
                    s === step
                      ? "linear-gradient(90deg, #4a9fd5, #e8a020)"
                      : s < step
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Step fields */}
          <div className="mt-5 w-full">

            {/* Step 1 — Name */}
            {step === 1 && (
              <OnboardingInput
                label="Enter your full name"
                placeholder="Full name"
                autoComplete="name"
                autoFocus
                error={errors.name?.message}
                {...register("name", registerFormConfig.rules.name)}
              />
            )}

            {/* Step 2 — Phone */}
            {step === 2 && (
              <div className="relative">
                <OnboardingInput
                  label="Enter your mobile number"
                  type="tel"
                  placeholder="Mobile number"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  error={errors.phone?.message}
                  leftSlot={
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((p) => !p)}
                      className="flex items-center gap-1 text-sm font-medium text-white/80"
                    >
                      {selectedCode}
                      <svg
                        className="h-3 w-3 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  }
                  {...register("phone", registerFormConfig.rules.phone)}
                />
                {dropdownOpen && (
                  <div
                    className="absolute left-0 top-full z-50 mt-2 h-40 w-48 overflow-y-scroll rounded-xl py-1 shadow-xl"
                    style={{
                      background: "rgba(10, 22, 55, 0.97)",
                      border: "1.5px solid rgba(100,150,220,0.25)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCode(c.code);
                          setValue("countryCode", c.code);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10",
                          selectedCode === c.code && "bg-white/10 text-white",
                        )}
                      >
                        <span>{c.flag}</span>
                        <span className="flex-1 text-left">{c.name}</span>
                        <span className="text-white/50">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3 — Email */}
            {step === 3 && (
              <OnboardingInput
                label="Enter your email id"
                type="email"
                placeholder="Email id"
                autoComplete="email"
                inputMode="email"
                autoFocus
                error={errors.email?.message}
                {...register("email", registerFormConfig.rules.email)}
              />
            )}

            {/* Step 4 — Password */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                <OnboardingInput
                  label="Enter password"
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="cursor-pointer"
                    >
                      <EyeIcon open={showPw} />
                    </button>
                  }
                  {...register("password", registerFormConfig.rules.password)}
                />
                <OnboardingInput
                  label="Confirm password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="cursor-pointer"
                    >
                      <EyeIcon open={showConfirm} />
                    </button>
                  }
                  {...register(
                    "confirmPassword",
                    registerFormConfig.rules.confirmPassword,
                  )}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      <BottomNextButton active={isStepValid} onClick={handleNext}>
        {step === 4 ? "Create account" : "Next"}
      </BottomNextButton>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}
