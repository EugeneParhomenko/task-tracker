import { createBrowserRouter, type RouteObject } from 'react-router';
import LoginPage from '../features/auth/LoginPage';
import { requireAuth, requireNoAuth } from '../features/auth/requireAuth';
import Dashboard from '../features/dashboard/Dashboard';
import ProjectPage from '../features/projects/ProjectPage';
import ProjectsPage from '../features/projects/ProjectsPage';
import AppLayout from './AppLayout';
import NotFoundPage from './NotFoundPage';
import RootErrorBoundary from './RootErrorBoundary';

const projectRoutes: RouteObject = {
  path: 'projects',
  children: [
    { index: true, Component: ProjectsPage },
    { path: ':projectId', Component: ProjectPage },
    {
      path: ':projectId/tasks/:taskId',
      lazy: async () => ({
        Component: (await import('../features/tasks/TaskPage')).default,
      }),
    },
  ],
};

const router = createBrowserRouter([
  {
    path: '/login',
    loader: requireNoAuth,
    Component: LoginPage,
  },
  {
    path: '/',
    loader: requireAuth,
    Component: AppLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      projectRoutes,
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
