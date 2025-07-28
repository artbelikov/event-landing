import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OpenAPI } from '@/api-client';
import { env } from '@/config';
import { authKeys } from '../model';

export function useGoogleAuth() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      window.location.href = `${env.API_BASE_URL}/auth/google`;
    },
    onError: (error) => {
      console.error('Google auth error:', error);

      // Clear any cached user data on auth error
      queryClient.removeQueries({ queryKey: authKeys.all });
      localStorage.removeItem('access_token');
      OpenAPI.TOKEN = undefined;
    },
  });
}
