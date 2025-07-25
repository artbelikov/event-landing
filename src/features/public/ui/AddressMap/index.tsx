import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Stack, Text } from '@mantine/core';
import type { AddressMapProps } from './types';
import styles from './AddressMap.module.css';

/**
 * Displays a physical address and an embedded map.
 * Responsive and visually integrated with Mantine UI.
 */
export const AddressMap: React.FC<AddressMapProps> = ({ address, mapEmbedUrl, title }) => {
  const { t } = useTranslation('events');

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className={styles.addressMapContainer}>
      <Stack gap="md">
        <Text size="lg" fw={700} ta="center">
          {title || t('home.location.mapTitle')}
        </Text>
        <Text size="md" c="dimmed" ta="center">
          {address}
        </Text>
        <Box className={styles.mapWrapper}>
          <iframe
            src={mapEmbedUrl}
            title={title || t('home.location.mapTitle')}
            className={styles.mapIframe}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Stack>
    </Paper>
  );
};
