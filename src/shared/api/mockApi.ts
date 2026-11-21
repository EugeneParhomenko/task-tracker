import type { Project } from '../types/project';
import type { Task, TaskStatus } from '../types/task';
import { ApiError } from './apiError';
import { delay } from './delay';
import { mockProjects, mockTasks as seedTasks } from './mockData';

const PAGE_SIZE = 20;
const MUTATION_FAILURE_RATE = 0.2;

export type GetTasksParams = {
  projectId?: string;
  status?: TaskStatus;
  q?: string;
  page?: number;
};

export type PaginatedTasks = {
  items: Task[];
  total: number;
  page: number;
  pageCount: number;
};

const tasks: Task[] = seedTasks.map((task) => ({
  ...task,
}));

function cloneTask(task: Task): Task {
  return { ...task };
}

function randomLatencyMs(): number {
  return 300 + Math.floor(Math.random() * 501);
}

async function withLatency(signal?: AbortSignal): Promise<void> {
  await delay(randomLatencyMs(), signal);
}

function assertMutationSuccess(): void {
  if (Math.random() < MUTATION_FAILURE_RATE) {
    throw new ApiError(500, 'Mutation failed. Please try again.');
  }
}

export async function getProjects(signal?: AbortSignal): Promise<Project[]> {
  await withLatency(signal);
  return [...mockProjects];
}

export async function getProject(
  id: string,
  signal?: AbortSignal,
): Promise<Project> {
  await withLatency(signal);
  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }
  return project;
}

export async function getTasks(
  params: GetTasksParams,
  signal?: AbortSignal,
): Promise<PaginatedTasks> {
  await withLatency(signal);

  const page = Math.max(1, Math.floor(params.page ?? 1));
  let filtered = tasks;

  if (params.projectId) {
    filtered = filtered.filter((task) => task.projectId === params.projectId);
  }

  if (params.status) {
    filtered = filtered.filter((task) => task.status === params.status);
  }

  const query = params.q?.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(query),
    );
  }

  const total = filtered.length;
  const pageCount = total === 0 ? 0 : Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE).map(cloneTask);

  return { items, total, page, pageCount };
}

export async function getTask(id: string, signal?: AbortSignal): Promise<Task> {
  await withLatency(signal);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return cloneTask(task);
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus,
  signal?: AbortSignal,
): Promise<Task> {
  await withLatency(signal);
  assertMutationSuccess();

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new ApiError(404, 'Task not found');
  }

  tasks[index] = { ...tasks[index], status };
  return cloneTask(tasks[index]);
}

export async function deleteTask(
  id: string,
  signal?: AbortSignal,
): Promise<void> {
  await withLatency(signal);
  assertMutationSuccess();

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new ApiError(404, 'Task not found');
  }

  tasks.splice(index, 1);
}
