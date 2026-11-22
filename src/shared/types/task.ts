export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;
};

export type TaskStatus = '' | 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';
