'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import { toast } from '@/lib/toast';
import type { VerifyOtpPayload } from '@/types/auth.types';

export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: (response) => {
      const token = response.data.token;
      router.push(`${ROUTES.RESET_PASSWORD}?token=${encodeURIComponent(token)}`);
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message ?? 'Invalid or expired OTP. Please try again.');
    },
  });
}
