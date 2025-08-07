import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/generated';
import { apiClient } from '@/generated';

// Global flag to prevent multiple simultaneous redirects
let isRedirecting = false;

export interface ErrorHandlerConfig {
  /** Array of HTTP status codes to handle */
  errorCodes: number[];
  /** URL to redirect to when error occurs */
  redirectUrl?: string;
  /** Whether to clear authentication data */
  clearAuth?: boolean;
  /** Whether to clear React Query cache */
  clearCache?: boolean;
  /** Custom error handler function */
  onError?: (error: ApiError) => void;
}

/**
 * Configuration for error handling
 *
 * @example
 * // Handle only 403 errors
 * const handler = createErrorHandler({ errorCodes: [403] });
 *
 * @example
 * // Handle multiple auth errors with custom redirect
 * const handler = createErrorHandler({
 *   errorCodes: [401, 403, 422],
 *   redirectUrl: '/auth/login',
 *   onError: (error) => console.log('Custom handling:', error.message)
 * });
 */

const defaultConfig: Required<ErrorHandlerConfig> = {
  errorCodes: [403],
  redirectUrl: '/admin/login',
  clearAuth: true,
  clearCache: true,
  onError: () => { },
};

export function createErrorHandler(config: Partial<ErrorHandlerConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return function handleError(queryClient: QueryClient) {
    return (error: unknown) => {
      if (isRedirecting) return;

      // Check if error is an ApiError or has status property and matches our configured error codes
      const errorStatus =
        (error instanceof ApiError ? error.status : null) ||
        (typeof error === 'object' && error !== null && 'status' in error ? (error as { status: number }).status : null) ||
        (typeof error === 'object' && error !== null && 'errorStatus' in error ? (error as { errorStatus: number }).errorStatus : null) ||
        (typeof error === 'object' && error !== null && 'statusCode' in error ? (error as { statusCode: number }).statusCode : null);

      if (errorStatus && finalConfig.errorCodes.includes(errorStatus)) {
        isRedirecting = true;

        // Call custom error handler if provided
        finalConfig.onError(error as ApiError);

        // Clear authentication data if configured
        if (finalConfig.clearAuth) {
          localStorage.removeItem('access_token');
          apiClient.clearToken();
        }

        // Clear React Query cache if configured
        if (finalConfig.clearCache) {
          queryClient.clear();
        }

        console.log(
          `Authentication cleared due to ${errorStatus} error - cache cleared, redirecting to ${finalConfig.redirectUrl}`
        );

        // Redirect to specified URL after a short delay to allow cleanup
        setTimeout(() => {
          window.location.href = finalConfig.redirectUrl;
        }, 100);
      }
    };
  };
}

// Default error handler for 403 errors (backward compatibility)
export const createAuthErrorHandler = () =>
  createErrorHandler({
    errorCodes: [403],
    redirectUrl: '/admin/login',
    clearAuth: true,
    clearCache: true,
  });

// Error handler for multiple auth-related errors
export const createMultiAuthErrorHandler = () =>
  createErrorHandler({
    errorCodes: [401, 403],
    redirectUrl: '/admin/login',
    clearAuth: true,
    clearCache: true,
  });
