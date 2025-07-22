import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";





export const POST = async (req: NextRequest) => {

    const token = await getToken({ req })
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl
    const urlSplit = url.pathname.split("/")
    const slug = urlSplit[urlSplit.length - 2]

    if (!slug) return NextResponse.json({ message: 'undefined blog' }, { status: 401 });

    try {
        await connectToDB()

        const blog = await Blog.findOne({ slug })
        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        const userId = token.id

        const alreadyLiked = blog.likes.includes(userId)

        if (alreadyLiked) blog.likes.pull(userId)
        else blog.likes.addToSet(userId)

        await blog.save({ validateBeforeSave: false })

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Like toggled',
            likesCount: blog.likes.length,
            liked: !alreadyLiked
        });


    } catch (error) {
        console.error("error while implenting blog like: ", error);
        throw error

    }

}