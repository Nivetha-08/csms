import axios from "axios";
import type { User } from "./user.type";

const API_URL = "http://localhost:3001/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addUser = async (data: User): Promise<User> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateUser = async (
  id: number,
  data: User
): Promise<User> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};