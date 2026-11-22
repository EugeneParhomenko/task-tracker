import QueryErrorState from '../../shared/components/QueryErrorState';
import type { Project } from '../../shared/types/project';

type ProjectDetailsProps = {
  project?: Project;
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export default function ProjectDetails({
  project,
  isLoading,
  error,
  onRetry,
  isRetrying,
}: ProjectDetailsProps) {
  return (
    <header className="project-details">
      {isLoading ? (
        <div className="project-details__state">Loading project…</div>
      ) : error ? (
        <QueryErrorState
          className="project-details__state project-details__state--error query-error"
          error={error}
          notFoundMessage="Project not found"
          onRetry={() => onRetry?.()}
          isRetrying={isRetrying}
        />
      ) : (
        <>
          <p className="project-details__eyebrow">Project</p>
          <h1 className="project-details__title">{project?.name}</h1>
          {project?.id ? (
            <p className="project-details__id">{project.id}</p>
          ) : null}
        </>
      )}
    </header>
  );
}
