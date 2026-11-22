import { create } from 'zustand';

type AuthState = {
  user: { name: string } | null;

  login: (name: string) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: getUserFromLocalStorage(),

  login: (name) => {
    set({ user: { name } });
    setUserToLocalStorage({ name });
  },

  logout: () => {
    set({ user: null });
    setUserToLocalStorage(null);
  },
}));

function setUserToLocalStorage(user: { name: string } | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
