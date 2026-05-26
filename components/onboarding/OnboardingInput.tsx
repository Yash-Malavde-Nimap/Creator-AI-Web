import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface OnboardingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  wrapperClassName?: string;
}

/**
 * Dark pill-shaped input matching the SocialBeat onboarding design.
 * Features: translucent navy background, soft border, glowing focus ring.
 */
export const OnboardingInput = forwardRef<HTMLInputElement, OnboardingInputProps>(
  ({ error, leftSlot, rightSlot, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('w-full', wrapperClassName)}>
        <div className="relative flex items-center">
          {leftSlot && (
            <div className="absolute left-5 flex items-center gap-1.5 text-white/70">
              {leftSlot}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'sb-input w-full rounded-full py-4 text-base',
              leftSlot ? 'pl-20 pr-5' : 'px-6',
              rightSlot ? 'pr-14' : '',
              className
            )}
            {...props}
          />

          {rightSlot && (
            <div className="absolute right-5 flex items-center text-white/60">{rightSlot}</div>
          )}
        </div>

        {error && <p className="mt-2 pl-4 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

OnboardingInput.displayName = 'OnboardingInput';
