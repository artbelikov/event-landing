import { Box, Container, Text } from '@mantine/core';
import type { Conference } from '@/api-client';
import { CountdownTimer } from './CountdownTimer';
import { RegistrationForm } from './RegistrationForm';

export interface PageBlock {
  id: number;
  type:
    | 'HERO'
    | 'TEXT'
    | 'MAP'
    | 'FORM'
    | 'FOOTER'
    | 'CREDITS'
    | 'OWNERS'
    | 'SPEAKERS'
    | 'COUNTDOWN'
    | 'CUSTOM';
  richText: string;
  mapUrl: string;
  order: number;
  settings?: {
    background?: string;
    padding?: string;
    margin?: string;
    textAlign?: string;
    color?: string;
    maxWidth?: string;
    height?: string;
  };
}

interface Props {
  block: PageBlock;
  conference: any;
}

function getCountdownStart(conf: any): string {
  const now = Date.now();
  const upcoming = conf.eventDates
    .flatMap((d: any) => {
      if (d.type === EventDateType.SINGLE && d.date) return [new Date(d.date).getTime()];
      if (d.type === EventDateType.PERIOD && d.from) return [new Date(d.from).getTime()];
      return [];
    })
    .filter((t: number) => t > now);

  const target = upcoming.length
    ? Math.min(...upcoming)
    : Math.min(
        ...conf.eventDates.map((d: any) => {
          if (d.type === EventDateType.SINGLE && d.date) return new Date(d.date).getTime();
          if (d.type === EventDateType.PERIOD && d.from) return new Date(d.from).getTime();
          return Number.MAX_SAFE_INTEGER;
        })
      );
  return new Date(target).toISOString();
}

function getCountdownEnd(conf: any): string {
  const startIso = getCountdownStart(conf);
  const startTime = new Date(startIso).getTime();
  const period = conf.eventDates.find(
    (d: any) =>
      d.type === EventDateType.PERIOD && d.from && new Date(d.from).getTime() === startTime
  );
  if (period && period.to) return period.to;
  return startIso;
}

export function PageBlockRenderer({ block, conference }: Props) {
  const style = {
    background: block.settings?.background || '#ffffff',
    padding: block.settings?.padding || '20px',
    margin: block.settings?.margin || '0',
    textAlign: (block.settings?.textAlign as 'left' | 'center' | 'right') || 'left',
    color: block.settings?.color || '#000000',
    maxWidth: block.settings?.maxWidth || '100%',
  } as React.CSSProperties;

  switch (block.type) {
    case 'HERO':
    case 'TEXT':
    case 'FOOTER':
    case 'CREDITS':
    case 'OWNERS':
    case 'SPEAKERS':
    case 'CUSTOM':
      return (
        <Box key={block.id} style={style}>
          <Container size="lg">
            <div dangerouslySetInnerHTML={{ __html: block.richText }} />
          </Container>
        </Box>
      );
    case 'MAP':
      return (
        <Box key={block.id} style={style}>
          <Container size="lg">
            <div dangerouslySetInnerHTML={{ __html: block.richText }} />
            {block.mapUrl && (
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
            )}
          </Container>
        </Box>
      );
    case 'FORM':
      return (
        <Box key={block.id} style={style}>
          <Container size="lg">
            <div dangerouslySetInnerHTML={{ __html: block.richText }} />
            <Box mt="md">
              {conference.formFields?.length ? (
                <RegistrationForm
                  conferenceId={conference.id}
                  fields={conference.formFields}
                  onSuccess={() => {}}
                />
              ) : (
                <Text c="dimmed">No registration form configured for this event</Text>
              )}
            </Box>
          </Container>
        </Box>
      );
    case 'COUNTDOWN':
      return (
        <Box key={block.id} style={style}>
          <Container size="lg">
            <div dangerouslySetInnerHTML={{ __html: block.richText }} />
            <Box mt="md">
              <CountdownTimer
                startDate={getCountdownStart(conference)}
                endDate={getCountdownEnd(conference)}
                onComplete={() => {}}
              />
            </Box>
          </Container>
        </Box>
      );
    default:
      return null;
  }
}
