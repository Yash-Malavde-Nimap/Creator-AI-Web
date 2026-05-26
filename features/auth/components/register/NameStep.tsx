'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { OnboardingInput } from '@/components/onboarding/OnboardingInput';
import { useRegistrationStore } from '@/store/registration.store';
import { nameStepSchema, NameStepValues } from '@/validations/registration.validation';

interface NameStepProps {
  onNext: () => void;
}

export function NameStep({ onNext }: NameStepProps) {
  const { name, setName } = useRegistrationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameStepValues>({
    resolver: zodResolver(nameStepSchema),
    defaultValues: { name },
  });

  const onSubmit = (data: NameStepValues) => {
    setName(data.name);
    onNext();
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-2 text-base font-semibold text-white">Enter your full name</div>
      <OnboardingInput
        placeholder="full name"
        autoComplete="name"
        autoFocus
        error={errors.name?.message}
        {...register('name')}
      />
    </form>
  );
}
