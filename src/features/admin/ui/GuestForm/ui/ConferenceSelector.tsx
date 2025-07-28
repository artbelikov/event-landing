import { useTranslation } from 'react-i18next';
import { Group, Loader, Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useConferencesList } from '@/entities/conference';

interface FormValues {
  conferenceId: string;
  properties: any[];
}

interface ConferenceSelectorProps {
  form: UseFormReturnType<FormValues>;
  disabled?: boolean;
}

export function ConferenceSelector({ form, disabled }: ConferenceSelectorProps) {
  const { t } = useTranslation();
  const { data: conferences, isLoading, error } = useConferencesList({});

  const formatConferenceDate = (eventDates: any[]) => {
    if (!eventDates || eventDates.length === 0) return '';

    const firstDate = eventDates[0];
    if (firstDate.type === EventDateType.SINGLE && firstDate.date) {
      return new Date(firstDate.date).toLocaleDateString();
    }
    if (firstDate.type === EventDateType.PERIOD && firstDate.from) {
      return new Date(firstDate.from).toLocaleDateString();
    }
    return '';
  };

  const conferenceOptions =
    conferences?.map((conference) => ({
      value: conference.id.toString(),
      label: `${conference.name} (${formatConferenceDate((conference as any).eventDates)})`,
    })) || [];

  if (isLoading) {
    return (
      <Group gap="sm">
        <Loader size="sm" />
        <Text size="sm">{t('adminGuests.form.loadingConferences')}</Text>
      </Group>
    );
  }

  if (error) {
    return (
      <Text size="sm" c="red">
        {t('adminGuests.form.errorLoadingConferences')}
      </Text>
    );
  }

  return (
    <Select
      label={t('adminGuests.form.conference')}
      placeholder={t('adminGuests.form.selectConference')}
      required
      data={conferenceOptions}
      disabled={disabled}
      searchable
      {...form.getInputProps('conferenceId')}
    />
  );
}
