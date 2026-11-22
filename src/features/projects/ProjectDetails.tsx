import type { Project } from '../../shared/types/project';

type ProjectDetailsProps = {
  project?: Project;
  isLoading: boolean;
  error: Error | null;
};

export default function ProjectDetails({
  project,
  isLoading,
  error,
}: ProjectDetailsProps) {
  return (
    <header className="project-details">
      {isLoading ? (
        <div className="project-details__state">Loading project…</div>
      ) : error ? (
        <div className="project-details__state project-details__state--error">
          {error.message}
        </div>
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
