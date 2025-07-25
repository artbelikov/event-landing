import { AlertProps } from '@mantine/core';

export interface ErrorAlertProps extends Omit<AlertProps, 'children'> {
  error: string | null;
}
