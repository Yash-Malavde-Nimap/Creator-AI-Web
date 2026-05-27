import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface OnboardingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  wrapperClassName?: string;
}

export const OnboardingInput = forwardRef<
  HTMLInputElement,
  OnboardingInputProps
>(
  (
    {
      label,
      error,
      leftSlot,
      rightSlot,
      className,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <p className="mb-2 text-base font-semibold text-[#D7E2FF] text-center">
            {label}
          </p>
        )}
        <div className="relative flex items-center">
          {leftSlot && (
            <div className="absolute left-5 flex items-center gap-1.5 text-white/70">
              {leftSlot}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "sb-input w-full bg-[#0A152F] rounded-full py-4 text-base placeholder:text-[#8299CF]",
              leftSlot ? "pl-20 pr-5" : "px-6",
              rightSlot ? "pr-14" : "",
              className,
            )}
            {...props}
          />

          {rightSlot && (
            <div className="absolute right-5 flex items-center text-white/60">
              {rightSlot}
            </div>
          )}
        </div>

        {error && <p className="mt-2 pl-4 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

OnboardingInput.displayName = "OnboardingInput";
