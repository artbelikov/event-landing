import { IconUserCheck, IconUsers } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Group, Paper, SimpleGrid, Text, Title } from '@mantine/core';

export function GuestManagementStats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: IconUsers,
      bg: 'blue.0',
      label: t('adminGuests.stats.totalGuests'),
    },
    {
      icon: IconUserCheck,
      bg: 'green.0',
      label: t('adminGuests.stats.recentRegistrations'),
    },
    {
      icon: IconUsers,
      bg: 'orange.0',
      label: t('adminGuests.stats.activeConferences'),
    },
    {
      icon: IconUserCheck,
      bg: 'violet.0',
      label: t('adminGuests.stats.thisWeek'),
    },
  ];

  return (
    <Paper p="md" withBorder mb="md">
      <Title order={4} mb="md">
        {t('adminGuests.stats.title', 'Guest Management Overview')}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map(({ icon: Icon, bg, label }) => (
          <Paper key={label as string} p="sm" withBorder bg={bg as any}>
            <Group gap="sm">
              <Icon size={24} />
              <div>
                <Text size="sm" c="dimmed">
                  {label}
                </Text>
                <Text fw={600}>--</Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <Text size="xs" c="dimmed" mt="sm">
        {t('adminGuests.stats.note')}
      </Text>
    </Paper>
  );
}
