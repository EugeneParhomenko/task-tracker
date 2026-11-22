import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import {
  getTask,
  getTasks,
  type GetTasksParams,
} from '../../shared/api/mockApi';

export type TaskListFilters = GetTasksParams;

export const taskKeys = {
  tasks: ['tasks'] as const,
  tasksList: (filters: TaskListFilters) => [...taskKeys.tasks, filters],
  taskDetails: (id: string) => [...taskKeys.tasks, 'detail', id],
};

export const taskDetailQuery = (id: string) =>
  queryOptions({
    queryKey: taskKeys.taskDetails(id),
    queryFn: ({ signal }) => getTask(id, signal),
    enabled: Boolean(id),
  });

export const tasksListsQuery = (filters: TaskListFilters) =>
  queryOptions({
    queryKey: taskKeys.tasksList(filters),
    queryFn: ({ signal }) => getTasks(filters, signal),
    placeholderData: keepPreviousData,
    enabled: Boolean(filters.projectId),
  });
