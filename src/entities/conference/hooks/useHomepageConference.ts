import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/generated';

export function useHomepageConference() {
  return useQuery({
    queryKey: ['homepage-conference'],
    queryFn: async () => {
      // For now, we'll use a simple approach to get the first active conference
      // In a real implementation, you would have a specific endpoint for homepage conference
      const response = await apiClient.getConferences({
        status: 'ACTIVE',
        limit: 1,
        page: 1,
      });
      
      return response.data.length > 0 ? response.data[0] : null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
} 