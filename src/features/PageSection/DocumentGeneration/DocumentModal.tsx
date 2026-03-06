import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type {
  DocumentGeneration,
} from "./document";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: DocumentGeneration) => void;
  editData?: DocumentGeneration | null;
}

const DocumentModal: React.FC<Props> = ({
  show,
  onClose,
  onSubmit,
  editData,
}) => {
  const { register, handleSubmit, reset } =
    useForm<DocumentGeneration>();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        studentid: 1,
        documentType: { type: "BONAFIED" },
        issuedate: "",
        content: "",
        createdby: "admin",
      });
    }
  }, [editData, reset]);

  const handleFormSubmit = (data: DocumentGeneration) => {
    const finalData: DocumentGeneration = {
      ...data,
      documentType: {
        type: data.documentType.type,
      },
    };

    onSubmit(finalData);
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{editData ? "Edit Document" : "Generate Document"}</h5>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Student ID"
              {...register("studentid", { required: true })}
            />

            <select
              className="form-control mb-2"
              {...register("documentType.type")}
            >
              <option value="BONAFIED">Bonafied</option>
              <option value="MARKSHEET">Marksheet</option>
              <option value="TRANSFER_CERTIFICATE">
                Transfer Certificate
              </option>
            </select>

            <input
              type="date"
              className="form-control mb-2"
              {...register("issuedate", { required: true })}
            />

            <textarea
              className="form-control mb-2"
              placeholder="Content"
              rows={3}
              {...register("content", { required: true })}
            />

            <select
              className="form-control mb-3"
              {...register("createdby")}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editData ? "Update" : "Generate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;