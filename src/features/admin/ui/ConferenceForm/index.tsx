import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Switch, Tabs, Textarea, TextInput, Title } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import type { Conference } from '@/generated';
import { useConferenceForm } from '@/entities/conference';
import { PageBuilder } from '../PageBuilder';

export interface ConferenceFormProps {
  conference?: Conference;
  onSuccess?: (conference: Conference) => void;
  onCancel?: () => void;
}

export function ConferenceForm({ conference, onSuccess, onCancel }: ConferenceFormProps) {
  const { t } = useTranslation();
  const { form, isEdit, onSubmit, blocks, setBlocks } = useConferenceForm({
    conference,
    onSuccess,
  });

  return (
    <Box>
      <Title order={2} mb="lg">
        {t(isEdit ? 'adminConferences.form.editTitle' : 'adminConferences.form.createTitle')}
      </Title>

      <Tabs defaultValue="details" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="details">{t('adminConferences.form.tabs.details')}</Tabs.Tab>
          <Tabs.Tab value="page-builder">{t('adminConferences.form.tabs.pageBuilder')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details" pt="md">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label={t('adminConferences.form.labels.name')}
                placeholder={t('adminConferences.form.placeholders.name')}
                required
                {...form.getInputProps('name')}
              />

              <Textarea
                label={t('adminConferences.form.labels.description')}
                placeholder={t('adminConferences.form.placeholders.description')}
                required
                rows={4}
                {...form.getInputProps('description')}
              />

              <DateTimePicker
                label={t('adminConferences.form.labels.eventDate')}
                placeholder={t('adminConferences.form.placeholders.eventDate')}
                required
                {...form.getInputProps('eventDates.0.date')}
              />

              <TextInput
                label={t('adminConferences.form.labels.place')}
                placeholder={t('adminConferences.form.placeholders.place')}
                required
                {...form.getInputProps('place')}
              />

              <TextInput
                label={t('adminConferences.form.labels.customUrl')}
                placeholder={t('adminConferences.form.placeholders.customUrl')}
                description={t('adminConferences.form.descriptions.customUrl')}
                {...form.getInputProps('customUrl')}
              />

              <Switch
                label={t('adminConferences.form.labels.status')}
                onLabel={t('adminConferences.status.active')}
                offLabel={t('adminConferences.status.inactive')}
                {...form.getInputProps('status', { type: 'checkbox' })}
              />

              <Group justify="flex-end" mt="xl">
                {onCancel && (
                  <Button variant="subtle" onClick={onCancel}>
                    {t('common:buttons.cancel')}
                  </Button>
                )}

                <Button type="submit" loading={form.submitting}>
                  {t(
                    isEdit
                      ? 'adminConferences.form.buttons.update'
                      : 'adminConferences.form.buttons.create'
                  )}
                </Button>
              </Group>
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="page-builder" pt="md">
          <PageBuilder
            conferenceId={conference?.id || 0}
            blocks={blocks}
            onBlocksChange={setBlocks}
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
