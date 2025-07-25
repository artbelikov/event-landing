import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ApplyFormProps, ApplyFormValues } from './types';
import styles from './ApplyForm.module.css';

export const ApplyForm: React.FC<ApplyFormProps> = ({ initialValues = {}, onSubmit }) => {
  const { t } = useTranslation('forms');

  const form = useForm<ApplyFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      message: '',
      ...initialValues,
    },
    validate: {
      fullName: (value) =>
        value.trim().length < 2 ? t('apply.validation.fullNameMinLength') : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : t('apply.validation.invalidEmail')),
      phone: (value) => (value.trim().length < 6 ? t('apply.validation.phoneMinLength') : null),
      company: (value) =>
        value.trim().length === 0 ? t('apply.validation.companyRequired') : null,
      position: (value) =>
        value.trim().length === 0 ? t('apply.validation.positionRequired') : null,
      message: (value) =>
        value.trim().length < 10 ? t('apply.validation.messageMinLength') : null,
    },
  });

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)} className={styles.applyForm}>
      <Stack className={styles.formStack}>
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
        <Group className={styles.formGroup}>
          <Button type="submit">{t('common:buttons.apply')}</Button>
        </Group>
      </Stack>
    </Box>
  );
};
