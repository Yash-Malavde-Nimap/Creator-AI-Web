'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import type { ForgotPasswordPayload } from '@/types/auth.types';

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
    onSuccess: (_data, variables) => {
      const encoded = encodeURIComponent(variables.email);
      router.push(`${ROUTES.VERIFY_OTP}?email=${encoded}`);
    },
  });
}
