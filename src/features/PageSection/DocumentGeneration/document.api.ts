import axios from "axios";
import type { DocumentGeneration } from "./document";

const API_URL = "http://localhost:3001/documentGeneration";

export const getDocuments = async (): Promise<DocumentGeneration[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addDocument = async (
  data: DocumentGeneration
): Promise<DocumentGeneration> => {
  const res = await axios.post(API_URL, {
    ...data,
    createdat: new Date().toISOString(),
  });
  return res.data;
};

export const updateDocument = async (
  id: number,
  data: DocumentGeneration
): Promise<DocumentGeneration> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteDocument = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};