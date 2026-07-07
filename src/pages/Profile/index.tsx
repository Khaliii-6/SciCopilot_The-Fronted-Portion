import { useState } from 'react';
import { Mail, Calendar, FileText, MessageSquare, Star, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

function Profile() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');

  const stats = [
    { label: '上传论文', value: 12, icon: FileText },
    { label: '对话次数', value: 86, icon: MessageSquare },
    { label: '收藏论文', value: 24, icon: Star },
    { label: '使用天数', value: 45, icon: Clock },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Profile Header */}
      <div className="sci-card-glow">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sci-primary to-sci-accent flex items-center justify-center text-white text-2xl font-bold">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.username || '用户'}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-sci-muted">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {user?.email || 'user@example.com'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                注册于 {new Date(user?.created_at || Date.now()).toLocaleDateString('zh-CN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-sci-border">
        {[
          { key: 'overview', label: '概览' },
          { key: 'history', label: '历史记录' },
          { key: 'settings', label: '设置' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-sci-accent text-sci-accent'
                : 'border-transparent text-sci-muted hover:text-sci-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="sci-card text-center">
                  <Icon size={20} className="text-sci-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-sci-muted">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="sci-card">
            <h3 className="font-semibold mb-4">最近使用模块</h3>
            <div className="space-y-3">
              {[
                { name: '论文精读', count: 45, percent: 45 },
                { name: '问题拆解', count: 20, percent: 20 },
                { name: '实验路线', count: 15, percent: 15 },
                { name: '代码复现', count: 12, percent: 12 },
                { name: '结果分析', count: 8, percent: 8 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span className="text-sci-muted">{item.count} 次</span>
                  </div>
                  <div className="h-2 bg-sci-bg3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sci-primary to-sci-accent rounded-full transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="sci-card">
          <h3 className="font-semibold mb-4">操作历史</h3>
          <div className="space-y-3">
            {[
              { action: '精读论文', target: 'Attention Is All You Need', time: '2 小时前' },
              { action: '上传论文', target: 'BERT.pdf', time: '昨天' },
              { action: '生成实验方案', target: 'GNN Clone Detection', time: '3 天前' },
              { action: '收藏论文', target: 'GraphCodeBERT', time: '1 周前' },
              { action: '代码复现', target: 'microsoft/GraphCodeBERT', time: '2 周前' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-sci-border last:border-0">
                <div>
                  <span className="text-sm font-medium">{item.action}</span>
                  <span className="text-sci-muted mx-2">-</span>
                  <span className="text-sm text-sci-muted">{item.target}</span>
                </div>
                <span className="text-xs text-sci-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="sci-card">
            <h3 className="font-semibold mb-4">个人信息</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-sci-muted mb-2">用户名</label>
                <input type="text" defaultValue={user?.username} className="sci-input w-full max-w-md" />
              </div>
              <div>
                <label className="block text-sm text-sci-muted mb-2">邮箱</label>
                <input type="email" defaultValue={user?.email} className="sci-input w-full max-w-md" />
              </div>
              <button className="sci-btn-primary">保存修改</button>
            </div>
          </div>

          <div className="sci-card">
            <h3 className="font-semibold mb-4">偏好设置</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">消息通知</p>
                  <p className="text-sm text-sci-muted">接收实验完成、论文解析等通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-sci-bg3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sci-primary" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动保存</p>
                  <p className="text-sm text-sci-muted">自动保存对话和实验记录</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-sci-bg3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sci-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
