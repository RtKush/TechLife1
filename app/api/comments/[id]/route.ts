import { connectToDB } from "@/lib/db.lib";
import Comment from "@/model/comment.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest) {

    const token = await getToken({ req })
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });


    const { pathname } = req.nextUrl
    const id = pathname.split("/").pop()
    if (!id) return NextResponse.json({ message: "Missing comment Id" }, { status: 400 });

    try {
        await connectToDB()
        const comment = await Comment.findById(id)

        if (!comment) return NextResponse.json({ message: "comment not found!" }, { status: 400 });

        if (comment.authorId.toString() !== token.id) {
            return NextResponse.json({ message: "forbidden" }, { status: 403 });

        }

        await comment.deleteOne();
        return NextResponse.json({ message: "comment deleted successfully" }, { status: 200 });

    }
    catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}