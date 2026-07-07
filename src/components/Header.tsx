import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut, FlaskConical, Sun, Moon, Monitor } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import type { Theme } from '@/types';

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: '浅色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
  { value: 'system', label: '跟随系统', icon: Monitor },
];

function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  const current = themeOptions.find((o) => o.value === theme) || themeOptions[2];
  const nextIndex = (themeOptions.findIndex((o) => o.value === theme) + 1) % themeOptions.length;
  const next = themeOptions[nextIndex];

  const Icon = next.icon;

  return (
    <button
      onClick={() => setTheme(next.value)}
      className="p-2 rounded-lg hover:bg-sci-bg3 transition-colors text-sci-muted hover:text-sci-ink"
      title={`切换主题 (当前: ${current.label})`}
    >
      <Icon size={18} />
    </button>
  );
}

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-sci-bg2/80 backdrop-blur-md border-b border-sci-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-sci-bg3 transition-colors text-sci-muted hover:text-sci-ink"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <FlaskConical className="text-sci-accent" size={22} />
          <span className="font-bold text-lg sci-glow-text">SciCopilot</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <button className="p-2 rounded-lg hover:bg-sci-bg3 transition-colors text-sci-muted hover:text-sci-ink relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sci-danger rounded-full" />
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sci-bg3 border border-sci-border">
              <User size={16} className="text-sci-accent" />
              <span className="text-sm text-sci-ink">{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-sci-bg3 transition-colors text-sci-muted hover:text-sci-danger"
              title="退出登录"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="sci-btn-primary text-sm"
          >
            登录
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
