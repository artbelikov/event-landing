// Auto-generated frontend API client
export * from './types';
export * from './api-client';
export * from './hooks';

// Default API client instance
import { ApiClient } from './api-client';

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_URL || 'http://localhost:3005',
  typeof window !== 'undefined' ? localStorage.getItem('access_token') || undefined : undefined
);

// Auto-setup token from localStorage on client side
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('access_token');
  if (token) {
    apiClient.setToken(token);
  }
}
