import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import AppLayout from '@/app/layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import PaperRead from '@/pages/PaperRead';
import PaperLibrary from '@/pages/PaperLibrary';
import ResearchDecompose from '@/pages/ResearchDecompose';
import ExperimentRoadmap from '@/pages/ExperimentRoadmap';
import CodeReproduce from '@/pages/CodeReproduce';
import ResultAnalyze from '@/pages/ResultAnalyze';
import KnowledgeGraph from '@/pages/KnowledgeGraph';
import Profile from '@/pages/Profile';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/paper/read" element={<RequireAuth><PaperRead /></RequireAuth>} />
        <Route path="/paper/library" element={<RequireAuth><PaperLibrary /></RequireAuth>} />
        <Route path="/research/decompose" element={<RequireAuth><ResearchDecompose /></RequireAuth>} />
        <Route path="/experiment/roadmap" element={<RequireAuth><ExperimentRoadmap /></RequireAuth>} />
        <Route path="/code/reproduce" element={<RequireAuth><CodeReproduce /></RequireAuth>} />
        <Route path="/result/analyze" element={<RequireAuth><ResultAnalyze /></RequireAuth>} />
        <Route path="/kg/explore" element={<RequireAuth><KnowledgeGraph /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
