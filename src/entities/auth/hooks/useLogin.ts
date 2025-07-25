import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, OpenAPI } from '@/api-client';
import type { LoginParams, LoginResponse } from '../model';
import { authKeys } from '../model';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: async (params: LoginParams) => {
      const response = await AuthService.authControllerLogin(params);

      if (!response.access_token || !response.user) {
        throw new Error('Invalid response from server');
      }

      return {
        access_token: response.access_token,
        user: response.user,
      };
    },
    onSuccess: (data) => {
      // Store token and configure API client
      localStorage.setItem('access_token', data.access_token);
      OpenAPI.TOKEN = data.access_token;

      // Update user cache
      queryClient.setQueryData(authKeys.currentUser(), data.user);

      // Invalidate all auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      // Clear any cached user data on login error
      queryClient.removeQueries({ queryKey: authKeys.all });
      localStorage.removeItem('access_token');
      OpenAPI.TOKEN = undefined;
    },
  });
}
