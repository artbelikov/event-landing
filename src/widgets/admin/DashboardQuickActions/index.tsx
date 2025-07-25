import React from 'react';
import { IconPlus, IconSettings, IconUserCheck, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Group, Stack, Title } from '@mantine/core';

interface DashboardQuickActionsProps {
  className?: string;
}

export function DashboardQuickActions({ className }: DashboardQuickActionsProps) {
  const navigate = useNavigate();

  return (
    <Card withBorder padding="lg" radius="md" className={className}>
      <Group justify="apart" mb="md">
        <Title order={3}>Quick Actions</Title>
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
          Create New Conference
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
          Manage Guests
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
          Manage Users
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
          System Settings
        </Button>
      </Stack>
    </Card>
  );
}
