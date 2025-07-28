import { z } from 'zod';
import { ConferenceStatus, EventDateType } from '@/api-client';

export const createConferenceSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(3, t('adminConferences.form.validation.nameMinLength'))
      .transform((val) => val.trim()),
    description: z
      .string()
      .min(10, t('adminConferences.form.validation.descriptionMinLength'))
      .transform((val) => val.trim()),
    eventDates: z
      .array(
        z.discriminatedUnion('type', [
          z.object({
            type: z.literal(EventDateType.SINGLE),
            date: z.date({
              required_error: t('adminConferences.form.validation.dateRequired'),
            }),
          }),
          z.object({
            type: z.literal(EventDateType.PERIOD),
            from: z.date({
              required_error: t('adminConferences.form.validation.dateRequired'),
            }),
            to: z.date().optional(),
          }),
        ])
      )
      .min(1, t('adminConferences.form.validation.atLeastOneDate')),
    place: z
      .string()
      .min(1, t('adminConferences.form.validation.placeRequired'))
      .transform((val) => val.trim()),
    customUrl: z
      .string()
      .transform((val) => val.trim())
      .optional(),
    status: z.nativeEnum(ConferenceStatus),
  });

export type ConferenceFormData = z.infer<ReturnType<typeof createConferenceSchema>>;
