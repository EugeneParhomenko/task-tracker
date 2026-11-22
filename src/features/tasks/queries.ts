import { queryOptions } from '@tanstack/react-query';
import { getTask } from '../../shared/api/mockApi';

export const taskKeys = {
  task: ['task'],
  taskDetails: (id: string) => [...taskKeys.task, 'detail', id],
};

export const taskDetailQuery = (id: string) =>
  queryOptions({
    queryKey: taskKeys.taskDetails(id),
    queryFn: ({ signal }) => getTask(id, signal),
  });
