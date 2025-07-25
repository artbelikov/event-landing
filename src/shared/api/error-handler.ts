import { QueryClient } from '@tanstack/react-query';
import { ApiError, OpenAPI } from '@/api-client';

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
  onError: () => {},
};

export function createErrorHandler(config: Partial<ErrorHandlerConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return function handleError(queryClient: QueryClient) {
    return (error: unknown) => {
      if (isRedirecting) return;

      // Check if error is an ApiError and matches our configured error codes
      if (error instanceof ApiError && finalConfig.errorCodes.includes(error.status)) {
        isRedirecting = true;

        // Call custom error handler if provided
        finalConfig.onError(error);

        // Clear authentication data if configured
        if (finalConfig.clearAuth) {
          localStorage.removeItem('access_token');
          OpenAPI.TOKEN = undefined;
        }

        // Clear React Query cache if configured
        if (finalConfig.clearCache) {
          queryClient.clear();
        }

        console.log(
          `Authentication cleared due to ${error.status} error - cache cleared, redirecting to ${finalConfig.redirectUrl}`
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
