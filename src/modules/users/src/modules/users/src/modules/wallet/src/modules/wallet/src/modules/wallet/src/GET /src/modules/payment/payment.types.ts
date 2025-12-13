export type PaymentMethod = "jazzcash" | "easypaisa" | "nayapay";

export type PaymentRequest = {
  id: string;
  userId: string;
  amount: number;
  method: PaymentMethod;
  screenshot?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};
