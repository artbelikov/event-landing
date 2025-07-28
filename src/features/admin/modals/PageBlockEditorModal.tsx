import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Group, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { PageBlockSettingsForm } from '@/features/admin';

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

interface InnerProps {
  block?: PageBlock;
  onSave: (block: PageBlock) => void;
}

const defaultSettings = {
  background: '#ffffff',
  padding: '20px',
  margin: '0',
  textAlign: 'left' as const,
  color: '#000000',
  maxWidth: '100%',
  height: 'auto',
};

export function PageBlockEditorModal({ context, id, innerProps }: ContextModalProps<InnerProps>) {
  const { t } = useTranslation();
  const { block, onSave } = innerProps;
  const isEdit = !!block;

  const [formData, setFormData] = useState({
    type: block?.type || 'HERO',
    richText: block?.richText || '',
    mapUrl: block?.mapUrl || '',
    settings: {
      background: block?.settings?.background || defaultSettings.background,
      padding: block?.settings?.padding || defaultSettings.padding,
      margin: block?.settings?.margin || defaultSettings.margin,
      textAlign: block?.settings?.textAlign || defaultSettings.textAlign,
      color: block?.settings?.color || defaultSettings.color,
      maxWidth: block?.settings?.maxWidth || defaultSettings.maxWidth,
      height: block?.settings?.height || defaultSettings.height,
    },
  });

  const blockTypeOptions = [
    { value: 'HERO', label: t('adminPageBuilder.blockTypes.hero') },
    { value: 'TEXT', label: t('adminPageBuilder.blockTypes.text') },
    { value: 'MAP', label: t('adminPageBuilder.blockTypes.map') },
    { value: 'FORM', label: t('adminPageBuilder.blockTypes.form') },
    { value: 'FOOTER', label: t('adminPageBuilder.blockTypes.footer') },
    { value: 'CREDITS', label: t('adminPageBuilder.blockTypes.credits') },
    { value: 'OWNERS', label: t('adminPageBuilder.blockTypes.owners') },
    { value: 'SPEAKERS', label: t('adminPageBuilder.blockTypes.speakers') },
    { value: 'COUNTDOWN', label: t('adminPageBuilder.blockTypes.countdown') },
    { value: 'CUSTOM', label: t('adminPageBuilder.blockTypes.custom') },
  ];

  const handleSave = () => {
    const blockData: PageBlock = isEdit
      ? { ...block!, ...formData }
      : {
          id: Date.now(),
          order: 1,
          ...formData,
        };

    onSave(blockData);
    context.closeModal(id);
  };

  const showMapUrl = formData.type === 'MAP';

  return (
    <Stack gap="md">
      <Select
        label={t('adminPageBuilder.blockType')}
        data={blockTypeOptions}
        value={formData.type}
        onChange={(value) =>
          setFormData({ ...formData, type: (value as PageBlock['type']) || 'HERO' })
        }
      />

      <Textarea
        label={t('adminPageBuilder.richTextContent')}
        placeholder={t('adminPageBuilder.richTextPlaceholder')}
        value={formData.richText}
        onChange={(e) => setFormData({ ...formData, richText: e.target.value })}
        minRows={3}
      />

      {showMapUrl && (
        <TextInput
          label={t('adminPageBuilder.mapUrl')}
          placeholder={t('adminPageBuilder.mapUrlPlaceholder')}
          value={formData.mapUrl}
          onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
        />
      )}

      <PageBlockSettingsForm
        settings={formData.settings}
        onChange={(settings) => setFormData({ ...formData, settings })}
      />

      <Group justify="flex-end" mt="xl">
        <Button variant="subtle" onClick={() => context.closeModal(id)}>
          {t('buttons.cancel')}
        </Button>
        <Button onClick={handleSave}>
          {isEdit ? t('adminPageBuilder.updateBlock') : t('adminPageBuilder.addBlock')}
        </Button>
      </Group>
    </Stack>
  );
}
