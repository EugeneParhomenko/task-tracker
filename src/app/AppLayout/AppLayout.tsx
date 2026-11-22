import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../../features/auth/useAuthStore';
import './AppLayout.css';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-brand">Task Tracker</p>
        <nav className="app-nav" aria-label="Main navigation">
          <NavLink to="/" className={navLinkClassName} end>
            Dashboard
          </NavLink>
          <NavLink to="/projects" className={navLinkClassName}>
            Projects
          </NavLink>
        </nav>
        <div className="app-user">
          {user ? <span className="app-user__name">{user.name}</span> : null}
          <button
            type="button"
            className="app-user__logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
