import { useQuery } from '@tanstack/react-query';
import { GuestService, SortOrder } from '@/api-client';
import { guestKeys, type GuestListParams } from '../model';

export function useGuestsList(params: GuestListParams = {}) {
  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    sortOrder = SortOrder.DESC,
  } = params;

  return useQuery({
    enabled: false,
    queryKey: guestKeys.list({ page, limit, search, sortBy, sortOrder }),
    queryFn: () => GuestService.guestControllerFindAll(page, limit, search, sortBy, sortOrder),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
