import { useTranslation } from 'react-i18next';
import { Box, Group, Title } from '@mantine/core';
import { TimeUnit } from './TimeUnit';
import type { CountdownTimerProps } from './types';
import { useCountdown } from './useCountdown';

export function CountdownTimer({ startDate, endDate, onComplete }: CountdownTimerProps) {
  const { t } = useTranslation();
  const { timeLeft, isVisible } = useCountdown(startDate, endDate, onComplete);

  if (!isVisible) {
    return null;
  }

  return (
    <Box>
      <Title order={2} ta="center" mb="lg">
        {t('countdown.title')}
      </Title>
      <Group justify="center" gap="xl">
        <TimeUnit value={timeLeft.days} label={t('countdown.days')} />
        <TimeUnit value={timeLeft.hours} label={t('countdown.hours')} />
        <TimeUnit value={timeLeft.minutes} label={t('countdown.minutes')} />
        <TimeUnit value={timeLeft.seconds} label={t('countdown.seconds')} />
      </Group>
    </Box>
  );
}
