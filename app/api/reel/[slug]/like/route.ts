import { connectToDB } from "@/lib/db.lib";
import Reel from "@/model/reels.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// POST api/reel/[slug]/like
export const POST = async (req: NextRequest) => {

    const token = await getToken({ req })
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl
    const urlSplit = url.pathname.split("/")
    const slug = urlSplit[urlSplit.length - 2]
    console.log("blogUrl: ", url.pathname)
    if (!slug) return NextResponse.json({ error: 'undefined reel' }, { status: 401 });

    try {
        await connectToDB()

        const reel = await Reel.findById(slug)
        if (!reel) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const userId = token.id

        const alreadyLiked = reel.likes.includes(userId)

        if (alreadyLiked) reel.likes.pull(userId)
        else reel.likes.addToSet(userId)

        await reel.save({ validateBeforeSave: false })


        return NextResponse.json({
            message: 'Like toggled',
            likesCount: reel.likes.length,
            liked: !alreadyLiked
        });


    } catch {
        return NextResponse.json({ error: 'internall server error' }, { status: 500 });
    }

}