import React, { useState } from 'react';
import { useAnalyticsMetrics, useDashboardOverview, useRealTimeMetrics, AnalyticsFilter } from '@/entities/analytics';
import { StatsCard } from '@/shared/ui/StatsCard';
import { DateRangePicker } from './DateRangePicker';
import { MetricsOverview } from './MetricsOverview';
import { RealTimeMetrics } from './RealTimeMetrics';
import { TopPagesChart } from './TopPagesChart';
import { GeographicChart } from './GeographicChart';
import { ConversionFunnel } from './ConversionFunnel';
import { RecentActivity } from './RecentActivity';

interface AnalyticsDashboardProps {
  conferenceId?: number;
}

export function AnalyticsDashboard({ conferenceId }: AnalyticsDashboardProps) {
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const filter: AnalyticsFilter = {
    conferenceId,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    groupBy: 'day',
  };

  const { data: metrics, isLoading: metricsLoading } = useAnalyticsMetrics(filter);
  const { data: dashboardOverview, isLoading: overviewLoading } = useDashboardOverview(conferenceId);
  const { data: realTimeMetrics, isLoading: realTimeLoading } = useRealTimeMetrics(conferenceId);

  const isLoading = metricsLoading || overviewLoading || realTimeLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Real-time Metrics */}
      {realTimeMetrics && (
        <RealTimeMetrics data={realTimeMetrics} />
      )}

      {/* Key Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Page Views"
            value={metrics.totalPageViews.toLocaleString()}
            trend={{ value: 12.5, direction: 'up' }}
            icon="👁️"
          />
          <StatsCard
            title="Unique Visitors"
            value={metrics.uniqueVisitors.toLocaleString()}
            trend={{ value: 8.2, direction: 'up' }}
            icon="👤"
          />
          <StatsCard
            title="Conversion Rate"
            value={`${metrics.conversionRate.toFixed(1)}%`}
            trend={{ value: 2.1, direction: 'up' }}
            icon="📈"
          />
          <StatsCard
            title="Bounce Rate"
            value={`${metrics.bounceRate.toFixed(1)}%`}
            trend={{ value: -3.5, direction: 'down' }}
            icon="🎯"
          />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        {metrics && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
            <TopPagesChart data={metrics.topPages} />
          </div>
        )}

        {/* Geographic Data */}
        {metrics && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
            <GeographicChart data={metrics.geographicData} />
          </div>
        )}
      </div>

      {/* Conversion Funnel */}
      {conferenceId && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
          <ConversionFunnel conferenceId={conferenceId} startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>
      )}

      {/* Recent Activity */}
      {dashboardOverview && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <RecentActivity data={dashboardOverview.recentActivity} />
        </div>
      )}

      {/* Detailed Metrics Overview */}
      {metrics && (
        <MetricsOverview data={metrics} />
      )}
    </div>
  );
} 