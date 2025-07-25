import React from 'react';
import { Button, Group, rem, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { HeadingBlockProps } from './types';
import styles from './HeadingBlock.module.css';

/**
 * Visually prominent event heading block for the landing page.
 * Stands out above the FullscreenBackground, with responsive typography and spacing.
 */
export const HeadingBlock: React.FC<HeadingBlockProps> = ({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  ctaHref,
}) => {
  const theme = useMantineTheme();
  const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  // Responsive values
  const titleSize = isMd ? 64 : isSm ? 48 : 36;
  const spacing = isSm ? 32 : 24;
  const subtitleSize = isMd ? 'xl' : isSm ? 'lg' : 'md';
  const paddingTop = isSm ? rem(64) : rem(40);
  const paddingBottom = isSm ? rem(48) : rem(32);

  return (
    <Stack align="center" className={styles.container}>
      <Title
        order={1}
        size={titleSize}
        fw={900}
        c={theme.colors[theme.primaryColor][7]}
        className={styles.title}
      >
        {title}
      </Title>
      <Text size={subtitleSize} c={theme.colors.gray[7]} fw={500} className={styles.subtitle}>
        {subtitle}
      </Text>
      {ctaLabel && (
        <Group justify="center" mt={isSm ? 20 : 12}>
          {ctaHref ? (
            <Button
              component="a"
              href={ctaHref}
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{
                from: theme.primaryColor,
                to: theme.colors[theme.primaryColor][6],
                deg: 90,
              }}
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabel}
            </Button>
          ) : (
            <Button
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{
                from: theme.primaryColor,
                to: theme.colors[theme.primaryColor][6],
                deg: 90,
              }}
              className={styles.ctaButton}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </Button>
          )}
        </Group>
      )}
    </Stack>
  );
};
