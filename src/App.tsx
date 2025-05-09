import { useState } from "react";
import Kanban from "./components/Kanban/Kanban";
import EditModal from "./components/Candidate/EditModal";
import type { Candidate } from "./store/useKanbanStore";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate>();

  return (
    <div className="p-6 h-screen bg-base-200">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-base-content">
            Staffer ATS Kanban Board
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsModalOpen(true);
              setEditingCandidate(undefined);
            }}
          >
            Add Candidate
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <Kanban
            onEdit={(candidate) => {
              setIsModalOpen(true);
              setEditingCandidate(candidate);
            }}
          />
        </div>
        <EditModal
          isOpen={isModalOpen}
          candidate={editingCandidate}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCandidate(undefined);
          }}
        />
      </div>
    </div>
  );
};

export default App;
