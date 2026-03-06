import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Fee } from "./fees.type";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Fee) => void;
  editData?: Fee | null;
}

const FeeModal: React.FC<Props> = ({
  show,
  onClose,
  onSubmit,
  editData,
}) => {
  const { register, handleSubmit, reset, watch } = useForm<Fee>();
// eslint-disable-next-line
  const total = watch("totalamount");
  const paid = watch("paidamount");

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        studentid: 1,
        totalamount: 0,
        paidamount: 0,
        dueamount: 0,
        paymentstatus: "due",
        paymentdate: [],
      });
    }
  }, [editData, reset]);

  const handleFormSubmit = (data: Fee) => {
    const due = data.totalamount - data.paidamount;

    let status: "paid" | "partial" | "due" = "due";

    if (data.paidamount === 0) status = "due";
    else if (due === 0) status = "paid";
    else status = "partial";

    const finalData: Fee = {
      ...data,
      dueamount: due,
      paymentstatus: status,
      paymentdate:
        data.paidamount > 0
          ? [{ amount: data.paidamount, date: new Date().toISOString().split("T")[0] }]
          : [],
    };

    onSubmit(finalData);
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{editData ? "Edit Fee" : "Add Fee"}</h5>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Student ID"
              {...register("studentid", { required: true })}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Total Amount"
              {...register("totalamount", { required: true })}
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Paid Amount"
              {...register("paidamount", { required: true })}
            />

            <div className="mb-2">
              <strong>Due Amount: </strong>
              {total && paid ? total - paid : 0}
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

export default FeeModal;