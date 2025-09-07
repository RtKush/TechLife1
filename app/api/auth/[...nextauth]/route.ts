import { authOptions } from "@/lib/auth.lib"
import NextAuth from "next-auth/next"

// This file acts as the API entry point for NextAuth
// [...nextauth] means it's a dynamic route — handles /api/auth/* (signin, signout, session, callback, etc.)


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


