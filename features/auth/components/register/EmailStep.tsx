'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { useRegistrationStore } from '@/store/registration.store';
import { emailStepSchema, EmailStepValues } from '@/validations/registration.validation';

interface EmailStepProps {
  onNext: () => void;
}

export function EmailStep({ onNext }: EmailStepProps) {
  const { email, setEmail } = useRegistrationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailStepValues>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email },
  });

  const onSubmit = (data: EmailStepValues) => {
    setEmail(data.email);
    onNext();
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-2 text-base font-semibold text-white">Enter your email id</div>
      <OnboardingInput
        type="email"
        placeholder="email id"
        autoComplete="email"
        inputMode="email"
        autoFocus
        error={errors.email?.message}
        {...register('email')}
      />
    </form>
  );
}
