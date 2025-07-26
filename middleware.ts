import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        return NextResponse.next()//pass middleware to either frontend or backend

    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl;

                // Public routes anyone can visit:
                const publicPaths = [
                    "/",
                    "/auth/login",
                    "/auth/register"
                ];

                // Routes anyone can visit if they start with these prefixes:
                const publicPrefixes = [
                    "/api/auth",
                    // "/reels",
                    "/blog",
                    "/profile",
                    "/api/search"
                ];

                if (pathname.startsWith("/api/user") && req.method === "GET") return true

                if (pathname.startsWith("/api/post") && req.method === "GET") return true

                // if (pathname.startsWith("/api/reel") && req.method === "GET") return true

                if (pathname.startsWith("/api/comments") && req.method === "GET") return true


                if (publicPaths.includes(pathname)) return true;

                if (publicPrefixes.some(prefix => pathname.startsWith(prefix))) return true;

                // Everything else requires token
                return !!token;
            }

        }


    },
)


// export const config = {

//     matcher: [
//         /*
//          * Match all request paths except:
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          * - public folder
//          */
//         "/((?!_next/static|_next/image|favicon.ico|public/).*)",
//     ],
// };


export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|images/|public/).*)",
    ],
};

/******************************* 
 * 
1. `req` inside `authorized()` is a `NextRequest` object provided by NextAuth middleware, which safely includes `.nextUrl.pathname`.

2. `req` outside of `authorized()` (in main middleware body) must use `new URL(req.url)` to access pathname reliably.

3. The `authorized()` callback controls access based on authentication logic — it decides **who** gets access.

4. The `config.matcher` decides **when** the middleware even runs — to skip static files or unprotected routes.

5. We exclude `_next/static`, `_next/image`, `favicon.ico`, and `public/` because they serve static assets that do not require session/token validation. Running auth checks on them is inefficient and risky.

6. Together, `matcher` and `authorized()` ensure secure + performant access control.

7.matcher = performance optimization: Don’t even run middleware for static/image files.

8.authorized() = logic control: Who is allowed to proceed for protected routes.

9 `config` is auto-used by Next.js — you don't need to import/use it manually.

10. It controls which routes should trigger middleware. If a route doesn't match, middleware won’t run.


 */