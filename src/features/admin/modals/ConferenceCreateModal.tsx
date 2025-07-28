import { useTranslation } from 'react-i18next';
import { ContextModalProps } from '@mantine/modals';
import { ConferenceForm } from '@/features/admin';

interface InnerProps {
  onSuccess?: () => void;
}

export function ConferenceCreateModal({ context, id, innerProps }: ContextModalProps<InnerProps>) {
  const { t } = useTranslation();

  const handleSuccess = () => {
    context.closeModal(id);
    innerProps.onSuccess?.();
  };

  return <ConferenceForm onSuccess={handleSuccess} onCancel={() => context.closeModal(id)} />;
}
