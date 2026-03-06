import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Student } from "./student.type";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Student) => void;
  editData?: Student | null;
}

const StudentModal: React.FC<Props> = ({
  show,
  onClose,
  onSubmit,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm<Student>();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        name: "",
        rollnumer: "",
        departmen: "",
        year: 1,
        email: "",
        phone: "",
        adress: "",
      });
    }
  }, [editData, reset]);

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{editData ? "Edit Student" : "Add Student"}</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control mb-2" placeholder="Name" {...register("name", { required: true })} />
            <input className="form-control mb-2" placeholder="Roll Number" {...register("rollnumer", { required: true })} />
            <input className="form-control mb-2" placeholder="Department" {...register("departmen", { required: true })} />
            <input type="number" className="form-control mb-2" placeholder="Year" {...register("year", { required: true })} />
            <input className="form-control mb-2" placeholder="Email" {...register("email", { required: true })} />
            <input className="form-control mb-2" placeholder="Phone" {...register("phone", { required: true })} />
            <input className="form-control mb-2" placeholder="Address" {...register("adress", { required: true })} />

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
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

export default StudentModal;