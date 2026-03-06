import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef,
} from "@tanstack/react-table";
import type { User } from "./user.type";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./user.api";
import UserModal from "./UserModal";
import { PermissionGate } from "../../../auth/PermissionGate";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddOrUpdate = async (data: User) => {
    if (editData?.id) {
      await updateUser(editData.id, data);
    } else {
      await addUser(data);
    }

    fetchUsers();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { header: "Email", accessorKey: "email" },
      { header: "Role", accessorKey: "role" },
      {
        header: "Status",
        cell: ({ row }) =>
          row.original.isActive ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <PermissionGate permission="users:update">
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
            <PermissionGate permission="users:delete">
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
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Users</h4>
        <PermissionGate permission="create">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          Add User
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

      <UserModal
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

export default Users;