import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt";


// Extend built-in NextAuth types to support custom fields like `userName`
// This allows you to access `session.user.userName` and `token.userName` with type safety
declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      id: string,
      userName?: string | mongoose.Types.ObjectId
      avatar?: string
      bio?: string
      lastName?: string
      firstName?: string


    } & DefaultSession["user"] // includes name, email, image
  }

  interface User extends DefaultUser {
    id: string;
    userName?: string;
    avatar?: string
    email: string
    bio?: string
    lastName?: string
    firstName?: string

  }
}


// extend the token objext
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string | mongoose.Types.ObjectId
    avatar?: string
    email: string
    bio?: string
    lastName?: string
    firstName?: string

  }
}



/*********************************** FLOW OF NEXT JS ********************************/

/*
1. Design DB Models (e.g., User, Video) using Mongoose
2. Setup a shared MongoDB connection logic using global cache
3. Implement authentication:
   a. Create registration endpoint manually (NextAuth doesn’t provide it)
   b. Setup NextAuth for login (Google/Credentials)
   c. Secure pages based on sessions (JWT or database)

   */
