import { Link } from 'react-router';
import QueryErrorState from '../../shared/components/QueryErrorState';
import type { Task, TaskPriority } from '../../shared/types/task';
import type { TaskListFilters } from '../tasks/queries';
import { useDeleteTaskMutation } from '../tasks/useDeleteTaskMutation';
import { useUpdateTaskStatusMutation } from '../tasks/useUpdateTaskStatusMutation';
import TaskDeleteButton from './TaskDeleteButton';
import TaskStatusSelector from './TaskStatusSelector';

type TasksListProps = {
  listFilters: TaskListFilters;
  tasks?: Task[];
  isPending: boolean;
  isRefetching: boolean;
  error: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function TasksList({
  listFilters,
  tasks,
  isPending,
  isRefetching,
  error,
  onRetry,
  isRetrying,
}: TasksListProps) {
  const updateStatus = useUpdateTaskStatusMutation(listFilters);
  const deleteTask = useDeleteTaskMutation();

  if (isPending && !tasks?.length) {
    return <div className="tasks-state">Loading tasks…</div>;
  }

  if (error && !tasks?.length) {
    return (
      <QueryErrorState
        className="tasks-state tasks-state--error query-error"
        error={error}
        notFoundMessage="Tasks not found"
        onRetry={() => onRetry?.()}
        isRetrying={isRetrying}
      />
    );
  }

  if (!tasks?.length) {
    return <div className="tasks-state">No tasks match your filters</div>;
  }

  return (
    <div
      className="tasks-list-wrapper"
      aria-busy={isRefetching}
      data-loading={isRefetching || undefined}
    >
      <ul
        className={
          isRefetching ? 'tasks-list tasks-list--behind-overlay' : 'tasks-list'
        }
      >
        {tasks.map((task) => {
          const isUpdating =
            updateStatus.isPending && updateStatus.variables?.id === task.id;
          const isDeleting =
            deleteTask.isPending && deleteTask.variables === task.id;
          const isRowBusy = isUpdating || isDeleting;

          return (
            <li
              key={task.id}
              className={
                isRowBusy
                  ? 'tasks-list__item tasks-list__item--busy'
                  : 'tasks-list__item'
              }
              aria-busy={isRowBusy}
            >
              <div className="tasks-list__row">
                <Link
                  className="tasks-list__title-link"
                  to={`/projects/${task.projectId}/tasks/${task.id}`}
                  tabIndex={isRowBusy ? -1 : undefined}
                  aria-disabled={isRowBusy}
                  onClick={(event) => {
                    if (isRowBusy) event.preventDefault();
                  }}
                >
                  {task.title}
                </Link>
                <div className="tasks-list__actions">
                  <div className="tasks-list__badges">
                    <TaskStatusSelector
                      status={task.status}
                      disabled={isRowBusy}
                      onStatusChange={(status) =>
                        updateStatus.mutate({ id: task.id, status })
                      }
                    />
                    <span
                      className={`task-badge task-badge--priority task-badge--priority-${task.priority}`}
                    >
                      {priorityLabels[task.priority]}
                    </span>
                    <span className="task-badge task-badge--id">{task.id}</span>
                  </div>
                  <TaskDeleteButton
                    taskTitle={task.title}
                    disabled={isRowBusy}
                    isDeleting={isDeleting}
                    onConfirmDelete={() => deleteTask.mutate(task.id)}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {isRefetching ? (
        <div className="tasks-list-overlay" role="status">
          Loading…
        </div>
      ) : null}
    </div>
  );
}
