import { authOptions } from "@/lib/auth.lib"
import NextAuth from "next-auth/next"

// This file acts as the API entry point for NextAuth
// [...nextauth] means it's a dynamic route — handles /api/auth/* (signin, signout, session, callback, etc.)


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

/* 
1. this endpoint respond to both GET and POST requests using NextAuth(authOptions) handler.
    - GET is used to render built-in pages (/api/auth/signin)
    - POST is used to process form submissions (login, logout)


2. code files are split in "lib/auth.ts" and "app/api/auth/[...nextauth]/route.ts"
    "lib/auth.ts" -> contain the auth configuration(authoption)-isolated and resuable
    "app/api/auth/[...nextauth]/route.ts" -> Actual api route where nextJS run 


*/
