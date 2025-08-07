import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import {
  CreateGuestRequest,
  Guest,
  CreateGuestPropertyRequest,
  useCreateGuest,
  UpdateGuestRequest,
  apiClient,
} from '@/generated';
import {
  createGuestError,
  createGuestNotifications,
  isFormValid,
  logGuestError,
  validateConferenceId,
  validatePropertyKey,
  validatePropertyValue,
} from '../model';

export interface PropertyFormValue {
  key: string;
  value: string;
}

export interface FormValues {
  conferenceId: string;
  properties: PropertyFormValue[];
}

export interface UseGuestFormProps {
  guest?: Guest;
  preselectedConferenceId?: number;
  onSuccess?: (guest: Guest) => void;
}

export interface UseGuestFormReturn {
  form: ReturnType<typeof useForm<FormValues>>;
  isEdit: boolean;
  addProperty: () => void;
  removeProperty: (index: number) => void;
  handleSubmit: (values: FormValues) => Promise<void>;
  isFormValid: () => boolean;
}

export function useGuestForm({
  guest,
  preselectedConferenceId,
  onSuccess,
}: UseGuestFormProps): UseGuestFormReturn {
  const { t } = useTranslation();
  const isEdit = !!guest;
  const notifications = createGuestNotifications(t);

  const form = useForm<FormValues>({
    initialValues: {
      conferenceId: preselectedConferenceId?.toString() || guest?.conferenceId?.toString() || '',
      properties: guest?.properties?.map((prop) => ({
        key: prop.key,
        value: prop.value,
      })) || [{ key: '', value: '' }],
    },

    validate: {
      conferenceId: (value: string): string | null => validateConferenceId(value, t),
      properties: {
        key: (value: string, _values: FormValues, path: string): string | null => {
          const index = parseInt(path.split('.')[1]);
          return validatePropertyKey(value, _values.properties, index, t);
        },
        value: (value: string, _values: FormValues, path: string): string | null => {
          const index = parseInt(path.split('.')[1]);
          const keyValue = _values.properties[index]?.key;
          return validatePropertyValue(value, keyValue, t);
        },
      },
    },
  });

  const addProperty = (): void => {
    form.insertListItem('properties', { key: '', value: '' });
  };

  const removeProperty = (index: number): void => {
    if (form.values.properties.length > 1) {
      form.removeListItem('properties', index);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const validProperties = values.properties.filter(
        (prop) => prop.key.trim().length > 0 && prop.value.trim().length > 0
      );

      const properties: CreateGuestPropertyRequest[] = validProperties.map((prop) => ({
        key: prop.key.trim(),
        value: prop.value.trim(),
      }));

      const payload = {
        properties,
      };

      let result: Guest;

      if (isEdit && guest) {
        const updatePayload: UpdateGuestRequest = { ...payload, id: guest.id };
        result = await apiClient.updateGuest(guest.id, updatePayload);
        notifications.success.updated();
      } else {
        const createPayload: CreateGuestRequest = payload;
        result = await apiClient.createGuest(createPayload);
        notifications.success.created();
      }

      onSuccess?.(result);
    } catch (error: unknown) {
      const guestError = createGuestError(error);
      logGuestError(isEdit ? 'update' : 'create', guestError);

      if (isEdit) {
        notifications.error.updateFailed(guestError.message);
      } else {
        notifications.error.createFailed(guestError.message);
      }
    }
  };

  const checkFormValid = (): boolean => {
    return isFormValid(form.isValid(), form.values.properties);
  };

  return {
    form,
    isEdit,
    addProperty,
    removeProperty,
    handleSubmit,
    isFormValid: checkFormValid,
  };
}
