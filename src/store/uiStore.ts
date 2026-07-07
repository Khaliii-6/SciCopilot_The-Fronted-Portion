import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification, Theme } from '@/types';

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  if (resolved === 'dark') {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}

interface UIState {
  sidebarOpen: boolean;
  theme: Theme;
  notifications: Notification[];
  activeModule: string;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: Theme) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setActiveModule: (module: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'dark',
      notifications: [],
      activeModule: 'dashboard',

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: Math.random().toString(36).substring(7) },
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      setActiveModule: (activeModule) => set({ activeModule }),
    }),
    {
      name: 'scipilot-ui',
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen, theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        // Apply saved theme after hydration
        if (state?.theme) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useUIStore.getState();
    if (theme === 'system') {
      applyTheme('system');
    }
  });
}
