import { ReactNode } from 'react';

export interface StatsTrend {
  value: number;
  label: string;
  direction: 'up' | 'down';
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  trend?: StatsTrend;
  color: string;
  loading?: boolean;
}
