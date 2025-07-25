import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, OpenAPI } from '@/api-client';
import { env } from '@/config';
import type { LoginResponse } from '../model';
import { authKeys } from '../model';

export function useGoogleAuth() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Redirect to Google OAuth endpoint
      // This should redirect to the backend Google auth URL
      window.location.href = `${env.API_BASE_URL}/auth/google`;
    },
    onError: (error) => {
      console.error('Google auth error:', error);
    },
  });
}

// Hook to handle Google OAuth callback
export function useGoogleAuthCallback() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, void>({
    mutationFn: async () => {
      const response = await AuthService.authControllerGoogleAuthCallback();

      if (!response.access_token || !response.user) {
        throw new Error('Invalid response from Google OAuth callback');
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
      // Clear any cached user data on auth error
      queryClient.removeQueries({ queryKey: authKeys.all });
      localStorage.removeItem('access_token');
      OpenAPI.TOKEN = undefined;
    },
  });
}
