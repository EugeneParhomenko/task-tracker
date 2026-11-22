import { NavLink } from 'react-router';
import QueryErrorState from '../../shared/components/QueryErrorState';
import type { Task, TaskPriority, TaskStatus } from '../../shared/types/task';

type TaskDetailsProps = {
  task?: Task;
  isLoading: boolean;
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

function formatCreatedAt(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

export default function TaskDetails({
  task,
  isLoading,
  error,
  onRetry,
  isRetrying,
}: TaskDetailsProps) {
  return (
    <article className="task-details">
      {isLoading ? (
        <div className="task-details__state">Loading task…</div>
      ) : error ? (
        <QueryErrorState
          className="task-details__state task-details__state--error query-error"
          error={error}
          notFoundMessage="Task not found"
          onRetry={() => onRetry?.()}
          isRetrying={isRetrying}
        />
      ) : task ? (
        <>
          <p className="task-details__eyebrow">Task</p>
          <h1 className="task-details__title">{task.title}</h1>

          <div className="task-details__badges">
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
          </div>

          <dl className="task-details__meta">
            <div className="task-details__meta-row">
              <dt className="task-details__meta-label">ID</dt>
              <dd className="task-details__meta-value task-details__meta-value--mono">
                {task.id}
              </dd>
            </div>
            <div className="task-details__meta-row">
              <dt className="task-details__meta-label">Project</dt>
              <dd className="task-details__meta-value">
                <NavLink
                  className="task-details__project-link"
                  to={`/projects/${task.projectId}`}
                >
                  {task.projectId}
                </NavLink>
              </dd>
            </div>
            <div className="task-details__meta-row">
              <dt className="task-details__meta-label">Created</dt>
              <dd className="task-details__meta-value">
                {formatCreatedAt(task.createdAt)}
              </dd>
            </div>
          </dl>
        </>
      ) : null}
    </article>
  );
}
