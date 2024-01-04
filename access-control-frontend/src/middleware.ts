import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  const pathname = new URL(request.nextUrl).pathname;

  if (!accessToken && pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (accessToken && pathname === "/login" || accessToken && pathname === "/") {
    return NextResponse.redirect(new URL('/produtos', request.nextUrl));
  }

  return;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/produtos",
    "/usuarios",
    "/api"
  ],
}