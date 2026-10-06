import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSessionToken, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { detectLoginType, loginSchema } from "@/lib/validators";
import { jsonError } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const payload = Object.fromEntries(form.entries());
    const parsed = loginSchema.safeParse(payload);
    if (!parsed.success) return jsonError("Invalid login data", 400);

    const { identifier, password } = parsed.data;
    const loginType = detectLoginType(identifier);
    const where = loginType === "email"
      ? { email: identifier }
      : loginType === "phone"
        ? { phone: identifier }
        : { username: identifier };

    const user = await db.user.findUnique({ where });
    if (!user) return jsonError("Invalid credentials", 401);

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) return jsonError("Invalid credentials", 401);

    const token = await createSessionToken(user.id);
    const response = NextResponse.redirect(new URL(user.isAdmin ? "/admin" : "/feed", request.url));
    response.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 5,
    });

    await db.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    return response;
  } catch (error) {
    return jsonError("Login failed", 500);
  }
}
