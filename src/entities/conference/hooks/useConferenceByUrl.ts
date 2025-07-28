import { useQuery } from '@tanstack/react-query';
import { ConferenceService } from '@/api-client';
import type { Conference } from '@/api-client';

export function useConferenceByUrl(customUrl: string | undefined) {
  return useQuery<Conference, Error>({
    queryKey: ['conference', customUrl],
    queryFn: () => {
      if (!customUrl) throw new Error('No customUrl');
      return ConferenceService.conferenceControllerFindByCustomUrl(customUrl);
    },
    enabled: Boolean(customUrl),
  });
}
