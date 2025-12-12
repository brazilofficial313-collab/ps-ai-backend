import { Request, Response } from "express";
import * as usersService from "./users.service";

export const getMe = async (req: any, res: Response) => {
  const user = await usersService.getUserById(req.user.sub);
  res.json({ ok: true, user });
};

export const updateMe = async (req: any, res: Response) => {
  const user = await usersService.updateProfile(req.user.sub, req.body);
  res.json({ ok: true, user });
};

export const changePassword = async (req: any, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const ok = await usersService.changePassword(req.user.sub, oldPassword, newPassword);
  if (!ok) return res.status(400).json({ ok: false, error: "Old password incorrect" });

  res.json({ ok: true, message: "Password updated" });
};

export const removeAccount = async (req: any, res: Response) => {
  const ok = await usersService.deleteUser(req.user.sub);
  if (!ok) return res.status(404).json({ ok: false, error: "User not found" });

  res.json({ ok: true, message: "Account deleted" });
};
