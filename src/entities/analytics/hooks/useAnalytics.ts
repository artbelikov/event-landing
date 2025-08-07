import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';

export interface AnalyticsFilter {
  conferenceId?: number;
  startDate?: string;
  endDate?: string;
  groupBy?: 'hour' | 'day' | 'week' | 'month';
  limit?: number;
  offset?: number;
}

export interface MetricsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  geographicData: Array<{ country: string; city: string; count: number; percentage: number }>;
  timeSeriesData: Array<{ date: string; value: number; label?: string }>;
}

export interface ConversionFunnel {
  stage: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
}

export interface DashboardOverview {
  metricsSummary: MetricsSummary;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
    value: number;
  }>;
  topPerformers: Array<{
    metric: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  alerts: Array<{
    id: string;
    name: string;
    isActive: boolean;
  }>;
  lastUpdated: string;
}

export interface RealTimeMetrics {
  activeUsers: number;
  pageViewsLastHour: number;
  conversionsLastHour: number;
  topPages: Array<{ page: string; views: number }>;
  lastUpdated: string;
}

export function useAnalyticsMetrics(filter: AnalyticsFilter) {
  return useQuery({
    queryKey: ['analytics', 'metrics', filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter.conferenceId) params.append('conferenceId', filter.conferenceId.toString());
      if (filter.startDate) params.append('startDate', filter.startDate);
      if (filter.endDate) params.append('endDate', filter.endDate);
      if (filter.groupBy) params.append('groupBy', filter.groupBy);
      if (filter.limit) params.append('limit', filter.limit.toString());
      if (filter.offset) params.append('offset', filter.offset.toString());

      const response = await apiClient.get(`/analytics/metrics/summary?${params.toString()}`);
      return response.data as MetricsSummary;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useConversionFunnel(conferenceId: number, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'conversion-funnel', conferenceId, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await apiClient.get(`/analytics/metrics/conversion-funnel/${conferenceId}?${params.toString()}`);
      return response.data as ConversionFunnel[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useEventMetrics(conferenceId: number, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'event-metrics', conferenceId, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await apiClient.get(`/analytics/metrics/event/${conferenceId}?${params.toString()}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGeographicData(conferenceId: number, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['analytics', 'geographic', conferenceId, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await apiClient.get(`/analytics/metrics/geographic/${conferenceId}?${params.toString()}`);
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

export function useRealTimeMetrics(conferenceId?: number) {
  return useQuery({
    queryKey: ['analytics', 'realtime', conferenceId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (conferenceId) params.append('conferenceId', conferenceId.toString());

      const response = await apiClient.get(`/analytics/metrics/realtime?${params.toString()}`);
      return response.data as RealTimeMetrics;
    },
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // 30 seconds
  });
}

export function useDashboardOverview(conferenceId?: number) {
  return useQuery({
    queryKey: ['analytics', 'dashboard-overview', conferenceId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (conferenceId) params.append('conferenceId', conferenceId.toString());

      const response = await apiClient.get(`/analytics/dashboard/overview?${params.toString()}`);
      return response.data as DashboardOverview;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCustomReports() {
  return useQuery({
    queryKey: ['analytics', 'custom-reports'],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/reports');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ['analytics', 'alerts'],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/alerts');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateCustomReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/analytics/reports', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics', 'custom-reports'] });
    },
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/analytics/alerts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics', 'alerts'] });
    },
  });
}

export function useExportData() {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/analytics/export', data, {
        responseType: 'blob',
      });
      return response.data;
    },
  });
}

// Tracking functions
export function trackPageView(data: {
  conferenceId: number;
  pageUrl: string;
  referrer?: string;
  userAgent: string;
  ipAddress: string;
  sessionId: string;
  duration?: number;
  bounce?: boolean;
}) {
  return apiClient.post('/analytics/track/pageview', data);
}

export function trackEvent(data: {
  conferenceId: number;
  sessionId: string;
  eventType: string;
  eventName: string;
  eventData?: Record<string, any>;
  pageUrl: string;
}) {
  return apiClient.post('/analytics/track/event', data);
}

export function trackConversion(data: {
  conferenceId: number;
  sessionId: string;
  conversionType: string;
  value?: number;
}) {
  return apiClient.post('/analytics/track/conversion', data);
}

export function createSession(data: {
  conferenceId: number;
  userAgent: string;
  ipAddress: string;
  referrer?: string;
}) {
  return apiClient.post('/analytics/session/create', data);
}

export function endSession(sessionId: string) {
  return apiClient.post(`/analytics/session/${sessionId}/end`);
} 