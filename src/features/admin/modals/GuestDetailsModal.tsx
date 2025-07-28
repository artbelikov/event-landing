import { useTranslation } from 'react-i18next';
import { Badge, Group, Paper, Stack, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import type { Guest } from '@/api-client';

interface InnerProps {
  guest: Guest;
}

export function GuestDetailsModal({ context, id, innerProps }: ContextModalProps<InnerProps>) {
  const { t } = useTranslation();
  const { guest } = innerProps;

  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        <Stack gap="sm">
          <Group justify="apart">
            <Text fw={600} size="lg">
              {t('adminGuests.details.guestTitle', { id: guest.id })}
            </Text>
            <Badge variant="light" color="blue">
              {t('adminGuests.details.conferenceId', { id: guest.conferenceId })}
            </Badge>
          </Group>

          <Group gap="xl" mt="md">
            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminGuests.details.registrationDate')}
              </Text>
              <Text>{new Date(guest.createdAt).toLocaleString()}</Text>
            </div>

            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminGuests.details.conferenceIdLabel')}
              </Text>
              <Text>{guest.conferenceId}</Text>
            </div>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
