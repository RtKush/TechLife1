// import { authOptions } from "@/lib/auth.lib";
// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// // GET: /api/post => Get all posts
// export async function GET(req: NextRequest) {
//   await connectToDB();
//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "10");
//   const skip = (page - 1) * limit;
//   try {
//     const totalPosts = await Blog.countDocuments();
//     const totalPages = Math.ceil(totalPosts / limit);
//     const allBlogs = await Blog.find({})
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate("authorId", "userName")
//       .lean();
//     if (!allBlogs.length) {
//       return NextResponse.json({ error: "No post present" }, { status: 404 });
//     }
//     return NextResponse.json(
//       {
//         message: "Blogs retrieved successfully",
//         totalPosts,
//         totalPages,
//         currentPage: page,
//         posts: allBlogs,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// // POST: /api/post => Create a new post
// export async function POST(req: NextRequest) {
//   const { title, description, content, summary, image, tags, isPublished } = await req.json();
//   const requiredFields = [title, description, content, image, tags];
//   const fieldNames = ["title", "description", "content", "image", "tags"];
//   for (let i = 0; i < requiredFields.length; i++) {
//     if (!requiredFields[i]) {
//       return NextResponse.json(
//         { error: `${fieldNames[i]} is a required field.` },
//         { status: 400 }
//       );
//     }
//   }
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   try {
//     await connectToDB();
//     const createBlog = await Blog.create({
//       title,
//       authorId: session.user.id,
//       content,
//       summary,
//       media: image
//         ? {
//             type: "image",
//             url: image,
//           }
//         : null,
//       tags,
//       isPublished,
//     });
//     if (!createBlog) {
//       return NextResponse.json(
//         { error: "Error while creating blog. Try again later." },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       {
//         message: "Post created successfully!",
//         data: createBlog,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";
// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) => {
//   try {
//     await connectToDB();
//     const rawSlug = decodeURIComponent(params.slug); // 👈 decode here
//     const blog = await Blog.findOne({ slug: rawSlug });
//     if (!blog) {
//       return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "Blog fetched", data: blog }, { status: 200 });
//   } catch (error) {
//     console.error("API ERROR:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";
// export const GET = async (
//   req: NextRequest,
//   // --- YEH CORRECTION HAI ---
//   context: { params: { slug: string } }
// ) => {
//   try {
//     await connectToDB();
//     // Slug ko context se nikalein
//     const rawSlug = decodeURIComponent(context.params.slug);
//     const blog = await Blog.findOne({ slug: rawSlug });
//     if (!blog) {
//       return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "Blog fetched", data: blog }, { status: 200 });
//   } catch (error) {
//     console.error("API ERROR in /api/post/[slug]:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } } // This is the corrected signature
) => {
  try {
    // 1. Establish database connection
    await connectToDB();
    // 2. Safely decode the slug from the URL
    const slug = decodeURIComponent(params.slug);
    // 3. Find the blog post by its slug
    const blog = await Blog.findOne({ slug: slug });
    // 4. Handle case where blog is not found
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    // 5. Return the found blog post
    return NextResponse.json(
      { message: "Blog fetched successfully", data: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in /api/post/[slug]:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
};
