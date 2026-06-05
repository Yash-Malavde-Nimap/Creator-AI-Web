'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import { toast } from '@/lib/toast';
import type { ForgotPasswordPayload } from '@/types/auth.types';

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
    onSuccess: (_data, variables) => {
      toast.success('OTP sent to your email.');
      router.push(`${ROUTES.VERIFY_OTP}?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message ?? 'Failed to send OTP. Please try again.');
    },
  });
}
