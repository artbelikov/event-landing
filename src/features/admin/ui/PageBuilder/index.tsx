import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { IconEdit, IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Box, Button, Card, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { MODAL_KEYS } from '@/shared/constants';
import { PageBlock } from '@/generated';

export interface PageBuilderProps {
  conferenceId: number;
  blocks: PageBlock[];
  onBlocksChange: (blocks: PageBlock[]) => void;
}

const blockTypeLabels = {
  HERO: 'adminPageBuilder.blockTypes.hero',
  TEXT: 'adminPageBuilder.blockTypes.text',
  MAP: 'adminPageBuilder.blockTypes.map',
  FORM: 'adminPageBuilder.blockTypes.form',
  FOOTER: 'adminPageBuilder.blockTypes.footer',
  CREDITS: 'adminPageBuilder.blockTypes.credits',
  OWNERS: 'adminPageBuilder.blockTypes.owners',
  SPEAKERS: 'adminPageBuilder.blockTypes.speakers',
  COUNTDOWN: 'adminPageBuilder.blockTypes.countdown',
  CUSTOM: 'adminPageBuilder.blockTypes.custom',
};

export function PageBuilder({ conferenceId, blocks, onBlocksChange }: PageBuilderProps) {
  const { t } = useTranslation();

  const handleAddBlock = () => {
    modals.openContextModal({
      modal: MODAL_KEYS.PAGE_BLOCK_EDITOR,
      innerProps: {
        onSave: (newBlock: PageBlock) => {
          const blockWithOrder = { ...newBlock, order: blocks.length + 1 };
          onBlocksChange([...blocks, blockWithOrder]);
        },
      },
    });
  };

  const handleEditBlock = (block: PageBlock) => {
    modals.openContextModal({
      modal: MODAL_KEYS.PAGE_BLOCK_EDITOR,
      innerProps: {
        block,
        onSave: (updatedBlock: PageBlock) => {
          const updatedBlocks = blocks.map((b) => (b.id === block.id ? updatedBlock : b));
          onBlocksChange(updatedBlocks);
        },
      },
    });
  };

  const handleDeleteBlock = (blockId: number) => {
    const updatedBlocks = blocks.filter((block) => block.id !== blockId);
    onBlocksChange(updatedBlocks);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedBlocks = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    onBlocksChange(reorderedBlocks);
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'HERO':
        return '🎯';
      case 'TEXT':
        return '📝';
      case 'MAP':
        return '🗺️';
      case 'FORM':
        return '📋';
      case 'FOOTER':
        return '🔚';
      case 'CREDITS':
        return '🏆';
      case 'OWNERS':
        return '👥';
      case 'SPEAKERS':
        return '🎤';
      case 'COUNTDOWN':
        return '⏰';
      case 'CUSTOM':
        return '⚙️';
      default:
        return '📦';
    }
  };

  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Title order={3}>{t('adminPageBuilder.title')}</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddBlock}>
          {t('adminPageBuilder.addBlock')}
        </Button>
      </Group>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} gap="sm">
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id.toString()} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      withBorder
                      shadow="sm"
                    >
                      <Group justify="space-between" align="center">
                        <Group>
                          <div {...provided.dragHandleProps}>
                            <IconGripVertical size={16} color="gray" />
                          </div>
                          <Text size="lg">{getBlockIcon(block.type)}</Text>
                          <div>
                            <Text fw={500}>
                              {t(blockTypeLabels[block.type] || blockTypeLabels.CUSTOM)}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {t('adminPageBuilder.order')}: {block.order}
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <Tooltip label={t('adminPageBuilder.editBlock')}>
                            <ActionIcon variant="subtle" onClick={() => handleEditBlock(block)}>
                              <IconEdit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label={t('adminPageBuilder.deleteBlock')}>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDeleteBlock(block.id)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
