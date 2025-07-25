import { IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useLogout } from '@/entities/auth';

interface LogoutButtonProps {
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoutButton({ variant = 'light', size = 'sm' }: LogoutButtonProps) {
  const { t } = useTranslation(['auth', 'common']);
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      notifications.show({
        title: t('common:notifications.success'),
        message: t('auth:logout.successMessage', 'Successfully logged out'),
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: t('common:notifications.error'),
        message: t('auth:logout.errorMessage', 'Logout failed'),
        color: 'red',
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      leftSection={<IconLogout size={16} />}
      loading={logoutMutation.isPending}
      onClick={handleLogout}
    >
      {t('common:buttons.logout')}
    </Button>
  );
}
