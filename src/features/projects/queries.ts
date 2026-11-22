import { queryOptions } from '@tanstack/react-query';
import { getProject, getProjects } from '../../shared/api/mockApi';

export const projectKeys = {
  projects: ['projects'] as const,
  projectsLists: () => [...projectKeys.projects, 'list'],
  projectDetails: (id: string) => [...projectKeys.projects, id],
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
    enabled: Boolean(id),
  });
