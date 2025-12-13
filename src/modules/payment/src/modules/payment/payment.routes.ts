import { Router } from "express";
import { createPayment, myPayments } from "./payment.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.post("/qr", authMiddleware, createPayment);
router.get("/my", authMiddleware, myPayments);

export default router;
