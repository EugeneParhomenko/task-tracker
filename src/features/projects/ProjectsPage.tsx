import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { projectsListQuery } from './queries';

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery(projectsListQuery());

  if (isLoading) {
    return (
      <div className="projects-page">
        <div className="projects-state">Loading projects…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <div className="projects-state projects-state--error">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="projects-page">
        <header className="projects-header">
          <h1 className="projects-title">Projects</h1>
        </header>
        <div className="projects-state">No projects found</div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">{projects.length} active projects</p>
      </header>
      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.id} className="project-card">
            <Link className="project-card__link" to={`/projects/${project.id}`}>
              <span className="project-card__name">{project.name}</span>
              <span className="project-card__id">{project.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
