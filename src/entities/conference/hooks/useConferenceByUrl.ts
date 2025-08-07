import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/generated';
import type { Conference } from '@/generated';

export function useConferenceByUrl(customUrl: string | undefined) {
  return useQuery<Conference, Error>({
    queryKey: ['conference', customUrl],
    queryFn: () => {
      if (!customUrl) throw new Error('No customUrl');
      return apiClient.getConferenceByUrl(customUrl);
    },
    enabled: Boolean(customUrl),
  });
}
