import { IconLock, IconMail } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { LoginDto } from '@/api-client';
import { useLogin } from '@/entities/auth';
import { LoginFormProps } from './types';

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm<LoginDto>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('validation.invalidEmail')),
    },
  });

  const handleSubmit = async (values: LoginDto) => {
    try {
      const response = await loginMutation.mutateAsync(values);

      // Success notifications
      notifications.show({
        title: t('common:notifications.success'),
        message: t('login.successMessage', 'Login successful!'),
        color: 'green',
      });

      onSuccess?.(response);

      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);

      let errorMessage = t('errors.loginFailed');
      if (err.status === 401) {
        errorMessage = t('errors.invalidCredentials');
      } else if (err.status >= 500) {
        errorMessage = t('errors.serverError');
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Error notification
      notifications.show({
        title: t('common:notifications.error'),
        message: errorMessage,
        color: 'red',
      });

      onError?.(errorMessage);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={t('labels.email')}
          placeholder={t('placeholders.email')}
          leftSection={<IconMail size={16} />}
          size="md"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label={t('labels.password')}
          placeholder={t('placeholders.password')}
          leftSection={<IconLock size={16} />}
          size="md"
          {...form.getInputProps('password')}
        />

        <Button type="submit" loading={loginMutation.isPending} size="md" fullWidth mt="sm">
          {t('common:buttons.signIn')}
        </Button>
      </Stack>
    </form>
  );
}
