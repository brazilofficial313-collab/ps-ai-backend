import { Router } from "express";
import { getMe, updateMe, changePassword, removeAccount } from "./users.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);
router.post("/change-password", authMiddleware, changePassword);
router.delete("/delete", authMiddleware, removeAccount);

export default router;
