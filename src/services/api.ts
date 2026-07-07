import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

// ==================== Axios Instance ====================
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    const message = (error.response?.data as { detail?: string })?.detail || error.message;
    useUIStore.getState().addNotification({
      type: 'error',
      message,
      duration: 5000,
    });
    return Promise.reject(error);
  }
);

// ==================== API Service Functions ====================

// ---- Auth ----
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  register: (email: string, password: string, username: string) =>
    apiClient.post('/auth/register', { email, password, username }),

  getMe: () => apiClient.get('/users/me'),

  // TODO: Connect to backend
  logout: () => Promise.resolve(),
};

// ---- Papers ----
export const paperAPI = {
  upload: (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/papers/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      },
    });
  },

  getPapers: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get('/papers', { params }),

  getPaper: (id: string) => apiClient.get(`/papers/${id}`),

  getDeepRead: (id: string) => apiClient.get(`/papers/${id}/deep-read`),

  deletePaper: (id: string) => apiClient.delete(`/papers/${id}`),

  // TODO: Implement WebSocket connection for streaming
  connectPaperChat: (paperId: string) => {
    const wsUrl = `${import.meta.env.VITE_WS_URL}/papers/${paperId}/chat`;
    return new WebSocket(wsUrl);
  },
};

// ---- Research ----
export const researchAPI = {
  decompose: (direction: string) =>
    apiClient.post('/research/decompose', { direction }),

  getResearchTree: (id: string) => apiClient.get(`/research/${id}`),
};

// ---- Experiment ----
export const experimentAPI = {
  generateRoadmap: (questionId: string) =>
    apiClient.post('/experiments/generate-roadmap', { question_id: questionId }),

  getRoadmap: (id: string) => apiClient.get(`/experiments/${id}`),
};

// ---- Code Reproduction ----
export const codeAPI = {
  analyzeRepo: (repoUrl: string) =>
    apiClient.post('/code/analyze-repo', { repo_url: repoUrl }),

  getRepoAnalysis: (id: string) => apiClient.get(`/code/${id}`),

  diagnoseError: (errorLog: string, repoId: string) =>
    apiClient.post('/code/diagnose', { error_log: errorLog, repo_id: repoId }),
};

