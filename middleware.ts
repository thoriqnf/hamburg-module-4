import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware for route protection using localStorage
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't need protection
  const publicRoutes = ['/login', '/']

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get token from cookies (we'll set this from localStorage on the client side)
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based route protection
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    const accessDeniedUrl = new URL('/login', request.url)
    accessDeniedUrl.searchParams.set('error', 'admin-required')
    return NextResponse.redirect(accessDeniedUrl)
  }

  if (pathname.startsWith('/user') && !userRole) {
    const accessDeniedUrl = new URL('/login', request.url)
    accessDeniedUrl.searchParams.set('error', 'login-required')
    return NextResponse.redirect(accessDeniedUrl)
  }

  // Add auth headers to the response
  const response = NextResponse.next()
  response.headers.set('x-user-role', userRole || 'guest')
  response.headers.set('x-auth-token', token)

  return response
}

// Configure which routes the middleware should run on
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
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}