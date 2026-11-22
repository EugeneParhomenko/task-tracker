import { Link } from 'react-router';
import type { Task, TaskPriority, TaskStatus } from '../../shared/types/task';
import { useDeleteTaskMutation } from '../tasks/useDeleteTaskMutation';
import { useUpdateTaskStatusMutation } from '../tasks/useUpdateTaskStatusMutation';
import TaskDeleteButton from './TaskDeleteButton';
import TaskRowMutationError from './TaskRowMutationError';
import TaskStatusSelector from './TaskStatusSelector';

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

type TaskRowProps = {
  task: Task;
};

export default function TaskRow({ task }: TaskRowProps) {
  const updateStatus = useUpdateTaskStatusMutation();
  const deleteTask = useDeleteTaskMutation();

  const isUpdating = updateStatus.isPending;
  const isDeleting = deleteTask.isPending;
  const isRowBusy = isUpdating || isDeleting;

  const handleStatusChange = (status: TaskStatus) => {
    updateStatus.mutate({ id: task.id, status });
  };

  return (
    <li
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
            <div className="task-mutation-control">
              <TaskStatusSelector
                status={task.status}
                disabled={isRowBusy}
                onStatusChange={handleStatusChange}
              />
              {updateStatus.isError && updateStatus.error ? (
                <TaskRowMutationError error={updateStatus.error} />
              ) : null}
            </div>
            <span
              className={`task-badge task-badge--priority task-badge--priority-${task.priority}`}
            >
              {priorityLabels[task.priority]}
            </span>
            <span className="task-badge task-badge--id">{task.id}</span>
          </div>
          <div className="task-mutation-control">
            <TaskDeleteButton
              taskTitle={task.title}
              disabled={isRowBusy}
              isDeleting={isDeleting}
              onConfirmDelete={() => deleteTask.mutate(task.id)}
            />
            {deleteTask.isError && deleteTask.error ? (
              <TaskRowMutationError error={deleteTask.error} />
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