// ---- Result Analysis ----
export const resultAPI = {
  analyze: (file: File, config?: Record<string, unknown>) => {
    const formData = new FormData();
    formData.append('file', file);
    if (config) formData.append('config', JSON.stringify(config));
    return apiClient.post('/results/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getAnalysis: (id: string) => apiClient.get(`/results/${id}`),
};

// ---- Knowledge Graph ----
export const kgAPI = {
  getGraph: (params?: { query?: string; nodeId?: string; limit?: number }) =>
    apiClient.get('/kg/explore', { params }),

  searchNodes: (query: string) => apiClient.get('/kg/search', { params: { q: query } }),
};

// ---- Conversations ----
export const conversationAPI = {
  getConversations: (params?: { module?: string; page?: number; limit?: number }) =>
    apiClient.get('/conversations', { params }),

  getConversation: (id: string) => apiClient.get(`/conversations/${id}`),

  createConversation: (data: { title: string; module: string; agent_id?: string }) =>
    apiClient.post('/conversations', data),

  deleteConversation: (id: string) => apiClient.delete(`/conversations/${id}`),

  sendMessage: (conversationId: string, content: string) =>
    apiClient.post(`/conversations/${conversationId}/messages`, { content }),
};

// ==================== Mock Data Helpers ====================
// These return mock data for frontend development without backend

export const mockAPI = {
  getMockPapers: () => [
    {
      id: '1',
      title: 'Attention Is All You Need',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
      abstract: 'We propose a new simple network architecture, the Transformer...',
      arxiv_id: '1706.03762',
      uploaded_at: '2026-07-01T10:00:00Z',
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'BERT: Pre-training of Deep Bidirectional Transformers',
      authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee'],
      abstract: 'We introduce a new language representation model called BERT...',
      arxiv_id: '1810.04805',
      uploaded_at: '2026-07-02T14:30:00Z',
      status: 'completed' as const,
    },
  ],

  getMockResearchTree: (): import('@/types').ResearchTree => ({
    core_question: '如何提高代码克隆检测的准确性？',
    sub_questions: [
      {
        id: 'rq1',
        question: '基于 AST 的克隆检测方法在哪些场景下表现更好？',
        feasibility: 'high',
        datasets: ['BigCloneBench', 'Google Code Jam'],
        papers: ['Tree-based CNN for Code Clone Detection'],
      },
      {
        id: 'rq2',
        question: '深度学习模型能否有效识别语义克隆（Type-4）？',
        feasibility: 'medium',
        datasets: ['BigCloneBench', 'OJClone'],
        papers: ['FA-AST: Flow-Augmented Abstract Syntax Tree'],
      },
      {
        id: 'rq3',
        question: '跨语言的代码克隆检测是否可行？',
        feasibility: 'low',
        datasets: ['XLCoST'],
        papers: ['Cross-Language Clone Detection with Neural Networks'],
      },
    ],
  }),

  getMockExperimentRoadmap: (): import('@/types').ExperimentRoadmap => ({
    objective: '基于图神经网络的代码克隆检测方法研究',
    steps: [
      { step: 1, task: '文献调研与 baseline 复现', details: '复现 FA-AST 和 GraphCodeBERT 的克隆检测实验', estimated_days: 14, status: 'completed' },
      { step: 2, task: '数据集预处理', details: '对 BigCloneBench 进行数据清洗和增强', estimated_days: 7, status: 'in_progress' },
      { step: 3, task: '模型设计与实现', details: '设计基于 GNN 的代码表示学习模型', estimated_days: 21, status: 'pending' },
      { step: 4, task: '实验与调优', details: '对比实验、消融实验、参数调优', estimated_days: 14, status: 'pending' },
      { step: 5, task: '论文撰写', details: '整理实验结果，撰写研究论文', estimated_days: 14, status: 'pending' },
    ],
    baselines: [
      { name: 'FA-AST', paper_id: 'p1', github_url: 'https://github.com/FA-AST', stars: 128, description: 'Flow-Augmented AST for code representation' },
      { name: 'GraphCodeBERT', paper_id: 'p2', github_url: 'https://github.com/microsoft/GraphCodeBERT', stars: 1024, description: 'Pre-training for code representation' },
    ],
    datasets: [
      { name: 'BigCloneBench', size: '6M pairs', language: 'Java', url: '#', description: 'Large-scale code clone benchmark' },
      { name: 'OJClone', size: '50K pairs', language: 'C/C++', url: '#', description: 'Online judge code clone dataset' },
    ],
    tools: ['PyTorch 2.0', 'DGL', 'Transformers', 'Docker'],
  }),

  getMockCodeReproduction: (): import('@/types').CodeReproduction => ({
    repo_name: 'GraphCodeBERT',
    repo_url: 'https://github.com/microsoft/GraphCodeBERT',
    language: 'Python',
    stars: 1024,
    description: 'GraphCodeBERT: Pre-training Code Representations with Data Flow',
    file_tree: [
      { name: 'README.md', path: 'README.md', type: 'file' },
      { name: 'requirements.txt', path: 'requirements.txt', type: 'file' },
      { name: 'clone', path: 'clone', type: 'directory', children: [
        { name: 'run.py', path: 'clone/run.py', type: 'file' },
        { name: 'model.py', path: 'clone/model.py', type: 'file' },
      ]},
      { name: 'classification', path: 'classification', type: 'directory', children: [
        { name: 'run.py', path: 'classification/run.py', type: 'file' },
      ]},
    ],
    dependencies: [
      { name: 'torch', version: '>=1.9.0', purpose: '深度学习框架' },
      { name: 'transformers', version: '>=4.0.0', purpose: '预训练模型加载' },
      { name: 'tree-sitter', version: '>=0.20.0', purpose: '代码解析' },
    ],
    steps: [
      { step: 1, instruction: '克隆仓库到本地', command: 'git clone https://github.com/microsoft/GraphCodeBERT.git', checked: false },
      { step: 2, instruction: '安装依赖', command: 'pip install -r requirements.txt', checked: false },
      { step: 3, instruction: '下载预训练模型', command: 'bash download.sh', checked: false },
      { step: 4, instruction: '运行克隆检测实验', command: 'cd clone && python run.py', checked: false },
    ],
  }),

  getMockResultAnalysis: (): import('@/types').ResultAnalysis => ({
    charts: [
      {
        type: 'bar',
        title: '各模型 F1 分数对比',
        data: {
          categories: ['FA-AST', 'GraphCodeBERT', 'Our Method'],
          values: [0.82, 0.85, 0.91],
        },
      },
      {
        type: 'line',
        title: '训练损失曲线',
        data: {
          epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          train_loss: [0.85, 0.72, 0.61, 0.52, 0.45, 0.40, 0.36, 0.33, 0.31, 0.29],
          val_loss: [0.88, 0.75, 0.65, 0.58, 0.52, 0.49, 0.47, 0.46, 0.46, 0.47],
        },
      },
    ],
    stats: [
      { metric: 'Precision', mean: 0.912, std: 0.023, min: 0.88, max: 0.95, ci95: [0.898, 0.926], p_value: 0.001 },
      { metric: 'Recall', mean: 0.905, std: 0.031, min: 0.86, max: 0.94, ci95: [0.888, 0.922], p_value: 0.002 },
      { metric: 'F1-Score', mean: 0.908, std: 0.025, min: 0.87, max: 0.94, ci95: [0.894, 0.922], p_value: 0.001 },
    ],
    interpretation: '实验结果表明，我们的方法在 F1 分数上显著优于现有 baseline（p < 0.01）。',
    suggestions: [
      '建议在更多数据集上验证模型泛化能力',
      '可以考虑引入更丰富的代码结构特征',
      '消融实验显示数据流边对性能贡献最大',
    ],
  }),

  getMockKnowledgeGraph: (): import('@/types').KnowledgeGraph => ({
    nodes: [
      { id: 'n1', label: 'Code Clone', category: 'concept', description: '代码克隆是指语法或语义相似的代码片段' },
      { id: 'n2', label: 'AST', category: 'technique', description: '抽象语法树' },
      { id: 'n3', label: 'GNN', category: 'technique', description: '图神经网络' },
      { id: 'n4', label: 'BigCloneBench', category: 'dataset', description: '大规模代码克隆基准数据集' },
      { id: 'n5', label: 'Semantic Clone', category: 'concept', description: '语义克隆' },
    ],
    edges: [
      { source: 'n1', target: 'n2', relation: 'represented_by', strength: 0.9 },
      { source: 'n1', target: 'n3', relation: 'detected_by', strength: 0.8 },
      { source: 'n2', target: 'n3', relation: 'input_to', strength: 0.85 },
      { source: 'n1', target: 'n5', relation: 'includes', strength: 0.95 },
      { source: 'n4', target: 'n1', relation: 'evaluates', strength: 0.9 },
    ],
  }),
};

export default apiClient;
