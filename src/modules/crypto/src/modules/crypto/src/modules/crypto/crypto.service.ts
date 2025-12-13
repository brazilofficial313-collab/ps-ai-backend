import { CryptoDeposit } from "./crypto.types";

const cryptoDB: CryptoDeposit[] = [];

export const createDeposit = (
  userId: string,
  coin: string,
  amount: number
): CryptoDeposit => {
  const deposit: CryptoDeposit = {
    id: Date.now().toString(),
    userId,
    coin,
    amount,
    status: "pending",
    createdAt: new Date()
  };

  cryptoDB.push(deposit);
  return deposit;
};

export const getMyDeposits = (userId: string): CryptoDeposit[] => {
  return cryptoDB.filter(d => d.userId === userId);
};
