import { Box, Text, Title } from '@mantine/core';

interface TimeUnitProps {
  value: number;
  label: string;
}

const formatNumber = (num: number) => num.toString().padStart(2, '0');

export const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <Box ta="center">
    <Title order={1} size="3rem" fw={700}>
      {formatNumber(value)}
    </Title>
    <Text size="sm" c="dimmed">
      {label}
    </Text>
  </Box>
);
