import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef
} from "@tanstack/react-table";
import type { Fee } from "./fees.type";
import {
  getFees,
  addFee,
  updateFee,
  deleteFee,
} from "./fees.api";
import FeeModal from "./FeeModal";
import { PermissionGate } from "../../../auth/PermissionGate";

const Fees: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Fee | null>(null);

  const fetchFees = async () => {
    const data = await getFees();
    setFees(data);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleAddOrUpdate = async (data: Fee) => {
    if (editData?.id) {
      await updateFee(editData.id, data);
    } else {
      await addFee(data);
    }
    fetchFees();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteFee(id);
      fetchFees();
    }
  };

  const columns = useMemo<ColumnDef<Fee>[]>(
    () => [
      { header: "Student ID", accessorKey: "studentid" },
      { header: "Total", accessorKey: "totalamount" },
      { header: "Paid", accessorKey: "paidamount" },
      { header: "Due", accessorKey: "dueamount" },
      { header: "Status", accessorKey: "paymentstatus" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <PermissionGate permission="fees:update">
            <button
              className="btn btn-sm btn-warning"
              onClick={() => {
                setEditData(row.original);
                setShowModal(true);
              }}
            >
              Edit
            </button>
            </PermissionGate>
            <PermissionGate permission="fees:delete">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(row.original.id!)}
            >
              Delete
            </button>
            </PermissionGate>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );
// eslint-disable-next-line
  const table = useReactTable({
    data: fees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Fees</h4>
        <PermissionGate permission="fees:create">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          Add Fee
        </button>
        </PermissionGate>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FeeModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        onSubmit={handleAddOrUpdate}
        editData={editData}
      />
    </div>
  );
};

export default Fees;