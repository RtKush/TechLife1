import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


// GET: api/user/blog/[userName]  ; get all post
export async function GET(req: NextRequest) {
    await connectToDB()

    const url = req.nextUrl
    const userName = url.pathname.split("/").pop()
    if (!userName) return NextResponse.json({ error: "No userId" }, { status: 404 })



    try {
        const user = await User.findOne({ userName })
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
        const userId = user._id

        const blogs = await Blog.find({ authorId: userId }).sort({ createdAt: -1 }).lean()

        if (!blogs.length) return NextResponse.json(
            { error: "No blog found", },
            { status: 400 }
        )


        return NextResponse.json(
            {
                message: "Blog reterive successfully",
                data: { blogs, totalBlog: blogs.length }
            },
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }

}
