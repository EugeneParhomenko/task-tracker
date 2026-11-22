import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import {
  getTask,
  getTasks,
  type GetTasksParams,
} from '../../shared/api/mockApi';

export type TaskListFilters = GetTasksParams;

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: TaskListFilters) => [...taskKeys.lists(), filters] as const,
  detail: (id: string) => [...taskKeys.all, 'detail', id] as const,
};

export const taskDetailQuery = (id: string) =>
  queryOptions({
    queryKey: taskKeys.detail(id),
    queryFn: ({ signal }) => getTask(id, signal),
    enabled: Boolean(id),
  });

export const tasksListsQuery = (filters: TaskListFilters) =>
  queryOptions({
    queryKey: taskKeys.list(filters),
    queryFn: ({ signal }) => getTasks(filters, signal),
    placeholderData: keepPreviousData,
    enabled: Boolean(filters.projectId),
  });
