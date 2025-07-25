import { useQuery } from '@tanstack/react-query';
import { ConferenceService, ConferenceSortField, SortOrder } from '@/api-client';
import { conferenceKeys, type ConferenceListParams } from '../model';

interface PaginatedConferenceListParams extends ConferenceListParams {
  page?: number;
  pageSize?: number;
}

export function useConferencesListPaginated(params: PaginatedConferenceListParams = {}) {
  const {
    page = 1,
    pageSize = 25,
    search = '',
    sortBy = ConferenceSortField.CREATED_AT,
    sortOrder = SortOrder.DESC,
  } = params;

  return useQuery({
    queryKey: conferenceKeys.list({
      page,
      limit: pageSize,
      search,
      sortBy,
      sortOrder,
    }),
    queryFn: async () => {
      const { data, meta } = await ConferenceService.conferenceControllerFindAll(
        page,
        pageSize,
        search,
        sortBy,
        sortOrder
      );
      return {
        data,
        total: meta.total,
        hasMore: meta.hasNextPage,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
