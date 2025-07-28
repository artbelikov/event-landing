import { useTranslation } from 'react-i18next';
import { useForm, zodResolver } from '@mantine/form';
import {
  getApplyErrorMessage,
  showApplyErrorNotification,
  showApplySuccessNotification,
  type ApplyError,
} from './utils';
import { createApplySchema, type ApplyFormData } from './validation';

export interface UseApplyFormProps {
  initialValues?: Partial<ApplyFormData>;
  onSuccess?: (data: ApplyFormData) => void;
  onError?: (errorMessage: string) => void;
  onSubmit?: (data: ApplyFormData) => Promise<void> | void;
}

export function useApplyForm({
  initialValues = {},
  onSuccess,
  onError,
  onSubmit,
}: UseApplyFormProps = {}) {
  const { t } = useTranslation();
  const applySchema = createApplySchema(t);

  const form = useForm<ApplyFormData>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      message: '',
      ...initialValues,
    },
    validate: zodResolver(applySchema),
    transformValues: (values) => ({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      position: values.position.trim(),
      message: values.message.trim(),
    }),
  });

  const handleSubmit = async (values: ApplyFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Default submission logic - could be replaced with actual API call
        console.log('Apply form submitted:', values);
      }

      showApplySuccessNotification(t);
      onSuccess?.(values);
      form.reset();
    } catch (error: unknown) {
      const applyError = error as ApplyError;
      const errorMessage = getApplyErrorMessage(applyError, t);

      console.error('Apply form error:', error);
      showApplyErrorNotification(errorMessage, t);
      onError?.(errorMessage);
    }
  };

  return {
    form,
    handleSubmit,
  };
}
