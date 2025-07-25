import React from 'react';
import { Anchor, Box, Container, Group, rem, Stack, Text } from '@mantine/core';
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { FooterProps } from './types';
import styles from './Footer.module.css';

/**
 * Footer widget for the event landing page.
 * Renders copyright, links, and optional extra info.
 * Responsive and visually consistent with Mantine UI.
 */
export const Footer: React.FC<FooterProps> = ({ copyright, links, extraInfo }) => {
  return (
    <Box component="footer" bg="gray.0" py={{ base: 24, sm: 32 }} mt="xl" className={styles.footer}>
      <Container size="lg">
        <Stack gap={8} align="center" justify="center" className={styles.centerText}>
          {links && links.length > 0 && (
            <Group gap={rem(20)} justify="center" wrap="wrap" mb={4} className={styles.wrapGroup}>
              {links.map((link) => (
                <Anchor
                  key={link.href + link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  c="blue.7"
                  underline="hover"
                >
                  {link.label}
                </Anchor>
              ))}
            </Group>
          )}

          {extraInfo && (
            <Box mb={4} className={styles.extraInfo}>
              {extraInfo}
            </Box>
          )}

          <Text size="xs" c="dimmed">
            {copyright}
          </Text>

          <Group justify="center" mt="sm">
            <LanguageSwitcher />
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};
