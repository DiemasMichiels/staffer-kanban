import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useKanbanStore,
  PROCESSING_STATES,
  type Candidate,
} from "../../store/useKanbanStore";

const DEFAULT_FORM: Pick<
  Candidate,
  "name" | "role" | "applicationDate" | "status" | "priority"
> = {
  name: "",
  role: "",
  applicationDate: "",
  status: "Applied",
  priority: false,
};

type EditModalProps = {
  isOpen: boolean;
  candidate: Candidate | undefined;
  onClose: () => void;
};

const EditModal = ({ isOpen, candidate, onClose }: EditModalProps) => {
  const { updateCandidate, addCandidate } = useKanbanStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Candidate>({
    defaultValues: candidate ?? DEFAULT_FORM,
  });

  useEffect(() => {
    reset(candidate ?? DEFAULT_FORM);
  }, [candidate, reset]);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<Candidate> = (data) => {
    if (!candidate) {
      addCandidate({
        ...data,
      });
    } else {
      updateCandidate({
        ...candidate,
        ...data,
      });
    }
    onClose();
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-semibold mb-4">
          {candidate ? "Edit candidate" : "Add new candidate"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-error mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <input
              className={`input input-bordered w-full ${
                errors.role ? "input-error" : ""
              }`}
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && (
              <span className="text-xs text-error mt-1">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Application Date</span>
            </label>
            <input
              className={`input input-bordered w-full ${
                errors.applicationDate ? "input-error" : ""
              }`}
              type="date"
              {...register("applicationDate", {
                required: "Application date is required",
              })}
            />
            {errors.applicationDate && (
              <span className="text-xs text-error mt-1">
                {errors.applicationDate.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Current status</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.status ? "select-error" : ""
              }`}
              {...register("status", { required: "Status is required" })}
            >
              {Object.entries(PROCESSING_STATES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className="text-xs text-error mt-1">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="toggle toggle-error"
                {...register("priority")}
              />
              <span className="label-text">Priority Candidate</span>
            </label>
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" type="submit">
              {candidate ? "Save Changes" : "Add Candidate"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default EditModal;
