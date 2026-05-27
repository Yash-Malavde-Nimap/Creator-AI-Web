export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type OtpFormValues = {
  code: string;
};

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};
