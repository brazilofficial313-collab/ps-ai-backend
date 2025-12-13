type Wallet = {
  userId: string;
  balance: number;
};

type Tx = {
  id: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  reason: string;
  createdAt: Date;
};

const wallets: Wallet[] = [];
const transactions: Tx[] = [];

export function getWallet(userId: string) {
  let wallet = wallets.find(w => w.userId === userId);
  if (!wallet) {
    wallet = { userId, balance: 0 };
    wallets.push(wallet);
  }
  return wallet;
}

export function credit(userId: string, amount: number, reason = "credit") {
  const wallet = getWallet(userId);
  wallet.balance += amount;

  transactions.push({
    id: crypto.randomUUID(),
    userId,
    amount,
    type: "credit",
    reason,
    createdAt: new Date(),
  });

  return wallet;
}

export function debit(userId: string, amount: number, reason = "debit") {
  const wallet = getWallet(userId);
  if (wallet.balance < amount) return null;

  wallet.balance -= amount;

  transactions.push({
    id: crypto.randomUUID(),
    userId,
    amount,
    type: "debit",
    reason,
    createdAt: new Date(),
  });

  return wallet;
}

export function getTransactions(userId: string) {
  return transactions.filter(t => t.userId === userId);
  }
