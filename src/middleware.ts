import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const { pathname } = new URL(req.clone().url);

  if (pathname === "/login" && token?.value.length) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/dashboard" && !token?.value.length) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
