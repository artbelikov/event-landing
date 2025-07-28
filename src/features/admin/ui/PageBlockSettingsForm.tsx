import { useTranslation } from 'react-i18next';
import { ColorInput, Group, Select, TextInput, Title } from '@mantine/core';

interface PageBlockSettings {
  background: string;
  padding: string;
  margin: string;
  textAlign: string;
  color: string;
  maxWidth: string;
  height: string;
}

interface Props {
  settings: PageBlockSettings;
  onChange: (settings: PageBlockSettings) => void;
}

export function PageBlockSettingsForm({ settings, onChange }: Props) {
  const { t } = useTranslation();

  const textAlignOptions = [
    { value: 'left', label: t('adminPageBuilder.textAlign.left') },
    { value: 'center', label: t('adminPageBuilder.textAlign.center') },
    { value: 'right', label: t('adminPageBuilder.textAlign.right') },
  ];

  return (
    <>
      <Title order={4}>{t('adminPageBuilder.blockSettings')}</Title>

      <Group grow>
        <ColorInput
          label={t('adminPageBuilder.backgroundColor')}
          value={settings.background}
          onChange={(value) => onChange({ ...settings, background: value || '#ffffff' })}
        />
        <ColorInput
          label={t('adminPageBuilder.textColor')}
          value={settings.color}
          onChange={(value) => onChange({ ...settings, color: value || '#000000' })}
        />
      </Group>

      <Group grow>
        <TextInput
          label={t('adminPageBuilder.padding')}
          placeholder={t('adminPageBuilder.paddingPlaceholder')}
          value={settings.padding}
          onChange={(e) => onChange({ ...settings, padding: e.target.value })}
        />
        <TextInput
          label={t('adminPageBuilder.margin')}
          placeholder={t('adminPageBuilder.marginPlaceholder')}
          value={settings.margin}
          onChange={(e) => onChange({ ...settings, margin: e.target.value })}
        />
      </Group>

      <Group grow>
        <Select
          label={t('adminPageBuilder.textAlignment')}
          data={textAlignOptions}
          value={settings.textAlign}
          onChange={(value) => onChange({ ...settings, textAlign: value || 'left' })}
        />
        <TextInput
          label={t('adminPageBuilder.maxWidth')}
          placeholder={t('adminPageBuilder.maxWidthPlaceholder')}
          value={settings.maxWidth}
          onChange={(e) => onChange({ ...settings, maxWidth: e.target.value })}
        />
      </Group>
    </>
  );
}
