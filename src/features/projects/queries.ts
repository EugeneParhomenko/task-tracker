import { queryOptions } from '@tanstack/react-query';
import { getProject, getProjects } from '../../shared/api/mockApi';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
};

export const projectsListQuery = () =>
  queryOptions({
    queryKey: projectKeys.lists(),
    queryFn: ({ signal }) => getProjects(signal),
  });

export const projectDetailQuery = (id: string) =>
  queryOptions({
    queryKey: projectKeys.detail(id),
    queryFn: ({ signal }) => getProject(id, signal),
    enabled: Boolean(id),
  });
