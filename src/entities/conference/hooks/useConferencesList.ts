import { useInfiniteQuery } from '@tanstack/react-query';
import { ConferenceService, ConferenceSortField, SortOrder } from '@/api-client';
import { conferenceKeys, type ConferenceListParams } from '../model';

export function useConferencesList(params: ConferenceListParams = {}) {
  const {
    limit = 10,
    search = '',
    sortBy = ConferenceSortField.CREATED_AT,
    sortOrder = SortOrder.DESC,
  } = params;

  const query = useInfiniteQuery({
    queryKey: conferenceKeys.lists(),
    queryFn: async ({ pageParam = 1 }) => {
      const { data, meta } = await ConferenceService.conferenceControllerFindAll(
        pageParam,
        limit,
        search,
        sortBy,
        sortOrder
      );
      return {
        data,
        nextPage: meta.hasNextPage ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });
  const data = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    ...query,
    data,
  };
}
