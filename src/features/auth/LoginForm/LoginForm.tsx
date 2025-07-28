import { IconLock, IconMail } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { LoginFormProps } from './types';
import { useLoginForm } from './useLoginForm';

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { t } = useTranslation('auth');
  const { form, handleSubmit, isLoading } = useLoginForm({ onSuccess, onError });

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

        <Button type="submit" loading={isLoading} size="md" fullWidth mt="sm">
          {t('common:buttons.signIn')}
        </Button>
      </Stack>
    </form>
  );
}
