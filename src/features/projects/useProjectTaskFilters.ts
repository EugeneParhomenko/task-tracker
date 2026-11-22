import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue';
import type { TaskStatus } from '../../shared/types/task';

const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

function parseStatus(raw: string | null): TaskStatus | undefined {
  if (!raw || !TASK_STATUSES.includes(raw as TaskStatus)) {
    return undefined;
  }
  return raw as TaskStatus;
}

function parsePage(raw: string | null): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

function patchSearchParams(
  prev: URLSearchParams,
  patch: {
    q?: string;
    page?: number;
    status?: TaskStatus | null;
  },
): URLSearchParams {
  const next = new URLSearchParams(prev);

  if (patch.q !== undefined) {
    if (patch.q) next.set('q', patch.q);
    else next.delete('q');
  }

  if (patch.page !== undefined) {
    if (patch.page <= 1) next.delete('page');
    else next.set('page', String(patch.page));
  }

  if (patch.status !== undefined) {
    if (patch.status) next.set('status', patch.status);
    else next.delete('status');
  }

  return next;
}

export function useProjectTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePage(searchParams.get('page'));
  const status = parseStatus(searchParams.get('status'));
  const qFromUrl = searchParams.get('q') ?? '';

  const [searchInput, setSearchInput] = useState(qFromUrl);
  const [syncedQFromUrl, setSyncedQFromUrl] = useState(qFromUrl);
  if (qFromUrl !== syncedQFromUrl) {
    setSyncedQFromUrl(qFromUrl);
    setSearchInput(qFromUrl);
  }

  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const applyParams = useCallback(
    (patch: { q?: string; page?: number; status?: TaskStatus | undefined }) => {
      setSearchParams((prev) => patchSearchParams(prev, patch), {
        replace: true,
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const qInUrl = prev.get('q') ?? '';
        if (debouncedSearch === qInUrl) return prev;
        return patchSearchParams(prev, {
          q: debouncedSearch,
          page: 1,
        });
      },
      { replace: true },
    );
  }, [debouncedSearch, setSearchParams]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handlePageChange = (nextPage: number) => {
    applyParams({ page: nextPage });
  };

  const handleStatusChange = (nextStatus: TaskStatus | undefined) => {
    applyParams({ status: nextStatus, page: 1 });
  };

  return {
    searchInput,
    q: qFromUrl,
    page,
    status,
    handleSearchInputChange,
    handlePageChange,
    handleStatusChange,
  };
}
