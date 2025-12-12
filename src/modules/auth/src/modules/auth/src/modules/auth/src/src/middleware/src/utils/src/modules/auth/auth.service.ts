import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

type User = {
  id: string;
  email: string;
  passwordHash: string;
};

const users: User[] = [];

export async function createUser(email: string, password: string) {
  const exist = users.find(u => u.email === email.toLowerCase());
  if (exist) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);

  const user: User = {
    id: uuid(),
    email: email.toLowerCase(),
    passwordHash: hash,
  };

  users.push(user);
  return sanitize(user);
}

export async function verifyCredentials(email: string, password: string) {
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return sanitize(user);
}

export async function findUserById(id: string) {
  const user = users.find(u => u.id === id);
  return user ? sanitize(user) : null;
}

function sanitize(u: User) {
  const { passwordHash, ...safe } = u;
  return safe;
}
