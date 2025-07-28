import { IconPlus, IconSettings, IconUserCheck, IconUsers } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Group, Stack, Title } from '@mantine/core';

interface DashboardQuickActionsProps {
  className?: string;
}

export function DashboardQuickActions({ className }: DashboardQuickActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card withBorder padding="lg" radius="md" className={className}>
      <Group justify="apart" mb="md">
        <Title order={3}>{t('dashboard.quickActions.title')}</Title>
      </Group>

      <Stack gap="sm">
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          color="blue"
          fullWidth
          onClick={() => {
            navigate('/admin/conferences/create');
          }}
        >
          {t('dashboard.quickActions.createConference')}
        </Button>

        <Button
          leftSection={<IconUserCheck size={16} />}
          variant="light"
          color="green"
          fullWidth
          onClick={() => {
            navigate('/admin/guests');
          }}
        >
          {t('dashboard.quickActions.manageGuests')}
        </Button>

        <Button
          leftSection={<IconUsers size={16} />}
          variant="light"
          color="orange"
          fullWidth
          onClick={() => {
            navigate('/admin/users');
          }}
        >
          {t('dashboard.quickActions.manageUsers')}
        </Button>

        <Button
          leftSection={<IconSettings size={16} />}
          variant="light"
          color="gray"
          fullWidth
          onClick={() => {
            navigate('/admin/settings');
          }}
        >
          {t('dashboard.quickActions.systemSettings')}
        </Button>
      </Stack>
    </Card>
  );
}
