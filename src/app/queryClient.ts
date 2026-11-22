import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '../shared/api/apiError';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status === 404) &&
        failureCount < 1,
    },
  },
});
