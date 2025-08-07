import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Group, Table } from '@mantine/core';
import { ConferenceSortField, SortOrder } from '@/generated';

interface ConferencesTableHeaderProps {
  sortBy: ConferenceSortField;
  sortOrder: SortOrder;
  onSort: (field: ConferenceSortField) => void;
}

export function ConferencesTableHeader({ sortBy, sortOrder, onSort }: ConferencesTableHeaderProps) {
  const { t } = useTranslation();

  const getSortIcon = (field: ConferenceSortField) => {
    if (sortBy !== field) return null;
    return sortOrder === SortOrder.ASC ? (
      <IconChevronUp size={14} />
    ) : (
      <IconChevronDown size={14} />
    );
  };

  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th style={{ cursor: 'pointer' }} onClick={() => onSort(ConferenceSortField.NAME)}>
          <Group gap="xs">
            {t('adminConferences.table.conference')} {getSortIcon(ConferenceSortField.NAME)}
          </Group>
        </Table.Th>

        <Table.Th>{t('adminConferences.table.dates')}</Table.Th>

        <Table.Th>{t('adminConferences.table.place')}</Table.Th>
        <Table.Th>{t('adminConferences.table.status')}</Table.Th>
        <Table.Th
          style={{ cursor: 'pointer' }}
          onClick={() => onSort(ConferenceSortField.CREATED_AT)}
        >
          <Group gap="xs">
            {t('adminConferences.table.created')} {getSortIcon(ConferenceSortField.CREATED_AT)}
          </Group>
        </Table.Th>
        <Table.Th>{t('adminConferences.table.actions')}</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
}
