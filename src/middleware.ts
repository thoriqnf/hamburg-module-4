import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login"];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for static files and Next.js internals
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Get auth data from cookies (set by DummyJSON API)
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If no auth cookies, redirect to login
  if (!accessToken || !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};