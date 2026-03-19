import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '@/shared/types/theme';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => {
        set({ mode });
        applyTheme(mode);
      },
      toggleMode: () => {
        const modes: ThemeMode[] = ['light', 'dark', 'system'];
        const currentIndex = modes.indexOf(get().mode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        set({ mode: nextMode });
        applyTheme(nextMode);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.mode);
        }
      },
    }
  )
);

// 应用主题到 DOM
function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', mode);
  }
}

// 监听系统主题变化
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const { mode } = useThemeStore.getState();
    if (mode === 'system') {
      document.documentElement.setAttribute(
        'data-theme',
        e.matches ? 'dark' : 'light'
      );
    }
  });
}
