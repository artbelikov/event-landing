import { notifications } from '@mantine/notifications';

export interface NotificationOptions {
  title: string;
  message: string;
  type: 'success' | 'error';
}

export const showGuestNotification = (options: NotificationOptions) => {
  notifications.show({
    title: options.title,
    message: options.message,
    color: options.type === 'success' ? 'green' : 'red',
  });
};

export const createGuestNotifications = (t: (key: string) => string) => ({
  success: {
    created: () =>
      showGuestNotification({
        title: t('adminGuests.form.success.created'),
        message: t('adminGuests.form.success.createdMessage'),
        type: 'success',
      }),
    updated: () =>
      showGuestNotification({
        title: t('adminGuests.form.success.updated'),
        message: t('adminGuests.form.success.updatedMessage'),
        type: 'success',
      }),
  },
  error: {
    createFailed: (message?: string) =>
      showGuestNotification({
        title: t('adminGuests.form.errors.createFailed'),
        message: message || t('adminGuests.form.errors.unexpected'),
        type: 'error',
      }),
    updateFailed: (message?: string) =>
      showGuestNotification({
        title: t('adminGuests.form.errors.updateFailed'),
        message: message || t('adminGuests.form.errors.unexpected'),
        type: 'error',
      }),
  },
});
