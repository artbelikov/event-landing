import React from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import type { FullscreenBackgroundProps } from './types';
import styles from './FullscreenBackground.module.css';

/**
 * FullscreenBackground
 * Renders a visually impressive, non-distracting fullscreen background
 * for an offline conference landing page. Uses Mantine theming and
 * supports children rendered on top of the background.
 */
export const FullscreenBackground: React.FC<
  FullscreenBackgroundProps & { children?: React.ReactNode }
> = ({ children }) => {
  const theme = useMantineTheme();

  // CSS variables for theme-based colors
  const cssVars = {
    '--bg-indigo': theme.colors.indigo[6],
    '--bg-cyan': theme.colors.cyan[4],
    '--bg-grape': theme.colors.grape[3],
    '--svg-blue': theme.colors.blue[4],
    '--svg-pink': theme.colors.pink[4],
    '--svg-violet': theme.colors.violet[6],
  } as React.CSSProperties;

  // Abstract SVG shapes for extra visual interest
  const svgShapes = (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 1920 1080"
      className={styles.svgShapes}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="1600" cy="200" r="300" fill="var(--svg-blue)" fillOpacity="0.3" />
      <ellipse cx="400" cy="900" rx="250" ry="120" fill="var(--svg-pink)" fillOpacity="0.25" />
      <rect
        x="900"
        y="200"
        width="400"
        height="400"
        rx="200"
        fill="var(--svg-violet)"
        fillOpacity="0.18"
        transform="rotate(30 1100 400)"
      />
    </svg>
  );

  return (
    <>
      <Box className={styles.background} style={cssVars}>
        {svgShapes}
      </Box>
      <Box className={styles.content}>{children}</Box>
    </>
  );
};
