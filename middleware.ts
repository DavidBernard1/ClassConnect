import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const payload = JSON.parse(Buffer.from(session.split(".")[1] || "", "base64").toString("utf8"));
      if (!payload || payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (url.pathname === "/feed" && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/feed"],
};
