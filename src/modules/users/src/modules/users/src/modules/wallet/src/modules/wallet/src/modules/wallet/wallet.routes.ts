import { Router } from "express";
import { getMyWallet, getMyTransactions } from "./wallet.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.get("/", authMiddleware, getMyWallet);
router.get("/transactions", authMiddleware, getMyTransactions);

export default router;
