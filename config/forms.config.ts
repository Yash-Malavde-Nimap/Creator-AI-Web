import type { RegisterFormValues, ResetPasswordFormValues } from '@/types/forms.types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{6,15}$/;
const OTP_PATTERN = /^\d{6}$/;

export const loginFormConfig = {
  defaultValues: { email: '', password: '' },
  rules: {
    email: {
      required: 'Email is required',
      pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
    },
    password: {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password must be at least 6 characters' },
    },
  },
};

export const registerFormConfig = {
  defaultValues: {
    name: '',
    phone: '',
    countryCode: '+1',
    email: '',
    password: '',
    confirmPassword: '',
  },
  rules: {
    name: {
      required: 'Full name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' },
      maxLength: { value: 60, message: 'Name is too long' },
    },
    countryCode: { required: 'Country code required' },
    phone: {
      required: 'Mobile number is required',
      pattern: { value: PHONE_PATTERN, message: 'Enter a valid mobile number' },
    },
    email: {
      required: 'Email is required',
      pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
    },
    password: {
      required: 'Password is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value: string, formValues: RegisterFormValues) =>
        value === formValues.password || 'Passwords do not match',
    },
  },
};

export const forgotPasswordConfig = {
  defaultValues: { email: '' },
  rules: {
    email: {
      required: 'Email is required',
      pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
    },
  },
};

export const otpConfig = {
  defaultValues: { code: '' },
  rules: {
    code: {
      required: 'Enter the 6-digit code',
      minLength: { value: 6, message: 'Enter the 6-digit code' },
      maxLength: { value: 6, message: 'Code must be exactly 6 digits' },
      pattern: { value: OTP_PATTERN, message: 'Code must contain only digits' },
    },
  },
};

export const resetPasswordConfig = {
  defaultValues: { password: '', confirmPassword: '' },
  rules: {
    password: {
      required: 'Password is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value: string, formValues: ResetPasswordFormValues) =>
        value === formValues.password || 'Passwords do not match',
    },
  },
};
