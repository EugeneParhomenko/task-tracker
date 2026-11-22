import { type FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from './useAuthStore';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = userName.trim();
    if (!name) return;

    login(name);

    const raw = searchParams.get('redirectTo');
    const isSameOrigin =
      raw &&
      new URL(raw, window.location.origin).origin === window.location.origin;
    const redirectTo = isSameOrigin ? raw : '/';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Task Tracker</h1>
        <p className="login-subtitle">Enter your name to continue</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label" htmlFor="userName">
              User name
            </label>
            <input
              id="userName"
              className="login-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Admin"
              autoComplete="username"
              required
            />
          </div>
          <button className="login-submit" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
