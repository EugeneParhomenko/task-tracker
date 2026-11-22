import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';
import { tasksListsQuery, type TaskListFilters } from '../tasks/queries';
import ProjectDetails from './ProjectDetails';
import { projectDetailQuery } from './queries';
import TasksFilterWrapper from './TasksFilterWrapper';
import TasksList from './TasksList';
import { useProjectTaskFilters } from './useProjectTaskFilters';

export default function ProjectPage() {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading: projectIsLoading,
    isFetching: projectIsFetching,
    error: projectError,
    refetch: refetchProject,
  } = useQuery(projectDetailQuery(projectId ?? ''));

  const {
    searchInput,
    q,
    page,
    status,
    handleSearchInputChange,
    handlePageChange,
    handleStatusChange,
  } = useProjectTaskFilters();

  const filters: TaskListFilters = {
    projectId: projectId ?? '',
    q,
    page,
    status,
  };
  const {
    data: paginatedTasks,
    isPending: tasksIsPending,
    isFetching: tasksIsFetching,
    isPlaceholderData: tasksIsPlaceholderData,
    error: tasksError,
    refetch: refetchTasks,
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
        onRetry={() => refetchProject()}
        isRetrying={projectIsFetching && !projectIsLoading}
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
          isPlaceholderData={tasksIsPlaceholderData}
        >
          <TasksList
            tasks={paginatedTasks?.items}
            isPending={tasksIsPending}
            isRefetching={tasksIsFetching && !tasksIsPending}
            error={tasksError}
            onRetry={() => refetchTasks()}
            isRetrying={tasksIsFetching && !tasksIsPending}
          />
        </TasksFilterWrapper>
      )}
    </div>
  );
}
