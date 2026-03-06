export interface Mark {
  id?: number;
  studentid: number;
  subject: string;
  marksobtained: number;
  maxmarks: number;
  semester: number;
  createdat?: string;
}