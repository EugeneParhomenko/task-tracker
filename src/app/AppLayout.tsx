import { useQueryClient } from '@tanstack/react-query';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../features/auth/useAuthStore';
import { useUiStore } from './useUiStore';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link';

export default function AppLayout() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isSidebarOpen = useUiStore((s) => s.isSidebarOpen);
  const setIsSidebarOpen = useUiStore((s) => s.setIsSidebarOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    queryClient.clear();
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={
        isSidebarOpen ? 'app-shell app-shell--sidebar-open' : 'app-shell'
      }
    >
      {isSidebarOpen ? (
        <button
          type="button"
          className="app-sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={
          isSidebarOpen ? 'app-sidebar app-sidebar--open' : 'app-sidebar'
        }
      >
        <div className="app-sidebar__inner">
          <p className="app-brand">Task Tracker</p>
          <nav className="app-nav" aria-label="Main navigation">
            <NavLink
              to="/"
              className={navLinkClassName}
              end
              onClick={closeSidebar}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              className={navLinkClassName}
              onClick={closeSidebar}
            >
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
        </div>
      </aside>

      <div className="app-content">
        <header className="app-topbar">
          <button
            type="button"
            className="app-sidebar-toggle"
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? 'Close menu' : 'Open menu'}
          </button>
        </header>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
