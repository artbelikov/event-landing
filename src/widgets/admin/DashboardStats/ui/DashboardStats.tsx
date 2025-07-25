import { IconCalendarEvent, IconUserCheck, IconUsers } from '@tabler/icons-react';
import { SimpleGrid } from '@mantine/core';
import { useDashboardStats } from '@/features/admin/hooks/useDashboardStats';
import { DashboardStatsProps } from '@/features/admin/model/types';
import { StatsCard } from '@/shared/ui/StatsCard';

export function DashboardStats({ className }: DashboardStatsProps) {
  const { stats, isLoading } = useDashboardStats();

  const statsConfig = [
    {
      title: 'Total Conferences',
      value: stats.totalConferences,
      description: 'All conferences',
      icon: <IconCalendarEvent size={24} />,
      color: 'blue',
      trend: {
        value: 12,
        label: 'this month',
        direction: 'up' as const,
      },
    },
    {
      title: 'Active Conferences',
      value: stats.activeConferences,
      description: 'Currently active',
      icon: <IconCalendarEvent size={24} />,
      color: 'green',
    },
    {
      title: 'Total Guests',
      value: stats.totalGuests,
      description: 'Registered guests',
      icon: <IconUserCheck size={24} />,
      color: 'orange',
    },
    {
      title: 'Recent Guests',
      value: stats.recentGuests,
      description: 'Last 7 days',
      icon: <IconUsers size={24} />,
      color: 'violet',
      trend: {
        value: 8,
        label: 'vs last week',
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
