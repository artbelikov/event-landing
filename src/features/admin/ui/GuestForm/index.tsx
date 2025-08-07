import { useTranslation } from 'react-i18next';
import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import { Guest } from '@/generated';
import { useGuestForm } from '@/entities/guest';
import { ConferenceSelector } from './ui/ConferenceSelector';
import { GuestPropertiesSection } from './ui/GuestPropertiesSection';

export interface GuestFormProps {
  guest?: Guest;
  preselectedConferenceId?: number;
  onSuccess?: (guest: Guest) => void;
  onCancel?: () => void;
}

export function GuestForm({ guest, preselectedConferenceId, onSuccess, onCancel }: GuestFormProps) {
  const { t } = useTranslation();
  const { form, isEdit, addProperty, removeProperty, handleSubmit, isFormValid } = useGuestForm({
    guest,
    preselectedConferenceId,
    onSuccess,
  });

  return (
    <Paper withBorder shadow="sm" p="xl" radius="md">
      <Title order={2} mb="lg">
        {isEdit ? t('adminGuests.form.editTitle') : t('adminGuests.form.title')}
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <ConferenceSelector form={form} disabled={!!preselectedConferenceId} />

          <GuestPropertiesSection
            form={form}
            onAddProperty={addProperty}
            onRemoveProperty={removeProperty}
          />

          <Group justify="flex-end" mt="xl">
            {onCancel && (
              <Button variant="subtle" onClick={onCancel}>
                {t('adminGuests.buttons.cancel')}
              </Button>
            )}

            <Button type="submit" loading={form.submitting} disabled={!isFormValid()}>
              {isEdit ? t('adminGuests.form.updateGuest') : t('adminGuests.form.registerGuest')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
