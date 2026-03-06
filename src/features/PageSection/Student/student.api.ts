import axios from "axios";
import type { Student } from "./student.type";

const API_URL = "http://localhost:3001/students";

export const getStudents = async (): Promise<Student[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addStudent = async (data: Student): Promise<Student> => {
  const res = await axios.post(API_URL, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const updateStudent = async (
  id: number,
  data: Student
): Promise<Student> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};