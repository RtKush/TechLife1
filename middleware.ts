import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Yeh Vercel ke logs mein dikhega.
  console.log('--- Middleware is RUNNING for path:', req.nextUrl.pathname); 
  return NextResponse.next();
}

// Hum matcher ko aesa change kar rahe hain. Yeh Next.js ka standard tareeka hai.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};