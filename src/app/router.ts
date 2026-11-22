import { createBrowserRouter, type RouteObject } from 'react-router';
import LoginPage from '../features/auth/login/LoginPage';
import requireAuth from '../features/auth/requireAuth';
import Dashboard from '../features/dashboard/Dashboard';
import ProjectPage from '../features/projects/ProjectPage/ProjectPage';
import ProjectsPage from '../features/projects/ProjectsPage/ProjectsPage';
import AppLayout from './AppLayout/AppLayout';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import RootErrorBoundary from './RootErrorBoundary/RootErrorBoundary';

const projectRoutes: RouteObject = {
  path: 'projects',
  children: [
    { index: true, Component: ProjectsPage },
    { path: ':projectId', Component: ProjectPage },
    {
      path: ':projectId/tasks/:taskId',
      lazy: async () => ({
        Component: (await import('../features/tasks/TaskPage/TaskPage'))
          .default,
      }),
    },
  ],
};

const router = createBrowserRouter([
  {
    path: '/login',
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
