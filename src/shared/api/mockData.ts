import type { Project } from '../types/project';
import type { Task, TaskPriority, TaskStatus } from '../types/task';

const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];
const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];

const TASKS_PER_PROJECT = 20;

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Веб-додаток' },
  { id: 'p2', name: 'Мобільний клієнт' },
  { id: 'p3', name: 'Інфраструктура' },
];

const PROJECT_TASK_TITLES: Record<string, string[]> = {
  p1: [
    'Головна сторінка',
    'Авторизація',
    'Список задач',
    'Фільтри та сортування',
    'Форма створення задачі',
    'Редагування задачі',
    'Видалення задачі',
    'Drag-and-drop колонок',
    'Темна тема',
    'Адаптивна верстка',
    'Доступність (a11y)',
    'Локалізація',
    'Обробка помилок API',
    'Скелетони завантаження',
    'Unit-тести компонентів',
    'E2E сценарії',
    'Оптимізація бандлу',
    'Документація для розробників',
    'Реліз у staging',
    'Фінальний QA',
  ],
  p2: [
    'Splash screen',
    'Онбординг',
    'Логін через OAuth',
    'Список проектів',
    'Деталі задачі',
    'Push-сповіщення',
    'Офлайн-режим',
    'Синхронізація даних',
    'Камера для вкладень',
    'Налаштування профілю',
    'Біометричний вхід',
    'Віджет на головний екран',
    'Глибокі посилання',
    'Аналітика подій',
    'Crash reporting',
    'Beta-канал TestFlight',
    'Оптимізація батареї',
    'Локалізація інтерфейсу',
    'Регресійне тестування',
    'Публікація в Store',
  ],
  p3: [
    'CI/CD пайплайн',
    'Docker-образи',
    'Staging середовище',
    'Production кластер',
    'Моніторинг логів',
    'Алерти SLA',
    'Бекапи БД',
    'Міграції схеми',
    'Секрети та змінні',
    'WAF та rate limit',
    'CDN для статики',
    'SSL сертифікати',
    'Автоскейлінг',
    'Disaster recovery план',
    'Документація runbook',
    'Навантажувальне тестування',
    'Аудит безпеки',
    'Оновлення залежностей',
    'Кошторис і алокація',
    'Рев’ю SRE',
  ],
};

function buildMockTasks(): Task[] {
  const tasks: Task[] = [];

  mockProjects.forEach((project, projectIndex) => {
    const titles = PROJECT_TASK_TITLES[project.id];

    for (let n = 1; n <= TASKS_PER_PROJECT; n++) {
      const globalIndex = projectIndex * TASKS_PER_PROJECT + (n - 1);

      tasks.push({
        id: `t${projectIndex + 1}-${n}`,
        projectId: project.id,
        title: titles[n - 1] ?? `Задача ${n}`,
        status: TASK_STATUSES[globalIndex % TASK_STATUSES.length],
        priority: TASK_PRIORITIES[globalIndex % TASK_PRIORITIES.length],
        createdAt: new Date(2025, 10, 1 + (globalIndex % 28), 9 + (globalIndex % 8), 0, 0),
      });
    }
  });

  return tasks;
}

export const mockTasks: Task[] = buildMockTasks();