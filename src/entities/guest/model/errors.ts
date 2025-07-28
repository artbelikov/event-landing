export interface GuestError {
  message: string;
  code?: string;
  details?: unknown;
}

export const extractErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    if (
      'body' in error &&
      error.body &&
      typeof error.body === 'object' &&
      'message' in error.body
    ) {
      return error.body.message as string;
    }
  }
  return fallbackMessage;
};

export const createGuestError = (error: unknown): GuestError => {
  return {
    message: extractErrorMessage(error, 'An unexpected error occurred'),
    details: error,
  };
};

export const logGuestError = (operation: string, error: GuestError): void => {
  console.error(`Guest ${operation} error:`, error);
};
