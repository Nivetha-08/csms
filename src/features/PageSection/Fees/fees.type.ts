export interface PaymentEntry {
  amount: number;
  date: string;
}

export interface Fee {
  id?: number;
  studentid: number;
  totalamount: number;
  paidamount: number;
  dueamount: number;
  paymentstatus: "paid" | "partial" | "due";
  paymentdate: PaymentEntry[];
  createdat?: string;
}