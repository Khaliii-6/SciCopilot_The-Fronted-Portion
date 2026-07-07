import { useNavigate } from 'react-router-dom';
import {
  FileText,
  GitBranch,
  Route,
  Code2,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { mockAPI } from '@/services/api';

const quickActions = [
  { icon: FileText, label: '论文精读', path: '/paper/read', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { icon: GitBranch, label: '问题拆解', path: '/research/decompose', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Route, label: '实验路线', path: '/experiment/roadmap', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Code2, label: '代码复现', path: '/code/reproduce', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: BarChart3, label: '结果分析', path: '/result/analyze', color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const recentActivities = [
  { action: '精读论文', target: 'Attention Is All You Need', time: '2 小时前', icon: FileText },
  { action: '拆解问题', target: '代码克隆检测方向', time: '昨天', icon: GitBranch },
  { action: '生成实验方案', target: 'GNN-based Clone Detection', time: '3 天前', icon: Route },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const papers = mockAPI.getMockPapers();

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome */}
      <div className="sci-card-glow">
        <h1 className="text-2xl font-bold mb-2">
          欢迎回来，<span className="sci-glow-text">{user?.username || '研究者'}</span>
        </h1>
        <p className="text-sci-muted">今天想进行什么研究？</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="sci-section-title mb-4">快速入口</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="sci-card flex flex-col items-center gap-3 py-6 group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={action.color} />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Papers */}
        <div className="lg:col-span-2">
          <h2 className="sci-section-title mb-4">最近论文</h2>
          <div className="space-y-3">
            {papers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => navigate('/paper/read')}
                className="sci-card cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-sci-accent transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-sci-muted mt-1">{paper.authors.join(', ')}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="sci-badge-info">{paper.arxiv_id}</span>
                      <span className="text-xs text-sci-muted flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(paper.uploaded_at).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  </div>
                  <Star size={18} className="text-sci-muted hover:text-sci-warning cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Stats */}
          <div>
            <h2 className="sci-section-title mb-4">学习进度</h2>
            <div className="sci-card space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-sci-muted">本周论文</span>
                  <span className="text-sci-accent font-semibold">5 / 10</span>
                </div>
                <div className="h-2 bg-sci-bg3 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-sci-primary to-sci-accent rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-sci-muted">实验完成度</span>
                  <span className="text-sci-success font-semibold">75%</span>
                </div>
                <div className="h-2 bg-sci-bg3 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-sci-success to-emerald-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-sci-muted">代码复现</span>
                  <span className="text-sci-warning font-semibold">2 / 5</span>
                </div>
                <div className="h-2 bg-sci-bg3 rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-gradient-to-r from-sci-warning to-amber-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="sci-section-title mb-4">最近活动</h2>
            <div className="sci-card space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sci-bg3 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-sci-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-sci-muted truncate">{activity.target}</p>
                      <p className="text-xs text-sci-muted mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div>
        <h2 className="sci-section-title mb-4">热门研究方向</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: '大语言模型代码生成', trend: '+23%', papers: 156 },
            { title: '代码克隆检测', trend: '+15%', papers: 89 },
            { title: '软件漏洞检测', trend: '+18%', papers: 124 },
          ].map((item) => (
            <div key={item.title} className="sci-card group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium group-hover:text-sci-accent transition-colors">{item.title}</h3>
                <TrendingUp size={16} className="text-sci-success" />
              </div>
              <div className="flex items-center gap-4 text-sm text-sci-muted">
                <span>本周 +{item.papers} 篇</span>
                <span className="text-sci-success">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
