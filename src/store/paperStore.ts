import { create } from 'zustand';
import type { Paper, DeepReadReport } from '@/types';

interface PaperState {
  papers: Paper[];
  currentPaper: Paper | null;
  currentReport: DeepReadReport | null;
  isLoading: boolean;
  uploadProgress: number;

  setPapers: (papers: Paper[]) => void;
  addPaper: (paper: Paper) => void;
  updatePaper: (paperId: string, updates: Partial<Paper>) => void;
  setCurrentPaper: (paper: Paper | null) => void;
  setCurrentReport: (report: DeepReadReport | null) => void;
  setLoading: (isLoading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  deletePaper: (paperId: string) => void;
}

export const usePaperStore = create<PaperState>((set) => ({
  papers: [],
  currentPaper: null,
  currentReport: null,
  isLoading: false,
  uploadProgress: 0,

  setPapers: (papers) => set({ papers }),

  addPaper: (paper) => set((state) => ({ papers: [paper, ...state.papers] })),

  updatePaper: (paperId, updates) =>
    set((state) => ({
      papers: state.papers.map((p) => (p.id === paperId ? { ...p, ...updates } : p)),
      currentPaper:
        state.currentPaper?.id === paperId
          ? { ...state.currentPaper, ...updates }
          : state.currentPaper,
    })),

  setCurrentPaper: (paper) => set({ currentPaper: paper }),

  setCurrentReport: (report) => set({ currentReport: report }),

  setLoading: (isLoading) => set({ isLoading }),

  setUploadProgress: (uploadProgress) => set({ uploadProgress }),

  deletePaper: (paperId) =>
    set((state) => ({
      papers: state.papers.filter((p) => p.id !== paperId),
      currentPaper: state.currentPaper?.id === paperId ? null : state.currentPaper,
    })),
}));
