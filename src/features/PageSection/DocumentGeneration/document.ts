export type DocumentTypeEnum =
  | "BONAFIED"
  | "MARKSHEET"
  | "TRANSFER_CERTIFICATE";

export interface DocumentType {
  type: DocumentTypeEnum;
}

export interface DocumentGeneration {
  id?: number;
  studentid: number;
  documentType: DocumentType;
  issuedate: string;
  content: string;
  createdby: "admin" | "teacher";
  createdat?: string;
}