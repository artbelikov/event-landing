import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Center,
  Group,
  Loader,
  Pagination,
  Paper,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import type { Conference } from '@/generated';
import { ConferenceSortField, SortOrder } from '@/generated';
import { ConferencesTableHeader } from './ConferencesTableHeader';
import { ConferenceTableRow } from './ConferenceTableRow';

interface ConferencesTableProps {
  conferences: Conference[];
  loading: boolean;
  sortBy: ConferenceSortField;
  sortOrder: SortOrder;
  page: number;
  totalPages: number;
  onSort: (field: ConferenceSortField) => void;
  onPageChange: (page: number) => void;
  onView?: (conference: Conference) => void;
  onEdit?: (conference: Conference) => void;
  onDelete?: (conference: Conference) => Promise<void>;
  onCreateNew?: () => void;
}

export function ConferencesTable({
  conferences,
  loading,
  sortBy,
  sortOrder,
  page,
  totalPages,
  onSort,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onCreateNew,
}: ConferencesTableProps) {
  const { t } = useTranslation();

  const rows = conferences.map((conference) => (
    <ConferenceTableRow
      key={conference.id}
      conference={conference}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  return (
    <Paper withBorder>
      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover>
          <ConferencesTableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />

          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={8}>
                  <Center p="xl">
                    <Loader size="md" />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : conferences.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={8}>
                  <Center p="xl">
                    <Stack align="center" gap="md">
                      <Text c="dimmed">{t('adminConferences.noConferencesFound')}</Text>
                      {onCreateNew && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={onCreateNew}
                        >
                          {t('adminConferences.createFirstConference')}
                        </Button>
                      )}
                    </Stack>
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              rows
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {!loading && conferences.length > 0 && totalPages > 1 && (
        <Group justify="center" p="md">
          <Pagination value={page} onChange={onPageChange} total={totalPages} size="sm" />
        </Group>
      )}
    </Paper>
  );
}
