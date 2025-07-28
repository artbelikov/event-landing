import { useTranslation } from 'react-i18next';
import { Badge, Group, Paper, Stack, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import type { Conference } from '@/api-client';

interface InnerProps {
  conference: Conference;
}

export function ConferenceDetailsModal({ context, id, innerProps }: ContextModalProps<InnerProps>) {
  const { t } = useTranslation();
  const { conference } = innerProps;
  const dates = (conference as any).eventDates ?? [];
  const isDatesConfigured = Array.isArray(dates) && dates.length > 0;

  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        <Stack gap="sm">
          <Group justify="apart">
            <Text fw={600} size="lg">
              {conference.name}
            </Text>
            <Badge color={conference.status === 'ACTIVE' ? 'green' : 'gray'} variant="light">
              {t(`adminConferences.status.${conference.status.toLowerCase()}`)}
            </Badge>
          </Group>

          <Text c="dimmed">{conference.description}</Text>

          <Stack gap="sm" mt="md">
            {isDatesConfigured ? (
              dates.map((d: any) => (
                <Group key={d.id} gap="xl">
                  <div>
                    <Text size="sm" fw={500} c="dimmed">
                      {d.type === EventDateType.SINGLE
                        ? t('adminConferences.table.date')
                        : t('adminConferences.table.from')}
                    </Text>
                    <Text>
                      {new Date(d.type === EventDateType.SINGLE ? d.date : d.from).toLocaleString()}
                    </Text>
                  </div>
                  {d.type === EventDateType.PERIOD && (
                    <div>
                      <Text size="sm" fw={500} c="dimmed">
                        {t('adminConferences.table.to')}
                      </Text>
                      <Text>{d.to ? new Date(d.to).toLocaleString() : '-'}</Text>
                    </div>
                  )}
                </Group>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                {t('adminConferences.table.noDates')}
              </Text>
            )}
          </Stack>

          <Group gap="xl" mt="sm">
            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminConferences.table.place')}
              </Text>
              <Text>{conference.place}</Text>
            </div>

            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminConferences.table.headliner')}
              </Text>
              <Text>{conference.headliner}</Text>
            </div>
          </Group>

          <Group gap="xl" mt="sm">
            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminConferences.details.formId')}
              </Text>
              <Text>{conference.formId}</Text>
            </div>

            <div>
              <Text size="sm" fw={500} c="dimmed">
                {t('adminConferences.details.ownerId')}
              </Text>
              <Text>{conference.ownerId}</Text>
            </div>
          </Group>

          <div>
            <Text size="sm" fw={500} c="dimmed">
              {t('adminConferences.table.created')}
            </Text>
            <Text size="sm">{new Date(conference.createdAt).toLocaleString()}</Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
