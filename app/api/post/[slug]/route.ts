// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/db.lib";
// import Blog from "@/model/blog.model";

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) => {
//   try {
//     await connectToDB();

//     const slug = decodeURIComponent(params.slug);

//     const blog = await Blog.findOne({ slug });

//     if (!blog) {
//       return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Blog fetched successfully", data: blog },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("API Error in /api/post/[slug]:", error);
//     return NextResponse.json(
//       { message: "An internal server error occurred" },
//       { status: 500 }
//     );
//   }
// };


import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";

interface Params {
  slug: string;
}

export const GET = async (req: NextRequest, context: { params: Params }) => {
  try {
    await connectToDB();

    const slug = decodeURIComponent(context.params.slug);

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

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
