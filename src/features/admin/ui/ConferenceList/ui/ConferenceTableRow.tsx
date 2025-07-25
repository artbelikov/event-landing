import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Group, Table, Text } from '@mantine/core';
import type { Conference } from '@/api-client';

interface ConferenceTableRowProps {
  conference: Conference;
  onView?: (conference: Conference) => void;
  onEdit?: (conference: Conference) => void;
  onDelete?: (conference: Conference) => Promise<void>;
}

export function ConferenceTableRow({
  conference,
  onView,
  onEdit,
  onDelete,
}: ConferenceTableRowProps) {
  return (
    <Table.Tr>
      <Table.Td>
        <div>
          <Text fw={500}>{conference.name}</Text>
          <Text size="sm" c="dimmed">
            {conference.description.length > 50
              ? `${conference.description.substring(0, 50)}...`
              : conference.description}
          </Text>
        </div>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{new Date(conference.startDate).toLocaleDateString()}</Text>
        <Text size="xs" c="dimmed">
          {new Date(conference.startDate).toLocaleTimeString()}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{new Date(conference.endDate).toLocaleDateString()}</Text>
        <Text size="xs" c="dimmed">
          {new Date(conference.endDate).toLocaleTimeString()}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{conference.place}</Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{conference.headliner}</Text>
      </Table.Td>

      <Table.Td>
        <Badge color={conference.status === 'ACTIVE' ? 'green' : 'gray'} variant="light">
          {conference.status}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" size="sm" onClick={() => onView?.(conference)}>
            <IconEye size={14} />
          </ActionIcon>

          <ActionIcon variant="subtle" size="sm" color="blue" onClick={() => onEdit?.(conference)}>
            <IconEdit size={14} />
          </ActionIcon>

          {onDelete && (
            <Button
              color="red"
              variant="light"
              leftSection={<IconTrash size={14} />}
              onClick={() => onDelete(conference)}
              size="sm"
            >
              Delete
            </Button>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
