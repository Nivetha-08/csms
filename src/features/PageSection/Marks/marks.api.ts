import axios from "axios";
import type { Mark } from "./marks.type";

const API_URL = "http://localhost:3001/marks";

export const getMarks = async (): Promise<Mark[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addMark = async (data: Mark): Promise<Mark> => {
  const res = await axios.post(API_URL, {
    ...data,
    createdat: new Date().toISOString(),
  });
  return res.data;
};

export const updateMark = async (
  id: number,
  data: Mark
): Promise<Mark> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteMark = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};