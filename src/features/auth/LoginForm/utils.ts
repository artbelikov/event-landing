import { notifications } from '@mantine/notifications';

export interface LoginError {
  status?: number;
  message?: string;
}

export const getLoginErrorMessage = (error: LoginError, t: (key: string) => string): string => {
  if (error.status === 401) {
    return t('auth:errors.invalidCredentials');
  }
  if (error.status && error.status >= 500) {
    return t('auth:errors.serverError');
  }
  if (error.message) {
    return error.message;
  }
  return t('auth:errors.loginFailed');
};

export const showLoginSuccessNotification = (t: (key: string) => string) => {
  notifications.show({
    title: t('common:notifications.success'),
    message: t('auth:login.successMessage'),
    color: 'green',
  });
};

export const showLoginErrorNotification = (errorMessage: string, t: (key: string) => string) => {
  notifications.show({
    title: t('common:notifications.error'),
    message: errorMessage,
    color: 'red',
  });
};
