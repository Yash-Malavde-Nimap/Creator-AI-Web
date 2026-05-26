'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { LoginCredentials } from '@/types/auth.types';

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      authService.saveTokens(tokens);
      authService.saveUser(user);
      login(user, tokens);
      router.push(ROUTES.HOME);
    },
  });
}
