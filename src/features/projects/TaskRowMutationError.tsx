import { mutationErrorMessage } from '../../shared/api/mutationErrorMessage';

type TaskRowMutationErrorProps = {
  error: unknown;
};

export default function TaskRowMutationError({
  error,
}: TaskRowMutationErrorProps) {
  return (
    <p className="task-row-error" role="alert">
      {mutationErrorMessage(error)}
    </p>
  );
}
