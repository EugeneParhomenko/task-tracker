import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../app/queryClient';
import { deleteTask } from '../../shared/api/mockApi';
import { taskKeys } from './queries';

export function useDeleteTaskMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSettled: (_data, _error, id) => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      if (id) {
        queryClient.removeQueries({ queryKey: taskKeys.detail(id) });
      }
    },
  });
}
