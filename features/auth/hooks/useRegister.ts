'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import type { RegisterCredentials } from '@/types/auth.types';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: () => {
      router.push(ROUTES.PLANS);
    },
  });
}
