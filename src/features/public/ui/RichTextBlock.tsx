import type { PageBlock } from '@/generated/types';

interface RichTextBlockProps {
  block: PageBlock;
}

/**
 * Renders rich text content from a page block
 */
export function RichTextBlock({ block }: RichTextBlockProps) {
  return <div dangerouslySetInnerHTML={{ __html: block.richText }} />;
} 