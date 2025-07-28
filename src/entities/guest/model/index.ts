import type { SortOrder } from '@/api-client';

export const guestKeys = {
  all: ['guests'] as const,
  lists: () => [...guestKeys.all, 'list'] as const,
  list: (params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: SortOrder;
  }) => [...guestKeys.lists(), params] as const,
  details: () => [...guestKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...guestKeys.details(), id] as const,
} as const;

export type GuestListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export * from './validation';
export * from './notifications';
export * from './errors';
