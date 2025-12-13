import { PaymentRequest } from "./payment.types";

const payments: PaymentRequest[] = [];

export function createPayment(
  userId: string,
  amount: number,
  method: any
) {
  const payment: PaymentRequest = {
    id: crypto.randomUUID(),
    userId,
    amount,
    method,
    status: "pending",
    createdAt: new Date(),
  };

  payments.push(payment);
  return payment;
}

export function getUserPayments(userId: string) {
  return payments.filter(p => p.userId === userId);
}
