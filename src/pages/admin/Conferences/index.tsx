import React, { useState } from 'react';
import {
  IconCalendarEvent,
  IconEye,
  IconInfoCircle,
  IconList,
  IconPlus,
  IconSettings,
} from '@tabler/icons-react';
import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { Conference } from '@/api-client';
import { ConferenceForm } from '@/features/admin/ui/ConferenceForm';
import { ConferenceList } from '@/features/admin/ui/ConferenceList';

interface ConferenceDetailsModalProps {
  conference: Conference | null;
  opened: boolean;
  onClose: () => void;
}

function ConferenceDetailsModal({ conference, opened, onClose }: ConferenceDetailsModalProps) {
  if (!conference) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconEye size={20} />
          <Text fw={500}>Conference Details</Text>
        </Group>
      }
      size="lg"
    >
      <Stack gap="md">
        <Paper p="md" withBorder>
          <Stack gap="sm">
            <Group justify="apart">
              <Text fw={600} size="lg">
                {conference.name}
              </Text>
              <Badge color={conference.status === 'ACTIVE' ? 'green' : 'gray'} variant="light">
                {conference.status}
              </Badge>
            </Group>

            <Text c="dimmed">{conference.description}</Text>

            <Group gap="xl" mt="md">
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Start Date
                </Text>
                <Text>{new Date(conference.startDate).toLocaleString()}</Text>
              </div>

              <div>
                <Text size="sm" fw={500} c="dimmed">
                  End Date
                </Text>
                <Text>{new Date(conference.endDate).toLocaleString()}</Text>
              </div>
            </Group>

            <Group gap="xl" mt="sm">
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Venue
                </Text>
                <Text>{conference.place}</Text>
              </div>

              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Headliner
                </Text>
                <Text>{conference.headliner}</Text>
              </div>
            </Group>

            <Group gap="xl" mt="sm">
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Form ID
                </Text>
                <Text>{conference.formId}</Text>
              </div>

              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Owner ID
                </Text>
                <Text>{conference.ownerId}</Text>
              </div>
            </Group>

            <div>
              <Text size="sm" fw={500} c="dimmed">
                Created
              </Text>
              <Text size="sm">{new Date(conference.createdAt).toLocaleString()}</Text>
            </div>
          </Stack>
        </Paper>

        <Alert icon={<IconInfoCircle size={16} />} variant="light">
          <Text size="sm">
            Use the edit button in the conference list to modify this conference, or the delete
            button to remove it permanently.
          </Text>
        </Alert>
      </Stack>
    </Modal>
  );
}

export function AdminConferencesPage() {
  const [activeTab, setActiveTab] = useState<string | null>('list');
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [detailsModalOpened, { open: openDetailsModal, close: closeDetailsModal }] =
    useDisclosure(false);
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false);

  const handleConferenceSelect = (conference: Conference) => {
    setSelectedConference(conference);
    openDetailsModal();
  };

  const handleCreateSuccess = () => {
    closeCreateModal();
    // The list will automatically refresh due to its internal state management
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

      {/* Conference Details Modal */}
      <ConferenceDetailsModal
        conference={selectedConference}
        opened={detailsModalOpened}
        onClose={closeDetailsModal}
      />

      {/* Create Conference Modal */}
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title={
          <Group gap="sm">
            <IconCalendarEvent size={20} />
            <Text fw={500}>Create New Conference</Text>
          </Group>
        }
        size="lg"
      >
        <ConferenceForm onSuccess={handleCreateSuccess} onCancel={closeCreateModal} />
      </Modal>
    </Container>
  );
}
