import React from 'react';
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Anchor, Avatar, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import type { OrganizerInfoProps } from './types';
import styles from './OrganizerInfo.module.css';

/**
 * Renders information about an event organizer or provider.
 * Displays logo, name, description, and optional website/social links.
 */
export const OrganizerInfo: React.FC<OrganizerInfoProps> = ({
  logo,
  name,
  description,
  website,
  socials,
}) => {
  const { t } = useTranslation('events');

  return (
    <Paper radius="md" shadow="sm" p="md" withBorder className={styles.root}>
      <Group align="flex-start" gap="md" wrap="nowrap">
        <Avatar src={logo} alt={name} size={80} radius="xl" className={styles.avatar} />
        <Stack gap={4} className={styles.stack}>
          <Text fw={700} size="lg" lh={1.2}>
            {name}
          </Text>
          <Text size="sm" mt={4} className={styles.description}>
            {description}
          </Text>
          {(website || (socials && socials.length > 0)) && (
            <Group gap={8} mt={6}>
              {website && (
                <Tooltip label={t('home.tooltips.website')} withArrow>
                  <Anchor
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Website"
                    className={styles.inlineFlex}
                  >
                    <ActionIcon variant="subtle" size="lg">
                      {/* Simple globe SVG icon */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                        <ellipse
                          cx="10"
                          cy="10"
                          rx="4"
                          ry="9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="1"
                          y1="10"
                          x2="19"
                          y2="10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              )}
              {socials?.map((social, idx) => (
                <Tooltip key={social.url + idx} label={social.label} withArrow>
                  <Anchor
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={styles.inlineFlex}
                  >
                    <ActionIcon variant="subtle" size="lg">
                      {social.icon ?? (
                        <Text size="sm" fw={500}>
                          {social.label[0]}
                        </Text>
                      )}
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              ))}
            </Group>
          )}
        </Stack>
      </Group>
    </Paper>
  );
};
