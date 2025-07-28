import { useEffect, useState } from 'react';
import {
  IconAlertCircle,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconEye,
  IconFilter,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import type { Conference, Guest } from '@/api-client';
import { SortOrder } from '@/api-client';
import { GuestForm } from '../GuestForm';

interface GuestListProps {
  onGuestSelect?: (guest: Guest) => void;
  limit?: number;
  conferenceId?: number;
}

interface GuestWithDetails extends Guest {
  conferenceName?: string;
  properties?: Array<{ key: string; value: string }>;
}

export function GuestList({ onGuestSelect, limit, conferenceId }: GuestListProps) {
  const [guests, setGuests] = useState<GuestWithDetails[]>([]);
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingConferences, setLoadingConferences] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination and search state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(limit || 25);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [total, setTotal] = useState(0);
  const [selectedConferenceId, setSelectedConferenceId] = useState<string>(
    conferenceId ? conferenceId.toString() : ''
  );

  // Modal states
  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>();

  // Reset to first page when search or filtering changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [debouncedSearch, sortBy, sortOrder, selectedConferenceId]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortBy(field);
      setSortOrder(SortOrder.ASC);
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === SortOrder.ASC ? (
      <IconChevronUp size={14} />
    ) : (
      <IconChevronDown size={14} />
    );
  };

  const handleCreateNew = () => {
    setEditingGuest(undefined);
    openFormModal();
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    openFormModal();
  };

  const handleFormSuccess = (guest: Guest) => {
    closeFormModal();
    setEditingGuest(undefined);
  };

  const handleDelete = async (guest: Guest) => {};

  const clearFilters = () => {
    setSelectedConferenceId('');
    setSearch('');
  };

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
        {error}
        <Button size="sm" mt="sm" onClick={() => {}}>
          Retry
        </Button>
      </Alert>
    );
  }

  const getConferenceDate = (eventDates: any[]) => {
    if (!eventDates || eventDates.length === 0) return '';
    const firstDate = eventDates[0];
    if (firstDate.type === EventDateType.SINGLE && firstDate.date) {
      return new Date(firstDate.date).toLocaleDateString();
    }
    if (firstDate.type === EventDateType.PERIOD && firstDate.from) {
      return new Date(firstDate.from).toLocaleDateString();
    }
    return '';
  };

  const conferenceOptions = [
    { value: '', label: 'All Conferences' },
    ...conferences.map((conference) => ({
      value: conference.id.toString(),
      label: `${conference.name} (${getConferenceDate((conference as any).eventDates)})`,
    })),
  ];

  const rows = guests.map((guest) => (
    <Table.Tr key={guest.id}>
      <Table.Td>
        <Text fw={500}>Guest #{guest.id}</Text>
        <Text size="xs" c="dimmed">
          {new Date(guest.createdAt).toLocaleDateString()}
        </Text>
      </Table.Td>

      <Table.Td>
        <Badge variant="light" size="sm">
          {guest.conferenceName}
        </Badge>
      </Table.Td>

      <Table.Td>
        {guest.properties && guest.properties.length > 0 ? (
          <ScrollArea.Autosize mah={100}>
            <Stack gap={2}>
              {guest.properties.slice(0, 3).map((prop, index) => (
                <Group key={index} gap={4}>
                  <Text size="xs" fw={500}>
                    {prop.key}:
                  </Text>
                  <Text size="xs" c="dimmed">
                    {prop.value}
                  </Text>
                </Group>
              ))}
              {guest.properties.length > 3 && (
                <Text size="xs" c="dimmed">
                  +{guest.properties.length - 3} more properties
                </Text>
              )}
            </Stack>
          </ScrollArea.Autosize>
        ) : (
          <Text size="sm" c="dimmed" fs="italic">
            No properties
          </Text>
        )}
      </Table.Td>

      <Table.Td>
        <Text size="xs" c="dimmed">
          {new Date(guest.createdAt).toLocaleString()}
        </Text>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" size="sm" onClick={() => onGuestSelect?.(guest)}>
            <IconEye size={14} />
          </ActionIcon>

          <ActionIcon variant="subtle" size="sm" color="blue" onClick={() => handleEdit(guest)}>
            <IconEdit size={14} />
          </ActionIcon>

          <Button
            color="red"
            variant="light"
            leftSection={<IconTrash size={14} />}
            onClick={() => handleDelete(guest)}
            size="sm"
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const content = (
    <>
      <Group justify="space-between" mb="md">
        <div>
          <Title order={2}>Guests</Title>
          <Text c="dimmed" size="sm">
            Manage conference guests and their properties
          </Text>
        </div>

        <Button leftSection={<IconPlus size={16} />} onClick={handleCreateNew}>
          Register Guest
        </Button>
      </Group>

      <Paper p="md" mb="md" withBorder>
        <Stack gap="md">
          <Group gap="md">
            <TextInput
              placeholder="Search guests..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              style={{ flex: 1 }}
            />

            <Select
              placeholder="Filter by conference"
              data={conferenceOptions}
              value={selectedConferenceId}
              onChange={(value) => setSelectedConferenceId(value || '')}
              leftSection={<IconFilter size={16} />}
              w={250}
              searchable
              clearable
              disabled={loadingConferences}
            />

            <Select
              placeholder="Page size"
              data={[
                { value: '10', label: '10 per page' },
                { value: '25', label: '25 per page' },
                { value: '50', label: '50 per page' },
                { value: '100', label: '100 per page' },
              ]}
              value={pageSize.toString()}
              onChange={(value) => setPageSize(parseInt(value || '25'))}
              w={140}
            />
          </Group>

          {(search || selectedConferenceId) && (
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Active filters:
              </Text>
              {search && (
                <Badge
                  variant="light"
                  rightSection={
                    <ActionIcon size="xs" variant="transparent" onClick={() => setSearch('')}>
                      <IconX size={10} />
                    </ActionIcon>
                  }
                >
                  Search: "{search}"
                </Badge>
              )}
              {selectedConferenceId && (
                <Badge
                  variant="light"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      onClick={() => setSelectedConferenceId('')}
                    >
                      <IconX size={10} />
                    </ActionIcon>
                  }
                >
                  Conference:{' '}
                  {conferences.find((c) => c.id.toString() === selectedConferenceId)?.name}
                </Badge>
              )}
              <Button variant="subtle" size="xs" onClick={clearFilters}>
                Clear all
              </Button>
            </Group>
          )}
        </Stack>
      </Paper>

      <Paper withBorder>
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
                  <Group gap="xs">Guest ID {getSortIcon('id')}</Group>
                </Table.Th>

                <Table.Th>Conference</Table.Th>
                <Table.Th>Properties</Table.Th>

                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                  <Group gap="xs">Registered {getSortIcon('createdAt')}</Group>
                </Table.Th>

                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {loading ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Center p="xl">
                      <Loader size="md" />
                    </Center>
                  </Table.Td>
                </Table.Tr>
              ) : guests.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Center p="xl">
                      <Stack align="center" gap="md">
                        <Text c="dimmed">No guests found</Text>
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={handleCreateNew}
                        >
                          Register First Guest
                        </Button>
                      </Stack>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              ) : (
                rows
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {!loading && guests.length > 0 && (
          <Group justify="center" p="md">
            <Pagination
              value={page}
              onChange={setPage}
              total={Math.ceil(total / pageSize)}
              size="sm"
            />
          </Group>
        )}
      </Paper>

      {/* Create/Edit Modal */}
      <Modal
        opened={formModalOpened}
        onClose={closeFormModal}
        title={editingGuest ? 'Edit Guest' : 'Register Guest'}
        size="lg"
      >
        <GuestForm
          guest={editingGuest}
          preselectedConferenceId={
            conferenceId || (selectedConferenceId ? parseInt(selectedConferenceId) : undefined)
          }
          onSuccess={handleFormSuccess}
          onCancel={closeFormModal}
        />
      </Modal>
    </>
  );

  return <Container size="xl">{content}</Container>;
}
