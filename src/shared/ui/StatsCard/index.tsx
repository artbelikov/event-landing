import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Card, Group, Text, ThemeIcon } from '@mantine/core';
import { StatsCardProps } from './types';

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  color,
  loading,
}: StatsCardProps) {
  return (
    <Card withBorder padding="lg" radius="md">
      <Group justify="apart">
        <div>
          <Text c="dimmed" size="sm" fw={700} tt="uppercase">
            {title}
          </Text>
          <Text fw={700} size="xl">
            {loading ? '...' : value}
          </Text>
          <Text c="dimmed" size="sm">
            {description}
          </Text>
          {trend && !loading && (
            <Group gap={4} mt={5}>
              <ThemeIcon
                color={trend.direction === 'up' ? 'teal' : 'red'}
                variant="light"
                size="sm"
              >
                {trend.direction === 'up' ? (
                  <IconTrendingUp size={12} />
                ) : (
                  <IconTrendingDown size={12} />
                )}
              </ThemeIcon>
              <Text c={trend.direction === 'up' ? 'teal' : 'red'} size="sm" fw={500}>
                {trend.value}% {trend.label}
              </Text>
            </Group>
          )}
        </div>
        <ThemeIcon color={color} size={60} radius="md">
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  );
}
