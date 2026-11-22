import { redirect, type LoaderFunctionArgs } from 'react-router';
import { useAuthStore } from './useAuthStore';

export function requireAuth({ url }: LoaderFunctionArgs) {
  const user = useAuthStore.getState().user;
  if (!user) {
    const target = url.pathname + url.search;
    throw redirect(`/login?redirectTo=${encodeURIComponent(target)}`);
  }
  return null;
}

export function requireNoAuth() {
  const user = useAuthStore.getState().user;
  if (user) {
    throw redirect('/');
  }
  return null;
}
