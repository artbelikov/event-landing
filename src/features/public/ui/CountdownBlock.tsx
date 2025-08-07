import type { Conference } from '@/generated/types';
import { CountdownTimer } from './CountdownTimer';
import { getCountdownStart, getCountdownEnd } from '@/shared/utils';

interface CountdownBlockProps {
  conference: Conference;
}

/**
 * Renders countdown timer for the conference
 */
export function CountdownBlock({ conference }: CountdownBlockProps) {
  return (
    <CountdownTimer
      startDate={getCountdownStart(conference)}
      endDate={getCountdownEnd(conference)}
      onComplete={() => {}}
    />
  );
} 