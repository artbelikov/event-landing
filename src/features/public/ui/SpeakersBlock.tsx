import { Box, Container, Card, Avatar, Text, Group, Stack } from '@mantine/core';
import type { PageBlock } from '@/generated/types';

interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface SpeakersBlockProps {
  block: PageBlock;
}

export function SpeakersBlock({ block }: SpeakersBlockProps) {
  const settings = block.settings as any;
  
  // Mock speakers data - in a real implementation, this would come from the block data
  const speakers: Speaker[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Chief Technology Officer',
      company: 'Tech Innovations Inc.',
      bio: 'Leading expert in artificial intelligence and machine learning with over 15 years of experience.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Senior Software Engineer',
      company: 'Future Systems',
      bio: 'Specialist in cloud architecture and distributed systems with a focus on scalability.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <Box
      style={{
        background: settings?.background || '#f8f9fa',
        padding: settings?.padding || '60px 20px',
      }}
    >
      <Container size="lg">
        <div dangerouslySetInnerHTML={{ __html: block.richText }} />
        
        <Box
          mt="xl"
          style={{
            display: settings?.display || 'grid',
            gridTemplateColumns: settings?.gridTemplateColumns || 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: settings?.gap || '30px',
          }}
        >
          {speakers.map((speaker) => (
            <Card key={speaker.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Avatar src={speaker.photo} size="lg" radius="xl" />
                <Stack gap="xs">
                  <Text fw={500} size="lg">{speaker.name}</Text>
                  <Text size="sm" c="dimmed">{speaker.title}</Text>
                  <Text size="sm" c="dimmed">{speaker.company}</Text>
                </Stack>
              </Group>
              <Text size="sm" mt="md" lineClamp={3}>
                {speaker.bio}
              </Text>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 