import { useMemo } from 'react';
import { ConferenceStatus } from '@/api-client';
import { useConferencesList } from '@/entities/conference';
import { useGuestsList } from '@/entities/guest';
import { DashboardStatsData } from '@/features/admin/model/types';

export function useDashboardStats() {
  const { data: conferences = [], isLoading: conferencesLoading } = useConferencesList({
    limit: 100,
  });

  const { data: guests = [], isLoading: guestsLoading } = useGuestsList({
    limit: 100,
  });

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
