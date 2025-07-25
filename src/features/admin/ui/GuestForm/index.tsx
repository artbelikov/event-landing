import { useState } from 'react';
import { IconAlertCircle, IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Alert,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  Conference,
  CreateGuestDto,
  Guest,
  GuestPropertyDto,
  GuestService,
  UpdateGuestDto,
} from '@/api-client';

export interface GuestFormProps {
  guest?: Guest;
  preselectedConferenceId?: number;
  onSuccess?: (guest: Guest) => void;
  onCancel?: () => void;
}

interface PropertyFormValue {
  key: string;
  value: string;
}

interface FormValues {
  conferenceId: string;
  properties: PropertyFormValue[];
}

export function GuestForm({ guest, preselectedConferenceId, onSuccess, onCancel }: GuestFormProps) {
  const isEdit = !!guest;
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loadingConferences, setLoadingConferences] = useState(true);

  const form = useForm<FormValues>({
    initialValues: {
      conferenceId: preselectedConferenceId ? preselectedConferenceId.toString() : '',
      properties: [{ key: '', value: '' }],
    },

    validate: {
      conferenceId: (value) => {
        if (!value || value.trim().length === 0) {
          return 'Conference is required';
        }
        const conferenceIdNum = parseInt(value);
        if (isNaN(conferenceIdNum) || conferenceIdNum <= 0) {
          return 'Please select a valid conference';
        }
        return null;
      },

      properties: {
        key: (value, _values, path) => {
          // Extract the index from the path (e.g., "properties.0.key" -> 0)
          const index = parseInt(path.split('.')[1]);
          const properties = form.values.properties;

          if (!value || value.trim().length === 0) {
            // Allow empty key only if it's the last property and both key and value are empty
            if (
              index === properties.length - 1 &&
              (!properties[index]?.value || properties[index].value.trim().length === 0)
            ) {
              return null;
            }
            return 'Property key is required';
          }

          // Check for duplicate keys
          const duplicateIndex = properties.findIndex(
            (prop, i) => i !== index && prop.key.trim().toLowerCase() === value.trim().toLowerCase()
          );
          if (duplicateIndex !== -1) {
            return 'Property key must be unique';
          }

          return null;
        },

        value: (value, _values, path) => {
          // Extract the index from the path
          const index = parseInt(path.split('.')[1]);
          const properties = form.values.properties;
          const keyValue = properties[index]?.key;

          if (keyValue && keyValue.trim().length > 0 && (!value || value.trim().length === 0)) {
            return 'Property value is required when key is provided';
          }

          return null;
        },
      },
    },
  });

  const addProperty = () => {
    form.insertListItem('properties', { key: '', value: '' });
  };

  const removeProperty = (index: number) => {
    if (form.values.properties.length > 1) {
      form.removeListItem('properties', index);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // Filter out empty properties
      const validProperties = values.properties.filter(
        (prop) => prop.key.trim().length > 0 && prop.value.trim().length > 0
      );

      const properties: GuestPropertyDto[] = validProperties.map((prop) => ({
        key: prop.key.trim(),
        value: prop.value.trim(),
      }));

      const payload = {
        conferenceId: parseInt(values.conferenceId),
        properties,
      };

      let result: Guest;

      if (isEdit) {
        const updatePayload: UpdateGuestDto = payload;
        result = await GuestService.guestControllerUpdate(guest!.id.toString(), updatePayload);

        notifications.show({
          title: 'Guest Updated',
          message: 'Guest has been successfully updated',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      } else {
        const createPayload: CreateGuestDto = payload;
        result = await GuestService.guestControllerCreate(createPayload);

        notifications.show({
          title: 'Guest Created',
          message: 'New guest has been successfully created',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      }

      onSuccess?.(result);
    } catch (error: any) {
      console.error('Guest form submission error:', error);

      let errorMessage = 'An unexpected error occurred';
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.body?.message) {
        errorMessage = error.body.message;
      }

      notifications.show({
        title: isEdit ? 'Update Failed' : 'Creation Failed',
        message: errorMessage,
        color: 'red',
        icon: <IconAlertCircle size={16} />,
      });
    }
  };

  const conferenceOptions = conferences.map((conference) => ({
    value: conference.id.toString(),
    label: `${conference.name} (${new Date(conference.startDate).toLocaleDateString()})`,
  }));

  if (loadingConferences) {
    return (
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Group justify="center" p="xl">
          <Loader size="md" />
          <Text>Loading conferences...</Text>
        </Group>
      </Paper>
    );
  }

  return (
    <Paper withBorder shadow="sm" p="xl" radius="md">
      <Title order={2} mb="lg">
        {isEdit ? 'Edit Guest' : 'Register New Guest'}
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Select
            label="Conference"
            placeholder="Select a conference"
            required
            data={conferenceOptions}
            disabled={!!preselectedConferenceId}
            searchable
            {...form.getInputProps('conferenceId')}
          />

          <Divider label="Guest Properties" labelPosition="center" my="md" />

          <Text size="sm" c="dimmed">
            Add custom properties for this guest (e.g., name, email, company, etc.)
          </Text>

          {form.values.properties.map((property, index) => (
            <Paper key={index} p="md" withBorder radius="sm" bg="gray.0">
              <Group gap="md" align="flex-end">
                <TextInput
                  label="Property Name"
                  placeholder="e.g., name, email, company"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`properties.${index}.key`)}
                />

                <TextInput
                  label="Property Value"
                  placeholder="e.g., John Doe, john@example.com"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`properties.${index}.value`)}
                />

                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() => removeProperty(index)}
                  disabled={form.values.properties.length === 1}
                  size="lg"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Paper>
          ))}

          <Button
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={addProperty}
            mt="sm"
          >
            Add Property
          </Button>

          {form.values.properties.length === 1 &&
            !form.values.properties[0].key &&
            !form.values.properties[0].value && (
              <Alert color="yellow" variant="light">
                <Text size="sm">
                  Please add at least one property for the guest (e.g., name, email, etc.)
                </Text>
              </Alert>
            )}

          <Group justify="flex-end" mt="xl">
            {onCancel && (
              <Button variant="subtle" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              loading={form.submitting}
              disabled={
                !form.isValid() ||
                (form.values.properties.length === 1 &&
                  !form.values.properties[0].key &&
                  !form.values.properties[0].value)
              }
            >
              {isEdit ? 'Update Guest' : 'Register Guest'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
