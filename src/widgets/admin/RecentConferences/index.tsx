import { IconChevronRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import type { Conference } from '@/generated';
import { useConferences } from '@/generated';
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
  const query = useConferences({ limit: enableInfiniteScroll ? 10 : 5 });

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
        <div style={{ height: maxHeight, overflow: 'auto' }}>
          {(query.data?.data || []).map((conf: Conference) => <ConferenceItem key={conf.id} conference={conf} />)}
        </div>
      ) : (
        <>
          {query.isLoading ? (
            <Group justify="center" p="xl">
              <Text>{t('loading.loading')}</Text>
            </Group>
          ) : (query.data?.data || []).length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              {t('dashboard.recentConferences.empty')}
            </Text>
          ) : (
            <Stack gap="sm">
              {(query.data?.data || []).slice(0, 5).map((conf: Conference) => <ConferenceItem key={conf.id} conference={conf} />)}
            </Stack>
          )}
        </>
      )}
    </Card>
  );
}
