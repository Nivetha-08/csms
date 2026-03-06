import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { User } from "./user.type";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  editData?: User | null;
}

const UserModal: React.FC<Props> = ({
  show,
  onClose,
  onSubmit,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm<User>();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        email: "",
        role: "teacher",
        isActive: true,
      });
    }
  }, [editData, reset]);

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{editData ? "Edit User" : "Add User"}</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control mb-2"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            <select
              className="form-control mb-2"
              {...register("role", { required: true })}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                {...register("isActive")}
              />
              <label className="form-check-label">
                Active User
              </label>
            </div>

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

export default UserModal;