import type { PaginatedTasks } from '../../shared/api/mockApi';
import type { TaskStatus } from '../../shared/types/task';

type TasksFilterWrapperProps = {
  searchInput: string;
  page: number;
  status: TaskStatus | undefined;
  onSearchInputChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onStatusChange: (status: TaskStatus) => void;
  paginatedTasks?: PaginatedTasks;
  isRefetching: boolean;
  children: React.ReactNode;
};

export default function TasksFilterWrapper({
  searchInput,
  page,
  status,
  onSearchInputChange,
  onPageChange,
  onStatusChange,
  paginatedTasks,
  isRefetching,
  children,
}: TasksFilterWrapperProps) {
  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
  ];

  const pageCount = paginatedTasks?.pageCount ?? 0;
  const total = paginatedTasks?.total ?? 0;

  return (
    <section className="tasks-section" aria-labelledby="tasks-section-title">
      <div className="tasks-section__head">
        <h2 id="tasks-section-title" className="tasks-section__title">
          Tasks
        </h2>
        {paginatedTasks ? (
          <p className="tasks-section__meta">
            {total} {total === 1 ? 'task' : 'tasks'}
            {pageCount > 0 ? ` · page ${page} of ${pageCount}` : ''}
          </p>
        ) : null}
      </div>

      <div className="tasks-filter">
        <label className="tasks-filter__field tasks-filter__field--search">
          <span className="tasks-filter__label">Search</span>
          <input
            className="tasks-filter__input"
            type="search"
            value={searchInput}
            placeholder="Filter by title…"
            onChange={(e) => onSearchInputChange(e.target.value)}
          />
        </label>
        <label className="tasks-filter__field">
          <span className="tasks-filter__label">Status</span>
          <select
            className="tasks-filter__select"
            value={status ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              onStatusChange(value as TaskStatus);
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tasks-list-panel">{children}</div>

      <nav className="tasks-pagination" aria-label="Task list pagination">
        <button
          type="button"
          className="tasks-pagination__btn"
          disabled={page === 1 || !paginatedTasks || isRefetching}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span className="tasks-pagination__info">
          Page {page}
          {pageCount > 0 ? ` / ${pageCount}` : ''}
        </span>
        <button
          type="button"
          className="tasks-pagination__btn"
          disabled={
            !paginatedTasks || paginatedTasks.pageCount <= page || isRefetching
          }
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </nav>
    </section>
  );
}
