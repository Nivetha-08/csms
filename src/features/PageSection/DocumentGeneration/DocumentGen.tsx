import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef,
} from "@tanstack/react-table";
import type { DocumentGeneration } from "./document";
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "./document.api";
import DocumentModal from "./DocumentModal";
import { PermissionGate } from "../../../auth/PermissionGate";

const DocumentGen: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentGeneration[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] =
    useState<DocumentGeneration | null>(null);

  const fetchDocuments = async () => {
    const data = await getDocuments();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleAddOrUpdate = async (data: DocumentGeneration) => {
    if (editData?.id) {
      await updateDocument(editData.id, data);
    } else {
      await addDocument(data);
    }

    fetchDocuments();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteDocument(id);
      fetchDocuments();
    }
  };

  const columns = useMemo<ColumnDef<DocumentGeneration>[]>(
    () => [
      { header: "Student ID", accessorKey: "studentid" },
      {
        header: "Document Type",
        cell: ({ row }) => row.original.documentType.type,
      },
      { header: "Issue Date", accessorKey: "issuedate" },
      { header: "Created By", accessorKey: "createdby" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <PermissionGate permission="documentGeneration:update">
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
            <PermissionGate permission="documentGeneration:delete">
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
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Document Generation</h4>
        <PermissionGate permission="documentGeneration:create">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          Generate Document
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

      <DocumentModal
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

export default DocumentGen;