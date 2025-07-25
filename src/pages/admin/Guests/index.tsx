import React, { useState } from 'react';
import {
  IconEye,
  IconInfoCircle,
  IconList,
  IconPlus,
  IconSettings,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react';
import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { Guest } from '@/api-client';
import { GuestForm } from '@/features/admin/ui/GuestForm';
import { GuestList } from '@/features/admin/ui/GuestList';

interface GuestDetailsModalProps {
  guest: Guest | null;
  opened: boolean;
  onClose: () => void;
}

function GuestDetailsModal({ guest, opened, onClose }: GuestDetailsModalProps) {
  if (!guest) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconEye size={20} />
          <Text fw={500}>Guest Details</Text>
        </Group>
      }
      size="lg"
    >
      <Stack gap="md">
        <Paper p="md" withBorder>
          <Stack gap="sm">
            <Group justify="apart">
              <Text fw={600} size="lg">
                Guest #{guest.id}
              </Text>
              <Badge variant="light" color="blue">
                Conference ID: {guest.conferenceId}
              </Badge>
            </Group>

            <Group gap="xl" mt="md">
              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Registration Date
                </Text>
                <Text>{new Date(guest.createdAt).toLocaleString()}</Text>
              </div>

              <div>
                <Text size="sm" fw={500} c="dimmed">
                  Conference ID
                </Text>
                <Text>{guest.conferenceId}</Text>
              </div>
            </Group>
          </Stack>
        </Paper>

        <Paper p="md" withBorder>
          <Title order={4} mb="md">
            Guest Properties
          </Title>
          <Text size="sm" c="dimmed" mb="sm">
            Dynamic properties for this guest would be displayed here. In a real implementation, you
            would fetch and display the key-value properties associated with this guest.
          </Text>

          <Alert variant="light" color="blue">
            <Text size="sm">
              <strong>Note:</strong> Guest properties would be fetched separately from the guest
              properties endpoint and displayed here as key-value pairs (e.g., name, email, company,
              etc.)
            </Text>
          </Alert>
        </Paper>

        <Alert icon={<IconInfoCircle size={16} />} variant="light">
          <Text size="sm">
            Use the edit button in the guest list to modify this guest's properties, or the delete
            button to remove the guest permanently.
          </Text>
        </Alert>
      </Stack>
    </Modal>
  );
}

function GuestManagementStats() {
  return (
    <Paper p="md" withBorder mb="md">
      <Title order={4} mb="md">
        Guest Management Overview
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <Paper p="sm" withBorder bg="blue.0">
          <Group gap="sm">
            <IconUsers size={24} color="blue" />
            <div>
              <Text size="sm" c="dimmed">
                Total Guests
              </Text>
              <Text fw={600}>--</Text>
            </div>
          </Group>
        </Paper>

        <Paper p="sm" withBorder bg="green.0">
          <Group gap="sm">
            <IconUserCheck size={24} color="green" />
            <div>
              <Text size="sm" c="dimmed">
                Recent Registrations
              </Text>
              <Text fw={600}>--</Text>
            </div>
          </Group>
        </Paper>

        <Paper p="sm" withBorder bg="orange.0">
          <Group gap="sm">
            <IconUsers size={24} color="orange" />
            <div>
              <Text size="sm" c="dimmed">
                Active Conferences
              </Text>
              <Text fw={600}>--</Text>
            </div>
          </Group>
        </Paper>

        <Paper p="sm" withBorder bg="violet.0">
          <Group gap="sm">
            <IconUserCheck size={24} color="violet" />
            <div>
              <Text size="sm" c="dimmed">
                This Week
              </Text>
              <Text fw={600}>--</Text>
            </div>
          </Group>
        </Paper>
      </SimpleGrid>

      <Text size="xs" c="dimmed" mt="sm">
        Statistics would be populated from API calls to provide real-time guest metrics.
      </Text>
    </Paper>
  );
}

export function AdminGuestsPage() {
  const [activeTab, setActiveTab] = useState<string | null>('list');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [detailsModalOpened, { open: openDetailsModal, close: closeDetailsModal }] =
    useDisclosure(false);
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false);

  const handleGuestSelect = (guest: Guest) => {
    setSelectedGuest(guest);
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
          <Title order={1}>Guest Management</Title>
          <Text c="dimmed" size="sm">
            Register, manage, and view all conference guests and their properties
          </Text>
        </div>

        <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal} size="md">
          Register Guest
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="list" leftSection={<IconList size={16} />}>
            All Guests
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="list" pt="md">
          <Stack gap="md">
            <GuestManagementStats />
            <GuestList onGuestSelect={handleGuestSelect} />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="md">
          <Paper p="xl" withBorder>
            <Stack gap="md" align="center">
              <IconSettings size={48} color="gray" />
              <Title order={3}>Guest Management Settings</Title>
              <Text c="dimmed" ta="center" maw={500}>
                Guest-related settings and configurations will be available here. This could include
                default property templates, bulk import/export options, notification settings, and
                guest registration form customization.
              </Text>

              <Stack gap="sm" mt="lg" align="center">
                <Text fw={500}>Planned Features:</Text>
                <Text size="sm" c="dimmed">
                  • Custom property field definitions
                </Text>
                <Text size="sm" c="dimmed">
                  • Bulk guest import from CSV/Excel
                </Text>
                <Text size="sm" c="dimmed">
                  • Guest registration email templates
                </Text>
                <Text size="sm" c="dimmed">
                  • Property validation rules
                </Text>
                <Text size="sm" c="dimmed">
                  • Guest data export options
                </Text>
              </Stack>

              <Button variant="light" disabled mt="md">
                Coming Soon
              </Button>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        guest={selectedGuest}
        opened={detailsModalOpened}
        onClose={closeDetailsModal}
      />

      {/* Create Guest Modal */}
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title={
          <Group gap="sm">
            <IconUserCheck size={20} />
            <Text fw={500}>Register New Guest</Text>
          </Group>
        }
        size="lg"
      >
        <GuestForm onSuccess={handleCreateSuccess} onCancel={closeCreateModal} />
      </Modal>
    </Container>
  );
}
