import { useState } from 'react';
import { IconList, IconPlus, IconSettings } from '@tabler/icons-react';
import { Button, Container, Group, Paper, Stack, Tabs, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { Conference } from '@/api-client';
import { ConferenceList } from '@/features/admin';
import { MODAL_KEYS } from '@/shared/constants';

export function AdminConferencesPage() {
  const [activeTab, setActiveTab] = useState<string | null>('list');
  const openDetailsModal = (conference: Conference) => {
    modals.openContextModal({
      modal: MODAL_KEYS.CONFERENCE_DETAILS,
      innerProps: { conference },
    });
  };

  const openCreateModal = () => {
    modals.openContextModal({
      modal: MODAL_KEYS.CONFERENCE_CREATE,
      innerProps: {},
    });
  };

  const handleConferenceSelect = (conference: Conference) => {
    openDetailsModal(conference);
  };

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>Conference Management</Title>
          <Text c="dimmed" size="sm">
            Create, manage, and view all conferences in your system
          </Text>
        </div>

        <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal} size="md">
          Create Conference
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="list" leftSection={<IconList size={16} />}>
            All Conferences
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="list" pt="md">
          <ConferenceList onConferenceSelect={handleConferenceSelect} />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="md">
          <Paper p="xl" withBorder>
            <Stack gap="md" align="center">
              <IconSettings size={48} color="gray" />
              <Title order={3}>Conference Settings</Title>
              <Text c="dimmed" ta="center">
                Conference-related settings and configurations will be available here. This could
                include default form templates, email notifications, and other administrative
                options.
              </Text>
              <Button variant="light" disabled>
                Coming Soon
              </Button>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
