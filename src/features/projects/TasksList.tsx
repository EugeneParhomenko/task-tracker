import QueryErrorState from '../../shared/components/QueryErrorState';
import type { Task } from '../../shared/types/task';
import TaskRow from './TaskRow';

type TasksListProps = {
  tasks?: Task[];
  isPending: boolean;
  isRefetching: boolean;
  error: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
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
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
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
