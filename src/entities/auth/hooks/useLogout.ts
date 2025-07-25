import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenAPI } from '@/api-client';
import { authKeys } from '../model';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Clear token and API configuration
      localStorage.removeItem('access_token');
      OpenAPI.TOKEN = undefined;

      // Clear all cached data
      queryClient.clear();
    },
    onSuccess: () => {
      // Redirect to login page
      window.location.href = '/admin/login';
    },
  });
}
