import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';
import { taskDetailQuery } from './queries';
import TaskDetails from './TaskDetails';

export default function TaskPage() {
  const { projectId, taskId } = useParams();
  const {
    data: task,
    isLoading: taskIsLoading,
    error: taskError,
  } = useQuery(taskDetailQuery(taskId ?? ''));

  const backProjectId = projectId ?? task?.projectId;

  return (
    <div className="task-page">
      {backProjectId ? (
        <NavLink className="page-back" to={`/projects/${backProjectId}`}>
          ← Back to project
        </NavLink>
      ) : (
        <NavLink className="page-back" to="/projects">
          ← Back to projects
        </NavLink>
      )}
      <TaskDetails task={task} isLoading={taskIsLoading} error={taskError} />
    </div>
  );
}
