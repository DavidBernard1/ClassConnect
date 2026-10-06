import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { jsonError } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const email = String(form.get("email") || "").trim();
    if (!email) return jsonError("Email is required", 400);

    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      await db.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        },
      });

      const resetUrl = `${process.env.APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
      console.log(`Password reset link: ${resetUrl}`);
    }

    return NextResponse.json({
      message: "If an account exists for this email, a password reset link has been sent.",
    });
  } catch (error) {
    return jsonError("Unable to process the request", 500);
  }
}
