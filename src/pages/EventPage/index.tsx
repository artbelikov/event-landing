import { IconAlertCircle } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Container, Loader } from '@mantine/core';
import { useConferenceByUrl } from '@/entities/conference';
import { PageBlockRenderer } from '@/features/public';
import type { Conference } from '@/generated';

export function EventPage() {
  const { customUrl } = useParams<{ customUrl: string }>();
  const { data: conference, isLoading, isError, error } = useConferenceByUrl(customUrl);

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
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error?.message || 'Conference not found'}
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
