import React from 'react';
import { AppShell, Group, Text, Title } from '@mantine/core';
import { LogoutButton } from '@/features/auth/LogoutButton';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>{title}</Title>
          <LogoutButton />
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
