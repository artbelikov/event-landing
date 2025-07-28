import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Button, Group, Table, Text } from '@mantine/core';
import { EventDateType, type Conference } from '@/api-client';

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
  const { t } = useTranslation();

  const formatEventDates = (eventDates: any[]) => {
    if (!eventDates || eventDates.length === 0) return t('adminConferences.table.noDates');

    return eventDates.map((eventDate: any, index: number) => (
      <div key={index}>
        {eventDate.type === EventDateType.SINGLE && eventDate.date && (
          <Text size="sm">{new Date(eventDate.date).toLocaleDateString()}</Text>
        )}
        {eventDate.type === EventDateType.PERIOD && eventDate.from && (
          <Text size="sm">
            {new Date(eventDate.from).toLocaleDateString()}
            {eventDate.to && ` - ${new Date(eventDate.to).toLocaleDateString()}`}
          </Text>
        )}
      </div>
    ));
  };

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

      <Table.Td>{formatEventDates((conference as any).eventDates)}</Table.Td>

      <Table.Td>
        <Text size="sm">{conference.place}</Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{conference.headliner}</Text>
      </Table.Td>

      <Table.Td>
        <Badge color={conference.status === 'ACTIVE' ? 'green' : 'gray'} variant="light">
          {t(`adminConferences.status.${conference.status.toLowerCase()}`)}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{new Date(conference.createdAt).toLocaleDateString()}</Text>
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
              {t('adminConferences.deleteButton')}
            </Button>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
