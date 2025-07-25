import { useEffect } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Conference, ConferenceService, ConferenceStatus } from '@/api-client';

const schema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .transform((val) => val.trim()),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .transform((val) => val.trim()),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  place: z
    .string()
    .min(1, 'Place is required')
    .transform((val) => val.trim()),
  headliner: z
    .string()
    .min(1, 'Headliner is required')
    .transform((val) => val.trim()),
  status: z.nativeEnum(ConferenceStatus),
  formId: z.string().min(1, 'Form ID is required'),
  ownerId: z.string().min(1, 'Owner ID is required'),
});

export type ConferenceFormValues = z.infer<typeof schema>;

interface Props {
  conference?: Conference;
  onSuccess?: (conference: Conference) => void;
}

export function useConferenceForm({ conference, onSuccess }: Props = {}) {
  const isEdit = !!conference;

  const form = useForm<ConferenceFormValues>({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      place: '',
      headliner: '',
      status: 'ACTIVE' as ConferenceStatus,
      formId: '',
      ownerId: '',
    },
  });

  useEffect(() => {
    if (conference) {
      form.setValues({
        name: conference.name,
        description: conference.description,
        startDate: new Date(conference.startDate),
        endDate: new Date(conference.endDate),
        place: conference.place,
        headliner: conference.headliner,
        status: conference.status,
        formId: conference.formId.toString(),
        ownerId: conference.ownerId.toString(),
      });
    }
  }, [conference]);

  const handleSubmit = async (values: ConferenceFormValues) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        startDate: (values.startDate as Date).toISOString(),
        endDate: (values.endDate as Date).toISOString(),
        place: values.place,
        headliner: values.headliner,
        status: values.status,
        formId: parseInt(values.formId),
        ownerId: parseInt(values.ownerId),
      };

      const result = isEdit
        ? await ConferenceService.conferenceControllerUpdate(conference!.id.toString(), payload)
        : await ConferenceService.conferenceControllerCreate(payload);

      notifications.show({
        title: isEdit ? 'Conference Updated' : 'Conference Created',
        message: `Conference has been successfully ${isEdit ? 'updated' : 'created'}`,
        color: 'green',
      });

      onSuccess?.(result);
    } catch (error: any) {
      notifications.show({
        title: isEdit ? 'Update Failed' : 'Creation Failed',
        message: error?.message || 'An unexpected error occurred',
        color: 'red',
      });
    }
  };

  return { form, isEdit, onSubmit: handleSubmit };
}
