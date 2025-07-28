import { notifications } from '@mantine/notifications';

export interface ApplyError {
  status?: number;
  message?: string;
}

export const getApplyErrorMessage = (error: ApplyError, t: (key: string) => string): string => {
  if (error.status && error.status >= 500) {
    return t('forms:apply.errors.serverError');
  }
  if (error.status === 400) {
    return t('forms:apply.errors.validationError');
  }
  if (error.message) {
    return error.message;
  }
  return t('forms:apply.errors.submitFailed');
};

export const showApplySuccessNotification = (t: (key: string) => string) => {
  notifications.show({
    title: t('common:notifications.success'),
    message: t('forms:apply.success.submitMessage'),
    color: 'green',
  });
};

export const showApplyErrorNotification = (errorMessage: string, t: (key: string) => string) => {
  notifications.show({
    title: t('common:notifications.error'),
    message: errorMessage,
    color: 'red',
  });
};
