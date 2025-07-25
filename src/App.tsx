import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryProvider } from '@/app/providers';
import { Router } from './Router';
import { theme } from './theme';

const modals = {};

export default function App() {
  return (
    <QueryProvider>
      <MantineProvider theme={theme}>
        <ModalsProvider modals={modals}>
          <Notifications />
          <Router />
        </ModalsProvider>
      </MantineProvider>
    </QueryProvider>
  );
}
