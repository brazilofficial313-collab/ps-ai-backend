// FILE: src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "./auth.service";
import { signAccessToken, signRefreshToken, verifyToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ ok: false, error: "Email & password required" });

    const user = await authService.createUser(email, password);

    const access = signAccessToken({ sub: user.id });
    const refresh = signRefreshToken({ sub: user.id });

    res.json({ ok: true, user, access, refresh });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.verifyCredentials(email, password);

    if (!user)
      return res.status(401).json({ ok: false, error: "Invalid email or password" });

    const access = signAccessToken({ sub: user.id });
    const refresh = signRefreshToken({ sub: user.id });

    res.json({ ok: true, user, access, refresh });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ ok: false, error: "Missing refreshToken" });

    const data = verifyToken(refreshToken) as any;

    const access = signAccessToken({ sub: data.sub });

    res.json({ ok: true, access });
  } catch (err: any) {
    res.status(401).json({ ok: false, error: "Invalid refresh token" });
  }
};

export const me = async (req: any, res: Response) => {
  try {
    if (!req.user?.sub)
      return res.status(401).json({ ok: false, error: "Unauthorized" });

    const user = await authService.findUserById(req.user.sub);

    res.json({ ok: true, user });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
