import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Mark } from "./marks.type";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Mark) => void;
  editData?: Mark | null;
}

const MarkModal: React.FC<Props> = ({
  show,
  onClose,
  onSubmit,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm<Mark>();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        studentid: 1,
        subject: "",
        marksobtained: 0,
        maxmarks: 100,
        semester: 1,
      });
    }
  }, [editData, reset]);

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{editData ? "Edit Mark" : "Add Mark"}</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Student ID"
              {...register("studentid", { required: true })}
            />

            <input
              className="form-control mb-2"
              placeholder="Subject"
              {...register("subject", { required: true })}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Marks Obtained"
              {...register("marksobtained", { required: true })}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Max Marks"
              {...register("maxmarks", { required: true })}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Semester"
              {...register("semester", { required: true })}
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editData ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarkModal;