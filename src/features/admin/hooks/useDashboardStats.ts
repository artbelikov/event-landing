import { useMemo } from 'react';
import { ConferenceStatus, useConferences, useGuests } from '@/generated';;
import { DashboardStatsData } from '@/features/admin/model/types';

export function useDashboardStats() {
  const { data: conferencesResponse, isLoading: conferencesLoading } = useConferences({
    limit: 100,
  });

  const { data: guestsResponse, isLoading: guestsLoading } = useGuests({
    limit: 100,
  });

  const conferences = conferencesResponse?.data || [];
  const guests = guestsResponse?.data || [];

  const isLoading = conferencesLoading || guestsLoading;

  const stats: DashboardStatsData = useMemo(() => {
    const totalConferences = conferences.length;
    const activeConferences = conferences.filter(
      (c) => c.status === ConferenceStatus.ACTIVE
    ).length;
    const totalGuests = guests.length;

    const recentGuests = guests.filter((g) => {
      const guestDate = new Date(g.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return guestDate > weekAgo;
    }).length;

    return {
      totalConferences,
      activeConferences,
      totalGuests,
      recentGuests,
    };
  }, [conferences, guests]);

  return {
    stats,
    isLoading,
  };
}
