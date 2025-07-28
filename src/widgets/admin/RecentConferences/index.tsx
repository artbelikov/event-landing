import { IconChevronRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import type { Conference } from '@/api-client';
import { useConferencesList } from '@/entities/conference';
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer';
import { ConferenceItem } from './ConferenceItem';

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useConferencesList({ limit: enableInfiniteScroll ? 10 : 5 });

  const renderConferenceItem = (conf: Conference) => <ConferenceItem conference={conf} />;

  return (
    <Card withBorder padding="lg" radius="md" className={className}>
      <Group justify="apart" mb="md">
        <Title order={3}>{t('dashboard.recentConferences.title')}</Title>
        <Button
          variant="subtle"
          size="sm"
          rightSection={<IconChevronRight size={14} />}
          onClick={() => navigate('/admin/conferences')}
        >
          {t('dashboard.recentConferences.viewAll')}
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
              {t('dashboard.recentConferences.empty')}
            </Text>
          }
          h={maxHeight}
        />
      ) : (
        <>
          {query.isLoading ? (
            <Group justify="center" p="xl">
              <Text>{t('loading.loading')}</Text>
            </Group>
          ) : query.data.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              {t('dashboard.recentConferences.empty')}
            </Text>
          ) : (
            <Stack gap="sm">
              {query.data.slice(0, 5).map((conf: Conference) => renderConferenceItem(conf))}
            </Stack>
          )}
        </>
      )}
    </Card>
  );
}
