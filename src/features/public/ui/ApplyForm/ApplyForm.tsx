import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Textarea, TextInput } from '@mantine/core';
import type { ApplyFormProps } from './types';
import { useApplyForm } from './useApplyForm';

export function ApplyForm({ initialValues, onSubmit, onSuccess, onError }: ApplyFormProps) {
  const { t } = useTranslation('forms');
  const { form, handleSubmit } = useApplyForm({
    initialValues,
    onSubmit,
    onSuccess,
    onError,
  });

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} p="md">
      <Stack gap="md">
        <TextInput
          label={t('apply.labels.fullName')}
          placeholder={t('apply.placeholders.fullName')}
          {...form.getInputProps('fullName')}
          required
        />

        <TextInput
          label={t('apply.labels.email')}
          placeholder={t('apply.placeholders.email')}
          type="email"
          {...form.getInputProps('email')}
          required
        />

        <TextInput
          label={t('apply.labels.phone')}
          placeholder={t('apply.placeholders.phone')}
          {...form.getInputProps('phone')}
          required
        />

        <TextInput
          label={t('apply.labels.company')}
          placeholder={t('apply.placeholders.company')}
          {...form.getInputProps('company')}
          required
        />

        <TextInput
          label={t('apply.labels.position')}
          placeholder={t('apply.placeholders.position')}
          {...form.getInputProps('position')}
          required
        />

        <Textarea
          label={t('apply.labels.message')}
          placeholder={t('apply.placeholders.message')}
          minRows={4}
          {...form.getInputProps('message')}
          required
        />

        <Group justify="flex-end" mt="lg">
          <Button type="submit" size="md">
            {t('common:buttons.apply')}
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
