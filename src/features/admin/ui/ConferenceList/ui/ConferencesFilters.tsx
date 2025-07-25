import { IconSearch } from '@tabler/icons-react';
import { Group, Paper, Select, TextInput } from '@mantine/core';
import { PAGE_SIZE_OPTIONS } from '@/shared/constants';

interface ConferencesFiltersProps {
  search: string;
  pageSize: number;
  onSearchChange: (search: string) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ConferencesFilters({
  search,
  pageSize,
  onSearchChange,
  onPageSizeChange,
}: ConferencesFiltersProps) {
  return (
    <Paper p="md" mb="md" withBorder>
      <Group gap="md">
        <TextInput
          placeholder="Search conferences..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          style={{ flex: 1 }}
        />

        <Select
          placeholder="Page size"
          data={PAGE_SIZE_OPTIONS}
          value={pageSize.toString()}
          onChange={(value) => onPageSizeChange(parseInt(value || '25'))}
          w={140}
        />
      </Group>
    </Paper>
  );
}
