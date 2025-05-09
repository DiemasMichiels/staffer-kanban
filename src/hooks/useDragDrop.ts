import { useState } from "react";
import type { DragEvent } from "react";
import { type Candidate, type ProcessingStates } from "../store/useKanbanStore";

type DragData = {
  candidate: Candidate | null;
  sourceColumn: ProcessingStates | null;
};

export const useDragDrop = () => {
  const [dragData, setDragData] = useState<DragData>({
    candidate: null,
    sourceColumn: null,
  });

  const [isDraggingOver, setIsDraggingOver] = useState<ProcessingStates | null>(
    null
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

  const handleDrop = (
    event: DragEvent,
    targetColumn: ProcessingStates,
    updateCandidate: (candidate: Candidate) => void
  ) => {
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

  return {
    dragData,
    isDraggingOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
