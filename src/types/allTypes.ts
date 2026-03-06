export type Student = {
  id: number;
  name: string;
  rollnumer: string;
  departmen: string;
  year: number;
  email: string;
  phone: string;
  adress: string;
  createdAt: string;
}

export type Mark ={
  id: number;
  studentid: number;
  subject: string;
  marksobtained: number;
  maxmarks: number;
  semester: number;
  createdat: string;
}

export type FeePayment ={
  amount: number;
  date: string;
}

export type Fee ={
  id: number;
  studentid: number;
  totalamount: number;
  paidamount: number;
  dueamount: number;
  paymentstatus: "paid" | "partial" | "due";
  paymentdate: FeePayment[];
  createdat: string;
}

export type User ={
  id: number;
  name: string;
  role: "admin" | "teacher";
}