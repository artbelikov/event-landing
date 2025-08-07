import { Box } from '@mantine/core';
import type { PageBlock } from '@/generated/types';

interface BlockWrapperProps {
  block: PageBlock;
  children: React.ReactNode;
}

export function BlockWrapper({ block, children }: BlockWrapperProps) {
  console.log('BlockWrapper rendered with block:', block.id);
  
  return (
    <Box
      id={`block-${block.id}`}
    >
      {children}
    </Box>
  );
} 