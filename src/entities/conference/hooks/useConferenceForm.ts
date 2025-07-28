import { useEffect, useState } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Conference, ConferenceService, ConferenceStatus, EventDateType } from '@/api-client';
import { createConferenceSchema, type ConferenceFormData } from '../model/validation';

interface Props {
  conference?: Conference;
  onSuccess?: (conference: Conference) => void;
}

export function useConferenceForm({ conference, onSuccess }: Props = {}) {
  const { t } = useTranslation();
  const isEdit = !!conference;
  const conferenceSchema = createConferenceSchema(t);
  const [blocks, setBlocks] = useState<any[]>([]);

  const form = useForm<ConferenceFormData>({
    validate: zodResolver(conferenceSchema),
    initialValues: {
      name: '',
      description: '',
      eventDates: [{ type: EventDateType.SINGLE, date: new Date() }],
      place: '',
      customUrl: '',
      status: ConferenceStatus.INACTIVE,
    },
  });

  useEffect(() => {
    if (conference) {
      form.setValues({
        name: conference.name,
        description: conference.description,
        eventDates:
          (conference as any).eventDates.map((d: any) => ({
            ...d,
            date: d.date ? new Date(d.date) : undefined,
            from: d.from ? new Date(d.from) : undefined,
            to: d.to ? new Date(d.to) : undefined,
          })) ?? [],
        place: conference.place,
        customUrl: conference.customUrl ?? '',
        status: conference.status,
      });
      setBlocks((conference as any).pageBlocks ?? []);
    }
  }, [conference]);

  const handleSubmit = async (values: ConferenceFormData) => {
    try {
      const payload = {
        ...values,
        eventDates: values.eventDates.map((d) =>
          d.type === EventDateType.SINGLE
            ? { type: EventDateType.SINGLE, date: d.date.toISOString() }
            : {
                type: EventDateType.PERIOD,
                from: d.from.toISOString(),
                to: d.to ? d.to.toISOString() : undefined,
              }
        ),
        pageBlocks: blocks,
      };

      const result = isEdit
        ? await ConferenceService.conferenceControllerUpdate(
            conference!.id.toString(),
            payload as any
          )
        : await ConferenceService.conferenceControllerCreate(payload as any);

      notifications.show({
        title: t(
          isEdit
            ? 'adminConferences.notifications.updateSuccessTitle'
            : 'adminConferences.notifications.createSuccessTitle'
        ),
        message: t(
          isEdit
            ? 'adminConferences.notifications.updateSuccessMessage'
            : 'adminConferences.notifications.createSuccessMessage'
        ),
        color: 'green',
      });

      onSuccess?.(result);
    } catch (error: any) {
      notifications.show({
        title: t(
          isEdit
            ? 'adminConferences.notifications.updateErrorTitle'
            : 'adminConferences.notifications.createErrorTitle'
        ),
        message: error?.body?.message || t('common.errors.unexpected'),
        color: 'red',
      });
    }
  };

  return { form, isEdit, onSubmit: handleSubmit, blocks, setBlocks };
}
