import { Router } from "express";
import {
  createCryptoDeposit,
  myCryptoDeposits
} from "./crypto.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.post("/deposit", authMiddleware, createCryptoDeposit);
router.get("/my", authMiddleware, myCryptoDeposits);

export default router;
