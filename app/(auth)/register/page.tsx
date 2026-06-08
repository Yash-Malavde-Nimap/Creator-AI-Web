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
import { COUNTRY_CODES } from "@/constants/countryCodes";
import { useRegistrationStore } from "@/store/registration.store";
import { authService } from "@/services/auth.service";
import { toast } from "@/lib/toast";
import type { RegisterFormValues } from "@/types/forms.types";


const STEP_FIELDS: Record<1 | 2 | 3 | 4, (keyof RegisterFormValues)[]> = {
  1: ["name"],
  2: ["phone", "countryCode"],
  3: ["email"],
  4: ["password", "confirmPassword"],
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const raw  = Number(searchParams.get("step"));
  const step = raw >= 1 && raw <= 4 ? (raw as 1 | 2 | 3 | 4) : 1;

  const { setRegistrationData } = useRegistrationStore();

  // OTP sub-step state (lives between step 2 and step 3)
  const [otpSent,        setOtpSent]        = useState(false);
  const [otpCode,        setOtpCode]        = useState("");
  const [isSendingOtp,   setIsSendingOtp]   = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [selectedCode,  setSelectedCode]  = useState(registerFormConfig.defaultValues.countryCode);
  const [showPw,        setShowPw]        = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);

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

  const values      = watch();
  const isStepValid = STEP_FIELDS[step].every((f) => !!values[f] && !errors[f]);
  // const fullNumber  = `${Number(values.countryCode)}${values.phone}`;
  const fullNumber  = `${values.phone}`;

  /* ── Request OTP after step 2 ─────────────────────────────────────────── */
  const handleRequestOtp = async () => {
    const valid = await trigger(STEP_FIELDS[2]);
    if (!valid) return;
    setIsSendingOtp(true);
    try {
      const res = await authService.registerRequestOtp({ number: fullNumber });
      if (res?.success) {
        setOtpSent(true);
        setOtpCode("");
      } 
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  /* ── Verify OTP then advance to step 3 ───────────────────────────────── */
  const handleVerifyOtp = async () => {
    if (otpCode.length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const res = await authService.registerVerifyOtp({ number: fullNumber, otp: otpCode });
      if (res?.success) {
        setOtpSent(false);
        router.push(`${ROUTES.REGISTER}?step=3`);
      } else {
        toast.error(res?.message ?? "Invalid or expired OTP. Please try again.");
      }
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? "Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  /* ── Normal step navigation / final submission ────────────────────────── */
  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;

    if (step === 2) {
      // Trigger OTP flow instead of advancing directly
      await handleRequestOtp();
      return;
    }

    if (step < 4) {
      router.push(`${ROUTES.REGISTER}?step=${step + 1}`);
      return;
    }

    // Step 4 — final registration
    setRegistrationData({
      name:        values.name,
      phone:       values.phone,
      countryCode: values.countryCode,
      email:       values.email,
      password:    values.password,
    });
    setIsSubmitting(true);
    try {
      const res = await authService.register({
        name:     values.name,
        number:   fullNumber,
        email:    values.email,
        password: values.password,
      });
      if (res?.success) {
        authService.saveTokens(res.data.tokens);
        authService.saveUser(res.data.user);
        router.push(ROUTES.HOME);
      } else {
        toast.error(res?.message ?? "Registration failed. Please try again.");
      }
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── The dot indicator treats the OTP screen as still on step 2 ───────── */
  const displayStep = otpSent ? 2 : step;

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
                  width: s === displayStep ? 24 : 6,
                  background:
                    s === displayStep
                      ? "linear-gradient(90deg, #4a9fd5, #e8a020)"
                      : s < displayStep
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Step fields */}
          <div className="mt-5 w-full">

            {/* Step 1 — Name */}
            {step === 1 && !otpSent && (
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
            {step === 2 && !otpSent && (
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
                      <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
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
                        key={c.iso}
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

            {/* Step 2 — OTP verification sub-step */}
            {otpSent && (
              <div className="flex flex-col gap-4">
                <p className="text-center text-sm text-white/60">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-white">{fullNumber}</span>
                </p>
                <OnboardingInput
                  label="Enter the 6-digit OTP"
                  type="text"
                  placeholder="000000"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isSendingOtp}
                  className="text-sm text-sb-blue hover:text-[#6db8e8] disabled:opacity-50"
                >
                  {isSendingOtp ? "Sending…" : "Resend OTP"}
                </button>
              </div>
            )}

            {/* Step 3 — Email */}
            {step === 3 && !otpSent && (
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
            {step === 4 && !otpSent && (
              <div className="flex flex-col gap-6">
                <OnboardingInput
                  label="Enter password"
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw((p) => !p)} className="cursor-pointer">
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
                    <button type="button" onClick={() => setShowConfirm((p) => !p)} className="cursor-pointer">
                      <EyeIcon open={showConfirm} />
                    </button>
                  }
                  {...register("confirmPassword", registerFormConfig.rules.confirmPassword)}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      {otpSent ? (
        <BottomNextButton
          active={otpCode.length === 6 && !isVerifyingOtp}
          loading={isVerifyingOtp}
          onClick={handleVerifyOtp}
        >
          Verify
        </BottomNextButton>
      ) : (
        <BottomNextButton
          active={isStepValid && !isSubmitting && !isSendingOtp}
          loading={isSubmitting || isSendingOtp}
          onClick={handleNext}
        >
          {step === 4 ? "Create account" : "Next"}
        </BottomNextButton>
      )}
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
