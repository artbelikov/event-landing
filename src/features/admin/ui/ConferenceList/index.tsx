import { useEffect, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Container, Modal } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { ConferenceSortField, SortOrder } from '@/api-client';
import type { Conference } from '@/api-client';
import { useConferencesListPaginated } from '@/entities/conference';
import { useConferenceOperations } from '../../hooks/useConferenceOperations';
import { ConferenceForm } from '../ConferenceForm';
import { ConferencesFilters } from './ui/ConferencesFilters';
import { ConferencesTable } from './ui/ConferencesTable';

interface ConferenceListProps {
  onConferenceSelect?: (conference: Conference) => void;
}

export function ConferenceList({ onConferenceSelect }: ConferenceListProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [sortBy, setSortBy] = useState<ConferenceSortField>(ConferenceSortField.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [editingConference, setEditingConference] = useState<Conference | undefined>();

  const { data, isLoading, error, refetch } = useConferencesListPaginated({
    page,
    pageSize,
    search: debouncedSearch,
    sortBy,
    sortOrder,
  });

  const { deleteConference } = useConferenceOperations();

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [debouncedSearch, sortBy, sortOrder]);

  const handleSort = (field: ConferenceSortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortBy(field);
      setSortOrder(SortOrder.ASC);
    }
  };

  const handleCreateNew = () => {
    setEditingConference(undefined);
    openFormModal();
  };

  const handleEdit = (conference: Conference) => {
    setEditingConference(conference);
    openFormModal();
  };

  const handleFormSuccess = () => {
    closeFormModal();
    setEditingConference(undefined);
    refetch();
  };

  const handleDelete = async (conference: Conference) => {
    await deleteConference(conference.id.toString());
  };

  if (error) {
    return (
      <Container size="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          Failed to load conferences. Please try again.
        </Alert>
      </Container>
    );
  }

  const conferences = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <Container size="xl">
      <ConferencesFilters
        search={search}
        pageSize={pageSize}
        onSearchChange={setSearch}
        onPageSizeChange={setPageSize}
      />

      <ConferencesTable
        conferences={conferences}
        loading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        page={page}
        totalPages={totalPages}
        onSort={handleSort}
        onPageChange={setPage}
        onView={onConferenceSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreateNew}
      />

      <Modal opened={formModalOpened} onClose={closeFormModal} size="lg">
        <ConferenceForm
          conference={editingConference}
          onSuccess={handleFormSuccess}
          onCancel={closeFormModal}
        />
      </Modal>
    </Container>
  );
}
