import { useTranslation } from 'react-i18next';
import { ContextModalProps } from '@mantine/modals';
import { GuestForm } from '@/features/admin';

interface InnerProps {
  onSuccess?: () => void;
}

export function GuestCreateModal({ context, id, innerProps }: ContextModalProps<InnerProps>) {
  const { t } = useTranslation();

  const handleSuccess = () => {
    context.closeModal(id);
    innerProps.onSuccess?.();
  };

  return <GuestForm onSuccess={handleSuccess} onCancel={() => context.closeModal(id)} />;
}
