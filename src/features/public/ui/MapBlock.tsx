import { Box } from '@mantine/core';
import type { PageBlock } from '@/generated/types';

interface MapBlockProps {
  block: PageBlock;
}

/**
 * Renders map if URL is provided in the page block
 */
export function MapBlock({ block }: MapBlockProps) {
  if (!block.mapUrl) return null;
  
  return (
    <Box mt="md">
      <iframe
        src={block.mapUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
} 