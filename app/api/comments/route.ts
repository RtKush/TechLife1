// POST: /api/comments

import { connectToDB } from "@/lib/db.lib";
import Comment from "@/model/comment.model";
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    const token = await getToken({ req })
    if (!token) return NextResponse.json({ error: "Missing blog Id" }, { status: 400 });


    const { blogId, content } = await req.json()
    if (!blogId || !content) return NextResponse.json({ error: "Missing content or blogId" }, { status: 400 });

    try {
        await connectToDB()
        const comment = await Comment.create({
            blogId,
            authorId: token.id,
            content,
        })


        if (!comment) return NextResponse.json({ message: "comment not created!" }, { status: 400 });

        return NextResponse.json({ message: "comment added successsfully!", data: comment }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// GET /api/comments?blogId=...

export async function GET(req: NextRequest) {
    const query = new URL(req.url)
    const searchParams = query.searchParams

    const blogId = searchParams.get("blogId")
    if (!blogId) return NextResponse.json({ message: "Missing blog Id" }, { status: 400 });
    try {

        await connectToDB()
        // Now User model is loaded, so .populate("authorId") will work
        const comments = await Comment.find({ blogId }).sort({ createdAt: -1 }).populate("authorId", "userName avatar").exec()
        if (!comments) return NextResponse.json({ message: "No comment yet" }, { status: 400 });

        return NextResponse.json({ message: "comment retrieved successfully ", data: comments }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}