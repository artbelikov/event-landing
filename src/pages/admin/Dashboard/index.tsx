import React from 'react';
import { IconSettings, IconUsers } from '@tabler/icons-react';
import { ActionIcon, Box, Container, Grid, Group, Menu, Text, Title } from '@mantine/core';
import { AdminLayout } from '@/shared/ui/AdminLayout';
import { DashboardQuickActions, DashboardStats } from '@/widgets';
import { RecentConferences } from '@/widgets/public/RecentConferences';

export function DashboardPage() {
  return (
    <AdminLayout title="Admin Dashboard">
      <Container size="xl" p="md">
        <Group justify="apart" mb="xl">
          <div>
            <Title order={1}>Admin Dashboard</Title>
            <Text c="dimmed" size="sm">
              Overview of your event management system
            </Text>
          </div>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" size="lg">
                <IconSettings size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUsers size={14} />}>User Management</Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />}>System Settings</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Box mb="xl">
          <DashboardStats />
        </Box>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <RecentConferences />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <DashboardQuickActions />
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
}
