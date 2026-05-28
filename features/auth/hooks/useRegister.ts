'use client';

import { useMutation } from '@tanstack/react-query';

import { authService } from '@/services/auth.service';
import { authToasts } from '@/lib/toast';
import type { RegisterCredentials } from '@/types/auth.types';

export function useRegister() {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: (response) => {
      authService.saveTokens(response.data.tokens);
      authService.saveUser(response.data.user);
      authToasts.registerSuccess();
      // router.push(ROUTES.PLANS);
    },
  });
}
