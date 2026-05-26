'use client';

import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINTS } from '@/constants/api';
import { QUERY_KEYS } from '@/constants/config';
import { api } from '@/services/api';
import { DashboardStats } from '@/features/dashboard/types';

export function useDashboardStats() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.STATS,
    queryFn: () => api.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS),
    select: (response) => response.data,
  });
}
