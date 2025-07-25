import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Center, Container, Divider, Paper, Text, Title } from '@mantine/core';
import { GoogleAuth } from '@/features/auth/GoogleAuth';
import { LoginForm } from '@/features/auth/LoginForm';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { FullscreenBackground } from '@/shared/ui/FullscreenBackground';

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();

  const handleLoginSuccess = (response: { access_token: string }) => {
    navigate('/admin/dashboard');
  };

  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <FullscreenBackground>
      <Center style={{ minHeight: '100vh' }}>
        <Container size={420} my={40}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Box mb="xl">
              <Title order={2} ta="center" mb="xs">
                {t('auth:login.title')}
              </Title>
              <Text c="dimmed" size="sm" ta="center">
                {t('auth:login.subtitle')}
              </Text>
            </Box>

            <ErrorAlert error={error} mb="md" />

            <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />

            <Divider label={t('common:divider.or')} labelPosition="center" my="lg" />

            <GoogleAuth onError={handleGoogleError} />

            <Text c="dimmed" size="sm" ta="center" mt="md">
              {t('auth:login.helpText')}
            </Text>
          </Paper>
        </Container>
      </Center>
    </FullscreenBackground>
  );
}
