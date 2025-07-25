import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Group, Table } from '@mantine/core';
import { ConferenceSortField, SortOrder } from '@/api-client';

interface ConferencesTableHeaderProps {
  sortBy: ConferenceSortField;
  sortOrder: SortOrder;
  onSort: (field: ConferenceSortField) => void;
}

export function ConferencesTableHeader({ sortBy, sortOrder, onSort }: ConferencesTableHeaderProps) {
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
          <Group gap="xs">Conference {getSortIcon(ConferenceSortField.NAME)}</Group>
        </Table.Th>

        <Table.Th
          style={{ cursor: 'pointer' }}
          onClick={() => onSort(ConferenceSortField.START_DATE)}
        >
          <Group gap="xs">Start Date {getSortIcon(ConferenceSortField.START_DATE)}</Group>
        </Table.Th>

        <Table.Th
          style={{ cursor: 'pointer' }}
          onClick={() => onSort(ConferenceSortField.END_DATE)}
        >
          <Group gap="xs">End Date {getSortIcon(ConferenceSortField.END_DATE)}</Group>
        </Table.Th>

        <Table.Th>Place</Table.Th>
        <Table.Th>Headliner</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Actions</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
}
