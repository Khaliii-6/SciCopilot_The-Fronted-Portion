import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, BookOpen, Database, ArrowRight, Loader2 } from 'lucide-react';
import { mockAPI } from '@/services/api';
import { useUIStore } from '@/store/uiStore';
import type { ResearchNode } from '@/types';

function FeasibilityBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { class: 'sci-badge-success', label: '可行性高' },
    medium: { class: 'sci-badge-warning', label: '可行性中' },
    low: { class: 'sci-badge-danger', label: '可行性低' },
  };
  const c = config[level];
  return <span className={c.class}>{c.label}</span>;
}

function TreeNode({
  node,
  depth = 0,
}: {
  node: ResearchNode;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative">
      {/* Connector lines */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-sci-border"
          style={{ left: `${depth * 24 - 12}px` }}
        />
      )}

      <div
        className="flex items-start gap-3 py-2"
        style={{ paddingLeft: `${depth * 24}px` }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 p-0.5 rounded hover:bg-sci-bg3 text-sci-muted"
        >
          {node.children && node.children.length > 0 ? (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <div className="w-3.5 h-3.5" />
          )}
        </button>

        <div
          className="flex-1 sci-card cursor-pointer hover:border-sci-accent/50 transition-colors"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-sci-ink">{node.question}</p>
              <div className="flex items-center gap-2 mt-2">
                <FeasibilityBadge level={node.feasibility} />
                <span className="text-xs text-sci-muted flex items-center gap-1">
                  <Database size={10} />
                  {node.datasets.length} 个数据集
                </span>
                <span className="text-xs text-sci-muted flex items-center gap-1">
                  <BookOpen size={10} />
                  {node.papers.length} 篇相关论文
                </span>
              </div>
            </div>
          </div>

          {showDetail && (
            <div className="mt-3 pt-3 border-t border-sci-border space-y-2 animate-fade-in">
              <div>
                <p className="text-xs text-sci-muted mb-1">相关数据集</p>
                <div className="flex flex-wrap gap-1">
                  {node.datasets.map((d) => (
                    <span key={d} className="sci-badge-info text-[10px]">{d}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-sci-muted mb-1">相关论文</p>
                <div className="flex flex-wrap gap-1">
                  {node.papers.map((p) => (
                    <span key={p} className="sci-badge-purple text-[10px]">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {expanded && node.children?.map((child) => (
        <TreeNode key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function ResearchDecompose() {
  const [direction, setDirection] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tree, setTree] = useState<import('@/types').ResearchTree | null>(null);
  const { addNotification } = useUIStore();

  const handleAnalyze = async () => {
    if (!direction.trim()) {
      addNotification({ type: 'warning', message: '请输入研究方向', duration: 3000 });
      return;
    }
    setIsAnalyzing(true);

    // TODO: Replace with actual API call
    // const response = await researchAPI.decompose(direction);
    // setTree(response.data);

    setTimeout(() => {
      setTree(mockAPI.getMockResearchTree());
      setIsAnalyzing(false);
      addNotification({ type: 'success', message: '问题拆解完成', duration: 3000 });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-2xl font-bold">研究问题拆解</h1>

      {/* Input */}
      <div className="sci-card-glow">
        <label className="block text-sm font-medium text-sci-ink mb-3">
          输入你的研究方向
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            placeholder="例如：基于深度学习的代码克隆检测方法研究"
            className="sci-input flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="sci-btn-primary"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                分析中
              </>
            ) : (
              <>
                <Search size={16} />
                开始拆解
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result */}
      {tree && (
        <div className="space-y-4">
          <div className="sci-card-glow">
            <h2 className="text-lg font-semibold mb-2">核心问题</h2>
            <p className="text-sci-accent">{tree.core_question}</p>
          </div>

          <div className="sci-card">
            <h3 className="sci-section-title mb-4">子问题树</h3>
            <div className="space-y-1">
              {tree.sub_questions.map((node) => (
                <TreeNode key={node.id} node={node} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="sci-btn-primary">
              <BookOpen size={16} />
              跳转论文精读
            </button>
            <button className="sci-btn-secondary">
              <ArrowRight size={16} />
              生成实验方案
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResearchDecompose;
