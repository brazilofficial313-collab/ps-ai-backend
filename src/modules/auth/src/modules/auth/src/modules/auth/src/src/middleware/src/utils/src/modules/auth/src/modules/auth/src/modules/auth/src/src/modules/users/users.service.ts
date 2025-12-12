import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

const users: User[] = [];

export async function getUserById(id: string) {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  const { passwordHash, ...safe } = user;
  return safe;
}

export async function updateProfile(id: string, data: { name?: string; email?: string }) {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  if (data.email) user.email = data.email.toLowerCase();
  if (data.name) user.name = data.name;

  const { passwordHash, ...safe } = user;
  return safe;
}

export async function changePassword(id: string, oldPw: string, newPw: string) {
  const user = users.find(u => u.id === id);
  if (!user) return false;

  const ok = await bcrypt.compare(oldPw, user.passwordHash);
  if (!ok) return false;

  user.passwordHash = await bcrypt.hash(newPw, 10);
  return true;
}

export async function deleteUser(id: string) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
                                                       }
