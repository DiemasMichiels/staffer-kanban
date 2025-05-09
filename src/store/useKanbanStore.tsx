import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const PROCESSING_STATES = {
  Applied: "Applied",
  Screening: "Screening",
  Interview: "Interview",
  Offer: "Offer",
};

export type ProcessingStates = keyof typeof PROCESSING_STATES;
export type Candidate = {
  id: string;
  name: string;
  role: string;
  applicationDate: string;
  status: ProcessingStates;
  priority: boolean;
};

const initialCandidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Candidate 1",
    role: "Senior Frontend Developer",
    applicationDate: "2025-04-25",
    status: "Applied",
    priority: true,
  },
  {
    id: "candidate-2",
    name: "Candidate 2",
    role: "Frontend Engineer",
    applicationDate: "2025-04-27",
    status: "Screening",
    priority: false,
  },
];

interface KanbanState {
  candidates: Candidate[];
  updateCandidate: (updatedCandidate: Candidate) => void;
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      candidates: initialCandidates,
      updateCandidate: (updatedCandidate) =>
        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate
          ),
        })),

      addCandidate: (candidate) =>
        set((state) => ({
          candidates: [...state.candidates, { ...candidate, id: uuidv4() }],
        })),

      removeCandidate: (id) =>
        set((state) => ({
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== id
          ),
        })),
    }),
    {
      name: "staffer-kanban-storage",
      partialize: (state) => ({ candidates: state.candidates }),
    }
  )
);
