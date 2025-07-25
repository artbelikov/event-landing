import { IconBrandGoogle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { OpenAPI } from '@/api-client';
import { useGoogleAuth } from '@/entities/auth';
import { GoogleAuthProps } from './types';

export function GoogleAuth({ onError }: GoogleAuthProps) {
  const { t } = useTranslation('auth');
  const googleAuthMutation = useGoogleAuth();

  const handleGoogleLogin = async () => {
    try {
      // Redirect to Google OAuth using the configured API base URL
      const baseUrl = OpenAPI.BASE || 'http://localhost:3005';
      window.location.href = `${baseUrl}/auth/google`;
    } catch (err: any) {
      const errorMessage = t('errors.googleAuthFailed');

      notifications.show({
        title: t('common:notifications.error'),
        message: errorMessage,
        color: 'red',
      });

      onError?.(errorMessage);
    }
  };

  return (
    <Button
      variant="default"
      leftSection={<IconBrandGoogle size={16} />}
      size="md"
      fullWidth
      loading={googleAuthMutation.isPending}
      onClick={handleGoogleLogin}
    >
      {t('common:buttons.continueWithGoogle')}
    </Button>
  );
}
