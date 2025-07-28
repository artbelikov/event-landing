import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { modals } from '@/app/modalRegistry';
import { QueryProvider } from '@/app/providers';
import { Router } from './Router';
import { theme } from './theme';

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
