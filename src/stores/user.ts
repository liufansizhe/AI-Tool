import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/shared/types/api';

interface UserState {
  token: string | null;
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLogin: false,
      setUser: (user) => set({ user, isLogin: true }),
      setToken: (token) => set({ token }),
      logout: () => {
        set({ token: null, user: null, isLogin: false });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ token: state.token, user: state.user, isLogin: state.isLogin }),
    }
  )
);
