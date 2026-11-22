import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import {
  getProject,
  getProjects,
  getTasks,
  type GetTasksParams,
} from '../../shared/api/mockApi';

export type TaskListFilters = GetTasksParams;

export const projectKeys = {
  projects: ['projects'],
  projectsLists: () => [...projectKeys.projects, 'list'],
  projectDetails: (id: string) => [...projectKeys.projects, id],
  tasks: ['tasks'],
  tasksList: (filters: TaskListFilters) => [
    ...projectKeys.tasks,
    'tasks',
    filters,
  ],
};

export const projectsListQuery = () =>
  queryOptions({
    queryKey: projectKeys.projectsLists(),
    queryFn: ({ signal }) => getProjects(signal),
  });

export const projectDetailQuery = (id: string) =>
  queryOptions({
    queryKey: projectKeys.projectDetails(id),
    queryFn: ({ signal }) => getProject(id, signal),
  });

export const tasksListsQuery = (filters: TaskListFilters) =>
  queryOptions({
    queryKey: projectKeys.tasksList(filters),
    queryFn: ({ signal }) => getTasks(filters, signal),
    placeholderData: keepPreviousData,
  });
