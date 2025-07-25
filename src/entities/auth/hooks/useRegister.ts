import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, OpenAPI } from '@/api-client';
import type { User } from '@/api-client';
import type { RegisterParams } from '../model';
import { authKeys } from '../model';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, RegisterParams>({
    mutationFn: async (params: RegisterParams) => {
      return await AuthService.authControllerRegister(params);
    },
    onSuccess: (user) => {
      // Update user cache (note: register doesn't automatically log in)
      queryClient.setQueryData(authKeys.currentUser(), user);

      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
