import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from '@/api-client';
import { createMultiAuthErrorHandler } from '@/shared/api';

interface QueryProviderProps {
  children: ReactNode;
}

// Create a query client with global error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Create error handler and check if we should handle this error
        const errorHandler = createMultiAuthErrorHandler();
        const handleError = errorHandler(queryClient);

        // Handle auth errors (401/403) - don't retry these
        if (error instanceof ApiError && [401, 403].includes(error.status)) {
          handleError(error);
          return false;
        }
        // Retry other errors up to 1 time
        return failureCount < 1;
      },
    },
    mutations: {
      onError: (error) => {
        // Create error handler and handle auth errors in mutations
        const errorHandler = createMultiAuthErrorHandler();
        const handleError = errorHandler(queryClient);
        handleError(error);
      },
    },
  },
});

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
