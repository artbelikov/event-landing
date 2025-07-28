import { useState } from 'react';
import { IconList, IconPlus, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Group, Paper, Stack, Tabs, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { Guest } from '@/api-client';
import { GuestList, GuestManagementStats } from '@/features/admin';
import { MODAL_KEYS } from '@/shared/constants';

export function AdminGuestsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>('list');
  const openDetailsModal = (guest: Guest) => {
    modals.openContextModal({
      modal: MODAL_KEYS.GUEST_DETAILS,
      innerProps: { guest },
    });
  };

  const openCreateModal = () => {
    modals.openContextModal({
      modal: MODAL_KEYS.GUEST_CREATE,
      innerProps: {},
    });
  };

  const handleGuestSelect = (guest: Guest) => {
    openDetailsModal(guest);
  };

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>{t('adminGuests.title')}</Title>
          <Text c="dimmed" size="sm">
            {t('adminGuests.subtitle')}
          </Text>
        </div>

        <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal} size="md">
          {t('adminGuests.registerButton')}
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="list" leftSection={<IconList size={16} />}>
            {t('adminGuests.tabs.list')}
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
            {t('adminGuests.tabs.settings')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="list" pt="md">
          <Stack gap="md">
            <GuestManagementStats />
            <GuestList onGuestSelect={handleGuestSelect} />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="md">
          <Paper p="xl" withBorder>
            <Stack gap="md" align="center">
              <IconSettings size={48} color="gray" />
              <Title order={3}>{t('adminGuests.settings.title')}</Title>
              <Text c="dimmed" ta="center" maw={500}>
                {t('adminGuests.settings.description')}
              </Text>

              <Stack gap="sm" mt="lg" align="center">
                <Text fw={500}>{t('adminGuests.settings.plannedFeatures.title')}</Text>
                <Text size="sm" c="dimmed">
                  • {t('adminGuests.settings.plannedFeatures.customFields')}
                </Text>
                <Text size="sm" c="dimmed">
                  • {t('adminGuests.settings.plannedFeatures.bulkImport')}
                </Text>
                <Text size="sm" c="dimmed">
                  • {t('adminGuests.settings.plannedFeatures.emailTemplates')}
                </Text>
                <Text size="sm" c="dimmed">
                  • {t('adminGuests.settings.plannedFeatures.validationRules')}
                </Text>
                <Text size="sm" c="dimmed">
                  • {t('adminGuests.settings.plannedFeatures.exportOptions')}
                </Text>
              </Stack>

              <Button variant="light" disabled mt="md">
                Coming Soon
              </Button>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
