import { API_ENDPOINTS } from "@/constants/api";
import { STORAGE_KEYS } from "@/constants/config";
import { privateRequest } from "@/services/privateRequest";
import { publicRequest } from "@/services/publicRequest";
import type {
  AuthTokens,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordPayload,
  VerifyOtpPayload,
  User,
} from "@/types/auth.types";

// ── Public endpoints (no token required) ─────────────────────────────────────

function login(credentials: LoginCredentials) {
  return publicRequest.post<{ user: User; tokens: AuthTokens }>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
  );
}

function register(credentials: RegisterCredentials) {
  return publicRequest.post<{ user: User; tokens: AuthTokens }>(
    API_ENDPOINTS.AUTH.REGISTER,
    credentials,
  );
}

function registerRequestOtp(payload: { number: string }) {
  return publicRequest.post(API_ENDPOINTS.AUTH.REGISTER_REQUEST_OTP, payload);
}

function registerVerifyOtp(payload: { number: string; otp: string }) {
  return publicRequest.post(API_ENDPOINTS.AUTH.REGISTER_VERIFY_OTP, payload);
}

function forgotPassword(payload: ForgotPasswordPayload) {
  return publicRequest.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_REQUEST_OTP, payload);
}

function verifyOtp(payload: VerifyOtpPayload) {
  return publicRequest.post<{ token: string }>(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
    payload,
  );
}

function resetPassword(payload: ResetPasswordPayload) {
  return publicRequest.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
}

// ── Private endpoints (token required) ───────────────────────────────────────

function logout() {
  return privateRequest.post(API_ENDPOINTS.AUTH.LOGOUT);
}

function getMe() {
  return privateRequest.get<User>(API_ENDPOINTS.AUTH.ME);
}

// ── Local token management ────────────────────────────────────────────────────

function saveTokens(tokens: AuthTokens) {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  // Mirror access token to a cookie so the server-side middleware can read it.
  document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=${tokens.accessToken}; path=/; SameSite=Lax`;
}

function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=; path=/; max-age=0`;
}

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  // Prefer localStorage; fall back to cookie for cases where localStorage
  // was cleared but the cookie is still present (e.g. a new tab).
  return (
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ??
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${STORAGE_KEYS.ACCESS_TOKEN}=`))
      ?.split("=")[1] ??
    null
  );
}

function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

// ── Exported service ──────────────────────────────────────────────────────────

export const authService = {
  login,
  register,
  registerRequestOtp,
  registerVerifyOtp,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
  getMe,
  saveTokens,
  saveUser,
  clearSession,
  getStoredUser,
  getAccessToken,
  isAuthenticated,
};
