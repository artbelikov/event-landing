import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Box, Container, Loader } from '@mantine/core';
import { useHomepageConference } from '@/entities/conference';
import { PageBlockRenderer } from '@/features/public';
import type { Conference } from '@/generated';

export function HomePage() {
  const { data: conference, isLoading, isError, error } = useHomepageConference();

  if (isLoading) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Loader size="lg" />
      </Box>
    );
  }

  if (isError || !conference) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Welcome" color="blue">
          Welcome to Event Landing Platform. No homepage conference is configured.
        </Alert>
      </Container>
    );
  }

  if (conference.status === 'INACTIVE') {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Event Inactive" color="yellow">
          This event is currently inactive
        </Alert>
      </Container>
    );
  }

  const sortedBlocks = [...conference.pageBlocks].sort(
    (a, b) => a.order - b.order
  );

  return (
    <Box>
      {sortedBlocks.map((block) => (
        <PageBlockRenderer key={block.id} block={block} conference={conference} />
      ))}
    </Box>
  );
} 