import { useState } from 'react';
import { Clock, GitFork, Database, Wrench, CheckCircle2, Circle, Loader2, Download } from 'lucide-react';
import { mockAPI } from '@/services/api';
import { useUIStore } from '@/store/uiStore';

function ExperimentRoadmap() {
  const [roadmap] = useState(mockAPI.getMockExperimentRoadmap());
  const { addNotification } = useUIStore();

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={18} className="text-sci-success" />;
      case 'in_progress':
        return <Loader2 size={18} className="text-sci-warning animate-spin" />;
      default:
        return <Circle size={18} className="text-sci-muted" />;
    }
  };

  const getStatusClass = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'border-l-sci-success';
      case 'in_progress':
        return 'border-l-sci-warning';
      default:
        return 'border-l-sci-muted';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">实验路线</h1>
        <button
          onClick={() => addNotification({ type: 'info', message: '导出功能开发中', duration: 3000 })}
          className="sci-btn-secondary"
        >
          <Download size={16} />
          导出方案
        </button>
      </div>

      {/* Objective */}
      <div className="sci-card-glow">
        <h2 className="text-lg font-semibold mb-2">研究目标</h2>
        <p className="text-sci-muted">{roadmap.objective}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="sci-section-title">实验步骤</h2>
          <div className="space-y-3">
            {roadmap.steps.map((step, index) => (
              <div
                key={step.step}
                className={`sci-card border-l-4 ${getStatusClass(step.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(step.status)}
                    {index < roadmap.steps.length - 1 && (
                      <div className="w-px h-full min-h-[20px] bg-sci-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">
                        Step {step.step}: {step.task}
                      </h3>
                      <span className="text-xs text-sci-muted flex items-center gap-1">
                        <Clock size={12} />
                        {step.estimated_days} 天
                      </span>
                    </div>
                    <p className="text-sm text-sci-muted">{step.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Baselines */}
          <div>
            <h2 className="sci-section-title mb-4">Baseline 方法</h2>
            <div className="space-y-3">
              {roadmap.baselines.map((baseline) => (
                <div key={baseline.name} className="sci-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sci-accent">{baseline.name}</h3>
                    <span className="text-xs text-sci-muted flex items-center gap-1">
                      <GitFork size={12} />
                      {baseline.stars}
                    </span>
                  </div>
                  <p className="text-sm text-sci-muted mb-2">{baseline.description}</p>
                  <a
                    href={baseline.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sci-accent hover:underline"
                  >
                    {baseline.github_url}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Datasets */}
          <div>
            <h2 className="sci-section-title mb-4">推荐数据集</h2>
            <div className="space-y-3">
              {roadmap.datasets.map((dataset) => (
                <div key={dataset.name} className="sci-card">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{dataset.name}</h3>
                    <span className="sci-badge-info text-[10px]">{dataset.language}</span>
                  </div>
                  <p className="text-sm text-sci-muted mb-2">{dataset.description}</p>
                  <div className="flex items-center gap-2">
                    <Database size={12} className="text-sci-muted" />
                    <span className="text-xs text-sci-muted">{dataset.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="sci-section-title mb-4">推荐工具链</h2>
            <div className="flex flex-wrap gap-2">
              {roadmap.tools?.map((tool) => (
                <span key={tool} className="sci-badge-purple">
                  <Wrench size={10} className="mr-1" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperimentRoadmap;
