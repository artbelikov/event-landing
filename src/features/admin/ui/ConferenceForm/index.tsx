import { Button, Group, Paper, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import type { Conference } from '@/api-client';
import { useConferenceForm } from '@/entities/conference/hooks';

export interface ConferenceFormProps {
  conference?: Conference;
  onSuccess?: (conference: Conference) => void;
  onCancel?: () => void;
}

export function ConferenceForm({ conference, onSuccess, onCancel }: ConferenceFormProps) {
  const { form, isEdit, onSubmit } = useConferenceForm({ conference, onSuccess });

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
  ];

  return (
    <Paper withBorder shadow="sm" p="xl" radius="md">
      <Title order={2} mb="lg">
        {isEdit ? 'Edit Conference' : 'Create New Conference'}
      </Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Conference Name"
            placeholder="Enter conference name"
            required
            {...form.getInputProps('name')}
          />

          <Textarea
            label="Description"
            placeholder="Enter conference description"
            required
            rows={4}
            {...form.getInputProps('description')}
          />

          <Group grow>
            <DateTimePicker
              label="Start Date & Time"
              placeholder="Select start date and time"
              required
              {...form.getInputProps('startDate')}
            />

            <DateTimePicker
              label="End Date & Time"
              placeholder="Select end date and time"
              required
              {...form.getInputProps('endDate')}
            />
          </Group>

          <TextInput
            label="Venue/Place"
            placeholder="Enter venue or location"
            required
            {...form.getInputProps('place')}
          />

          <TextInput
            label="Headliner"
            placeholder="Enter main speaker or headliner"
            required
            {...form.getInputProps('headliner')}
          />

          <Group grow>
            <Select
              label="Status"
              placeholder="Select conference status"
              required
              data={statusOptions}
              {...form.getInputProps('status')}
            />

            <TextInput
              label="Form ID"
              placeholder="Enter form ID"
              required
              type="number"
              {...form.getInputProps('formId')}
            />
          </Group>

          <TextInput
            label="Owner ID"
            placeholder="Enter owner ID"
            required
            type="number"
            {...form.getInputProps('ownerId')}
          />

          <Group justify="flex-end" mt="xl">
            {onCancel && (
              <Button variant="subtle" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button type="submit" loading={form.submitting} disabled={!form.isValid()}>
              {isEdit ? 'Update Conference' : 'Create Conference'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
