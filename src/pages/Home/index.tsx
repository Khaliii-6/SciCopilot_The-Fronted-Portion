import { useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  FileText,
  GitBranch,
  Route,
  Code2,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: '论文精读',
    desc: 'AI 辅助深度阅读，自动生成结构化报告与引用溯源',
    color: 'from-sky-500 to-blue-600',
    path: '/paper/read',
  },
  {
    icon: GitBranch,
    title: '问题拆解',
    desc: '将研究方向拆解为可执行的子问题，评估可行性',
    color: 'from-emerald-500 to-teal-600',
    path: '/research/decompose',
  },
  {
    icon: Route,
    title: '实验路线',
    desc: '生成完整实验方案，推荐 baseline 与数据集',
    color: 'from-amber-500 to-orange-600',
    path: '/experiment/roadmap',
  },
  {
    icon: Code2,
    title: '代码复现',
    desc: '分析 GitHub 仓库，提供逐步复现指南与错误诊断',
    color: 'from-violet-500 to-purple-600',
    path: '/code/reproduce',
  },
  {
    icon: BarChart3,
    title: '结果分析',
    desc: '自动可视化实验数据，生成统计分析与写作建议',
    color: 'from-rose-500 to-pink-600',
    path: '/result/analyze',
  },
];

const stats = [
  { label: '论文解析', value: '10,000+', icon: FileText },
  { label: '实验方案', value: '5,000+', icon: Route },
  { label: '代码复现', value: '2,000+', icon: Code2 },
  { label: '活跃用户', value: '3,000+', icon: Sparkles },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sci-bg text-sci-ink">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-tech opacity-30" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sci-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sci-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sci-bg2 border border-sci-border mb-8">
            <Sparkles size={16} className="text-sci-accent" />
            <span className="text-sm text-sci-muted">面向软件工程学生的 AI 科研智能体平台</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="sci-glow-text">SciCopilot</span>
            <br />
            <span className="text-sci-ink">让科研更高效</span>
          </h1>

          <p className="text-xl text-sci-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            从论文精读到实验设计，从代码复现到结果分析，SciCopilot 全程陪伴你的科研之旅
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="sci-btn-primary text-base px-8 py-3"
            >
              开始使用
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="sci-btn-secondary text-base px-8 py-3"
            >
              登录账户
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-sci-bg2/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">五大核心功能</h2>
            <p className="text-sci-muted">覆盖科研全流程，从入门到发表</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => navigate(feature.path)}
                  className="sci-card-glow text-left group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-sci-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-sci-muted">{feature.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="sci-card text-center">
                  <Icon size={24} className="text-sci-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold sci-glow-text mb-1">{stat.value}</div>
                  <div className="text-sm text-sci-muted">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SciCopilot */}
      <section className="py-20 px-6 bg-sci-bg2/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">为什么选择 SciCopilot</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI 驱动',
                desc: '基于大语言模型，理解科研语境，提供精准建议',
              },
              {
                icon: Shield,
                title: '溯源可靠',
                desc: '所有结论均可追溯至原始文献，确保学术严谨性',
              },
              {
                icon: FlaskConical,
                title: '垂直领域',
                desc: '专注软件工程领域，深度理解代码与算法',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-sci-bg3 border border-sci-border flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-sci-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sci-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="sci-card-glow p-10">
            <h2 className="text-3xl font-bold mb-4">开始你的科研之旅</h2>
            <p className="text-sci-muted mb-8">
              加入数千名科研工作者的行列，让 SciCopilot 成为你的智能研究助手
            </p>
            <button
              onClick={() => navigate('/register')}
              className="sci-btn-primary text-base px-8 py-3"
            >
              免费注册
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-sci-border text-center text-sm text-sci-muted">
        <p>SciCopilot - AI 科研智能体平台</p>
      </footer>
    </div>
  );
}

export default Home;
