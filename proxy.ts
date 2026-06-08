import { NextRequest, NextResponse } from 'next/server';

import { AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let all OAuth API routes pass through unconditionally.
  // /api/auth/[platform]         — initiates the OAuth redirect to the provider
  // /api/auth/[platform]/callback — receives the provider redirect; no session yet
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Let all proxied backend auth calls pass through — these are unauthenticated
  // by definition (login, register, forgot-password, OTP, reset-password).
  if (pathname.startsWith('/api/backend/auth/')) {
    return NextResponse.next();
  }

  // Read access token from cookies (set by the auth flow for SSR support)
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(token);
  // const isAuthenticated = true;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirect root to welcome screen
  if (pathname === '/') {
    return NextResponse.redirect(new URL(ROUTES.WELCOME, request.url));
  }

  // Redirect authenticated users away from login/register
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // Redirect unauthenticated users to welcome for protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.WELCOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
