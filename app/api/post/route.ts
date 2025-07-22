import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// GET: api/post  ; get all post
export async function GET(req: NextRequest) {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    try {
        const totalPosts = await Blog.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const allBlogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("authorId", "userName")
            .lean()

        if (!allBlogs.length) return NextResponse.json(
            { error: "No post present", },
            { status: 404 }
        )


        return NextResponse.json(
            {
                message: "Blog reterive successfully",
                totalPosts,
                totalPages,
                currentPage: page,
                posts: allBlogs
            },
            { status: 200 }
        )
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }

}


// POST: api/post  ; create post
export async function POST(req: NextRequest) {
    const {
        title, description, content, summary, image, tags, isPublished
    } = await req.json()

    // validation check for required field
    const requiredField = [title, description, content, image, tags]

    const fieldName = ["title", "description", "content", "image", "tags"]
    const session = await getServerSession(authOptions)
    requiredField.map(((field, index) => {
        if (field === null || field === undefined || field === "")
            return NextResponse.json(
                { error: `${fieldName[index]} is compulsary field` },
                { status: 400 }
            )
    })
    )
    try {

        await connectToDB()

        const createBlog = await Blog.create({
            title,
            authorId: session?.user.id,
            content,
            summary,
            media: (image) ? {
                type: 'image',
                url: image
            } : null,
            tags,
            isPublished,
        })

        if (!createBlog) return NextResponse.json(
            { error: "Error while creating a blog, please try after sometime" },
            { status: 400 }
        )

        return NextResponse.json(
            {
                message: "Post created successfully!",
                data: {}
            },
            {
                status: 201
            }
        )
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}