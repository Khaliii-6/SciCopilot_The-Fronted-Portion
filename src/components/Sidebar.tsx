import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  GitBranch,
  Route,
  Code2,
  BarChart3,
  Share2,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { path: '/dashboard', label: '仪表盘', icon: LayoutDashboard, module: 'dashboard' },
  { path: '/paper/read', label: '论文精读', icon: FileText, module: 'paper' },
  { path: '/paper/library', label: '论文库', icon: BookOpen, module: 'library' },
  { path: '/research/decompose', label: '问题拆解', icon: GitBranch, module: 'research' },
  { path: '/experiment/roadmap', label: '实验路线', icon: Route, module: 'experiment' },
  { path: '/code/reproduce', label: '代码复现', icon: Code2, module: 'code' },
  { path: '/result/analyze', label: '结果分析', icon: BarChart3, module: 'result' },
  { path: '/kg/explore', label: '知识图谱', icon: Share2, module: 'kg' },
  { path: '/profile', label: '个人中心', icon: UserCircle, module: 'profile' },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen, setActiveModule } = useUIStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;

  const handleNav = (path: string, module: string) => {
    setActiveModule(module);
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-sci-bg2 border-r border-sci-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sci-border">
          {sidebarOpen && (
            <span className="font-bold text-sci-accent text-lg">SciCopilot</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-sci-bg3 transition-colors text-sci-muted"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path, item.module)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-sci-primary/10 text-sci-accent border border-sci-primary/20'
                    : 'text-sci-muted hover:bg-sci-bg3 hover:text-sci-ink'
                } ${sidebarOpen ? '' : 'justify-center'}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className={isActive ? 'text-sci-accent' : 'group-hover:text-sci-accent'} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-sci-border">
            <div className="sci-card-glow text-xs text-sci-muted">
              <p className="font-semibold text-sci-ink mb-1">SciCopilot v1.0</p>
              <p>AI 科研智能体平台</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sci-bg2/95 backdrop-blur-md border-t border-sci-border z-50 flex justify-around py-2">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path, item.module)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive ? 'text-sci-accent' : 'text-sci-muted'
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Sidebar;
