import { type FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '../useAuthStore';

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
    const redirectTo =
      raw?.startsWith('/') && !raw.startsWith('//') ? raw : '/';
    navigate(redirectTo, { replace: true });
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
