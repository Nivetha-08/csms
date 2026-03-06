import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Mark } from "./marks.type";
import {
  getMarks,
  addMark,
  updateMark,
  deleteMark,
} from "./marks.api";
import MarkModal from "./MarkModal";
import { PermissionGate } from "../../../auth/PermissionGate";

const Marks: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Mark | null>(null);

  const fetchMarks = async () => {
    const data = await getMarks();
    setMarks(data);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  const handleAddOrUpdate = async (data: Mark) => {
    if (editData?.id) {
      await updateMark(editData.id, data);
    } else {
      await addMark(data);
    }

    fetchMarks();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteMark(id);
      fetchMarks();
    }
  };

  const columns = useMemo<ColumnDef<Mark>[]>(
    () => [
      { header: "Student ID", accessorKey: "studentid" },
      { header: "Subject", accessorKey: "subject" },
      { header: "Marks", accessorKey: "marksobtained" },
      { header: "Max", accessorKey: "maxmarks" },
      { header: "Semester", accessorKey: "semester" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <PermissionGate permission="marks:update">
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
            <PermissionGate permission="marks:delete">
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
    data: marks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Marks</h4>
        <PermissionGate permission="marks:create">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          Add Mark
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

      <MarkModal
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

export default Marks;