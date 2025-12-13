import { Request, Response } from "express";
import * as walletService from "./wallet.service";

export const getMyWallet = (req: any, res: Response) => {
  const wallet = walletService.getWallet(req.user.sub);
  res.json({ ok: true, wallet });
};

export const getMyTransactions = (req: any, res: Response) => {
  const txs = walletService.getTransactions(req.user.sub);
  res.json({ ok: true, transactions: txs });
};
