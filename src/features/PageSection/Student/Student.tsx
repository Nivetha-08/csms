import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "./student.type";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./student.api";
import StudentModal from "./StudentModal";
import { PermissionGate } from "../../../auth/PermissionGate";

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Student | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddOrUpdate = async (data: Student) => {
    if (editData?.id) {
      await updateStudent(editData.id, data);
    } else {
      await addStudent(data);
    }
    fetchStudents();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Roll", accessorKey: "rollnumer" },
      { header: "Department", accessorKey: "departmen" },
      { header: "Year", accessorKey: "year" },
      { header: "Email", accessorKey: "email" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <PermissionGate permission="student:update">
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

            <PermissionGate permission="student:delete">
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
    data: students,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="container mt-4">
    
      <div className="d-flex justify-content-between mb-3">
        <h4>Students</h4>
        <PermissionGate permission="student:create">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            Add Student
          </button>
        </PermissionGate>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search students..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StudentModal
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

export default Students;