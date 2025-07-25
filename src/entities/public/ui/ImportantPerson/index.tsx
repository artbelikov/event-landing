import React from 'react';
import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import type { ImportantPersonProps } from './types';
import styles from './ImportantPerson.module.css';

/**
 * Renders a key person's information for the event.
 * Displays photo, name, title/role, and a short bio.
 */
export const ImportantPerson: React.FC<ImportantPersonProps> = ({ photo, name, title, bio }) => (
  <Paper radius="md" shadow="sm" p="md" withBorder className={styles.paper}>
    <Group gap="md" wrap="nowrap">
      <Avatar src={photo} alt={name} size={80} radius="xl" className={styles.avatar} />
      <Stack gap={4} className={styles.stack}>
        <Text fw={700} size="lg" lh={1.2}>
          {name}
        </Text>
        <Text c="dimmed" size="sm">
          {title}
        </Text>
        <Text size="sm" mt={4} className={styles.bio}>
          {bio}
        </Text>
      </Stack>
    </Group>
  </Paper>
);
