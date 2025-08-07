import { Box } from '@mantine/core';
import type { Conference, PageBlock } from '@/generated/types';
import { PageBlockType } from '@/generated/types';
import { BlockWrapper } from './BlockWrapper';
import { RichTextBlock } from './RichTextBlock';
import { MapBlock } from './MapBlock';
import { FormBlock } from './FormBlock';
import { CountdownBlock } from './CountdownBlock';
// import { HeroBlock } from './HeroBlock';
// import { SpeakersBlock } from './SpeakersBlock';

interface Props {
  /** The page block to render */
  block: PageBlock;
  /** The conference data for context */
  conference: Conference;
}

/**
 * Renders different types of page blocks for conference event pages
 * 
 * @param block - The page block configuration to render
 * @param conference - The conference data for context
 * @returns JSX element representing the rendered block
 */
export function PageBlockRenderer({ block, conference }: Props) {
  switch (block.type) {
    case PageBlockType.HERO:
    case PageBlockType.TEXT:
    case PageBlockType.FOOTER:
    case PageBlockType.CREDITS:
    case PageBlockType.OWNERS:
    case PageBlockType.SPEAKERS:
    case PageBlockType.CUSTOM:
      return (
        <BlockWrapper block={block}>
          <RichTextBlock block={block} />
        </BlockWrapper>
      );

    case PageBlockType.MAP:
      return (
        <BlockWrapper block={block}>
          <RichTextBlock block={block} />
          <MapBlock block={block} />
        </BlockWrapper>
      );

    case PageBlockType.FORM:
      return (
        <BlockWrapper block={block}>
          <RichTextBlock block={block} />
          <Box mt="md">
            <FormBlock conference={conference} />
          </Box>
        </BlockWrapper>
      );

    case PageBlockType.COUNTDOWN:
      return (
        <BlockWrapper block={block}>
          <RichTextBlock block={block} />
          <Box mt="md">
            <CountdownBlock conference={conference} />
          </Box>
        </BlockWrapper>
      );

    default:
      return null;
  }
}
