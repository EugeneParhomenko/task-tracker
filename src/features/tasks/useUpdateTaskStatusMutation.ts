import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PaginatedTasks } from '../../shared/api/mockApi';
import { updateTaskStatus } from '../../shared/api/mockApi';
import type { Task, TaskStatus } from '../../shared/types/task';
import { taskKeys } from './queries';

type MutationContext = {
  previousLists: [readonly unknown[], PaginatedTasks | undefined][];
  previousDetail: Task | undefined;
  taskId: string;
};

export function useUpdateTaskStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      updateTaskStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) });

      const previousLists = queryClient.getQueriesData<PaginatedTasks>({
        queryKey: taskKeys.lists(),
      });
      const previousDetail = queryClient.getQueryData<Task>(
        taskKeys.detail(id),
      );

      queryClient.setQueriesData<PaginatedTasks>(
        { queryKey: taskKeys.lists() },
        (old) =>
          old
            ? {
                ...old,
                items: old.items.map((t) =>
                  t.id === id ? { ...t, status } : t,
                ),
              }
            : old,
      );

      queryClient.setQueryData<Task>(taskKeys.detail(id), (old) =>
        old ? { ...old, status } : old,
      );

      return {
        previousLists,
        previousDetail,
        taskId: id,
      } satisfies MutationContext;
    },
    onError: (_error, _variables, context) => {
      if (!context) return;

      for (const [queryKey, data] of context.previousLists) {
        queryClient.setQueryData(queryKey, data);
      }

      queryClient.setQueryData(
        taskKeys.detail(context.taskId),
        context.previousDetail,
      );
    },
    onSettled: (_data, _error, variables) => {
      if (queryClient.isMutating() === 1) {
        void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        if (variables?.id) {
          void queryClient.invalidateQueries({
            queryKey: taskKeys.detail(variables.id),
          });
        }
      }
    },
  });
}
