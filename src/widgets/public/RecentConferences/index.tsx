import React from 'react';
import { IconChevronRight, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Badge, Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { Conference } from '@/api-client';
import { useConferencesList } from '@/entities/conference';
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer';

interface RecentConferencesProps {
  className?: string;
  enableInfiniteScroll?: boolean;
  maxHeight?: number | string;
}

export function RecentConferences({
  className,
  enableInfiniteScroll = false,
  maxHeight = 400,
}: RecentConferencesProps) {
  const navigate = useNavigate();
  const query = useConferencesList({
    limit: enableInfiniteScroll ? 10 : 5,
  });

  const renderConferenceItem = (conference: Conference, index: number) => (
    <Paper key={conference.id} p="sm" withBorder>
      <Group justify="apart">
        <div>
          <Text fw={500}>{conference.name}</Text>
          <Text size="sm" c="dimmed">
            {new Date(conference.startDate).toLocaleDateString()} - {conference.place}
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

  return (
    <Card withBorder padding="lg" radius="md" className={className}>
      <Group justify="apart" mb="md">
        <Title order={3}>Recent Conferences</Title>
        <Button
          variant="subtle"
          size="sm"
          rightSection={<IconChevronRight size={14} />}
          onClick={() => navigate('/admin/conferences')}
        >
          View All
        </Button>
      </Group>

      {enableInfiniteScroll ? (
        <InfiniteScrollContainer
          data={query.data}
          isLoading={query.isLoading}
          isFetchingNextPage={query.isFetchingNextPage}
          hasNextPage={query.hasNextPage}
          fetchNextPage={query.fetchNextPage}
          renderItem={renderConferenceItem}
          emptyStateComponent={
            <Text c="dimmed" ta="center" py="xl">
              No conferences found
            </Text>
          }
          h={maxHeight}
        />
      ) : (
        <>
          {query.isLoading ? (
            <Group justify="center" p="xl">
              <Text>Loading...</Text>
            </Group>
          ) : query.data.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              No conferences found
            </Text>
          ) : (
            <Stack gap="sm">
              {query.data
                .slice(0, 5)
                .map((conference: Conference, index: number) =>
                  renderConferenceItem(conference, index)
                )}
            </Stack>
          )}
        </>
      )}
    </Card>
  );
}
