import { useState, useRef, type DragEvent } from "react";
import { type Candidate } from "../../store/useKanbanStore";

type CandidateCardProps = {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
  onDragStart: (event: DragEvent, candidate: Candidate) => void;
  onDragEnd: () => void;
};

const CandidateCard = ({
  candidate,
  onEdit,
  onDragStart,
  onDragEnd,
}: CandidateCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      event.dataTransfer.setDragImage(cardRef.current, offsetX, offsetY);
      event.dataTransfer.effectAllowed = "move";
    }

    setIsDragging(true);
    onDragStart(event, candidate);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      ref={cardRef}
      className={`card card-border w-full bg-base-200 cursor-grab mb-3 ${
        isDragging ? "opacity-50" : ""
      }`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-body p-4">
        {candidate.priority && (
          <div className="absolute top-2 right-2">
            <div className="badge badge-error badge-sm">Priority</div>
          </div>
        )}
        <h3 className="card-title text-base font-semibold mb-1 pr-6">
          {candidate.name}
        </h3>
        <p className="text-sm text-base-content mb-2">{candidate.role}</p>
        <p className="text-xs text-base-content opacity-70">
          Applied: {formatDate(candidate.applicationDate)}
        </p>
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => onEdit(candidate)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
