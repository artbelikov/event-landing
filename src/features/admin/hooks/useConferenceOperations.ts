import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConferenceService } from '@/api-client';
import { conferenceKeys } from '@/entities/conference/model';

export function useConferenceOperations() {
  const queryClient = useQueryClient();

  const deleteConference = useMutation({
    mutationFn: async (conferenceId: string) => {
      await ConferenceService.conferenceControllerRemove(conferenceId);
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
