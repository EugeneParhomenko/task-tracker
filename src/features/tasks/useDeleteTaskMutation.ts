import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../shared/api/mockApi';
import { taskKeys } from './queries';

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: async (_data, id) => {
      if (id) {
        queryClient.removeQueries({ queryKey: taskKeys.detail(id) });
      }
    },
    onSettled: () => {
      if (queryClient.isMutating() === 1) {
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      }
    },
  });
}
