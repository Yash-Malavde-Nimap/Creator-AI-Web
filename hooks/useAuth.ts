'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ROUTES } from '@/constants/routes';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const router = useRouter();
  const { user, tokens, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch {
      // Ignore logout API errors — always clear local session
    } finally {
      authService.clearSession();
      logout();
      router.push(ROUTES.LOGIN);
    }
  }, [logout, router, setLoading]);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
    role: user?.role,
  };
}
