// FILE: src/modules/auth/auth.routes.ts
import { Router } from "express";
import { register, login, refresh, me } from "./auth.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// public
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

// protected
router.get("/me", authMiddleware, me);

export default router;
