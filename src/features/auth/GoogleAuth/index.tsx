import { IconBrandGoogle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { env } from '@/config';
import { GoogleAuthProps } from './types';

export function GoogleAuth({ onError }: GoogleAuthProps) {
  const { t } = useTranslation('auth');

  const handleGoogleLogin = () => {
    window.location.href = `${env.API_BASE_URL}/auth/google`;
  };

  return (
    <Button
      variant="default"
      leftSection={<IconBrandGoogle size={16} />}
      size="md"
      fullWidth
      onClick={handleGoogleLogin}
    >
      {t('common:buttons.continueWithGoogle')}
    </Button>
  );
}
