import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "@/lib/response";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const redirectUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(redirectUrl);
  return response;
}
