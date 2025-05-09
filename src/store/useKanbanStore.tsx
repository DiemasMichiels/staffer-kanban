import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

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

const STORAGE_KEY = "staffer-kanban-storage";

interface KanbanState {
  candidates: Candidate[];
  updateCandidate: (updatedCandidate: Candidate) => void;
  addCandidate: (candidate: Omit<Candidate, "id">) => void;
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
          candidates: [
            ...state.candidates,
            { ...candidate, id: uuidv4() } as Candidate,
          ],
        })),

      removeCandidate: (id) =>
        set((state) => ({
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== id
          ),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ candidates: state.candidates }),
    }
  )
);

export const useSyncKanbanStore = () => {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsedValue = JSON.parse(event.newValue);
          if (parsedValue?.state?.candidates) {
            useKanbanStore.setState({
              candidates: parsedValue.state.candidates,
            });
          }
        } catch (error) {
          console.error("Error syncing data from other tab:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
};
