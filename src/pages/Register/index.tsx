import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, FlaskConical, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addNotification } = useUIStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      addNotification({ type: 'warning', message: '请填写完整信息', duration: 3000 });
      return;
    }
    if (password !== confirmPassword) {
      addNotification({ type: 'warning', message: '两次密码输入不一致', duration: 3000 });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await authAPI.register(email, password, username);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        email,
        username,
        role: 'user' as const,
        created_at: new Date().toISOString(),
      };
      login(mockUser, 'mock-jwt-token');
      addNotification({ type: 'success', message: '注册成功', duration: 3000 });
      navigate('/dashboard');
    } catch {
      addNotification({ type: 'error', message: '注册失败，请重试', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sci-bg flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-tech opacity-20" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sci-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sci-purple/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sci-muted hover:text-sci-ink transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>返回首页</span>
        </button>

        <div className="sci-card-glow p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sci-primary to-sci-accent flex items-center justify-center">
              <FlaskConical size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">注册 SciCopilot</h1>
              <p className="text-sm text-sci-muted">开启智能科研之旅</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-sci-ink mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="设置用户名"
                className="sci-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sci-ink mb-2">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="sci-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sci-ink mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="设置密码（至少8位）"
                  className="sci-input w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sci-muted hover:text-sci-ink"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sci-ink mb-2">确认密码</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                className="sci-input w-full"
              />
            </div>

            <div className="space-y-2 text-xs text-sci-muted">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className={password.length >= 8 ? 'text-sci-success' : ''} />
                <span>至少 8 个字符</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} />
                <span>包含字母和数字</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="sci-btn-primary w-full"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                '注册'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-sci-muted">
            已有账号？
            <Link to="/login" className="text-sci-accent hover:underline ml-1">
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
