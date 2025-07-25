import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, Paper, Stack, Text } from '@mantine/core';
import { CountdownTimerProps } from './types';
import styles from './CountdownTimer.module.css';

function getTimeParts(diffMs: number) {
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate, label }) => {
  const { t } = useTranslation(['events', 'common']);

  const eventTime =
    typeof eventDate === 'string' ? new Date(eventDate).getTime() : eventDate.getTime();

  const [now, setNow] = useState(() => Date.now());
  const diff = eventTime - now;
  const { days, hours, minutes, seconds } = getTimeParts(diff);

  useEffect(() => {
    if (diff <= 0) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [eventTime]);

  const eventDateObj = new Date(eventTime);
  const formattedDate = eventDateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDateObj.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder className={styles.root}>
      {label && (
        <Text size="lg" fw={500} className={styles.mbXs} c="dimmed">
          {label}
        </Text>
      )}
      <Stack gap={4} align="center">
        <Text size="md" c="dimmed">
          {t('events:home.countdown.eventStartsAt')}
        </Text>
        <Text size="xl" fw={700}>
          {formattedDate} &middot; {formattedTime}
        </Text>
        <Group mt="md" gap="xs" justify="center" wrap="nowrap">
          <TimeBlock value={days} label={t('common:time.days')} />
          <Separator />
          <TimeBlock value={hours} label={t('common:time.hours')} />
          <Separator />
          <TimeBlock value={minutes} label={t('common:time.minutes')} />
          <Separator />
          <TimeBlock value={seconds} label={t('common:time.seconds')} />
        </Group>
        {diff <= 0 && (
          <Text className={styles.mtMd} c="green" fw={600}>
            {t('events:home.countdown.eventStarted')}
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

interface TimeBlockProps {
  value: number;
  label: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ value, label }) => (
  <Stack gap={0} align="center" className={styles.timeBlock}>
    <Text size="2xl" fw={700} className={styles.lhTight}>
      {value.toString().padStart(2, '0')}
    </Text>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
  </Stack>
);

const Separator: React.FC = () => (
  <Text size="xl" fw={700} c="dimmed" className={styles.separator}>
    :
  </Text>
);
