import { z } from 'zod';

export const createApplySchema = (t: (key: string) => string) =>
  z.object({
    fullName: z
      .string()
      .min(1, t('forms:apply.validation.fullNameRequired'))
      .min(2, t('forms:apply.validation.fullNameMinLength')),
    email: z
      .string()
      .min(1, t('forms:apply.validation.emailRequired'))
      .email(t('forms:apply.validation.invalidEmail')),
    phone: z
      .string()
      .min(1, t('forms:apply.validation.phoneRequired'))
      .min(6, t('forms:apply.validation.phoneMinLength')),
    company: z.string().min(1, t('forms:apply.validation.companyRequired')),
    position: z.string().min(1, t('forms:apply.validation.positionRequired')),
    message: z
      .string()
      .min(1, t('forms:apply.validation.messageRequired'))
      .min(10, t('forms:apply.validation.messageMinLength')),
  });

export type ApplyFormData = z.infer<ReturnType<typeof createApplySchema>>;
