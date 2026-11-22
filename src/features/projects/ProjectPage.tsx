import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';
import ProjectDetails from './ProjectDetails';
import {
  projectDetailQuery,
  tasksListsQuery,
  type TaskListFilters,
} from './queries';
import TasksFilterWrapper from './TasksFilterWrapper';
import TasksList from './TasksList';
import { useProjectTaskFilters } from './useProjectTaskFilters';

export default function ProjectPage() {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading: projectIsLoading,
    error: projectError,
  } = useQuery(projectDetailQuery(projectId ?? ''));

  const {
    searchInput,
    debouncedSearch,
    page,
    status,
    handleSearchInputChange,
    handlePageChange,
    handleStatusChange,
  } = useProjectTaskFilters();

  const filters: TaskListFilters = {
    projectId: projectId ?? '',
    q: debouncedSearch,
    page,
    status,
  };
  const {
    data: paginatedTasks,
    isPending: tasksIsPending,
    isFetching: tasksIsFetching,
    error: tasksError,
  } = useQuery(tasksListsQuery(filters));

  return (
    <div className="project-page">
      <NavLink className="page-back" to="/projects">
        ← Back to projects
      </NavLink>
      <ProjectDetails
        project={project}
        isLoading={projectIsLoading}
        error={projectError}
      />
      {project && (
        <TasksFilterWrapper
          searchInput={searchInput}
          page={page}
          status={status}
          onSearchInputChange={handleSearchInputChange}
          onPageChange={handlePageChange}
          onStatusChange={handleStatusChange}
          paginatedTasks={paginatedTasks}
          isRefetching={tasksIsFetching && !tasksIsPending}
        >
          <TasksList
            tasks={paginatedTasks?.items}
            isPending={tasksIsPending}
            isRefetching={tasksIsFetching && !tasksIsPending}
            error={tasksError}
          />
        </TasksFilterWrapper>
      )}
    </div>
  );
}
