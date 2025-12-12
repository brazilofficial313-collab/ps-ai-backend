// FILE: src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ ok: false, error: "Missing Authorization header" });

    const parts = header.split(" ");
    if (parts.length !== 2) return res.status(401).json({ ok: false, error: "Invalid Authorization header" });

    const token = parts[1];
    const secret = process.env.JWT_SECRET || "dev-secret";

    const payload = jwt.verify(token, secret) as any;
    req.user = payload;

    next();
  } catch (err: any) {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
};
