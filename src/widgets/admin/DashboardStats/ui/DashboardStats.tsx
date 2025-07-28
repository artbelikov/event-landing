import { IconCalendarEvent, IconUserCheck, IconUsers } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SimpleGrid } from '@mantine/core';
import { useDashboardStats } from '@/features/admin';
import type { DashboardStatsProps } from '@/features/admin';
import { StatsCard } from '@/shared/ui/StatsCard';

export function DashboardStats({ className }: DashboardStatsProps) {
  const { t } = useTranslation();
  const { stats, isLoading } = useDashboardStats();

  const statsConfig = [
    {
      title: t('dashboard.stats.totalConferences'),
      value: stats.totalConferences,
      description: t('dashboard.stats.allConferences'),
      icon: <IconCalendarEvent size={24} />,
      color: 'blue',
      trend: {
        value: 12,
        label: t('dashboard.stats.thisMonth'),
        direction: 'up' as const,
      },
    },
    {
      title: t('dashboard.stats.activeConferences'),
      value: stats.activeConferences,
      description: t('dashboard.stats.currentlyActive'),
      icon: <IconCalendarEvent size={24} />,
      color: 'green',
    },
    {
      title: t('dashboard.stats.totalGuests'),
      value: stats.totalGuests,
      description: t('dashboard.stats.registeredGuests'),
      icon: <IconUserCheck size={24} />,
      color: 'orange',
    },
    {
      title: t('dashboard.stats.recentGuests'),
      value: stats.recentGuests,
      description: t('dashboard.stats.last7days'),
      icon: <IconUsers size={24} />,
      color: 'violet',
      trend: {
        value: 8,
        label: t('dashboard.stats.vsLastWeek'),
        direction: 'up' as const,
      },
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} className={className}>
      {statsConfig.map((config, index) => (
        <StatsCard key={config.title} {...config} loading={isLoading} />
      ))}
    </SimpleGrid>
  );
}
