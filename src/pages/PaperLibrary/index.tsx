import { useState } from 'react';
import { Search, Upload, Clock, FileText, Trash2 } from 'lucide-react';
import { usePaperStore } from '@/store/paperStore';
import { useUIStore } from '@/store/uiStore';
import { mockAPI } from '@/services/api';

function PaperLibrary() {
  const { papers, setCurrentPaper, deletePaper } = usePaperStore();
  const { addNotification } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const mockPapers = mockAPI.getMockPapers();

  const displayPapers = papers.length > 0 ? papers : mockPapers;

  const filteredPapers = displayPapers.filter((paper) => {
    const matchesSearch =
      !searchQuery ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || paper.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    deletePaper(id);
    addNotification({ type: 'success', message: '论文已删除', duration: 3000 });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">论文库</h1>
        <button
          onClick={() => addNotification({ type: 'info', message: '上传功能在论文精读页面', duration: 3000 })}
          className="sci-btn-primary"
        >
          <Upload size={16} />
          上传论文
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sci-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索论文标题、作者..."
            className="sci-input w-full pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="sci-input"
        >
          <option value="all">全部状态</option>
          <option value="completed">已完成</option>
          <option value="processing">处理中</option>
          <option value="uploading">上传中</option>
        </select>
      </div>

      {/* Papers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="sci-card group cursor-pointer relative"
            onClick={() => setCurrentPaper(paper)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-sci-bg3 flex items-center justify-center">
                <FileText size={18} className="text-sci-accent" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`sci-badge-${
                    paper.status === 'completed'
                      ? 'success'
                      : paper.status === 'processing'
                      ? 'warning'
                      : 'info'
                  }`}
                >
                  {paper.status === 'completed' ? '已完成' : paper.status === 'processing' ? '处理中' : '上传中'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(paper.id);
                  }}
                  className="p-1 rounded hover:bg-sci-bg3 text-sci-muted hover:text-sci-danger opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-sci-accent transition-colors">
              {paper.title}
            </h3>
            <p className="text-sm text-sci-muted mb-3 line-clamp-1">{paper.authors.join(', ')}</p>

            <div className="flex items-center justify-between text-xs text-sci-muted">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(paper.uploaded_at).toLocaleDateString('zh-CN')}
              </span>
              {paper.arxiv_id && <span className="sci-badge-info">{paper.arxiv_id}</span>}
            </div>
          </div>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="text-sci-border mx-auto mb-4" />
          <p className="text-sci-muted">没有找到匹配的论文</p>
        </div>
      )}
    </div>
  );
}

export default PaperLibrary;
