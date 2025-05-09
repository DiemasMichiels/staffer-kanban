import { useState } from "react";
import Kanban from "./components/Kanban/Kanban";
import EditModal from "./components/Candidate/EditModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [isNew, setIsNew] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-base-content">
            Staffer ATS Kanban Board
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingCandidate(null);
              setIsNew(true);
              setIsModalOpen(true);
            }}
          >
            Add Candidate
          </button>
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">
          <Kanban />
        </div>
        <EditModal
          isOpen={isModalOpen}
          candidate={editingCandidate}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCandidate(null);
            setIsNew(false);
          }}
          isNew={isNew}
        />
      </div>
    </div>
  );
};

export default App;
