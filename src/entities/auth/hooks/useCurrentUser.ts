import { useQuery } from '@tanstack/react-query';
import { OpenAPI } from '@/api-client';
import type { User } from '@/api-client';
import { authKeys } from '../model';

// This would typically be a separate API endpoint to get current user
// For now, we'll determine auth status based on token presence
async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return null;
  }

  // Configure the API client with the token
  OpenAPI.TOKEN = token;

  // Since there's no explicit "me" endpoint in the AuthService,
  // we'll return null for now but set up the structure
  // In a real app, you'd have an endpoint like /auth/me
  return null;
}

export function useCurrentUser() {
  return useQuery<User | null, Error>({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on auth failures
  });
}

// Helper hook to check if user is authenticated
export function useIsAuthenticated() {
  const { data: user, isLoading } = useCurrentUser();

  return {
    isAuthenticated: !!localStorage.getItem('access_token'),
    user,
    isLoading,
  };
}
