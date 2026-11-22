import { ApiError } from './apiError';

export function isApiNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}
