import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Yeh Vercel ke logs mein dikhega.
  console.log('--- Middleware is RUNNING for path:', req.nextUrl.pathname); 
  return NextResponse.next();
}

// Hum matcher ko aesa change kar rahe hain. Yeh Next.js ka standard tareeka hai.
export const config = {
  matcher: [
  
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};