import { Request, Response } from "express";
import { createDeposit, getMyDeposits } from "./crypto.service";

export const createCryptoDeposit = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { coin, amount } = req.body;

  if (!coin || !amount) {
    return res.status(400).json({ message: "coin and amount required" });
  }

  const deposit = createDeposit(userId, coin, amount);

  res.json({ ok: true, deposit });
};

export const myCryptoDeposits = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const deposits = getMyDeposits(userId);

  res.json({ ok: true, deposits });
};
