import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { jsonError } from "@/lib/response";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL("/login", process.env.APP_URL || "http://localhost:3000"));

  const stats = {
    users: await db.user.count(),
    posts: await db.post.count(),
    reports: await db.report.count(),
    stories: await db.story.count(),
  };

  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const action = String(form.get("action") || "");
    if (action === "login" && request.headers.get("x-admin-guard") === "true") {
      return jsonError("Admin login required", 401);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError("Admin route error", 500);
  }
}
