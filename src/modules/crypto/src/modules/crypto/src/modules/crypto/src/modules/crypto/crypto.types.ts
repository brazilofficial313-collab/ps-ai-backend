export type CryptoDeposit = {
  id: string;
  userId: string;
  coin: string;
  amount: number;
  status: "pending" | "confirmed" | "rejected";
  createdAt: Date;
};
