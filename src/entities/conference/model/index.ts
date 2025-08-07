import type { ConferenceSortField, SortOrder } from '@/generated';

export const conferenceKeys = {
  all: ['conferences'] as const,
  lists: () => [...conferenceKeys.all, 'list'] as const,
  list: (params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: ConferenceSortField;
    sortOrder?: SortOrder;
  }) => [...conferenceKeys.lists(), params] as const,
  details: () => [...conferenceKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...conferenceKeys.details(), id] as const,
} as const;

export type ConferenceListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: ConferenceSortField;
  sortOrder?: SortOrder;
};

export * from './validation';
