import { toast as rht } from 'react-hot-toast';

const success = (message: string) =>
  rht.success(message, { duration: 3000 });

const error = (message: string) =>
  rht.error(message, { duration: 4000 });

const loading = (message: string) =>
  rht.loading(message);

const info = (message: string) =>
  rht(message, { icon: 'ℹ️', duration: 3000 });

const dismiss = (id?: string) =>
  rht.dismiss(id);

export const toast = {
  success,
  error,
  loading,
  info,
  dismiss,
};

/* ── Auth toasts ────────────────────────────────────────────────────────── */

export const authToasts = {
  loginSuccess: () => success('Welcome back!'),
  loginError: (msg?: string) => error(msg ?? 'Invalid email or password'),
  registerSuccess: () => success('Account created successfully!'),
  registerError: (msg?: string) => error(msg ?? 'Registration failed. Please try again.'),
  logoutSuccess: () => success('Logged out successfully'),
  sessionExpired: () => error('Your session has expired. Please sign in again.'),
  passwordResetSent: () => success('Password reset link sent to your email.'),
  passwordResetSuccess: () => success('Password updated successfully!'),
  otpSent: () => success('OTP sent successfully.'),
  otpError: (msg?: string) => error(msg ?? 'Invalid or expired OTP.'),
};

/* ── Generic API error handler ──────────────────────────────────────────── */

export const handleApiError = (message?: string) =>
  error(message ?? 'Something went wrong. Please try again.');
