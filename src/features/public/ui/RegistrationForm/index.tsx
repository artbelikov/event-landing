import { useState } from 'react';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface FormField {
  id: number;
  type:
    | 'text'
    | 'email'
    | 'phone'
    | 'address'
    | 'radio'
    | 'checkbox'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'number';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  order: number;
}

interface RegistrationFormProps {
  conferenceId: number;
  fields: FormField[];
  onSuccess?: () => void;
}

export function RegistrationForm({ conferenceId, fields, onSuccess }: RegistrationFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: fields.reduce(
      (acc, field) => {
        acc[field.label] = '';
        return acc;
      },
      {} as Record<string, any>
    ),
    validate: fields.reduce(
      (acc, field) => {
        acc[field.label] = (value: any) => {
          if (field.required && !value) {
            return `${field.label} is required`;
          }

          if (value && field.validation) {
            if (field.validation.minLength && value.length < field.validation.minLength) {
              return `${field.label} must be at least ${field.validation.minLength} characters`;
            }

            if (field.validation.maxLength && value.length > field.validation.maxLength) {
              return `${field.label} must be no more than ${field.validation.maxLength} characters`;
            }

            if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
              return `${field.label} format is invalid`;
            }
          }

          if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }

          return null;
        };
        return acc;
      },
      {} as Record<string, (value: any) => string | null>
    ),
  });

  const handleSubmit = async (values: Record<string, any>) => {
    setSubmitting(true);
    try {
      const properties = Object.entries(values).map(([key, value]) => ({
        key,
        value: Array.isArray(value) ? value.join(', ') : String(value),
      }));

      const response = await fetch('http://localhost:3005/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conferenceId,
          properties,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      notifications.show({
        title: 'Registration Successful',
        message: 'Thank you for registering for this event!',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      notifications.show({
        title: 'Registration Failed',
        message: 'There was an error registering for this event. Please try again.',
        color: 'red',
        icon: <IconAlertCircle size={16} />,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      ...form.getInputProps(field.label),
    };

    switch (field.type) {
      case 'text':
        return <TextInput key={field.id} {...commonProps} />;

      case 'email':
        return <TextInput key={field.id} type="email" {...commonProps} />;

      case 'phone':
        return <TextInput key={field.id} type="tel" {...commonProps} />;

      case 'address':
        return <TextInput key={field.id} {...commonProps} />;

      case 'textarea':
        return <Textarea key={field.id} minRows={3} {...commonProps} />;

      case 'number':
        return <NumberInput key={field.id} {...commonProps} />;

      case 'radio':
        return <Select key={field.id} data={field.options || []} {...commonProps} />;

      case 'select':
        return <Select key={field.id} data={field.options || []} {...commonProps} />;

      case 'multiselect':
        return <MultiSelect key={field.id} data={field.options || []} {...commonProps} />;

      case 'checkbox':
        return (
          <Checkbox
            key={field.id}
            label={field.label}
            {...form.getInputProps(field.label, { type: 'checkbox' })}
          />
        );

      default:
        return <TextInput key={field.id} {...commonProps} />;
    }
  };

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {sortedFields.map(renderField)}

          <Group justify="flex-end" mt="xl">
            <Button type="submit" loading={submitting} disabled={!form.isValid()} size="lg">
              Register for Event
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
