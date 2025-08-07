import { useEffect, useState } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Conference, ConferenceStatus, EventDateType, EventDate, apiClient } from '@/generated';
import type { PageBlock } from '@/features/admin/modals/PageBlockEditorModal';
import { createConferenceSchema, type ConferenceFormData } from '../model/validation';

interface Props {
  conference?: Conference;
  onSuccess?: (conference: Conference) => void;
}

export function useConferenceForm({ conference, onSuccess }: Props = {}) {
  const { t } = useTranslation();
  const isEdit = !!conference;
  const conferenceSchema = createConferenceSchema(t);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);

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
          conference.eventDates?.map((d: EventDate) => {
            if (d.type === EventDateType.SINGLE) {
              return {
                type: EventDateType.SINGLE,
                date: d.date ? new Date(d.date) : new Date(),
              };
            } else {
              return {
                type: EventDateType.PERIOD,
                from: d.from ? new Date(d.from) : new Date(),
                to: d.to ? new Date(d.to) : undefined,
              };
            }
          }) ?? [],
        place: conference.place,
        customUrl: conference.customUrl ?? '',
        status: conference.status,
      });
      setBlocks(conference.pageBlocks ?? []);
    }
  }, [conference]);

  const handleSubmit = async (values: ConferenceFormData) => {
    try {
      const payload = {
        ...values,
        eventDates: values.eventDates.map((d) =>
          d.type === EventDateType.SINGLE
            ? JSON.stringify({ type: EventDateType.SINGLE, date: d.date.toISOString() })
            : JSON.stringify({
              type: EventDateType.PERIOD,
              from: d.from.toISOString(),
              to: d.to ? d.to.toISOString() : undefined,
            })
        ),
        pageBlocks: blocks.map(block => block.id.toString()),
        images: [],
        guests: [],
      };

      const result = isEdit
        ? await apiClient.updateConference(conference!.id, { ...payload, id: conference.id })
        : await apiClient.createConference(payload);

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
    } catch (error: unknown) {
      notifications.show({
        title: t(
          isEdit
            ? 'adminConferences.notifications.updateErrorTitle'
            : 'adminConferences.notifications.createErrorTitle'
        ),
        message: (error as { body?: { message?: string } })?.body?.message || t('common.errors.unexpected'),
        color: 'red',
      });
    }
  };

  return { form, isEdit, onSubmit: handleSubmit, blocks, setBlocks };
}
