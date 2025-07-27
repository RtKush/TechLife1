// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";





// export const POST = async (req: NextRequest) => {

//     const token = await getToken({ req })
//     if (!token) {
//         return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }
//     const url = req.nextUrl
//     const urlSplit = url.pathname.split("/")
//     const slug = urlSplit[urlSplit.length - 2]

//     if (!slug) return NextResponse.json({ message: 'undefined blog' }, { status: 401 });

//     try {
//         await connectToDB()

//         const blog = await Blog.findOne({ slug })
//         if (!blog) {
//             return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
//         }

//         const userId = token.id

//         const alreadyLiked = blog.likes.includes(userId)

//         if (alreadyLiked) blog.likes.pull(userId)
//         else blog.likes.addToSet(userId)

//         await blog.save({ validateBeforeSave: false })

//         if (!blog) {
//             return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
//         }

//         return NextResponse.json({
//             message: 'Like toggled',
//             likesCount: blog.likes.length,
//             liked: !alreadyLiked
//         });


//     } catch (error) {
//         console.error("error while implenting blog like: ", error);
//         throw error

//     }

// }

// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// const allowedOrigin = "https://techlifever1.vercel.app/";

// function withCORS(response: NextResponse) {
//   response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
//   response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   return response;
// }

// export const POST = async (req: NextRequest) => {
//   try {
//     const token = await getToken({ req });

//     if (!token) {
//       return withCORS(
//         NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//       );
//     }

//     const slug = req.nextUrl.pathname.split("/")[4];

//     if (!slug) {
//       return withCORS(
//         NextResponse.json({ message: "Undefined blog slug" }, { status: 400 })
//       );
//     }

//     await connectToDB();

//     const blog = await Blog.findOne({ slug });

//     if (!blog) {
//       return withCORS(
//         NextResponse.json({ message: "Blog not found" }, { status: 404 })
//       );
//     }

//     const userId = token.id;
//     const alreadyLiked = blog.likes.includes(userId);

//     if (alreadyLiked) {
//       blog.likes.pull(userId);
//     } else {
//       blog.likes.addToSet(userId);
//     }

//     await blog.save({ validateBeforeSave: false });

//     return withCORS(
//       NextResponse.json({
//         message: "Like toggled",
//         likesCount: blog.likes.length,
//         liked: !alreadyLiked,
//       })
//     );
//   } catch (error) {
//     console.error("Error while toggling blog like:", error);
//     return withCORS(
//       NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
//     );
//   }
// };

// // ✅ Preflight handler
// // export const OPTIONS = async () => {
// //   return new Response(null, {
// //     status: 204,
// //     headers: {
// //       "Access-Control-Allow-Origin": "https://techlifever1.vercel.app",
// //       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// //       "Access-Control-Allow-Headers": "Content-Type, Authorization",
// //     },
// //   });
// // };

// export const OPTIONS = async () => {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// };


import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// ✅ Allowed origin for CORS
const allowedOrigin = "https://techlifever1.vercel.app/";

// ✅ CORS helper
function withCORS(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// ✅ GET: Get blog by slug
export const GET = async (req: NextRequest) => {
  try {
    const slug = req.nextUrl.pathname.split("/")[4];

    if (!slug) {
      return withCORS(
        NextResponse.json({ message: "Undefined blog slug" }, { status: 400 })
      );
    }

    await connectToDB();

    const blog = await Blog.findOne({ slug }).populate("authorId", "userName");

    if (!blog) {
      return withCORS(
        NextResponse.json({ message: "Blog not found" }, { status: 404 })
      );
    }

    return withCORS(
      NextResponse.json({
        message: "Blog fetched successfully",
        data: blog,
      }, { status: 200 })
    );
  } catch (error) {
    console.error("GET error in [slug]:", error);
    return withCORS(
      NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    );
  }
};

// ✅ POST: Like / Unlike blog
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return withCORS(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      );
    }

    const slug = req.nextUrl.pathname.split("/")[4];

    if (!slug) {
      return withCORS(
        NextResponse.json({ message: "Undefined blog slug" }, { status: 400 })
      );
    }

    await connectToDB();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return withCORS(
        NextResponse.json({ message: "Blog not found" }, { status: 404 })
      );
    }

    const userId = token.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId);
    } else {
      blog.likes.addToSet(userId);
    }

    await blog.save({ validateBeforeSave: false });

    return withCORS(
      NextResponse.json({
        message: "Like toggled",
        likesCount: blog.likes.length,
        liked: !alreadyLiked,
      })
    );
  } catch (error) {
    console.error("Error while toggling blog like:", error);
    return withCORS(
      NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    );
  }
};

// ✅ OPTIONS: Preflight CORS handler
export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};
