import { Response } from "express";
import * as paymentService from "./payment.service";

export const createPayment = (req: any, res: Response) => {
  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ ok: false, message: "Invalid data" });
  }

  const payment = paymentService.createPayment(
    req.user.sub,
    amount,
    method
  );

  res.json({
    ok: true,
    message: "Payment request created",
    payment,
  });
};

export const myPayments = (req: any, res: Response) => {
  const list = paymentService.getUserPayments(req.user.sub);
  res.json({ ok: true, payments: list });
};
