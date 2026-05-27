import { API_ENDPOINTS } from '@/constants/api';
import { STORAGE_KEYS } from '@/constants/config';
import { privateRequest } from '@/services/privateRequest';
import { publicRequest } from '@/services/publicRequest';
import type {
  AuthTokens,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordPayload,
  VerifyOtpPayload,
  User,
} from '@/types/auth.types';

export const authService = {
  // ── Public endpoints (no token required) ─────────────────────────────────
  login: (credentials: LoginCredentials) =>
    publicRequest.post<{ user: User; tokens: AuthTokens }>(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (credentials: RegisterCredentials) =>
    publicRequest.post<{ user: User; tokens: AuthTokens }>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    ),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    publicRequest.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload),

  verifyOtp: (payload: VerifyOtpPayload) =>
    publicRequest.post<{ token: string }>(API_ENDPOINTS.AUTH.VERIFY_OTP, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    publicRequest.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload),

  // ── Private endpoints (token required) ───────────────────────────────────
  logout: () => privateRequest.post(API_ENDPOINTS.AUTH.LOGOUT),

  getMe: () => privateRequest.get<User>(API_ENDPOINTS.AUTH.ME),

  // ── Local token management ────────────────────────────────────────────────
  saveTokens: (tokens: AuthTokens) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  },

  saveUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  isAuthenticated: (): boolean => Boolean(authService.getAccessToken()),
};
