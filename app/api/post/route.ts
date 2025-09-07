
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    if (slug) {
      // --- Handle single blog post request ---
      const blog = await Blog.findOne({ slug: decodeURIComponent(slug) });
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Blog fetched successfully", data: blog },
        { status: 200 }
      );
    } else {
      // --- Handle all blog posts request ---
      const totalPosts = await Blog.countDocuments();
      const totalPages = Math.ceil(totalPosts / limit);
      const allBlogs = await Blog.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("authorId", "userName")
        .lean();

      return NextResponse.json(
        {
          message: "Blogs retrieved successfully",
          totalPosts,
          totalPages,
          currentPage: page,
          posts: allBlogs,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("API Error in /api/post:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}