import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators";
import { createSessionToken } from "@/lib/auth";
import { jsonError } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const values = Object.fromEntries(form.entries());
    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) return jsonError("The form contains invalid data", 400);

    const data = parsed.data;

    if (await db.user.findUnique({ where: { username: data.username } })) return jsonError("Username already exists", 400);
    if (await db.user.findUnique({ where: { email: data.email } })) return jsonError("Email already exists", 400);
    if (data.phone && await db.user.findUnique({ where: { phone: data.phone } })) return jsonError("Phone already exists", 400);

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await db.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        passwordHash,
        bio: data.bio || "",
        role: "USER",
      },
    });

    const token = await createSessionToken(user.id);
    const response = NextResponse.redirect(new URL("/feed", request.url));
    response.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 5,
    });

    return response;
  } catch (error) {
    return jsonError("Registration failed", 500);
  }
}
