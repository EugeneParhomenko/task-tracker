import { useId } from 'react';
import type { TaskStatus } from '../../shared/types/task';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
] as const;

type TaskStatusSelectorProps = {
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  disabled?: boolean;
};

export default function TaskStatusSelector({
  status,
  onStatusChange,
  disabled = false,
}: TaskStatusSelectorProps) {
  const labelId = useId();

  return (
    <label className="task-status-select">
      <span className="visually-hidden" id={labelId}>
        Task status
      </span>
      <select
        className={`task-status-select__control task-status-select__control--${status}`}
        aria-labelledby={labelId}
        value={status}
        disabled={disabled}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
