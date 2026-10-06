import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "development-secret");

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashValue: string) {
  return compare(password, hashValue);
}

export async function createSessionToken(userId: string) {
  return await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5h")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.sub as string;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const userId = await verifySessionToken(token);
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.isActive || user.isSuspended) return null;

  return user;
}

export function isAdminUser(user: { isAdmin?: boolean } | null) {
  return Boolean(user && user.isAdmin);
}

export function sanitizeUser(user: any) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
