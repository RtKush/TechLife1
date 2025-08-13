import { NextRequest, NextResponse } from 'next/server';

// Yeh sabse simple middleware hai jo kuch nahi karta, bas request ko aage bhej deta hai
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// Isse middleware saare routes par chalega
export const config = {
  matcher: '/:path*',
};