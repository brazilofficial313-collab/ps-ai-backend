// FILE: src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

type User = {
  id: string;
  email: string;
  passwordHash: string;
  tier?: string;
  referral_code?: string;
  referred_by?: string | null;
  status?: string;
  created_at?: string;
};

const users: User[] = [];

// create user
export async function createUser(email: string, password: string) {
  const exists = users.find((u) => u.email === email.toLowerCase());
  if (exists) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);

  const user: User = {
    id: uuidv4(),
    email: email.toLowerCase(),
    passwordHash: hash,
    tier: "free",
    referral_code: `REF-${Math.random().toString(36).slice(2,8).toUpperCase()}`,
    referred_by: null,
    status: "active",
    created_at: new Date().toISOString(),
  };

  users.push(user);
  return sanitize(user);
}

// verify login
export async function verifyCredentials(email: string, password: string) {
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return sanitize(user);
}

export async function findUserById(id: string) {
  const user = users.find((u) => u.id === id);
  return user ? sanitize(user) : null;
}

function sanitize(user: User) {
  const { passwordHash, ...rest } = user as any;
  return rest;
}
