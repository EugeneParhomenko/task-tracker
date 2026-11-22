type TaskDeleteButtonProps = {
  taskTitle: string;
  disabled: boolean;
  isDeleting: boolean;
  onConfirmDelete: () => void;
};

export default function TaskDeleteButton({
  taskTitle,
  disabled,
  isDeleting,
  onConfirmDelete,
}: TaskDeleteButtonProps) {
  const handleClick = () => {
    const confirmed = window.confirm(
      `Delete task “${taskTitle}”? This cannot be undone.`,
    );
    if (!confirmed) return;
    onConfirmDelete();
  };

  return (
    <button
      type="button"
      className="task-delete-btn"
      disabled={disabled}
      aria-busy={isDeleting}
      aria-label={isDeleting ? `Deleting ${taskTitle}` : `Delete ${taskTitle}`}
      onClick={(event) => {
        event.stopPropagation();
        handleClick();
      }}
    >
      {isDeleting ? (
        <>
          <span className="task-delete-btn__spinner" aria-hidden />
          Deleting…
        </>
      ) : (
        'Delete'
      )}
    </button>
  );
}
