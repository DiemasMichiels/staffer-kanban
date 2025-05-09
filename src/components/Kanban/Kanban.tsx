import CandidateCard from "../Candidate/Card";
import {
  useKanbanStore,
  type Candidate,
  type ProcessingStates,
  PROCESSING_STATES,
} from "../../store/useKanbanStore";
import { useShallow } from "zustand/shallow";
import { useDragDrop } from "../../hooks/useDragDrop";

type KanbanProps = {
  onEdit: (candidate: Candidate) => void;
};

const Kanban = ({ onEdit }: KanbanProps) => {
  const { candidates, updateCandidate } = useKanbanStore(
    useShallow((state) => ({
      candidates: state.candidates,
      updateCandidate: state.updateCandidate,
    }))
  );

  const {
    isDraggingOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragDrop();

  const columnCandidates = Object.keys(PROCESSING_STATES).reduce(
    (acc, status) => {
      acc[status as ProcessingStates] = candidates.filter(
        (c) => c.status === status
      );
      return acc;
    },
    {} as Record<ProcessingStates, Candidate[]>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full overflow-auto">
      {Object.entries(PROCESSING_STATES).map(([key, label]) => {
        const column = key as ProcessingStates;
        const columnItems = columnCandidates[column] || [];
        const isOver = isDraggingOver === column;

        return (
          <div
            key={column}
            className={`flex flex-col bg-base-100 rounded-box p-4 min-h-96 h-full overflow-hidden ${
              isOver ? "bg-base-300" : ""
            }`}
            onDragOver={(event) => handleDragOver(event, column)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, column, updateCandidate)}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{label}</h2>
              <div className="badge">{columnItems.length}</div>
            </div>

            <div className="overflow-y-auto flex-grow">
              {columnItems.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onEdit={onEdit}
                  onDragStart={(event) =>
                    handleDragStart(event, candidate, column)
                  }
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Kanban;
