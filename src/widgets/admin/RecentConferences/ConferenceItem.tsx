import { IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Badge, Group, Paper, Text } from '@mantine/core';
import { Conference, EventDate } from '@/generated';

interface Props {
  conference: Conference;
}

function getStartDate(eventDates: EventDate[] | undefined): string {
  const first = eventDates?.[0];
  if (!first) return '';
  return new Date(first.date ?? '').toLocaleDateString();
}

export function ConferenceItem({ conference }: Props) {
  const navigate = useNavigate();
  return (
    <Paper p="sm" withBorder>
      <Group justify="apart">
        <div>
          <Text fw={500}>{conference.name}</Text>
          <Text size="sm" c="dimmed">
            {getStartDate(conference.eventDates)} - {conference.place}
          </Text>
        </div>
        <Group gap="xs">
          <Badge color={conference.status === 'ACTIVE' ? 'green' : 'gray'} variant="light">
            {conference.status}
          </Badge>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={() => navigate(`/admin/conferences/${conference.id}`)}
          >
            <IconEye size={14} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}
