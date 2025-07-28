import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Alert,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface PropertyFormValue {
  key: string;
  value: string;
}

interface FormValues {
  conferenceId: string;
  properties: PropertyFormValue[];
}

interface GuestPropertiesSectionProps {
  form: UseFormReturnType<FormValues>;
  onAddProperty: () => void;
  onRemoveProperty: (index: number) => void;
}

export function GuestPropertiesSection({
  form,
  onAddProperty,
  onRemoveProperty,
}: GuestPropertiesSectionProps) {
  const { t } = useTranslation();

  const hasEmptyFirstProperty =
    form.values.properties.length === 1 &&
    !form.values.properties[0].key &&
    !form.values.properties[0].value;

  return (
    <Stack gap="md">
      <Divider label={t('adminGuests.form.guestProperties')} labelPosition="center" my="md" />

      <Text size="sm" c="dimmed">
        {t('adminGuests.form.propertiesDescription')}
      </Text>

      {form.values.properties.map((property, index) => (
        <Paper key={index} p="md" withBorder radius="sm" bg="gray.0">
          <Group gap="md" align="flex-end">
            <TextInput
              label={t('adminGuests.form.propertyName')}
              placeholder={t('adminGuests.form.propertyNamePlaceholder')}
              style={{ flex: 1 }}
              {...form.getInputProps(`properties.${index}.key`)}
            />

            <TextInput
              label={t('adminGuests.form.propertyValue')}
              placeholder={t('adminGuests.form.propertyValuePlaceholder')}
              style={{ flex: 1 }}
              {...form.getInputProps(`properties.${index}.value`)}
            />

            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => onRemoveProperty(index)}
              disabled={form.values.properties.length === 1}
              size="lg"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Paper>
      ))}

      <Button variant="light" leftSection={<IconPlus size={16} />} onClick={onAddProperty} mt="sm">
        {t('adminGuests.form.addProperty')}
      </Button>

      {hasEmptyFirstProperty && (
        <Alert color="yellow" variant="light">
          <Text size="sm">{t('adminGuests.form.propertyRequired')}</Text>
        </Alert>
      )}
    </Stack>
  );
}
