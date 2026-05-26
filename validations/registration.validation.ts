import { z } from 'zod';

export const nameStepSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long'),
});

export const phoneStepSchema = z.object({
  countryCode: z.string().min(1, 'Country code required'),
  phone: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{6,15}$/, 'Enter a valid mobile number'),
});

export const emailStepSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
});

export const passwordStepSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type NameStepValues = z.infer<typeof nameStepSchema>;
export type PhoneStepValues = z.infer<typeof phoneStepSchema>;
export type EmailStepValues = z.infer<typeof emailStepSchema>;
export type PasswordStepValues = z.infer<typeof passwordStepSchema>;
