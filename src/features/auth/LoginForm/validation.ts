import { z } from 'zod';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t('auth:validation.emailRequired'))
      .email(t('auth:validation.invalidEmail')),
    password: z
      .string()
      .min(1, t('auth:validation.passwordRequired'))
      .min(6, t('auth:validation.passwordMinLength')),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
