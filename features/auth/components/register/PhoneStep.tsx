'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { cn } from '@/lib/utils';
import { useRegistrationStore } from '@/store/registration.store';
import { phoneStepSchema, PhoneStepValues } from '@/validations/registration.validation';

const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+65', flag: '🇸🇬', name: 'SG' },
];

interface PhoneStepProps {
  onNext: () => void;
}

export function PhoneStep({ onNext }: PhoneStepProps) {
  const { phone, countryCode, setPhone } = useRegistrationStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(countryCode);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhoneStepValues>({
    resolver: zodResolver(phoneStepSchema),
    defaultValues: { phone, countryCode },
  });

  const onSubmit = (data: PhoneStepValues) => {
    setPhone(data.phone, data.countryCode);
    onNext();
  };

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setValue('countryCode', code);
    setDropdownOpen(false);
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-2 text-base font-semibold text-white">Enter your mobile number</div>

      <div className="relative">
        <OnboardingInput
          type="tel"
          placeholder="mobile number"
          autoComplete="tel-national"
          inputMode="numeric"
          error={errors.phone?.message ?? errors.countryCode?.message}
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
          {...register('phone')}
        />

        {/* Country code dropdown */}
        {dropdownOpen && (
          <div
            className={cn(
              'absolute left-0 top-full z-50 mt-2 w-48 overflow-y-scroll h-40 rounded-xl py-1 shadow-xl',
            )}
            style={{
              background: 'rgba(10, 22, 55, 0.97)',
              border: '1.5px solid rgba(100,150,220,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {COUNTRY_CODES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCodeSelect(c.code)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10',
                  selectedCode === c.code && 'bg-white/10 text-white'
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
    </form>
  );
}
