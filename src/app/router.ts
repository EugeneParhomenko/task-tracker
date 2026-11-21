import { createBrowserRouter, type RouteObject } from 'react-router';
import AppLayout from './AppLayout';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import RootErrorBoundary from './RootErrorBoundary';
import Dashboard from '../features/dashboard/Dashboard';
import LoginPage from '../features/auth/login/LoginPage';
import requireAuth from '../features/auth/requireAuth';
import ProjectsPage from '../features/projects/ProjectsPage/ProjectsPage';
import ProjectPage from '../features/projects/ProjectPage/ProjectPage';

const taskRoutes: RouteObject = {
  path: "tasks",
  lazy: async () => {
    const { default: TasksPage } = await import("../features/tasks/TasksPage/TasksPage");
    return {
      Component: TasksPage,
    };
  },
  children: [
    {
      path: ":taskId",
      lazy: async () => {
        const { default: TaskPage } = await import("../features/tasks/TaskPage/TaskPage");
        return {
          Component: TaskPage,
        };
      },
    },
  ],
}

const projectRoutes: RouteObject = {
  path: "projects",
  Component: ProjectsPage,
  children: [
    {
      path: ":projectId",
      Component: ProjectPage,
    },
    taskRoutes,
  ],
}

const router = createBrowserRouter([
  {
    path: "/login",
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
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;