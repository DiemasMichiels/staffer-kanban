import { useState } from "react";
import CandidateCard from "../Candidate/Card";
import {
  useKanbanStore,
  type Candidate,
  type ProcessingStates,
  PROCESSING_STATES,
} from "../../store/useKanbanStore";
import type { DragEvent } from "react";
import { useShallow } from "zustand/shallow";

type DragData = {
  candidate: Candidate | null;
  sourceColumn: ProcessingStates | null;
};

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
  const [dragData, setDragData] = useState<DragData>({
    candidate: null,
    sourceColumn: null,
  });

  const [isDraggingOver, setIsDraggingOver] = useState<ProcessingStates | null>(
    null
  );

  const columnCandidates = Object.keys(PROCESSING_STATES).reduce(
    (acc, status) => {
      acc[status as ProcessingStates] = candidates.filter(
        (c) => c.status === status
      );
      return acc;
    },
    {} as Record<ProcessingStates, Candidate[]>
  );

  const handleDragStart = (
    event: DragEvent,
    candidate: Candidate,
    sourceColumn: ProcessingStates
  ) => {
    event.dataTransfer.setData("candidateId", candidate.id);
    setDragData({
      candidate,
      sourceColumn,
    });
  };

  const handleDragEnd = () => {
    setDragData({
      candidate: null,
      sourceColumn: null,
    });
    setIsDraggingOver(null);
  };

  const handleDragOver = (event: DragEvent, column: ProcessingStates) => {
    event.preventDefault();
    setIsDraggingOver(column);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setIsDraggingOver(null);
  };

  const handleDrop = (event: DragEvent, targetColumn: ProcessingStates) => {
    event.preventDefault();

    const candidateId = event.dataTransfer.getData("candidateId");
    const { candidate, sourceColumn } = dragData;

    if (candidate?.id === candidateId && sourceColumn !== targetColumn) {
      updateCandidate({
        ...candidate,
        status: targetColumn,
      });
    }

    setIsDraggingOver(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full overflow-auto">
      {Object.entries(PROCESSING_STATES).map(([key, label]) => {
        const column = key as ProcessingStates;
        const columnItems = columnCandidates[column] || [];
        const isOver = isDraggingOver === column;

        return (
          <div
            key={column}
            className={`flex flex-col bg-base-100 rounded-box p-4 min-h-96
              
              h-full overflow-hidden ${isOver ? "bg-base-300" : ""}`}
            onDragOver={(event) => handleDragOver(event, column)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, column)}
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
