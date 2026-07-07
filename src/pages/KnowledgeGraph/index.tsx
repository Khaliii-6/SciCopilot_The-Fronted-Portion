import { useState, useRef, useEffect, useCallback } from 'react';
import { Share2, Search, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';
import { mockAPI } from '@/services/api';
import type { KGNode, KGEdge } from '@/types';

const categoryColors: Record<string, string> = {
  concept: '#38bdf8',
  technique: '#8b5cf6',
  dataset: '#10b981',
  paper: '#f59e0b',
  tool: '#ef4444',
};

function KnowledgeGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<KGNode[]>([]);
  const [edges] = useState<KGEdge[]>([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<KGNode | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const data = mockAPI.getMockKnowledgeGraph();
    // Initialize positions
    const initializedNodes = data.nodes.map((node, i) => ({
      ...node,
      x: 400 + Math.cos((i / data.nodes.length) * Math.PI * 2) * 200,
      y: 300 + Math.sin((i / data.nodes.length) * Math.PI * 2) * 200,
    }));
    setNodes(initializedNodes);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = mockAPI.getMockKnowledgeGraph();

    // Draw edges
    data.edges.forEach((edge) => {
      const source = nodes.find((n) => n.id === edge.source);
      const target = nodes.find((n) => n.id === edge.target);
      if (!source || !target || !source.x || !source.y || !target.x || !target.y) return;

      ctx.beginPath();
      ctx.moveTo((source.x + offset.x) * scale, (source.y + offset.y) * scale);
      ctx.lineTo((target.x + offset.x) * scale, (target.y + offset.y) * scale);
      ctx.strokeStyle = `rgba(100, 116, 139, ${edge.strength || 0.5})`;
      ctx.lineWidth = (edge.strength || 0.5) * 2;
      ctx.stroke();

      // Draw relation label
      const midX = ((source.x + target.x) / 2 + offset.x) * scale;
      const midY = ((source.y + target.y) / 2 + offset.y) * scale;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(edge.relation, midX, midY);
    });

    // Draw nodes
    nodes.forEach((node) => {
      if (!node.x || !node.y) return;
      const x = (node.x + offset.x) * scale;
      const y = (node.y + offset.y) * scale;
      const radius = 30 * scale;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = categoryColors[node.category] || '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow effect
      ctx.beginPath();
      ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = `${categoryColors[node.category] || '#38bdf8'}33`;
      ctx.lineWidth = 4;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#f1f5f9';
      ctx.font = `bold ${12 * scale}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, x, y);

      // Category indicator
      ctx.beginPath();
      ctx.arc(x + radius * 0.7, y - radius * 0.7, 5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = categoryColors[node.category] || '#38bdf8';
      ctx.fill();
    });
  }, [nodes, edges, scale, offset]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / scale - offset.x;
    const y = (e.clientY - rect.top) / scale - offset.y;

    const clickedNode = nodes.find((n) => {
      if (!n.x || !n.y) return false;
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });

    if (clickedNode) {
      setDragging(clickedNode.id);
    } else {
      setIsPanning(true);
      setPanStart({ x: e.clientX - offset.x * scale, y: e.clientY - offset.y * scale });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = (e.clientX - rect.left) / scale - offset.x;
    const mouseY = (e.clientY - rect.top) / scale - offset.y;

    const hovered = nodes.find((n) => {
      if (!n.x || !n.y) return false;
      const dx = n.x - mouseX;
      const dy = n.y - mouseY;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });
    setHoveredNode(hovered || null);

    if (dragging) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === dragging ? { ...n, x: mouseX, y: mouseY } : n
        )
      );
    } else if (isPanning) {
      setOffset({
        x: (e.clientX - panStart.x) / scale,
        y: (e.clientY - panStart.y) / scale,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.5, Math.min(2, scale - e.deltaY * 0.001));
    setScale(newScale);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full rounded-xl bg-sci-bg2 border border-sci-border cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setScale((s) => Math.min(2, s + 0.1))}
          className="p-2 rounded-lg bg-sci-bg2 border border-sci-border hover:bg-sci-bg3 text-sci-muted"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          className="p-2 rounded-lg bg-sci-bg2 border border-sci-border hover:bg-sci-bg3 text-sci-muted"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
          className="p-2 rounded-lg bg-sci-bg2 border border-sci-border hover:bg-sci-bg3 text-sci-muted"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Node Info */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 sci-card max-w-xs animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[hoveredNode.category] }}
            />
            <span className="font-semibold">{hoveredNode.label}</span>
          </div>
          <p className="text-sm text-sci-muted">{hoveredNode.description}</p>
        </div>
      )}
    </div>
  );
}

function KnowledgeGraph() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">知识图谱</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sci-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索概念..."
              className="sci-input pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-sm text-sci-muted capitalize">
              {category === 'concept' ? '概念' : category === 'technique' ? '技术' : category === 'dataset' ? '数据集' : category === 'paper' ? '论文' : '工具'}
            </span>
          </div>
        ))}
      </div>

      {/* Graph Canvas */}
      <KnowledgeGraphCanvas />

      {/* Info Panel */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="sci-card">
          <div className="flex items-center gap-2 mb-3">
            <Share2 size={16} className="text-sci-accent" />
            <h3 className="font-semibold">关系类型</h3>
          </div>
          <div className="space-y-2 text-sm text-sci-muted">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-sci-border" />
              <span>represented_by - 表示为</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-sci-border" />
              <span>detected_by - 被检测</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-sci-border" />
              <span>input_to - 输入到</span>
            </div>
          </div>
        </div>

        <div className="sci-card">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-sci-accent" />
            <h3 className="font-semibold">使用说明</h3>
          </div>
          <ul className="space-y-1 text-sm text-sci-muted">
            <li>拖拽节点可调整位置</li>
            <li>滚轮缩放画布</li>
            <li>悬停查看节点详情</li>
            <li>拖拽空白处平移画布</li>
          </ul>
        </div>

        <div className="sci-card">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-sci-accent" />
            <h3 className="font-semibold">热门概念</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Code Clone', 'AST', 'GNN', 'Transformer', 'BERT'].map((concept) => (
              <span key={concept} className="sci-badge-info text-[10px]">{concept}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraph;
