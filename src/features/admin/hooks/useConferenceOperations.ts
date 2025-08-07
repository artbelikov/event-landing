import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDeleteConference, apiClient } from '@/generated';
import { conferenceKeys } from '@/entities/conference/model';

export function useConferenceOperations() {
  const queryClient = useQueryClient();

  const deleteConference = useMutation({
    mutationFn: async (conferenceId: string) => {
      await apiClient.deleteConference(parseInt(conferenceId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conferenceKeys.lists() });
    },
  });

  return {
    deleteConference: deleteConference.mutateAsync,
    isDeleting: deleteConference.isPending,
  };
}
