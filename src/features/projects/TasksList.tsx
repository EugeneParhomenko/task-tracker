import { Link } from 'react-router';
import QueryErrorState from '../../shared/components/QueryErrorState';
import type { Task, TaskPriority, TaskStatus } from '../../shared/types/task';

type TasksListProps = {
  tasks?: Task[];
  isPending: boolean;
  isRefetching: boolean;
  error: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In progress',
  done: 'Done',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function TasksList({
  tasks,
  isPending,
  isRefetching,
  error,
  onRetry,
  isRetrying,
}: TasksListProps) {
  if (isPending && !tasks?.length) {
    return <div className="tasks-state">Loading tasks…</div>;
  }

  if (error && !tasks?.length) {
    return (
      <QueryErrorState
        className="tasks-state tasks-state--error query-error"
        error={error}
        notFoundMessage="Tasks not found"
        onRetry={onRetry}
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
        {tasks.map((task) => (
          <li key={task.id} className="tasks-list__item">
            <Link
              className="tasks-list__link"
              to={`/projects/${task.projectId}/tasks/${task.id}`}
            >
              <span className="tasks-list__title">{task.title}</span>
              <span className="tasks-list__badges">
                <span
                  className={`task-badge task-badge--status task-badge--${task.status}`}
                >
                  {statusLabels[task.status]}
                </span>
                <span
                  className={`task-badge task-badge--priority task-badge--priority-${task.priority}`}
                >
                  {priorityLabels[task.priority]}
                </span>
                <span className="task-badge task-badge--id">{task.id}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {isRefetching ? (
        <div className="tasks-list-overlay" role="status">
          Loading…
        </div>
      ) : null}
    </div>
  );
}
