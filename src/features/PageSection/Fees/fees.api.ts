import axios from "axios";
import type { Fee } from "./fees.type";

const API_URL = "http://localhost:3001/fees";

export const getFees = async (): Promise<Fee[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addFee = async (data: Fee): Promise<Fee> => {
  const res = await axios.post(API_URL, {
    ...data,
    createdat: new Date().toISOString(),
  });
  return res.data;
};

export const updateFee = async (id: number, data: Fee): Promise<Fee> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteFee = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};