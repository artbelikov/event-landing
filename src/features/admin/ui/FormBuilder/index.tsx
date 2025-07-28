import { useState } from 'react';
import { IconEdit, IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export interface FormField {
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

export interface FormBuilderProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
}

const fieldTypeOptions = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'address', label: 'Address' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'multiselect', label: 'Multi-Select' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
];

export function FormBuilder({ fields, onFieldsChange }: FormBuilderProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [formData, setFormData] = useState({
    type: 'text' as FormField['type'],
    label: '',
    placeholder: '',
    required: false,
    options: [] as string[],
    validation: {
      minLength: undefined as number | undefined,
      maxLength: undefined as number | undefined,
      pattern: '',
    },
  });

  const handleAddField = () => {
    setEditingField(null);
    setFormData({
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: [],
      validation: {
        minLength: undefined,
        maxLength: undefined,
        pattern: '',
      },
    });
    open();
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setFormData({
      type: field.type,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options || [],
      validation: {
        minLength: field.validation?.minLength,
        maxLength: field.validation?.maxLength,
        pattern: field.validation?.pattern || '',
      },
    });
    open();
  };

  const handleSaveField = () => {
    if (editingField) {
      const updatedFields = fields.map((field) =>
        field.id === editingField.id ? { ...field, ...formData } : field
      );
      onFieldsChange(updatedFields);
    } else {
      const newField: FormField = {
        id: Date.now(),
        type: formData.type,
        label: formData.label,
        placeholder: formData.placeholder,
        required: formData.required,
        options: formData.options,
        validation: formData.validation,
        order: fields.length + 1,
      };
      onFieldsChange([...fields, newField]);
    }
    close();
  };

  const handleDeleteField = (fieldId: number) => {
    const updatedFields = fields.filter((field) => field.id !== fieldId);
    onFieldsChange(updatedFields);
  };

  const handleReorderFields = (fromIndex: number, toIndex: number) => {
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, movedField);

    const reorderedFields = updatedFields.map((field, index) => ({
      ...field,
      order: index + 1,
    }));

    onFieldsChange(reorderedFields);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'email':
        return '📧';
      case 'phone':
        return '📞';
      case 'address':
        return '📍';
      case 'radio':
        return '🔘';
      case 'checkbox':
        return '☑️';
      case 'select':
        return '📋';
      case 'multiselect':
        return '📋📋';
      case 'textarea':
        return '📄';
      case 'number':
        return '🔢';
      default:
        return '📦';
    }
  };

  const needsOptions = ['radio', 'checkbox', 'select', 'multiselect'].includes(formData.type);

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Title order={3}>Form Fields</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddField}>
          Add Field
        </Button>
      </Group>

      <Stack gap="sm">
        {fields.map((field, index) => (
          <Card key={field.id} withBorder shadow="sm">
            <Group justify="space-between" align="center">
              <Group>
                <IconGripVertical size={16} color="gray" />
                <Text size="lg">{getFieldIcon(field.type)}</Text>
                <div>
                  <Text fw={500}>
                    {field.label}{' '}
                    {field.required && (
                      <Text span c="red">
                        *
                      </Text>
                    )}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {fieldTypeOptions.find((opt) => opt.value === field.type)?.label} • Order:{' '}
                    {field.order}
                  </Text>
                </div>
              </Group>
              <Group gap="xs">
                <Tooltip label="Edit field">
                  <ActionIcon variant="subtle" onClick={() => handleEditField(field)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete field">
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => handleDeleteField(field.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title={editingField ? 'Edit Form Field' : 'Add New Form Field'}
        size="lg"
      >
        <Stack gap="md">
          <Select
            label="Field Type"
            data={fieldTypeOptions}
            value={formData.type}
            onChange={(value) =>
              setFormData({ ...formData, type: (value || 'text') as FormField['type'] })
            }
          />

          <TextInput
            label="Field Label"
            placeholder="Enter field label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            required
          />

          <TextInput
            label="Placeholder"
            placeholder="Enter placeholder text"
            value={formData.placeholder}
            onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
          />

          <Switch
            label="Required field"
            checked={formData.required}
            onChange={(e) => setFormData({ ...formData, required: e.currentTarget.checked })}
          />

          {needsOptions && (
            <>
              <Divider label="Options" labelPosition="center" />
              <Stack gap="sm">
                {formData.options.map((option, index) => (
                  <Group key={index}>
                    <TextInput
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({ ...formData, options: newOptions });
                      }}
                      style={{ flex: 1 }}
                    />
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => {
                        const newOptions = formData.options.filter((_, i) => i !== index);
                        setFormData({ ...formData, options: newOptions });
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
                <Button
                  variant="light"
                  leftSection={<IconPlus size={16} />}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      options: [...formData.options, ''],
                    })
                  }
                >
                  Add Option
                </Button>
              </Stack>
            </>
          )}

          <Divider label="Validation" labelPosition="center" />

          <Group grow>
            <TextInput
              label="Min Length"
              type="number"
              placeholder="Minimum characters"
              value={formData.validation.minLength || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validation: {
                    ...formData.validation,
                    minLength: e.target.value ? parseInt(e.target.value) : undefined,
                  },
                })
              }
            />
            <TextInput
              label="Max Length"
              type="number"
              placeholder="Maximum characters"
              value={formData.validation.maxLength || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validation: {
                    ...formData.validation,
                    maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                  },
                })
              }
            />
          </Group>

          <TextInput
            label="Pattern (Regex)"
            placeholder="Enter validation pattern"
            value={formData.validation.pattern}
            onChange={(e) =>
              setFormData({
                ...formData,
                validation: {
                  ...formData.validation,
                  pattern: e.target.value,
                },
              })
            }
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleSaveField}>{editingField ? 'Update Field' : 'Add Field'}</Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
