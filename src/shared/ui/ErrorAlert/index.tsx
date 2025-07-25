import { IconInfoCircle } from '@tabler/icons-react';
import { Alert } from '@mantine/core';
import { ErrorAlertProps } from './types';

export function ErrorAlert({ error, ...props }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert icon={<IconInfoCircle size={16} />} color="red" variant="light" {...props}>
      {error}
    </Alert>
  );
}
