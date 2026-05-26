export const ROUTES = {
  // Public / onboarding
  WELCOME: '/welcome',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  PLANS: '/plans',

  // Protected routes
  HOME: '/home',
  SOCIAL_MEDIA: '/social-media',
  PROFILE: '/profile',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const PUBLIC_ROUTES: AppRoute[] = [
  ROUTES.WELCOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.VERIFY_OTP,
  ROUTES.RESET_PASSWORD,
  ROUTES.PLANS,
];

export const AUTH_ROUTES: AppRoute[] = [ROUTES.LOGIN, ROUTES.REGISTER];
