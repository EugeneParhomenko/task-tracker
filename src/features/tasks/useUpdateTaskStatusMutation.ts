import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../app/queryClient';
import type { PaginatedTasks } from '../../shared/api/mockApi';
import { updateTaskStatus } from '../../shared/api/mockApi';
import type { Task, TaskStatus } from '../../shared/types/task';
import { taskKeys, type TaskListFilters } from './queries';

type MutationContext = {
  previousLists: [readonly unknown[], PaginatedTasks | undefined][];
  previousDetail: Task | undefined;
  taskId: string;
};

function applyStatusToLists(
  id: string,
  status: TaskStatus,
  listFilters: TaskListFilters,
) {
  queryClient.setQueriesData<PaginatedTasks>(
    { queryKey: taskKeys.lists() },
    (old) => {
      if (!old) return old;

      const items = old.items
        .map((task) => (task.id === id ? { ...task, status } : task))
        .filter(
          (task) => !listFilters.status || task.status === listFilters.status,
        );

      return { ...old, items };
    },
  );
}

export function useUpdateTaskStatusMutation(listFilters: TaskListFilters) {
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

      applyStatusToLists(id, status, listFilters);

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
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      if (variables?.id) {
        void queryClient.invalidateQueries({
          queryKey: taskKeys.detail(variables.id),
        });
      }
    },
  });
}
