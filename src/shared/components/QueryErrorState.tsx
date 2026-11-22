import { isApiNotFound } from '../api/isApiNotFound';

type QueryErrorStateProps = {
  error: Error;
  notFoundMessage: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
};

export default function QueryErrorState({
  error,
  notFoundMessage,
  onRetry,
  isRetrying = false,
  className = 'query-error',
}: QueryErrorStateProps) {
  const isNotFound = isApiNotFound(error);

  return (
    <div className={className} role="alert">
      <p className="query-error__message">
        {isNotFound ? notFoundMessage : error.message}
      </p>
      {!isNotFound && onRetry ? (
        <button
          type="button"
          className="query-error__retry"
          onClick={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? 'Loading...' : 'Try again'}
        </button>
      ) : null}
    </div>
  );
}
