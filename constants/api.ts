export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN:                       '/auth/login',
    REGISTER:                    '/auth/registration',
    LOGOUT:                      '/auth/logout',
    ME:                          '/auth/test',
    REGISTER_REQUEST_OTP:        '/auth/register/request-otp',
    REGISTER_VERIFY_OTP:         '/auth/register/verify-otp',
    FORGOT_PASSWORD_REQUEST_OTP: '/auth/forgot-password/request-otp',
    FORGOT_PASSWORD_VERIFY_OTP:  '/auth/forgot-password/verify-otp',
    RESET_PASSWORD:              '/auth/reset-password',
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
  },

  // Creators
  CREATORS: {
    BASE: '/creators',
    BY_ID: (id: string) => `/creators/${id}`,
  },

  // Campaigns
  CAMPAIGNS: {
    BASE: '/campaigns',
    BY_ID: (id: string) => `/campaigns/${id}`,
  },
} as const;

export const API_TIMEOUT = 30_000;
