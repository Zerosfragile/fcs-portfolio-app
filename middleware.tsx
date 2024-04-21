import { NextResponse, NextRequest } from "next/server";

// Reroute on prod to home if trying to access /test
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const isDevEnvironment = request.url.startsWith("http://localhost:3000");

  if (isDevEnvironment) {
    return res;
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/test",
};
