import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { useLogin } from '@/entities/auth';
import {
  getLoginErrorMessage,
  showLoginErrorNotification,
  showLoginSuccessNotification,
  type LoginError,
} from './utils';
import { createLoginSchema, type LoginFormData } from './validation';

export interface UseLoginFormProps {
  onSuccess?: (response: any) => void;
  onError?: (errorMessage: string) => void;
}

export function useLoginForm({ onSuccess, onError }: UseLoginFormProps = {}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const loginSchema = createLoginSchema(t);

  const form = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
    transformValues: (values) => ({
      email: values.email.trim(),
      password: values.password,
    }),
  });

  const handleSubmit = async (values: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(values);

      showLoginSuccessNotification(t);
      onSuccess?.(response);
      navigate('/admin/dashboard');
    } catch (error: unknown) {
      const loginError = error as LoginError;
      const errorMessage = getLoginErrorMessage(loginError, t);

      console.error('Login error:', error);
      showLoginErrorNotification(errorMessage, t);
      onError?.(errorMessage);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: loginMutation.isPending,
  };
}
