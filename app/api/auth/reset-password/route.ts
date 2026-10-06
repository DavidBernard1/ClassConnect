import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { jsonError } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const token = String(form.get("token") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (!token || !password || password !== confirmPassword) return jsonError("Invalid token or password", 400);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await db.passwordResetToken.findUnique({
      where: { tokenHash: hashedToken },
      include: { user: true },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      return jsonError("The reset link is invalid or expired.", 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await db.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    });

    await db.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    });

    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    return jsonError("Password reset failed", 500);
  }
}
