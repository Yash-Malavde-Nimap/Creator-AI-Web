'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import { toast } from '@/lib/toast';
import type { ResetPasswordPayload } from '@/types/auth.types';

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authService.resetPassword(payload),
    onSuccess: () => {
      toast.success('Password reset successfully. Please sign in.');
      router.push(ROUTES.LOGIN);
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message ?? 'Failed to reset password. Please try again.');
    },
  });
}
